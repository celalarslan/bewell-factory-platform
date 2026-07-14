export const PROJECT_STATUS_OPTIONS = [
  ["draft", "Taslak"],
  ["qualification", "Ön Değerlendirme"],
  ["feasibility", "Fizibilite"],
  ["structuring", "Yapılandırma"],
  ["approved", "Onaylandı"],
  ["implementation", "Uygulama"],
  ["operational", "Operasyonel"],
  ["on_hold", "Beklemede"],
] as const;

export type WritableProjectStatus = (typeof PROJECT_STATUS_OPTIONS)[number][0];
export type ProjectStatus = WritableProjectStatus | "archived";

export type ProjectRecord = {
  id: string;
  code: string | null;
  name: string;
  country: string | null;
  sector: string | null;
  clientOrganization: string | null;
  description: string | null;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
  archivedAt: string | null;
};

export type ProjectInput = {
  name: string;
  country: string;
  sector: string;
  clientOrganization: string;
  description: string;
  status: WritableProjectStatus;
};

const errorMessages: Record<string, string> = {
  VALIDATION_ERROR: "Proje bilgilerini kontrol edin.",
  NOT_FOUND: "Proje bulunamadı veya artık mevcut değil.",
  DATABASE_UNAVAILABLE: "Yerel proje veritabanına ulaşılamıyor.",
  DATABASE_ERROR: "Proje bilgileri işlenirken bir veritabanı hatası oluştu.",
  INTERNAL_ERROR: "Beklenmeyen bir hata oluştu.",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isProjectRecord(value: unknown): value is ProjectRecord {
  if (!isRecord(value)) return false;
  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.status === "string" &&
    typeof value.createdAt === "string" &&
    typeof value.updatedAt === "string"
  );
}

function safeErrorMessage(value: unknown) {
  if (isRecord(value) && isRecord(value.error) && typeof value.error.code === "string") {
    return errorMessages[value.error.code] ?? errorMessages.INTERNAL_ERROR;
  }
  return errorMessages.INTERNAL_ERROR;
}

async function projectRequest(path: string, init?: RequestInit) {
  let response: Response;
  try {
    response = await fetch(path, { ...init, cache: "no-store" });
  } catch {
    throw new Error("Yerel proje servisine ulaşılamıyor.");
  }

  const payload: unknown = await response.json().catch(() => null);
  if (!response.ok || !isRecord(payload) || payload.ok !== true) {
    throw new Error(safeErrorMessage(payload));
  }
  return payload;
}

function jsonRequest(method: "POST" | "PATCH", body: ProjectInput) {
  return {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

export async function listProjects() {
  const payload = await projectRequest("/api/projects");
  if (!Array.isArray(payload.projects) || !payload.projects.every(isProjectRecord)) {
    throw new Error(errorMessages.INTERNAL_ERROR);
  }
  return payload.projects;
}

export async function getProject(id: string) {
  const payload = await projectRequest(`/api/projects/${encodeURIComponent(id)}`);
  if (!isProjectRecord(payload.project)) throw new Error(errorMessages.INTERNAL_ERROR);
  return payload.project;
}

export async function createProject(input: ProjectInput) {
  const payload = await projectRequest("/api/projects", jsonRequest("POST", input));
  if (!isProjectRecord(payload.project)) throw new Error(errorMessages.INTERNAL_ERROR);
  return payload.project;
}

export async function updateProject(id: string, input: ProjectInput) {
  const payload = await projectRequest(
    `/api/projects/${encodeURIComponent(id)}`,
    jsonRequest("PATCH", input),
  );
  if (!isProjectRecord(payload.project)) throw new Error(errorMessages.INTERNAL_ERROR);
  return payload.project;
}

export async function archiveProject(id: string) {
  const payload = await projectRequest(`/api/projects/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  if (!isProjectRecord(payload.project)) throw new Error(errorMessages.INTERNAL_ERROR);
  return payload.project;
}
