import "server-only";

import { and, desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

import {
  auditEvents,
  evidenceRequirements,
  executiveDecisions,
  projectAssumptions,
  projectFacts,
  projectRisks,
  projects,
} from "@/db/schema";
import {
  assertItemId,
  assertKnownFields,
  assertProjectApiAccess,
  assertProjectId,
  assertSameOrigin,
  getProjectDatabase,
  isRecord,
  optionalString,
  ProjectApiError,
  projectApiErrorResponse,
  readProjectJsonBody,
  requiredString,
} from "@/lib/projects/api";

export type DossierModule =
  | "facts"
  | "assumptions"
  | "risks"
  | "evidence-requirements"
  | "executive-decisions";

type CollectionContext = { params: Promise<{ id: string }> };
type ItemContext = { params: Promise<{ id: string; itemId: string }> };
type ProjectDatabase = (typeof import("@/db/client"))["db"];

const FACT_STATUSES = ["proposed", "approved", "disputed", "superseded"] as const;
const ASSUMPTION_STATUSES = ["active", "verified", "rejected", "replaced"] as const;
const RISK_LEVELS = ["low", "medium", "high", "critical"] as const;
const RISK_STATUSES = ["open", "monitoring", "mitigated", "accepted", "closed"] as const;
const EVIDENCE_PRIORITIES = ["low", "medium", "high", "critical"] as const;
const EVIDENCE_STATUSES = ["open", "requested", "received", "verified", "rejected", "closed"] as const;
const DECISIONS = ["pending", "approved", "evidence_requested", "rejected", "deferred"] as const;

function inputRecord(value: unknown, fields: readonly string[], patch: boolean) {
  if (!isRecord(value)) {
    throw new ProjectApiError("VALIDATION_ERROR", "Request body must be an object.", 400);
  }
  assertKnownFields(value, new Set(fields));
  if (patch && Object.keys(value).length === 0) {
    throw new ProjectApiError(
      "VALIDATION_ERROR",
      "At least one field is required.",
      400,
    );
  }
  return value;
}

function enumValue<const T extends readonly string[]>(
  value: unknown,
  field: string,
  values: T,
  fallback?: T[number],
) {
  if (value === undefined && fallback !== undefined) return fallback;
  if (typeof value !== "string" || !values.includes(value as T[number])) {
    throw new ProjectApiError("VALIDATION_ERROR", `${field} is not allowed.`, 400);
  }
  return value as T[number];
}

function optionalInteger(value: unknown, field: string, minimum: number, maximum: number) {
  if (value === undefined || value === null || value === "") return null;
  if (!Number.isInteger(value) || Number(value) < minimum || Number(value) > maximum) {
    throw new ProjectApiError(
      "VALIDATION_ERROR",
      `${field} must be an integer from ${minimum} to ${maximum}.`,
      400,
    );
  }
  return Number(value);
}

function optionalDate(value: unknown, field: string) {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value !== "string") {
    throw new ProjectApiError("VALIDATION_ERROR", `${field} must be an ISO date.`, 400);
  }
  const isoDatePattern = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z)?$/;
  const date = new Date(value);
  if (!isoDatePattern.test(value) || Number.isNaN(date.getTime())) {
    throw new ProjectApiError("VALIDATION_ERROR", `${field} must be an ISO date.`, 400);
  }
  return date;
}

function safeSummary(value: string) {
  const normalized = value.replace(/\s+/g, " ").trim();
  return normalized.length <= 120 ? normalized : `${normalized.slice(0, 119)}…`;
}

function auditMetadata(
  projectId: string,
  entityId: string,
  changedFields: string[],
  summary: string,
) {
  return {
    projectId,
    entityId,
    changedFields,
    summary: safeSummary(summary),
  };
}

async function assertProject(db: ProjectDatabase, projectId: string, writable: boolean) {
  const [project] = await db
    .select({ id: projects.id, status: projects.status })
    .from(projects)
    .where(eq(projects.id, projectId))
    .limit(1);
  if (!project) throw new ProjectApiError("NOT_FOUND", "Project not found.", 404);
  if (writable && project.status === "archived") {
    throw new ProjectApiError(
      "PROJECT_ARCHIVED",
      "Archived projects cannot be modified.",
      400,
    );
  }
}

