"use client";

import { Archive, CheckCircle2, LoaderCircle, Pencil, Plus, Save, X } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";

import {
  archiveDossierItem,
  createDossierItem,
  listDossierItems,
  updateDossierItem,
  type DossierItem,
  type DossierModule,
} from "@/lib/projects/dossier-client";

type Field = {
  key: string;
  label: string;
  type: "text" | "textarea" | "select" | "number" | "date";
  required?: boolean;
  maxLength?: number;
  options?: readonly (readonly [string, string])[];
};

type ModuleConfig = {
  label: string;
  singular: string;
  description: string;
  fields: Field[];
  primaryField: string;
  summaryFields: string[];
  archiveable: boolean;
};

const factStatuses = [["proposed", "Önerildi"], ["approved", "Onaylandı"], ["disputed", "İhtilaflı"], ["superseded", "Geçersiz kılındı"]] as const;
const assumptionStatuses = [["active", "Aktif"], ["verified", "Doğrulandı"], ["rejected", "Reddedildi"], ["replaced", "Değiştirildi"]] as const;
const riskLevels = [["low", "Düşük"], ["medium", "Orta"], ["high", "Yüksek"], ["critical", "Kritik"]] as const;
const riskStatuses = [["open", "Açık"], ["monitoring", "İzleniyor"], ["mitigated", "Azaltıldı"], ["accepted", "Kabul edildi"], ["closed", "Kapalı"]] as const;
const evidenceStatuses = [["open", "Açık"], ["requested", "Talep edildi"], ["received", "Alındı"], ["verified", "Doğrulandı"], ["rejected", "Reddedildi"], ["closed", "Kapalı"]] as const;
const decisionStatuses = [["pending", "Bekliyor"], ["approved", "Onaylandı"], ["evidence_requested", "Kanıt istendi"], ["rejected", "Reddedildi"], ["deferred", "Ertelendi"]] as const;

const configs: Record<DossierModule, ModuleConfig> = {
  facts: {
    label: "Gerçekler",
    singular: "Gerçek",
    description: "Kaynaklandırılmış ve doğrulama durumu izlenen proje gerçekleri.",
    primaryField: "key",
    summaryFields: ["value", "category", "status", "source"],
    archiveable: true,
    fields: [
      { key: "category", label: "Kategori", type: "text", required: true, maxLength: 120 },
      { key: "key", label: "Başlık / Anahtar", type: "text", required: true, maxLength: 160 },
      { key: "value", label: "Değer / Açıklama", type: "textarea", required: true, maxLength: 5000 },
      { key: "unit", label: "Birim", type: "text", maxLength: 80 },
      { key: "status", label: "Doğrulama Durumu", type: "select", options: factStatuses },
      { key: "source", label: "Kaynak", type: "text", maxLength: 1000 },
      { key: "notes", label: "Notlar", type: "textarea", maxLength: 5000 },
    ],
  },
  assumptions: {
    label: "Varsayımlar",
    singular: "Varsayım",
    description: "Planlamada kullanılan ve henüz doğrulanmamış kabuller.",
    primaryField: "statement",
    summaryFields: ["status", "resolvedAt"],
    archiveable: true,
    fields: [
      { key: "statement", label: "Varsayım", type: "textarea", required: true, maxLength: 5000 },
      { key: "status", label: "Doğrulama Durumu", type: "select", options: assumptionStatuses },
    ],
  },
  risks: {
    label: "Riskler",
    singular: "Risk",
    description: "Olasılık, etki, sahiplik ve azaltma planıyla proje riskleri.",
    primaryField: "title",
    summaryFields: ["level", "probability", "impact", "owner", "status"],
    archiveable: true,
    fields: [
      { key: "title", label: "Risk Başlığı", type: "text", required: true, maxLength: 200 },
      { key: "description", label: "Risk Açıklaması", type: "textarea", required: true, maxLength: 5000 },
      { key: "category", label: "Kategori", type: "text", maxLength: 120 },
      { key: "level", label: "Seviye", type: "select", options: riskLevels },
      { key: "probability", label: "Olasılık (1-5)", type: "number" },
      { key: "impact", label: "Etki (1-5)", type: "number" },
      { key: "mitigation", label: "Azaltma Planı", type: "textarea", maxLength: 5000 },
      { key: "owner", label: "Sorumlu", type: "text", maxLength: 200 },
      { key: "status", label: "Durum", type: "select", options: riskStatuses },
    ],
  },
  "evidence-requirements": {
    label: "Kanıt Gereksinimleri",
    singular: "Kanıt Gereksinimi",
    description: "İddia, karar ve analizleri doğrulamak için gereken kanıtlar.",
    primaryField: "title",
    summaryFields: ["priority", "status", "responsibleParty", "dueDate"],
    archiveable: true,
    fields: [
      { key: "title", label: "Gereksinim", type: "text", required: true, maxLength: 200 },
      { key: "description", label: "İstenen Kanıt", type: "textarea", maxLength: 5000 },
      { key: "category", label: "Kategori", type: "text", maxLength: 120 },
      { key: "priority", label: "Öncelik", type: "select", options: riskLevels },
      { key: "status", label: "Durum", type: "select", options: evidenceStatuses },
      { key: "responsibleParty", label: "Sorumlu / Kaynak", type: "text", maxLength: 200 },
      { key: "dueDate", label: "Hedef Tarih", type: "date" },
    ],
  },
  "executive-decisions": {
    label: "Yönetici Kararları",
    singular: "Yönetici Kararı",
    description: "Yönetim kararları, gerekçeleri ve karar sahipleri.",
    primaryField: "title",
    summaryFields: ["decision", "decidedBy", "decidedAt"],
    archiveable: false,
    fields: [
      { key: "title", label: "Karar Başlığı", type: "text", required: true, maxLength: 200 },
      { key: "description", label: "Karar Açıklaması", type: "textarea", maxLength: 5000 },
      { key: "decision", label: "Karar Durumu", type: "select", options: decisionStatuses },
      { key: "rationale", label: "Gerekçe", type: "textarea", maxLength: 5000 },
      { key: "decidedBy", label: "Karar Sahibi", type: "text", maxLength: 200 },
      { key: "decidedAt", label: "Karar Tarihi", type: "date" },
    ],
  },
};

