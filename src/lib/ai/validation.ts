import type {
  ProjectOfficeMode,
  ProjectOfficeRequest,
  RiskLevel,
  SpecialistId,
  SpecialistResult,
  SupportedLanguage,
} from "./types";
import { ProjectOfficeError, SPECIALIST_IDS } from "./types";

const MODES = new Set<ProjectOfficeMode>(["single", "review-panel"]);
const LANGUAGES = new Set<SupportedLanguage>(["en", "tr", "ar"]);
const SPECIALISTS = new Set<string>(SPECIALIST_IDS);
const RISK_LEVELS = new Set<RiskLevel>(["low", "medium", "high", "critical"]);
const REQUEST_FIELDS = new Set([
  "projectId",
  "mode",
  "specialistId",
  "projectContext",
  "task",
  "evidence",
  "language",
]);
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const LIMITS = {
  projectContext: 20_000,
  task: 4_000,
  evidenceItem: 8_000,
  evidenceCount: 10,
  resultString: 20_000,
  resultList: 30,
} as const;

function invalid(message: string): never {
  throw new ProjectOfficeError("INVALID_REQUEST", message, 400);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requiredString(
  value: unknown,
  field: string,
  maxLength: number,
): string {
  if (typeof value !== "string") {
    invalid(`${field} must be a string.`);
  }

  const normalized = value.trim();
  if (!normalized) {
    invalid(`${field} is required.`);
  }
  if (normalized.length > maxLength) {
    invalid(`${field} exceeds the ${maxLength} character limit.`);
  }
  return normalized;
}

export function validateProjectOfficeRequest(value: unknown): ProjectOfficeRequest {
  if (!isRecord(value)) {
    invalid("Request body must be a JSON object.");
  }

  const unknownFields = Object.keys(value).filter((key) => !REQUEST_FIELDS.has(key));
  if (unknownFields.length > 0) {
    invalid(`Unknown request field: ${unknownFields[0]}.`);
  }

  if (typeof value.specialistId !== "string" || !SPECIALISTS.has(value.specialistId)) {
    invalid("specialistId is not supported.");
  }

  const mode = value.mode ?? "single";
  if (typeof mode !== "string" || !MODES.has(mode as ProjectOfficeMode)) {
    invalid("mode must be single or review-panel.");
  }

  const language = value.language ?? "en";
  if (typeof language !== "string" || !LANGUAGES.has(language as SupportedLanguage)) {
    invalid("language must be en, tr, or ar.");
  }

  const rawEvidence = value.evidence ?? [];
  if (!Array.isArray(rawEvidence)) {
    invalid("evidence must be an array of strings.");
  }
  if (rawEvidence.length > LIMITS.evidenceCount) {
    invalid(`evidence may contain at most ${LIMITS.evidenceCount} items.`);
  }

  const evidence = rawEvidence.map((item, index) =>
    requiredString(item, `evidence[${index}]`, LIMITS.evidenceItem),
  );

  if (typeof value.projectId !== "string" || !UUID_PATTERN.test(value.projectId)) {
    invalid("projectId must be a valid UUID.");
  }

  return {
    projectId: value.projectId,
    mode: mode as ProjectOfficeMode,
    specialistId: value.specialistId as SpecialistId,
    projectContext: requiredString(
      value.projectContext,
      "projectContext",
      LIMITS.projectContext,
    ),
    task: requiredString(value.task, "task", LIMITS.task),
    evidence,
    language: language as SupportedLanguage,
  };
}

function validateStringArray(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || value.length > LIMITS.resultList) {
    throw new ProjectOfficeError(
      "INVALID_STRUCTURED_OUTPUT",
      `The AI provider returned an invalid ${field} section.`,
      502,
    );
  }

  if (
    value.some(
      (item) =>
        typeof item !== "string" ||
        item.length === 0 ||
        item.length > LIMITS.resultString,
    )
  ) {
    throw new ProjectOfficeError(
      "INVALID_STRUCTURED_OUTPUT",
      `The AI provider returned an invalid ${field} section.`,
      502,
    );
  }

  return value;
}