function parseFact(value: unknown, patch: boolean) {
  const item = inputRecord(
    value,
    ["category", "key", "value", "unit", "status", "source", "notes"],
    patch,
  );
  const result: {
    category?: string;
    key?: string;
    value?: string;
    unit?: string | null;
    status?: (typeof FACT_STATUSES)[number];
    source?: string | null;
    notes?: string | null;
  } = {};
  if (!patch || "category" in item) result.category = requiredString(item.category, "category", 120);
  if (!patch || "key" in item) result.key = requiredString(item.key, "key", 160);
  if (!patch || "value" in item) result.value = requiredString(item.value, "value", 5000);
  if (!patch || "unit" in item) result.unit = optionalString(item.unit, "unit", 80);
  if (!patch || "status" in item) result.status = enumValue(item.status, "status", FACT_STATUSES, "proposed");
  if (!patch || "source" in item) result.source = optionalString(item.source, "source", 1000);
  if (!patch || "notes" in item) result.notes = optionalString(item.notes, "notes", 5000);
  return result;
}

function parseAssumption(value: unknown, patch: boolean) {
  const item = inputRecord(value, ["statement", "status"], patch);
  const result: {
    statement?: string;
    status?: (typeof ASSUMPTION_STATUSES)[number];
  } = {};
  if (!patch || "statement" in item) result.statement = requiredString(item.statement, "statement", 5000);
  if (!patch || "status" in item) result.status = enumValue(item.status, "status", ASSUMPTION_STATUSES, "active");
  return result;
}

function parseRisk(value: unknown, patch: boolean) {
  const item = inputRecord(
    value,
    ["title", "description", "category", "level", "probability", "impact", "mitigation", "owner", "status"],
    patch,
  );
  const result: {
    title?: string;
    description?: string;
    category?: string | null;
    level?: (typeof RISK_LEVELS)[number];
    probability?: number | null;
    impact?: number | null;
    mitigation?: string | null;
    owner?: string | null;
    status?: (typeof RISK_STATUSES)[number];
  } = {};
  if (!patch || "title" in item) result.title = requiredString(item.title, "title", 200);
  if (!patch || "description" in item) result.description = requiredString(item.description, "description", 5000);
  if (!patch || "category" in item) result.category = optionalString(item.category, "category", 120);
  if (!patch || "level" in item) result.level = enumValue(item.level, "level", RISK_LEVELS, "medium");
  if (!patch || "probability" in item) result.probability = optionalInteger(item.probability, "probability", 1, 5);
  if (!patch || "impact" in item) result.impact = optionalInteger(item.impact, "impact", 1, 5);
  if (!patch || "mitigation" in item) result.mitigation = optionalString(item.mitigation, "mitigation", 5000);
  if (!patch || "owner" in item) result.owner = optionalString(item.owner, "owner", 200);
  if (!patch || "status" in item) result.status = enumValue(item.status, "status", RISK_STATUSES, "open");
  return result;
}

function parseEvidence(value: unknown, patch: boolean) {
  const item = inputRecord(
    value,
    ["title", "description", "category", "priority", "status", "responsibleParty", "dueDate"],
    patch,
  );
  const result: {
    title?: string;
    description?: string | null;
    category?: string | null;
    priority?: (typeof EVIDENCE_PRIORITIES)[number];
    status?: (typeof EVIDENCE_STATUSES)[number];
    responsibleParty?: string | null;
    dueDate?: Date | null;
  } = {};
  if (!patch || "title" in item) result.title = requiredString(item.title, "title", 200);
  if (!patch || "description" in item) result.description = optionalString(item.description, "description", 5000);
  if (!patch || "category" in item) result.category = optionalString(item.category, "category", 120);
  if (!patch || "priority" in item) result.priority = enumValue(item.priority, "priority", EVIDENCE_PRIORITIES, "medium");
  if (!patch || "status" in item) result.status = enumValue(item.status, "status", EVIDENCE_STATUSES, "open");
  if (!patch || "responsibleParty" in item) result.responsibleParty = optionalString(item.responsibleParty, "responsibleParty", 200);
  if (!patch || "dueDate" in item) result.dueDate = optionalDate(item.dueDate, "dueDate");
  return result;
}

function parseDecision(value: unknown, patch: boolean) {
  const item = inputRecord(
    value,
    ["title", "description", "decision", "rationale", "decidedBy", "decidedAt"],
    patch,
  );
  const result: {
    title?: string;
    description?: string | null;
    decision?: (typeof DECISIONS)[number];
    rationale?: string | null;
    decidedBy?: string | null;
    decidedAt?: Date | null;
  } = {};
  if (!patch || "title" in item) result.title = requiredString(item.title, "title", 200);
  if (!patch || "description" in item) result.description = optionalString(item.description, "description", 5000);
  if (!patch || "decision" in item) result.decision = enumValue(item.decision, "decision", DECISIONS, "pending");
  if (!patch || "rationale" in item) result.rationale = optionalString(item.rationale, "rationale", 5000);
  if (!patch || "decidedBy" in item) result.decidedBy = optionalString(item.decidedBy, "decidedBy", 200);
  if (!patch || "decidedAt" in item) result.decidedAt = optionalDate(item.decidedAt, "decidedAt");
  return result;
}