const fieldClassName = "min-h-11 w-full rounded-xl border border-white/10 bg-[#07100c] px-3.5 py-3 text-sm text-white outline-none transition focus:border-[#d9bd72]/45 focus:ring-2 focus:ring-[#d9bd72]/10 disabled:cursor-not-allowed disabled:opacity-60";

function emptyForm(config: ModuleConfig) {
  return Object.fromEntries(config.fields.map((field) => [field.key, field.options?.[0]?.[0] ?? ""]));
}

function formFromItem(config: ModuleConfig, item: DossierItem) {
  return Object.fromEntries(config.fields.map((field) => {
    const value = item[field.key];
    if (field.type === "date" && typeof value === "string") return [field.key, value.slice(0, 10)];
    return [field.key, value === null || value === undefined ? "" : String(value)];
  }));
}

function payloadFromForm(config: ModuleConfig, form: Record<string, string>) {
  return Object.fromEntries(config.fields.map((field) => {
    const value = form[field.key] ?? "";
    if (field.type === "number") return [field.key, value ? Number(value) : null];
    if (field.type === "date") return [field.key, value ? new Date(`${value}T00:00:00.000Z`).toISOString() : null];
    return [field.key, value];
  }));
}

function displayValue(config: ModuleConfig, fieldKey: string, value: unknown) {
  const field = config.fields.find((candidate) => candidate.key === fieldKey);
  if (value === null || value === undefined || value === "") return "Belirtilmedi";
  if (field?.options) return field.options.find(([key]) => key === value)?.[1] ?? String(value);
  if (field?.type === "date" || fieldKey.endsWith("At")) return new Date(String(value)).toLocaleDateString("tr-TR");
  return String(value);
}

