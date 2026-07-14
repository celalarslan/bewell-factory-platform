import { and, desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

import { analysisRuns, projects } from "@/db/schema";
import {
  assertProjectApiAccess,
  assertProjectId,
  getProjectDatabase,
  ProjectApiError,
  projectApiErrorResponse,
} from "@/lib/projects/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function parseLimit(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  for (const key of params.keys()) {
    if (key !== "limit") {
      throw new ProjectApiError(
        "VALIDATION_ERROR",
        "Request contains unsupported query parameters.",
        400,
      );
    }
  }

  const value = params.get("limit");
  if (value === null) return 20;
  if (!/^\d+$/.test(value)) {
    throw new ProjectApiError("VALIDATION_ERROR", "limit must be an integer.", 400);
  }
  const limit = Number(value);
  if (!Number.isSafeInteger(limit) || limit < 1 || limit > 50) {
    throw new ProjectApiError("VALIDATION_ERROR", "limit is outside the allowed range.", 400);
  }
  return limit;
}

function shortText(value: string | null, maxLength: number) {
  if (!value) return null;
  return value.length <= maxLength ? value : `${value.slice(0, maxLength - 1)}…`;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    assertProjectApiAccess(request);
    const id = assertProjectId((await context.params).id);
    const limit = parseLimit(request);
    const { db } = await getProjectDatabase();
    const [project] = await db
      .select({ id: projects.id })
      .from(projects)
      .where(eq(projects.id, id))
      .limit(1);

    if (!project) {
      throw new ProjectApiError("NOT_FOUND", "Project not found.", 404);
    }

    const runs = await db
      .select({
        id: analysisRuns.id,
        mode: analysisRuns.mode,
        specialistId: analysisRuns.specialistId,
        language: analysisRuns.language,
        status: analysisRuns.status,
        model: analysisRuns.model,
        task: analysisRuns.task,
        summary: analysisRuns.summary,
        createdAt: analysisRuns.createdAt,
        completedAt: analysisRuns.completedAt,
      })
      .from(analysisRuns)
      .where(and(eq(analysisRuns.projectId, id)))
      .orderBy(desc(analysisRuns.createdAt))
      .limit(limit);

    return NextResponse.json({
      ok: true,
      analysisRuns: runs.map((run) => ({
        id: run.id,
        mode: run.mode === "review_panel" ? "review-panel" : "single",
        specialist: run.specialistId,
        language: run.language,
        status: run.status,
        model: run.model,
        requestSummary: shortText(run.task, 240),
        resultSummary: shortText(run.summary, 320),
        createdAt: run.createdAt,
        completedAt: run.completedAt,
      })),
    });
  } catch (error) {
    return projectApiErrorResponse(error);
  }
}
