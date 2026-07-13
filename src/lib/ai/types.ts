export const SPECIALIST_IDS = [
  "project-coordination",
  "technical-review",
  "project-management",
  "procurement",
  "finance",
  "contract-compliance",
  "proposal-cost",
  "commercial-intelligence",
  "independent-review",
] as const;

export type SpecialistId = (typeof SPECIALIST_IDS)[number];
export type ProjectOfficeMode = "single" | "review-panel";
export type SupportedLanguage = "en" | "tr" | "ar";
export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface SpecialistDefinition {
  id: SpecialistId;
  displayName: string;
  purpose: string;
  responsibilities: readonly string[];
  systemInstructions: string;
  outputSections: readonly string[];
  prohibitedActions: readonly string[];
}

export interface ProjectOfficeRequest {
  mode: ProjectOfficeMode;
  specialistId: SpecialistId;
  projectContext: string;
  task: string;
  evidence: string[];
  language: SupportedLanguage;
}

export interface SpecialistRisk {
  level: RiskLevel;
  description: string;
}

export interface SpecialistResult {
  summary: string;
  analysis: string[];
  assumptions: string[];
  missingEvidence: string[];
  risks: SpecialistRisk[];
  recommendations: string[];
  decisionRequired: boolean;
  proposedNextActions: string[];
}

export type ProjectOfficeErrorCode =
  | "INVALID_REQUEST"
  | "INVALID_ORIGIN"
  | "NOT_FOUND"
  | "PAYLOAD_TOO_LARGE"
  | "SERVER_CONFIGURATION_ERROR"
  | "RATE_LIMITED"
  | "PROVIDER_TIMEOUT"
  | "PROVIDER_ERROR"
  | "INVALID_PROVIDER_RESPONSE"
  | "INTERNAL_ERROR";

export class ProjectOfficeError extends Error {
  constructor(
    public readonly code: ProjectOfficeErrorCode,
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ProjectOfficeError";
  }
}