export default function ProjectDossierModules({ projectId }: { projectId: string }) {
  const [module, setModule] = useState<DossierModule>("facts");
  const [items, setItems] = useState<DossierItem[]>([]);
  const [loadedKey, setLoadedKey] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, string>>(() => emptyForm(configs.facts));
  const [formOpen, setFormOpen] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [saving, setSaving] = useState(false);
  const requestId = useRef(0);
  const submitLocked = useRef(false);
  const config = configs[module];
  const currentKey = `${projectId}:${module}`;
  const loading = loadedKey !== currentKey;

  useEffect(() => {
    const activeRequest = ++requestId.current;
    async function load() {
      try {
        const records = await listDossierItems(projectId, module);
        if (requestId.current !== activeRequest) return;
        setItems(records);
        setError("");
        setLoadedKey(`${projectId}:${module}`);
      } catch (loadError) {
        if (requestId.current !== activeRequest) return;
        setItems([]);
        setError(loadError instanceof Error ? loadError.message : "Kayıtlar yüklenemedi.");
        setLoadedKey(`${projectId}:${module}`);
      }
    }
    void load();
    return () => { requestId.current += 1; };
  }, [module, projectId]);

  const selectModule = (nextModule: DossierModule) => {
    setModule(nextModule);
    setForm(emptyForm(configs[nextModule]));
    setFormOpen(false);
    setEditingId(null);
    setError("");
    setFeedback("");
  };

  const startCreate = () => {
    setForm(emptyForm(config));
    setEditingId(null);
    setFormOpen(true);
    setError("");
    setFeedback("");
  };

  const startEdit = (item: DossierItem) => {
    setForm(formFromItem(config, item));
    setEditingId(item.id);
    setFormOpen(true);
    setError("");
    setFeedback("");
  };

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitLocked.current) return;
    submitLocked.current = true;
    setSaving(true);
    setError("");
    setFeedback("");
    try {
      const payload = payloadFromForm(config, form);
      const saved = editingId
        ? await updateDossierItem(projectId, module, editingId, payload)
        : await createDossierItem(projectId, module, payload);
      setItems((current) => [saved, ...current.filter((item) => item.id !== saved.id)]);
      setFormOpen(false);
      setEditingId(null);
      setFeedback(editingId ? "Kayıt güncellendi." : "Yeni kayıt oluşturuldu.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Kayıt tamamlanamadı.");
    } finally {
      submitLocked.current = false;
      setSaving(false);
    }
  };

  const archive = async (item: DossierItem) => {
    if (!config.archiveable || submitLocked.current) return;
    if (!window.confirm("Bu kaydı güvenli terminal duruma taşımak istiyor musunuz?")) return;
    submitLocked.current = true;
    setSaving(true);
    setError("");
    setFeedback("");
    try {
      const archived = await archiveDossierItem(
        projectId,
        module as Exclude<DossierModule, "executive-decisions">,
        item.id,
      );
      setItems((current) => [archived, ...current.filter((record) => record.id !== archived.id)]);
      setFeedback("Kayıt veri kaybı olmadan terminal duruma taşındı.");
    } catch (archiveError) {
      setError(archiveError instanceof Error ? archiveError.message : "Kayıt güncellenemedi.");
    } finally {
      submitLocked.current = false;
      setSaving(false);
    }
  };

  return (
    <section className="mt-5 rounded-2xl border border-white/7 bg-white/[0.018] p-4 md:p-5" aria-busy={loading || saving}>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5" role="tablist" aria-label="Proje dosyası modülleri">
        {(Object.keys(configs) as DossierModule[]).map((key) => (
          <button key={key} type="button" role="tab" aria-selected={module === key} onClick={() => selectModule(key)} className={`min-h-11 rounded-xl border px-3 py-2 text-[10px] font-medium transition ${module === key ? "border-[#d9bd72]/35 bg-[#d9bd72]/9 text-[#e7cf88]" : "border-white/8 bg-black/10 text-[#819187] hover:border-white/15 hover:text-white"}`}>
            {configs[key].label}
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h5 className="text-base font-semibold text-white">{config.label}</h5>
          <p className="mt-1 text-xs leading-5 text-[#718278]">{config.description}</p>
        </div>
        <button type="button" onClick={startCreate} disabled={saving} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#e1c272] px-4 py-2.5 text-xs font-semibold text-[#09110d] disabled:opacity-55">
          <Plus className="h-4 w-4" /> Yeni {config.singular}
        </button>
      </div>

      {error && <p role="alert" className="mt-4 rounded-xl border border-[#d47d72]/18 bg-[#d47d72]/6 px-4 py-3 text-xs text-[#dfaaa3]">{error}</p>}
      {feedback && <p aria-live="polite" className="mt-4 flex items-center gap-2 rounded-xl border border-[#74cba2]/18 bg-[#74cba2]/6 px-4 py-3 text-xs text-[#8bd9b8]"><CheckCircle2 className="h-4 w-4" /> {feedback}</p>}

      {formOpen && (
        <form onSubmit={save} className="mt-5 rounded-2xl border border-white/8 bg-black/10 p-4">
          <div className="flex items-center justify-between gap-3">
            <h6 className="text-sm font-semibold text-white">{editingId ? `${config.singular} Düzenle` : `Yeni ${config.singular}`}</h6>
            <button type="button" aria-label="Kayıt formunu kapat" onClick={() => setFormOpen(false)} disabled={saving} className="grid min-h-11 min-w-11 place-items-center rounded-xl border border-white/9 text-[#819187]"><X className="h-4 w-4" /></button>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {config.fields.map((field) => (
              <label key={field.key} className={`${field.type === "textarea" ? "md:col-span-2" : ""} text-[10px] font-semibold uppercase tracking-[0.14em] text-[#718278]`}>
                {field.label}
                {field.type === "textarea" ? (
                  <textarea required={field.required} maxLength={field.maxLength} rows={4} value={form[field.key] ?? ""} onChange={(event) => setForm({ ...form, [field.key]: event.target.value })} disabled={saving} className={`${fieldClassName} mt-2 min-h-28 resize-y normal-case tracking-normal`} />
                ) : field.type === "select" ? (
                  <select value={form[field.key] ?? ""} onChange={(event) => setForm({ ...form, [field.key]: event.target.value })} disabled={saving} className={`${fieldClassName} mt-2 normal-case tracking-normal`}>
                    {field.options?.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  </select>
                ) : (
                  <input type={field.type} required={field.required} min={field.type === "number" ? 1 : undefined} max={field.type === "number" ? 5 : undefined} maxLength={field.maxLength} value={form[field.key] ?? ""} onChange={(event) => setForm({ ...form, [field.key]: event.target.value })} disabled={saving} className={`${fieldClassName} mt-2 normal-case tracking-normal`} />
                )}
              </label>
            ))}
          </div>
          <button type="submit" disabled={saving} className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#e1c272] px-4 py-2.5 text-xs font-semibold text-[#09110d] disabled:opacity-55">
            {saving ? <><LoaderCircle className="h-4 w-4 animate-spin" /> Kaydediliyor…</> : <><Save className="h-4 w-4" /> Kaydet</>}
          </button>
        </form>
      )}

      <div className="mt-5">
        {loading ? (
          <div className="flex min-h-28 items-center justify-center gap-2 text-xs text-[#718278]"><LoaderCircle className="h-4 w-4 animate-spin" /> Kayıtlar yükleniyor…</div>
        ) : items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/9 px-4 py-8 text-center text-xs text-[#718278]">Bu modülde henüz kayıt yok.</div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <article key={item.id} className="rounded-xl border border-white/7 bg-black/10 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h6 className="break-words text-sm font-semibold text-white">{displayValue(config, config.primaryField, item[config.primaryField])}</h6>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {config.summaryFields.map((field) => <span key={field} className="max-w-full break-words rounded-full border border-white/8 px-2.5 py-1 text-[9px] text-[#819187]">{config.fields.find((candidate) => candidate.key === field)?.label ?? field}: {displayValue(config, field, item[field])}</span>)}
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button type="button" onClick={() => startEdit(item)} disabled={saving} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/9 px-3 text-xs text-[#aebbb3] disabled:opacity-50"><Pencil className="h-3.5 w-3.5" /> Düzenle</button>
                    {config.archiveable && <button type="button" onClick={() => void archive(item)} disabled={saving} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#d47d72]/18 px-3 text-xs text-[#df9a91] disabled:opacity-50"><Archive className="h-3.5 w-3.5" /> Kapat</button>}
                  </div>
                </div>
                <div className="mt-3 border-t border-white/6 pt-2 text-[9px] text-[#5f7166]">Oluşturma: {new Date(item.createdAt).toLocaleString("tr-TR")}</div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