export function validateSpecialistResult(value: unknown): SpecialistResult {
  if (!isRecord(value)) {
    throw new ProjectOfficeError(
      "INVALID_STRUCTURED_OUTPUT",
      "The AI provider returned an invalid structured response.",
      502,
    );
  }

  const expectedFields = [
    "summary",
    "analysis",
    "assumptions",
    "missingEvidence",
    "risks",
    "recommendations",
    "decisionRequired",
    "proposedNextActions",
  ];
  if (
    Object.keys(value).some((key) => !expectedFields.includes(key)) ||
    expectedFields.some(
      (key) =>
        !(key in value) &&
        ![
          "analysis",
          "assumptions",
          "missingEvidence",
          "risks",
          "recommendations",
          "proposedNextActions",
        ].includes(key),
    )
  ) {
    throw new ProjectOfficeError(
      "INVALID_STRUCTURED_OUTPUT",
      "The AI provider returned an unexpected response shape.",
      502,
    );
  }

  const decisionRequired =
    typeof value.decisionRequired === "string" &&
    ["true", "false"].includes(value.decisionRequired.trim().toLowerCase())
      ? value.decisionRequired.trim().toLowerCase() === "true"
      : value.decisionRequired;

  if (
    typeof value.summary !== "string" ||
    value.summary.trim().length === 0 ||
    value.summary.length > LIMITS.resultString ||
    typeof decisionRequired !== "boolean"
  ) {
    throw new ProjectOfficeError(
      "INVALID_STRUCTURED_OUTPUT",
      "The AI provider returned invalid result fields.",
      502,
    );
  }

  const rawRisks = value.risks ?? [];
  if (!Array.isArray(rawRisks) || rawRisks.length > LIMITS.resultList) {
    throw new ProjectOfficeError(
      "INVALID_STRUCTURED_OUTPUT",
      "The AI provider returned an invalid risks section.",
      502,
    );
  }

  const risks = rawRisks.map((risk) => {
    const normalizedLevel =
      isRecord(risk) && typeof risk.level === "string"
        ? risk.level.toLowerCase()
        : null;

    if (
      !isRecord(risk) ||
      Object.keys(risk).some((key) => !["level", "description"].includes(key)) ||
      !normalizedLevel ||
      !RISK_LEVELS.has(normalizedLevel as RiskLevel) ||
      typeof risk.description !== "string" ||
      risk.description.length === 0 ||
      risk.description.length > LIMITS.resultString
    ) {
      throw new ProjectOfficeError(
        "INVALID_STRUCTURED_OUTPUT",
        "The AI provider returned an invalid risk item.",
        502,
      );
    }

    return {
      level: normalizedLevel as RiskLevel,
      description: risk.description,
    };
  });

  return {
    summary: value.summary,
    analysis: validateStringArray(value.analysis ?? [], "analysis"),
    assumptions: validateStringArray(value.assumptions ?? [], "assumptions"),
    missingEvidence: validateStringArray(
      value.missingEvidence ?? [],
      "missingEvidence",
    ),
    risks,
    recommendations: validateStringArray(
      value.recommendations ?? [],
      "recommendations",
    ),
    decisionRequired,
    proposedNextActions: validateStringArray(
      value.proposedNextActions ?? [],
      "proposedNextActions",
    ),
  };
}

export const SPECIALIST_RESULT_JSON_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: [
    "summary",
    "analysis",
    "assumptions",
    "missingEvidence",
    "risks",
    "recommendations",
    "decisionRequired",
    "proposedNextActions",
  ],
  properties: {
    summary: { type: "string", minLength: 1 },
    analysis: { type: "array", items: { type: "string" }, maxItems: 30 },
    assumptions: { type: "array", items: { type: "string" }, maxItems: 30 },
    missingEvidence: { type: "array", items: { type: "string" }, maxItems: 30 },
    risks: {
      type: "array",
      maxItems: 30,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["level", "description"],
        properties: {
          level: { type: "string", enum: ["low", "medium", "high", "critical"] },
          description: { type: "string", minLength: 1 },
        },
      },
    },
    recommendations: { type: "array", items: { type: "string" }, maxItems: 30 },
    decisionRequired: { type: "boolean" },
    proposedNextActions: {
      type: "array",
      items: { type: "string" },
      maxItems: 30,
    },
  },
} as const;
