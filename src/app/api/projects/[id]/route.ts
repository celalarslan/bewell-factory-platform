import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

import { auditEvents, projects } from "@/db/schema";
import {
  assertProjectApiAccess,
  assertProjectId,
  assertSameOrigin,
  getProjectDatabase,
  parseProjectPatch,
  ProjectApiError,
  projectApiErrorResponse,
  readProjectJsonBody,
} from "@/lib/projects/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

async function getProjectId(context: RouteContext) {
  return assertProjectId((await context.params).id);
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    assertProjectApiAccess(request);
    const id = await getProjectId(context);
    const { db } = await getProjectDatabase();
    const [project] = await db.select().from(projects).where(eq(projects.id, id)).limit(1);

    if (!project) {
      throw new ProjectApiError("NOT_FOUND", "Project not found.", 404);
    }
    return NextResponse.json({ ok: true, project });
  } catch (error) {
    return projectApiErrorResponse(error);
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    assertProjectApiAccess(request);
    assertSameOrigin(request);
    const id = await getProjectId(context);
    const patch = parseProjectPatch(await readProjectJsonBody(request));
    const changedFields = Object.keys(patch);
    const { db } = await getProjectDatabase();

    const project = await db.transaction(async (transaction) => {
      const [updatedProject] = await transaction
        .update(projects)
        .set({ ...patch, updatedAt: new Date() })
        .where(eq(projects.id, id))
        .returning();

      if (!updatedProject) {
        throw new ProjectApiError("NOT_FOUND", "Project not found.", 404);
      }

      await transaction.insert(auditEvents).values({
        projectId: updatedProject.id,
        eventType: "project.updated",
        entityType: "project",
        entityId: updatedProject.id,
        actorType: "user",
        metadata: { changedFields },
      });

      return updatedProject;
    });

    return NextResponse.json({ ok: true, project });
  } catch (error) {
    return projectApiErrorResponse(error);
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    assertProjectApiAccess(request);
    assertSameOrigin(request);
    const id = await getProjectId(context);
    const { db } = await getProjectDatabase();

    const project = await db.transaction(async (transaction) => {
      const [existingProject] = await transaction
        .select()
        .from(projects)
        .where(eq(projects.id, id))
        .limit(1);

      if (!existingProject) {
        throw new ProjectApiError("NOT_FOUND", "Project not found.", 404);
      }
      if (existingProject.status === "archived") return existingProject;

      const now = new Date();
      const [archivedProject] = await transaction
        .update(projects)
        .set({ status: "archived", archivedAt: now, updatedAt: now })
        .where(eq(projects.id, id))
        .returning();

      await transaction.insert(auditEvents).values({
        projectId: archivedProject.id,
        eventType: "project.archived",
        entityType: "project",
        entityId: archivedProject.id,
        actorType: "user",
        metadata: { archived: true },
      });

      return archivedProject;
    });

    return NextResponse.json({ ok: true, project });
  } catch (error) {
    return projectApiErrorResponse(error);
  }
}
