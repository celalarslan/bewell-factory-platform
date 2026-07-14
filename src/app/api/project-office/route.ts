import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { analysisRuns, projects } from "@/db/schema";
import { canAccessInternalProjectOffice } from "@/lib/ai/access";
import { getOpenAIConfig } from "@/lib/ai/client";
import { runProjectOffice } from "@/lib/ai/orchestrator";
import { ProjectOfficeError } from "@/lib/ai/types";
import { validateProjectOfficeRequest } from "@/lib/ai/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 64 * 1024;

function errorResponse(error: ProjectOfficeError) {
  return NextResponse.json(
    {
      ok: false,
      error: {
        code: error.code,
        message: error.message,
      },
    },
    { status: error.status },
  );
}

function assertSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  let originMatches = true;

  if (origin !== null) {
    try {
      originMatches = new URL(origin).origin === request.nextUrl.origin;
    } catch {
      originMatches = false;
    }
  }

  if (fetchSite === "cross-site" || !originMatches) {
    throw new ProjectOfficeError(
      "INVALID_ORIGIN",
      "Cross-origin requests are not allowed.",
      403,
    );
  }
}

function assertInternalAccess(request: NextRequest) {
  if (!canAccessInternalProjectOffice(request.headers.get("host"))) {
    throw new ProjectOfficeError("NOT_FOUND", "Not found.", 404);
  }
}

async function readLimitedBody(request: NextRequest) {
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    throw new ProjectOfficeError(
      "PAYLOAD_TOO_LARGE",
      "Request body exceeds the 64 KB limit.",
      413,
    );
  }

  if (!request.body) {
    return "";
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    totalBytes += value.byteLength;
    if (totalBytes > MAX_BODY_BYTES) {
      await reader.cancel();
      throw new ProjectOfficeError(
        "PAYLOAD_TOO_LARGE",
        "Request body exceeds the 64 KB limit.",
        413,
      );
    }
    chunks.push(value);
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return new TextDecoder().decode(body);
}

async function getDatabase() {
  try {
    return await import("@/db/client");
  } catch {
    throw new ProjectOfficeError(
      "DATABASE_UNAVAILABLE",
      "Yerel proje veritabanına ulaşılamıyor.",
      503,
    );
  }
}

function databaseFailure(message: string) {
  return new ProjectOfficeError("ANALYSIS_NOT_SAVED", message, 500);
}

// Demo/local endpoint only. Production use requires authentication and durable rate limiting.
export async function POST(request: NextRequest) {
  try {
    assertInternalAccess(request);
    assertSameOrigin(request);
    const body = await readLimitedBody(request);

    let parsed: unknown;
    try {
      parsed = JSON.parse(body);
    } catch {
      throw new ProjectOfficeError(
        "INVALID_REQUEST",
        "Request body must contain valid JSON.",
        400,
      );
    }

    const projectOfficeRequest = validateProjectOfficeRequest(parsed);
    const { db } = await getDatabase();
    let project;
    try {
      [project] = await db
        .select()
        .from(projects)
        .where(eq(projects.id, projectOfficeRequest.projectId))
        .limit(1);
    } catch {
      throw new ProjectOfficeError(
        "DATABASE_UNAVAILABLE",
        "Yerel proje veritabanına ulaşılamıyor.",
        503,
      );
    }

    if (!project) {
      throw new ProjectOfficeError(
        "PROJECT_NOT_FOUND",
        "Seçili proje bulunamadı.",
        404,
      );
    }
    if (project.status === "archived") {
      throw new ProjectOfficeError(
        "PROJECT_ARCHIVED",
        "Arşivlenmiş bir proje için yeni analiz başlatılamaz.",
        400,
      );
    }

    const projectDossier = {
      name: project.name,
      country: project.country,
      sector: project.sector,
      clientOrganization: project.clientOrganization,
      description: project.description,
      status: project.status,
    };
    const { model } = getOpenAIConfig();
    const startedAt = Date.now();
    let analysisRun;

    try {
      [analysisRun] = await db
        .insert(analysisRuns)
        .values({
          projectId: project.id,
          specialistId: projectOfficeRequest.specialistId,
          mode: projectOfficeRequest.mode === "review-panel" ? "review_panel" : "single",
          language: projectOfficeRequest.language,
          task: projectOfficeRequest.task,
          projectContext: [
            `Project: ${project.name}`,
            `Country: ${project.country ?? "Not provided"}`,
            `Sector: ${project.sector ?? "Not provided"}`,
            `Status: ${project.status}`,
          ].join(" | "),
          status: "running",
          model,
        })
        .returning({ id: analysisRuns.id });
    } catch {
      throw databaseFailure("Analiz kaydı oluşturulamadığı için AI görevi başlatılmadı.");
    }

    let result;
    try {
      result = await runProjectOffice(projectOfficeRequest, projectDossier);
    } catch (error) {
      try {
        await db
          .update(analysisRuns)
          .set({
            status: "failed",
            errorCode: error instanceof ProjectOfficeError ? error.code : "INTERNAL_ERROR",
            durationMs: Date.now() - startedAt,
            completedAt: new Date(),
          })
          .where(eq(analysisRuns.id, analysisRun.id));
      } catch {
        throw databaseFailure("Başarısız analiz çalışması veritabanına kaydedilemedi.");
      }
      throw error;
    }

    try {
      const [completedRun] = await db
        .update(analysisRuns)
        .set({
          status: "completed",
          summary: result.summary,
          resultJson: { ...result },
          errorCode: null,
          durationMs: Date.now() - startedAt,
          completedAt: new Date(),
        })
        .where(eq(analysisRuns.id, analysisRun.id))
        .returning({ id: analysisRuns.id });
      if (!completedRun) {
        throw databaseFailure("Analiz sonucu veritabanına kaydedilemedi.");
      }
    } catch (error) {
      if (error instanceof ProjectOfficeError) throw error;
      throw databaseFailure("Analiz sonucu veritabanına kaydedilemedi.");
    }

    return NextResponse.json({
      ok: true,
      mode: projectOfficeRequest.mode,
      specialist: projectOfficeRequest.specialistId,
      analysisRunId: analysisRun.id,
      result,
    });
  } catch (error) {
    if (error instanceof ProjectOfficeError) {
      return errorResponse(error);
    }

    return errorResponse(
      new ProjectOfficeError(
        "INTERNAL_ERROR",
        "The Project Office request could not be completed.",
        500,
      ),
    );
  }
}