export async function listDossierItems(
  request: NextRequest,
  context: CollectionContext,
  module: DossierModule,
) {
  try {
    assertProjectApiAccess(request);
    const projectId = assertProjectId((await context.params).id);
    const { db } = await getProjectDatabase();
    await assertProject(db, projectId, false);

    let items;
    switch (module) {
      case "facts":
        items = await db.select().from(projectFacts).where(eq(projectFacts.projectId, projectId)).orderBy(desc(projectFacts.createdAt));
        break;
      case "assumptions":
        items = await db.select().from(projectAssumptions).where(eq(projectAssumptions.projectId, projectId)).orderBy(desc(projectAssumptions.createdAt));
        break;
      case "risks":
        items = await db.select().from(projectRisks).where(eq(projectRisks.projectId, projectId)).orderBy(desc(projectRisks.createdAt));
        break;
      case "evidence-requirements":
        items = await db.select().from(evidenceRequirements).where(eq(evidenceRequirements.projectId, projectId)).orderBy(desc(evidenceRequirements.createdAt));
        break;
      case "executive-decisions":
        items = await db.select().from(executiveDecisions).where(eq(executiveDecisions.projectId, projectId)).orderBy(desc(executiveDecisions.createdAt));
        break;
    }
    return NextResponse.json({ ok: true, items });
  } catch (error) {
    return projectApiErrorResponse(error);
  }
}

export async function createDossierItem(
  request: NextRequest,
  context: CollectionContext,
  module: DossierModule,
) {
  try {
    assertProjectApiAccess(request);
    assertSameOrigin(request);
    const projectId = assertProjectId((await context.params).id);
    const value = await readProjectJsonBody(request);
    const { db } = await getProjectDatabase();
    await assertProject(db, projectId, true);
    let item;

    switch (module) {
      case "facts": {
        const input = parseFact(value, false);
        item = await db.transaction(async (tx) => {
          const [created] = await tx.insert(projectFacts).values({
            projectId,
            category: input.category!,
            key: input.key!,
            value: input.value!,
            unit: input.unit,
            status: input.status,
            source: input.source,
            notes: input.notes,
          }).returning();
          await tx.insert(auditEvents).values({ projectId, eventType: "fact.created", entityType: "fact", entityId: created.id, actorType: "user", metadata: auditMetadata(projectId, created.id, Object.keys(input), `${created.key}: ${created.value}`) });
          return created;
        });
        break;
      }
      case "assumptions": {
        const input = parseAssumption(value, false);
        item = await db.transaction(async (tx) => {
          const [created] = await tx.insert(projectAssumptions).values({ projectId, statement: input.statement!, status: input.status, resolvedAt: input.status === "active" ? null : new Date() }).returning();
          await tx.insert(auditEvents).values({ projectId, eventType: "assumption.created", entityType: "assumption", entityId: created.id, actorType: "user", metadata: auditMetadata(projectId, created.id, Object.keys(input), created.statement) });
          return created;
        });
        break;
      }
      case "risks": {
        const input = parseRisk(value, false);
        item = await db.transaction(async (tx) => {
          const [created] = await tx.insert(projectRisks).values({ projectId, title: input.title!, description: input.description!, category: input.category, level: input.level, probability: input.probability, impact: input.impact, mitigation: input.mitigation, owner: input.owner, status: input.status, closedAt: input.status === "closed" ? new Date() : null }).returning();
          await tx.insert(auditEvents).values({ projectId, eventType: "risk.created", entityType: "risk", entityId: created.id, actorType: "user", metadata: auditMetadata(projectId, created.id, Object.keys(input), created.title) });
          return created;
        });
        break;
      }
      case "evidence-requirements": {
        const input = parseEvidence(value, false);
        item = await db.transaction(async (tx) => {
          const [created] = await tx.insert(evidenceRequirements).values({ projectId, title: input.title!, description: input.description, category: input.category, priority: input.priority, status: input.status, responsibleParty: input.responsibleParty, dueDate: input.dueDate, resolvedAt: input.status === "closed" ? new Date() : null }).returning();
          await tx.insert(auditEvents).values({ projectId, eventType: "evidence_requirement.created", entityType: "evidence_requirement", entityId: created.id, actorType: "user", metadata: auditMetadata(projectId, created.id, Object.keys(input), created.title) });
          return created;
        });
        break;
      }
      case "executive-decisions": {
        const input = parseDecision(value, false);
        item = await db.transaction(async (tx) => {
          const [created] = await tx.insert(executiveDecisions).values({ projectId, title: input.title!, description: input.description, decision: input.decision, rationale: input.rationale, decidedBy: input.decidedBy, decidedAt: input.decidedAt }).returning();
          await tx.insert(auditEvents).values({ projectId, eventType: "executive_decision.created", entityType: "executive_decision", entityId: created.id, actorType: "user", metadata: auditMetadata(projectId, created.id, Object.keys(input), created.title) });
          return created;
        });
        break;
      }
    }
    return NextResponse.json({ ok: true, item }, { status: 201 });
  } catch (error) {
    return projectApiErrorResponse(error);
  }
}

