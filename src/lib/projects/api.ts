import "server-only";

import { NextRequest, NextResponse } from "next/server";

import { canAccessInternalProjectOffice } from "@/lib/ai/access";

const MAX_BODY_BYTES = 32 * 1024;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const WRITABLE_PROJECT_STATUSES = [
  "draft",
  "qualification",
  "feasibility",
  "structuring",
  "approved",
  "implementation",
  "operational",
  "on_hold",
] as const;

export const PROJECT_STATUSES = [...WRITABLE_PROJECT_STATUSES, "archived"] as const;

type WritableProjectStatus = (typeof WRITABLE_PROJECT_STATUSES)[number];

type ProjectInput = {
  name: string;
  country: string | null;
  sector: string | null;
  clientOrganization: string | null;
  description: string | null;
  status: WritableProjectStatus;
};

type ProjectPatch = Partial<ProjectInput>;

type ProjectApiErrorCode =
  | "VALIDATION_ERROR"
  | "NOT_FOUND"
  | "DATABASE_UNAVAILABLE"
  | "DATABASE_ERROR"
  | "INTERNAL_ERROR";

export class ProjectApiError extends Error {
  constructor(
    readonly code: ProjectApiErrorCode,
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "ProjectApiError";
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function assertKnownFields(value: Record<string, unknown>, allowedFields: Set<string>) {
  const unknownFields = Object.keys(value).filter((field) => !allowedFields.has(field));
  if (unknownFields.length > 0) {
    throw new ProjectApiError(
      "VALIDATION_ERROR",
      "Request contains unsupported fields.",
      400,
    );
  }
}

function requiredString(value: unknown, field: string, maxLength: number) {
  if (typeof value !== "string") {
    throw new ProjectApiError("VALIDATION_ERROR", `${field} must be a string.`, 400);
  }

  const normalized = value.trim();
  if (!normalized) {
    throw new ProjectApiError("VALIDATION_ERROR", `${field} is required.`, 400);
  }
  if (normalized.length > maxLength) {
    throw new ProjectApiError(
      "VALIDATION_ERROR",
      `${field} exceeds the maximum length.`,
      400,
    );
  }
  return normalized;
}

function optionalString(value: unknown, field: string, maxLength: number) {
  if (value === undefined || value === null) return null;
  if (typeof value !== "string") {
    throw new ProjectApiError("VALIDATION_ERROR", `${field} must be a string.`, 400);
  }

  const normalized = value.trim();
  if (!normalized) return null;
  if (normalized.length > maxLength) {
    throw new ProjectApiError(
      "VALIDATION_ERROR",
      `${field} exceeds the maximum length.`,
      400,
    );
  }
  return normalized;
}

function writableStatus(value: unknown, defaultValue?: WritableProjectStatus) {
  if (value === undefined && defaultValue) return defaultValue;
  if (
    typeof value !== "string" ||
    !WRITABLE_PROJECT_STATUSES.includes(value as WritableProjectStatus)
  ) {
    throw new ProjectApiError("VALIDATION_ERROR", "status is not allowed.", 400);
  }
  return value as WritableProjectStatus;
}

export function parseCreateProject(value: unknown): ProjectInput {
  if (!isRecord(value)) {
    throw new ProjectApiError("VALIDATION_ERROR", "Request body must be an object.", 400);
  }

  assertKnownFields(
    value,
    new Set(["name", "country", "sector", "clientOrganization", "description", "status"]),
  );

  return {
    name: requiredString(value.name, "name", 200),
    country: optionalString(value.country, "country", 120),
    sector: optionalString(value.sector, "sector", 160),
    clientOrganization: optionalString(
      value.clientOrganization,
      "clientOrganization",
      200,
    ),
    description: optionalString(value.description, "description", 5000),
    status: writableStatus(value.status, "draft"),
  };
}

export function parseProjectPatch(value: unknown): ProjectPatch {
  if (!isRecord(value)) {
    throw new ProjectApiError("VALIDATION_ERROR", "Request body must be an object.", 400);
  }

  const allowedFields = new Set([
    "name",
    "country",
    "sector",
    "clientOrganization",
    "description",
    "status",
  ]);
  assertKnownFields(value, allowedFields);

  const changedFields = Object.keys(value);
  if (changedFields.length === 0) {
    throw new ProjectApiError(
      "VALIDATION_ERROR",
      "At least one project field is required.",
      400,
    );
  }

  const patch: ProjectPatch = {};
  if ("name" in value) patch.name = requiredString(value.name, "name", 200);
  if ("country" in value) patch.country = optionalString(value.country, "country", 120);
  if ("sector" in value) patch.sector = optionalString(value.sector, "sector", 160);
  if ("clientOrganization" in value) {
    patch.clientOrganization = optionalString(
      value.clientOrganization,
      "clientOrganization",
      200,
    );
  }
  if ("description" in value) {
    patch.description = optionalString(value.description, "description", 5000);
  }
  if ("status" in value) patch.status = writableStatus(value.status);
  return patch;
}

export function assertProjectId(id: string) {
  if (!UUID_PATTERN.test(id)) {
    throw new ProjectApiError("VALIDATION_ERROR", "Project id must be a valid UUID.", 400);
  }
  return id;
}

export function assertProjectApiAccess(request: NextRequest) {
  if (!canAccessInternalProjectOffice(request.headers.get("host"))) {
    throw new ProjectApiError("NOT_FOUND", "Not found.", 404);
  }
}

export function assertSameOrigin(request: NextRequest) {
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
    throw new ProjectApiError("NOT_FOUND", "Not found.", 404);
  }
}

export async function readProjectJsonBody(request: NextRequest) {
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    throw new ProjectApiError(
      "VALIDATION_ERROR",
      "Request body must contain valid JSON.",
      400,
    );
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    throw new ProjectApiError(
      "VALIDATION_ERROR",
      "Request body exceeds the 32 KB limit.",
      413,
    );
  }

  if (!request.body) {
    throw new ProjectApiError("VALIDATION_ERROR", "Request body is required.", 400);
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
      throw new ProjectApiError(
        "VALIDATION_ERROR",
        "Request body exceeds the 32 KB limit.",
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

  try {
    return JSON.parse(new TextDecoder().decode(body)) as unknown;
  } catch {
    throw new ProjectApiError(
      "VALIDATION_ERROR",
      "Request body must contain valid JSON.",
      400,
    );
  }
}

export async function getProjectDatabase() {
  try {
    return await import("@/db/client");
  } catch {
    throw new ProjectApiError(
      "DATABASE_UNAVAILABLE",
      "The project database is unavailable.",
      503,
    );
  }
}

export function projectApiErrorResponse(error: unknown) {
  const safeError =
    error instanceof ProjectApiError
      ? error
      : new ProjectApiError(
          "DATABASE_ERROR",
          "The project database operation could not be completed.",
          500,
        );

  return NextResponse.json(
    {
      ok: false,
      error: {
        code: safeError.code,
        message: safeError.message,
      },
    },
    { status: safeError.status },
  );
}
