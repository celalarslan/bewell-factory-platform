import {
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const projectStatusEnum = pgEnum("project_status", [
  "draft",
  "qualification",
  "feasibility",
  "structuring",
  "approved",
  "implementation",
  "operational",
  "on_hold",
  "archived",
]);

export const projectFactStatusEnum = pgEnum("project_fact_status", [
  "proposed",
  "approved",
  "disputed",
  "superseded",
]);

export const projectAssumptionStatusEnum = pgEnum(
  "project_assumption_status",
  ["active", "verified", "rejected", "replaced"],
);

export const evidencePriorityEnum = pgEnum("evidence_priority", [
  "low",
  "medium",
  "high",
  "critical",
]);

export const evidenceStatusEnum = pgEnum("evidence_status", [
  "open",
  "requested",
  "received",
  "verified",
  "rejected",
  "closed",
]);

export const projectRiskLevelEnum = pgEnum("project_risk_level", [
  "low",
  "medium",
  "high",
  "critical",
]);

export const projectRiskStatusEnum = pgEnum("project_risk_status", [
  "open",
  "monitoring",
  "mitigated",
  "accepted",
  "closed",
]);

export const executiveDecisionEnum = pgEnum("executive_decision", [
  "pending",
  "approved",
  "evidence_requested",
  "rejected",
  "deferred",
]);

export const analysisModeEnum = pgEnum("analysis_mode", [
  "single",
  "review_panel",
]);

export const analysisLanguageEnum = pgEnum("analysis_language", [
  "tr",
  "en",
  "ar",
]);

export const analysisStatusEnum = pgEnum("analysis_status", [
  "pending",
  "running",
  "completed",
  "failed",
]);

export const auditActorTypeEnum = pgEnum("audit_actor_type", [
  "user",
  "specialist",
  "system",
]);

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  code: text("code").unique(),
  name: text("name").notNull(),
  country: text("country"),
  sector: text("sector"),
  clientOrganization: text("client_organization"),
  description: text("description"),
  status: projectStatusEnum("status").default("draft").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  archivedAt: timestamp("archived_at", { withTimezone: true }),
});

export const projectFacts = pgTable(
  "project_facts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "restrict" }),
    category: text("category").notNull(),
    key: text("key").notNull(),
    value: text("value").notNull(),
    unit: text("unit"),
    status: projectFactStatusEnum("status").default("proposed").notNull(),
    source: text("source"),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [index("project_facts_project_key_idx").on(table.projectId, table.key)],
);

export const projectAssumptions = pgTable(
  "project_assumptions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "restrict" }),
    statement: text("statement").notNull(),
    status: projectAssumptionStatusEnum("status").default("active").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    resolvedAt: timestamp("resolved_at", { withTimezone: true }),
  },
  (table) => [index("project_assumptions_project_idx").on(table.projectId)],
);

export const evidenceRequirements = pgTable(
  "evidence_requirements",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "restrict" }),
    title: text("title").notNull(),
    description: text("description"),
    category: text("category"),
    priority: evidencePriorityEnum("priority").default("medium").notNull(),
    status: evidenceStatusEnum("status").default("open").notNull(),
    responsibleParty: text("responsible_party"),
    dueDate: timestamp("due_date", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    resolvedAt: timestamp("resolved_at", { withTimezone: true }),
  },
  (table) => [index("evidence_requirements_project_idx").on(table.projectId)],
);

export const projectRisks = pgTable(
  "project_risks",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "restrict" }),
    title: text("title").notNull(),
    description: text("description").notNull(),
    category: text("category"),
    level: projectRiskLevelEnum("level").default("medium").notNull(),
    // Non-null probability and impact values are validated as integers from 1 to 5 at the API boundary.
    probability: integer("probability"),
    impact: integer("impact"),
    mitigation: text("mitigation"),
    owner: text("owner"),
    status: projectRiskStatusEnum("status").default("open").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
    closedAt: timestamp("closed_at", { withTimezone: true }),
  },
  (table) => [index("project_risks_project_idx").on(table.projectId)],
);

export const executiveDecisions = pgTable(
  "executive_decisions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "restrict" }),
    title: text("title").notNull(),
    description: text("description"),
    decision: executiveDecisionEnum("decision").default("pending").notNull(),
    rationale: text("rationale"),
    decidedBy: text("decided_by"),
    decidedAt: timestamp("decided_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [index("executive_decisions_project_idx").on(table.projectId)],
);

export const analysisRuns = pgTable(
  "analysis_runs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id").references(() => projects.id, {
      onDelete: "restrict",
    }),
    specialistId: text("specialist_id").notNull(),
    mode: analysisModeEnum("mode").notNull(),
    language: analysisLanguageEnum("language").notNull(),
    task: text("task").notNull(),
    projectContext: text("project_context").notNull(),
    status: analysisStatusEnum("status").default("pending").notNull(),
    summary: text("summary"),
    resultJson: jsonb("result_json").$type<Record<string, unknown>>(),
    errorCode: text("error_code"),
    durationMs: integer("duration_ms"),
    model: text("model"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
  },
  (table) => [index("analysis_runs_project_idx").on(table.projectId)],
);

// Audit events are append-only by convention. No delete API is provided for this table.
export const auditEvents = pgTable(
  "audit_events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id").references(() => projects.id, {
      onDelete: "restrict",
    }),
    eventType: text("event_type").notNull(),
    entityType: text("entity_type").notNull(),
    entityId: uuid("entity_id"),
    actorType: auditActorTypeEnum("actor_type").notNull(),
    actorId: text("actor_id"),
    metadata: jsonb("metadata").$type<Record<string, unknown>>(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [index("audit_events_project_idx").on(table.projectId)],
);