export async function updateDossierItem(
  request: NextRequest,
  context: ItemContext,
  module: DossierModule,
) {
  try {
    assertProjectApiAccess(request);
    assertSameOrigin(request);
    const params = await context.params;
    const projectId = assertProjectId(params.id);
    const itemId = assertItemId(params.itemId);
    const value = await readProjectJsonBody(request);
    const { db } = await getProjectDatabase();
    await assertProject(db, projectId, true);
    let item;

    switch (module) {
      case "facts": {
        const patch = parseFact(value, true);
        item = await db.transaction(async (tx) => {
          const [updated] = await tx.update(projectFacts).set({ ...patch, updatedAt: new Date() }).where(and(eq(projectFacts.id, itemId), eq(projectFacts.projectId, projectId))).returning();
          if (!updated) throw new ProjectApiError("NOT_FOUND", "Item not found.", 404);
          await tx.insert(auditEvents).values({ projectId, eventType: "fact.updated", entityType: "fact", entityId: updated.id, actorType: "user", metadata: auditMetadata(projectId, updated.id, Object.keys(patch), `${updated.key}: ${updated.value}`) });
          return updated;
        });
        break;
      }
      case "assumptions": {
        const patch = parseAssumption(value, true);
        item = await db.transaction(async (tx) => {
          const values = { ...patch, ...(patch.status ? { resolvedAt: patch.status === "active" ? null : new Date() } : {}) };
          const [updated] = await tx.update(projectAssumptions).set(values).where(and(eq(projectAssumptions.id, itemId), eq(projectAssumptions.projectId, projectId))).returning();
          if (!updated) throw new ProjectApiError("NOT_FOUND", "Item not found.", 404);
          await tx.insert(auditEvents).values({ projectId, eventType: "assumption.updated", entityType: "assumption", entityId: updated.id, actorType: "user", metadata: auditMetadata(projectId, updated.id, Object.keys(patch), updated.statement) });
          return updated;
        });
        break;
      }
      case "risks": {
        const patch = parseRisk(value, true);
        item = await db.transaction(async (tx) => {
          const values = { ...patch, ...(patch.status ? { closedAt: patch.status === "closed" ? new Date() : null } : {}), updatedAt: new Date() };
          const [updated] = await tx.update(projectRisks).set(values).where(and(eq(projectRisks.id, itemId), eq(projectRisks.projectId, projectId))).returning();
          if (!updated) throw new ProjectApiError("NOT_FOUND", "Item not found.", 404);
          await tx.insert(auditEvents).values({ projectId, eventType: "risk.updated", entityType: "risk", entityId: updated.id, actorType: "user", metadata: auditMetadata(projectId, updated.id, Object.keys(patch), updated.title) });
          return updated;
        });
        break;
      }
      case "evidence-requirements": {
        const patch = parseEvidence(value, true);
        item = await db.transaction(async (tx) => {
          const values = { ...patch, ...(patch.status ? { resolvedAt: patch.status === "closed" ? new Date() : null } : {}) };
          const [updated] = await tx.update(evidenceRequirements).set(values).where(and(eq(evidenceRequirements.id, itemId), eq(evidenceRequirements.projectId, projectId))).returning();
          if (!updated) throw new ProjectApiError("NOT_FOUND", "Item not found.", 404);
          await tx.insert(auditEvents).values({ projectId, eventType: "evidence_requirement.updated", entityType: "evidence_requirement", entityId: updated.id, actorType: "user", metadata: auditMetadata(projectId, updated.id, Object.keys(patch), updated.title) });
          return updated;
        });
        break;
      }
      case "executive-decisions": {
        const patch = parseDecision(value, true);
        item = await db.transaction(async (tx) => {
          const [updated] = await tx.update(executiveDecisions).set({ ...patch, updatedAt: new Date() }).where(and(eq(executiveDecisions.id, itemId), eq(executiveDecisions.projectId, projectId))).returning();
          if (!updated) throw new ProjectApiError("NOT_FOUND", "Item not found.", 404);
          await tx.insert(auditEvents).values({ projectId, eventType: "executive_decision.updated", entityType: "executive_decision", entityId: updated.id, actorType: "user", metadata: auditMetadata(projectId, updated.id, Object.keys(patch), updated.title) });
          return updated;
        });
        break;
      }
    }
    return NextResponse.json({ ok: true, item });
  } catch (error) {
    return projectApiErrorResponse(error);
  }
}

