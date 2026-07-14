import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

import type {
  analysisRuns,
  auditEvents,
  evidenceRequirements,
  executiveDecisions,
  projectAssumptions,
  projectFacts,
  projectRisks,
  projects,
} from "./schema";

export type Project = InferSelectModel<typeof projects>;
export type NewProject = InferInsertModel<typeof projects>;
export type ProjectFact = InferSelectModel<typeof projectFacts>;
export type NewProjectFact = InferInsertModel<typeof projectFacts>;
export type ProjectAssumption = InferSelectModel<typeof projectAssumptions>;
export type NewProjectAssumption = InferInsertModel<typeof projectAssumptions>;
export type EvidenceRequirement = InferSelectModel<typeof evidenceRequirements>;
export type NewEvidenceRequirement = InferInsertModel<typeof evidenceRequirements>;
export type ProjectRisk = InferSelectModel<typeof projectRisks>;
export type NewProjectRisk = InferInsertModel<typeof projectRisks>;
export type ExecutiveDecision = InferSelectModel<typeof executiveDecisions>;
export type NewExecutiveDecision = InferInsertModel<typeof executiveDecisions>;
export type AnalysisRun = InferSelectModel<typeof analysisRuns>;
export type NewAnalysisRun = InferInsertModel<typeof analysisRuns>;
export type AuditEvent = InferSelectModel<typeof auditEvents>;
export type NewAuditEvent = InferInsertModel<typeof auditEvents>;
