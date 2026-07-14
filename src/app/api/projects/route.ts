import { and, desc, eq, ilike, ne, or, type SQL } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

import { auditEvents, projects } from "@/db/schema";
import {
  assertProjectApiAccess,
  assertSameOrigin,
  getProjectDatabase,
  parseCreateProject,
  PROJECT_STATUSES,
  ProjectApiError,
  projectApiErrorResponse,
  readProjectJsonBody,
} from "@/lib/projects/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LIST_QUERY_FIELDS = new Set([
  "status",
  "country",
  "sector",
  "search",
  "limit",
  "offset",
  "includeArchived",
]);

function boundedQueryText(value: string | null, field: string, maxLength: number) {
  if (value === null) return null;
  const normalized = value.trim();
  if (!normalized || normalized.length > maxLength) {
    throw new ProjectApiError(
      "VALIDATION_ERROR",
      `${field} must be between 1 and ${maxLength} characters.`,
      400,
    );
  }
  return normalized;
}

function integerQuery(value: string | null, field: string, fallback: number, maximum?: number) {
  if (value === null) return fallback;
  if (!/^\d+$/.test(value)) {
    throw new ProjectApiError("VALIDATION_ERROR", `${field} must be an integer.`, 400);
  }
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < 0 || (maximum !== undefined && parsed > maximum)) {
    throw new ProjectApiError("VALIDATION_ERROR", `${field} is outside the allowed range.`, 400);
  }
  return parsed;
}

function parseListQuery(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  for (const key of params.keys()) {
    if (!LIST_QUERY_FIELDS.has(key)) {
      throw new ProjectApiError(
        "VALIDATION_ERROR",
        "Request contains unsupported query parameters.",
        400,
      );
    }
  }

  const status = boundedQueryText(params.get("status"), "status", 32);
  if (status !== null && !PROJECT_STATUSES.includes(status as (typeof PROJECT_STATUSES)[number])) {
    throw new ProjectApiError("VALIDATION_ERROR", "status is not allowed.", 400);
  }

  const includeArchivedValue = params.get("includeArchived");
  if (includeArchivedValue !== null && !["true", "false"].includes(includeArchivedValue)) {
    throw new ProjectApiError(
      "VALIDATION_ERROR",
      "includeArchived must be true or false.",
      400,
    );
  }

  return {
    status: status as (typeof PROJECT_STATUSES)[number] | null,
    country: boundedQueryText(params.get("country"), "country", 120),
    sector: boundedQueryText(params.get("sector"), "sector", 160),
    search: boundedQueryText(params.get("search"), "search", 200),
    limit: integerQuery(params.get("limit"), "limit", 20, 100),
    offset: integerQuery(params.get("offset"), "offset", 0),
    includeArchived: includeArchivedValue === "true",
  };
}

function escapeLikePattern(value: string) {
  return value.replace(/[\\%_]/g, "\\$&");
}

export async function POST(request: NextRequest) {
  try {
    assertProjectApiAccess(request);
    assertSameOrigin(request);
    const input = parseCreateProject(await readProjectJsonBody(request));
    const { db } = await getProjectDatabase();

    const project = await db.transaction(async (transaction) => {
      const [createdProject] = await transaction
        .insert(projects)
        .values(input)
        .returning();

      await transaction.insert(auditEvents).values({
        projectId: createdProject.id,
        eventType: "project.created",
        entityType: "project",
        entityId: createdProject.id,
        actorType: "user",
        metadata: {
          providedFields: Object.keys(input).filter(
            (field) => input[field as keyof typeof input] !== null,
          ),
        },
      });

      return createdProject;
    });

    return NextResponse.json({ ok: true, project }, { status: 201 });
  } catch (error) {
    return projectApiErrorResponse(error);
  }
}

export async function GET(request: NextRequest) {
  try {
    assertProjectApiAccess(request);
    const query = parseListQuery(request);
    const filters: SQL[] = [];

    if (!query.includeArchived) filters.push(ne(projects.status, "archived"));
    if (query.status) filters.push(eq(projects.status, query.status));
    if (query.country) filters.push(eq(projects.country, query.country));
    if (query.sector) filters.push(eq(projects.sector, query.sector));
    if (query.search) {
      const pattern = `%${escapeLikePattern(query.search)}%`;
      filters.push(
        or(
          ilike(projects.name, pattern),
          ilike(projects.country, pattern),
          ilike(projects.sector, pattern),
          ilike(projects.clientOrganization, pattern),
        )!,
      );
    }

    const { db } = await getProjectDatabase();
    const projectList = await db
      .select()
      .from(projects)
      .where(filters.length > 0 ? and(...filters) : undefined)
      .orderBy(desc(projects.updatedAt))
      .limit(query.limit)
      .offset(query.offset);

    return NextResponse.json({
      ok: true,
      projects: projectList,
      pagination: {
        limit: query.limit,
        offset: query.offset,
        returned: projectList.length,
      },
    });
  } catch (error) {
    return projectApiErrorResponse(error);
  }
}