export async function archiveDossierItem(
  request: NextRequest,
  context: ItemContext,
  module: DossierModule,
) {
  try {
    assertProjectApiAccess(request);
    assertSameOrigin(request);
    const params = await context.params;
    const projectId = assertProjectId(params.id);
    const itemId = assertItemId(params.itemId);
    const { db } = await getProjectDatabase();
    await assertProject(db, projectId, true);
    if (module === "executive-decisions") {
      const [decision] = await db
        .select({ id: executiveDecisions.id })
        .from(executiveDecisions)
        .where(
          and(
            eq(executiveDecisions.id, itemId),
            eq(executiveDecisions.projectId, projectId),
          ),
        )
        .limit(1);
      if (!decision) throw new ProjectApiError("NOT_FOUND", "Item not found.", 404);
      throw new ProjectApiError(
        "METHOD_NOT_SUPPORTED",
        "Executive decisions cannot be removed without schema support.",
        409,
      );
    }
    let item;

    switch (module) {
      case "facts":
        item = await db.transaction(async (tx) => {
          const [updated] = await tx.update(projectFacts).set({ status: "superseded", updatedAt: new Date() }).where(and(eq(projectFacts.id, itemId), eq(projectFacts.projectId, projectId))).returning();
          if (!updated) throw new ProjectApiError("NOT_FOUND", "Item not found.", 404);
          await tx.insert(auditEvents).values({ projectId, eventType: "fact.archived", entityType: "fact", entityId: updated.id, actorType: "user", metadata: auditMetadata(projectId, updated.id, ["status"], updated.key) });
          return updated;
        });
        break;
      case "assumptions":
        item = await db.transaction(async (tx) => {
          const [updated] = await tx.update(projectAssumptions).set({ status: "replaced", resolvedAt: new Date() }).where(and(eq(projectAssumptions.id, itemId), eq(projectAssumptions.projectId, projectId))).returning();
          if (!updated) throw new ProjectApiError("NOT_FOUND", "Item not found.", 404);
          await tx.insert(auditEvents).values({ projectId, eventType: "assumption.archived", entityType: "assumption", entityId: updated.id, actorType: "user", metadata: auditMetadata(projectId, updated.id, ["status", "resolvedAt"], updated.statement) });
          return updated;
        });
        break;
      case "risks":
        item = await db.transaction(async (tx) => {
          const [updated] = await tx.update(projectRisks).set({ status: "closed", closedAt: new Date(), updatedAt: new Date() }).where(and(eq(projectRisks.id, itemId), eq(projectRisks.projectId, projectId))).returning();
          if (!updated) throw new ProjectApiError("NOT_FOUND", "Item not found.", 404);
          await tx.insert(auditEvents).values({ projectId, eventType: "risk.archived", entityType: "risk", entityId: updated.id, actorType: "user", metadata: auditMetadata(projectId, updated.id, ["status", "closedAt"], updated.title) });
          return updated;
        });
        break;
      case "evidence-requirements":
        item = await db.transaction(async (tx) => {
          const [updated] = await tx.update(evidenceRequirements).set({ status: "closed", resolvedAt: new Date() }).where(and(eq(evidenceRequirements.id, itemId), eq(evidenceRequirements.projectId, projectId))).returning();
          if (!updated) throw new ProjectApiError("NOT_FOUND", "Item not found.", 404);
          await tx.insert(auditEvents).values({ projectId, eventType: "evidence_requirement.archived", entityType: "evidence_requirement", entityId: updated.id, actorType: "user", metadata: auditMetadata(projectId, updated.id, ["status", "resolvedAt"], updated.title) });
          return updated;
        });
        break;
    }
    return NextResponse.json({ ok: true, item });
  } catch (error) {
    return projectApiErrorResponse(error);
  }
}
