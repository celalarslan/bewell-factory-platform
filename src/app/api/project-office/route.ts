import { NextRequest, NextResponse } from "next/server";

import { canAccessInternalProjectOffice } from "@/lib/ai/access";
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
    const result = await runProjectOffice(projectOfficeRequest);

    return NextResponse.json({
      ok: true,
      mode: projectOfficeRequest.mode,
      specialist: projectOfficeRequest.specialistId,
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
