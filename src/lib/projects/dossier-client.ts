"use client";

export type DossierModule =
  | "facts"
  | "assumptions"
  | "risks"
  | "evidence-requirements"
  | "executive-decisions";

export type DossierItem = Record<string, unknown> & {
  id: string;
  projectId: string;
  createdAt: string;
};

const safeErrors: Record<string, string> = {
  VALIDATION_ERROR: "Kayıt alanlarını kontrol edin.",
  NOT_FOUND: "Kayıt bulunamadı veya bu projeye ait değil.",
  PROJECT_ARCHIVED: "Arşivlenmiş projeler değiştirilemez.",
  METHOD_NOT_SUPPORTED: "Bu kayıt türü mevcut şemada güvenli biçimde kaldırılamaz.",
  DATABASE_UNAVAILABLE: "Yerel proje veritabanına ulaşılamıyor.",
  DATABASE_ERROR: "Kayıt işlenirken bir veritabanı hatası oluştu.",
  INTERNAL_ERROR: "Beklenmeyen bir hata oluştu.",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isDossierItem(value: unknown): value is DossierItem {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.projectId === "string" &&
    typeof value.createdAt === "string"
  );
}

function safeError(value: unknown) {
  if (isRecord(value) && isRecord(value.error) && typeof value.error.code === "string") {
    return safeErrors[value.error.code] ?? safeErrors.INTERNAL_ERROR;
  }
  return safeErrors.INTERNAL_ERROR;
}

async function request(path: string, init?: RequestInit) {
  const response = await fetch(path, {
    ...init,
    headers: init?.body ? { "Content-Type": "application/json" } : undefined,
  });
  const payload: unknown = await response.json().catch(() => null);
  if (!response.ok || !isRecord(payload) || payload.ok !== true) {
    throw new Error(safeError(payload));
  }
  return payload;
}

function modulePath(projectId: string, module: DossierModule, itemId?: string) {
  const base = `/api/projects/${encodeURIComponent(projectId)}/${module}`;
  return itemId ? `${base}/${encodeURIComponent(itemId)}` : base;
}

export async function listDossierItems(projectId: string, module: DossierModule) {
  const payload = await request(modulePath(projectId, module));
  if (!Array.isArray(payload.items) || !payload.items.every(isDossierItem)) {
    throw new Error(safeErrors.INTERNAL_ERROR);
  }
  return payload.items;
}

export async function createDossierItem(
  projectId: string,
  module: DossierModule,
  input: Record<string, unknown>,
) {
  const payload = await request(modulePath(projectId, module), {
    method: "POST",
    body: JSON.stringify(input),
  });
  if (!isDossierItem(payload.item)) throw new Error(safeErrors.INTERNAL_ERROR);
  return payload.item;
}

export async function updateDossierItem(
  projectId: string,
  module: DossierModule,
  itemId: string,
  input: Record<string, unknown>,
) {
  const payload = await request(modulePath(projectId, module, itemId), {
    method: "PATCH",
    body: JSON.stringify(input),
  });
  if (!isDossierItem(payload.item)) throw new Error(safeErrors.INTERNAL_ERROR);
  return payload.item;
}

export async function archiveDossierItem(
  projectId: string,
  module: Exclude<DossierModule, "executive-decisions">,
  itemId: string,
) {
  const payload = await request(modulePath(projectId, module, itemId), {
    method: "DELETE",
  });
  if (!isDossierItem(payload.item)) throw new Error(safeErrors.INTERNAL_ERROR);
  return payload.item;
}
