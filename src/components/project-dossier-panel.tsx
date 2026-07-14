"use client";

import {
  Archive,
  Building2,
  CheckCircle2,
  FilePlus2,
  FolderOpen,
  History,
  LoaderCircle,
  Pencil,
  Save,
  X,
} from "lucide-react";
import { type FormEvent, useCallback, useEffect, useRef, useState } from "react";

import {
  archiveProject,
  createProject,
  getProject,
  listProjects,
  listProjectAnalysisRuns,
  PROJECT_STATUS_OPTIONS,
  type ProjectInput,
  type AnalysisRunSummary,
  type ProjectRecord,
  updateProject,
} from "@/lib/projects/client";

type ProjectDossierPanelProps = {
  historyVersion: number;
  onActiveProjectChange: (project: ProjectRecord | null) => void;
};

const emptyForm: ProjectInput = {
  name: "",
  country: "",
  sector: "",
  clientOrganization: "",
  description: "",
  status: "draft",
};

const statusLabels = Object.fromEntries(PROJECT_STATUS_OPTIONS) as Record<string, string>;
const runStatusLabels: Record<AnalysisRunSummary["status"], string> = {
  pending: "Bekliyor",
  running: "Çalışıyor",
  completed: "Tamamlandı",
  failed: "Başarısız",
};
const languageLabels: Record<AnalysisRunSummary["language"], string> = {
  tr: "Türkçe",
  en: "English",
  ar: "العربية",
};
const specialistLabels: Record<string, string> = {
  "project-coordination": "Proje Koordinasyonu",
  "technical-review": "Teknik İnceleme",
  "project-management": "Proje Yönetimi / PMO",
  procurement: "Satın Alma",
  finance: "Finansman",
  "contract-compliance": "Sözleşme ve Uyum",
  "proposal-cost": "Teklif ve Maliyet",
  "commercial-intelligence": "Ticari İstihbarat",
  "independent-review": "Bağımsız İnceleme",
};
const fieldClassName =
  "min-h-11 w-full rounded-xl border border-white/10 bg-[#07100c] px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-[#52645a] focus:border-[#d9bd72]/45 focus:ring-2 focus:ring-[#d9bd72]/10 disabled:cursor-not-allowed disabled:opacity-60";

function sortByUpdatedAt(projects: ProjectRecord[]) {
  return [...projects].sort(
    (left, right) => Date.parse(right.updatedAt) - Date.parse(left.updatedAt),
  );
}

function formFromProject(project: ProjectRecord): ProjectInput {
  return {
    name: project.name,
    country: project.country ?? "",
    sector: project.sector ?? "",
    clientOrganization: project.clientOrganization ?? "",
    description: project.description ?? "",
    status: project.status === "archived" ? "draft" : project.status,
  };
}

function safeMessage(error: unknown) {
  return error instanceof Error ? error.message : "Beklenmeyen bir hata oluştu.";
}

export default function ProjectDossierPanel({
  historyVersion,
  onActiveProjectChange,
}: ProjectDossierPanelProps) {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<ProjectRecord | null>(null);
  const [mode, setMode] = useState<"view" | "create" | "edit">("view");
  const [form, setForm] = useState<ProjectInput>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [loadingProject, setLoadingProject] = useState(false);
  const [saving, setSaving] = useState(false);
  const [archiving, setArchiving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisRunSummary[]>([]);
  const [historyError, setHistoryError] = useState("");
  const selectionRequest = useRef(0);
  const historyRequest = useRef(0);

  const selectProject = useCallback(async (id: string) => {
    const requestId = ++selectionRequest.current;
    setActiveProjectId(id);
    setLoadingProject(true);
    setErrorMessage("");
    setFeedback("");
    setMode("view");

    try {
      const project = await getProject(id);
      if (selectionRequest.current !== requestId) return;
      setActiveProject(project);
      onActiveProjectChange(project);
    } catch (error) {
      if (selectionRequest.current !== requestId) return;
      setActiveProject(null);
      onActiveProjectChange(null);
      setErrorMessage(safeMessage(error));
    } finally {
      if (selectionRequest.current === requestId) setLoadingProject(false);
    }
  }, [onActiveProjectChange]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setErrorMessage("");
      try {
        const projectList = await listProjects();
        if (cancelled) return;
        setProjects(projectList);
        if (projectList[0]) {
          setActiveProject(projectList[0]);
          onActiveProjectChange(projectList[0]);
          void selectProject(projectList[0].id);
        } else {
          setActiveProjectId(null);
          setActiveProject(null);
          onActiveProjectChange(null);
        }
      } catch (error) {
        if (!cancelled) setErrorMessage(safeMessage(error));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
      selectionRequest.current += 1;
      historyRequest.current += 1;
    };
  }, [onActiveProjectChange, selectProject]);

  useEffect(() => {
    if (!activeProjectId) return;
    const projectId = activeProjectId;
    const requestId = ++historyRequest.current;

    async function loadHistory() {
      try {
        const runs = await listProjectAnalysisRuns(projectId);
        if (historyRequest.current !== requestId) return;
        setAnalysisHistory(runs);
        setHistoryError("");
      } catch (error) {
        if (historyRequest.current !== requestId) return;
        setAnalysisHistory([]);
        setHistoryError(safeMessage(error));
      }
    }

    void loadHistory();
    return () => {
      historyRequest.current += 1;
    };
  }, [activeProjectId, historyVersion]);

  const startCreate = () => {
    selectionRequest.current += 1;
    setForm(emptyForm);
    setMode("create");
    setErrorMessage("");
    setFeedback("");
  };

  const startEdit = () => {
    if (!activeProject) return;
    setForm(formFromProject(activeProject));
    setMode("edit");
    setErrorMessage("");
    setFeedback("");
  };

  const cancelForm = () => {
    setMode("view");
    setErrorMessage("");
    setForm(emptyForm);
  };

  const saveProject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (saving || archiving) return;
    if (!form.name.trim()) {
      setErrorMessage("Proje adı zorunludur.");
      return;
    }

    setSaving(true);
    setErrorMessage("");
    setFeedback("");
    try {
      const savedProject =
        mode === "edit" && activeProjectId
          ? await updateProject(activeProjectId, form)
          : await createProject(form);

      setProjects((current) =>
        sortByUpdatedAt([
          savedProject,
          ...current.filter((project) => project.id !== savedProject.id),
        ]),
      );
      setActiveProjectId(savedProject.id);
      setActiveProject(savedProject);
      onActiveProjectChange(savedProject);
      setMode("view");
      setForm(emptyForm);
      setFeedback(mode === "edit" ? "Proje güncellendi." : "Yeni proje oluşturuldu.");
    } catch (error) {
      setErrorMessage(safeMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const archiveActiveProject = async () => {
    if (!activeProject || archiving || saving) return;
    const confirmed = window.confirm(
      `“${activeProject.name}” projesini arşivlemek istediğinizden emin misiniz? Proje aktif listeden kaldırılacaktır.`,
    );
    if (!confirmed) return;

    setArchiving(true);
    setErrorMessage("");
    setFeedback("");
    try {
      await archiveProject(activeProject.id);
      selectionRequest.current += 1;
      const remainingProjects = projects.filter((project) => project.id !== activeProject.id);
      setProjects(remainingProjects);
      setMode("view");

      if (remainingProjects[0]) {
        setActiveProjectId(remainingProjects[0].id);
        setActiveProject(remainingProjects[0]);
        onActiveProjectChange(remainingProjects[0]);
        void selectProject(remainingProjects[0].id);
      } else {
        setActiveProjectId(null);
        setActiveProject(null);
        historyRequest.current += 1;
        setAnalysisHistory([]);
        setHistoryError("");
        onActiveProjectChange(null);
      }
      setFeedback("Proje arşivlendi.");
    } catch (error) {
      setErrorMessage(safeMessage(error));
    } finally {
      setArchiving(false);
    }
  };

  const busy = saving || archiving;

  return (
    <div aria-busy={loading || loadingProject || busy}>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-[#6d8074]">
            Yerel proje kaydı
          </div>
          <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">Proje Dosyası</h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#87998e]">
            Aktif projeleri yönetin, temel bilgileri güncelleyin ve tamamlanan kayıtları arşivleyin.
          </p>
        </div>
        <button
          type="button"
          onClick={startCreate}
          disabled={busy}
          className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-xl bg-[#e1c272] px-5 py-3 text-xs font-semibold text-[#09110d] transition hover:bg-[#ecd48d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e1c272] disabled:cursor-not-allowed disabled:opacity-55"
        >
          <FilePlus2 className="h-4 w-4" /> Yeni Proje
        </button>
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="mt-5 rounded-xl border border-[#d47d72]/18 bg-[#d47d72]/6 px-4 py-3 text-sm text-[#dfaaa3]"
        >
          {errorMessage}
        </div>
      )}
      {feedback && (
        <div
          aria-live="polite"
          className="mt-5 flex items-center gap-2 rounded-xl border border-[#74cba2]/18 bg-[#74cba2]/6 px-4 py-3 text-sm text-[#8bd9b8]"
        >
          <CheckCircle2 className="h-4 w-4" /> {feedback}
        </div>
      )}

      <div className="mt-7 grid min-w-0 gap-5 lg:grid-cols-[minmax(230px,.7fr)_minmax(0,1.3fr)]">
        <aside className="min-w-0 rounded-[24px] border border-white/8 bg-black/10 p-4 md:p-5">
          <div className="flex items-center justify-between gap-3 border-b border-white/8 pb-4">
            <div>
              <div className="text-sm font-semibold text-white">Aktif Projeler</div>
              <div className="mt-1 text-[10px] text-[#67796e]">Güncelleme tarihine göre sıralı</div>
            </div>
            <span className="rounded-full border border-white/8 px-2.5 py-1 text-[10px] text-[#819187]">
              {projects.length}
            </span>
          </div>

          {loading ? (
            <div className="flex min-h-44 items-center justify-center gap-2 text-xs text-[#718278]">
              <LoaderCircle className="h-4 w-4 animate-spin" /> Projeler yükleniyor…
            </div>
          ) : projects.length === 0 ? (
            <div className="flex min-h-44 flex-col items-center justify-center px-3 text-center">
              <FolderOpen className="h-6 w-6 text-[#65776b]" />
              <p className="mt-3 text-sm font-medium text-[#aebbb3]">Henüz aktif proje yok</p>
              <p className="mt-1 text-xs leading-5 text-[#65776b]">İlk proje kaydını oluşturabilirsiniz.</p>
            </div>
          ) : (
            <div className="mt-3 space-y-2">
              {projects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => void selectProject(project.id)}
                  aria-pressed={activeProjectId === project.id}
                  disabled={busy}
                  className={`min-h-16 w-full rounded-2xl border p-3.5 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9bd72] disabled:cursor-not-allowed disabled:opacity-60 ${
                    activeProjectId === project.id
                      ? "border-[#d9bd72]/30 bg-[#d9bd72]/7"
                      : "border-white/7 bg-white/[0.018] hover:border-white/14 hover:bg-white/[0.035]"
                  }`}
                >
                  <span className="block truncate text-sm font-medium text-white">{project.name}</span>
                  <span className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[10px] text-[#718278]">
                    <span>{statusLabels[project.status] ?? project.status}</span>
                    {project.country && <><span aria-hidden="true">·</span><span>{project.country}</span></>}
                  </span>
                </button>
              ))}
            </div>
          )}
        </aside>

        <div className="min-w-0 rounded-[24px] border border-white/8 bg-black/10 p-5 md:p-6">
          {mode === "create" || mode === "edit" ? (
            <form onSubmit={saveProject}>
              <div className="flex items-start justify-between gap-4 border-b border-white/8 pb-4">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#718278]">
                    {mode === "create" ? "Yeni kayıt" : "Kayıt düzenleme"}
                  </div>
                  <h4 className="mt-2 text-xl font-semibold text-white">
                    {mode === "create" ? "Yeni Proje" : "Proje Bilgilerini Güncelle"}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={cancelForm}
                  disabled={saving}
                  aria-label="Proje formunu kapat"
                  className="grid min-h-11 min-w-11 place-items-center rounded-xl border border-white/9 text-[#819187] hover:text-white disabled:opacity-50"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <label className="md:col-span-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#718278]">
                  Proje Adı
                  <input
                    required
                    maxLength={200}
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    disabled={saving}
                    className={`${fieldClassName} mt-2 normal-case tracking-normal`}
                  />
                </label>
                <label className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#718278]">
                  Ülke
                  <input
                    maxLength={120}
                    value={form.country}
                    onChange={(event) => setForm({ ...form, country: event.target.value })}
                    disabled={saving}
                    className={`${fieldClassName} mt-2 normal-case tracking-normal`}
                  />
                </label>
                <label className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#718278]">
                  Sektör
                  <input
                    maxLength={160}
                    value={form.sector}
                    onChange={(event) => setForm({ ...form, sector: event.target.value })}
                    disabled={saving}
                    className={`${fieldClassName} mt-2 normal-case tracking-normal`}
                  />
                </label>
                <label className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#718278]">
                  Müşteri / Kurum
                  <input
                    maxLength={200}
                    value={form.clientOrganization}
                    onChange={(event) =>
                      setForm({ ...form, clientOrganization: event.target.value })
                    }
                    disabled={saving}
                    className={`${fieldClassName} mt-2 normal-case tracking-normal`}
                  />
                </label>
                <label className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#718278]">
                  Durum
                  <select
                    value={form.status}
                    onChange={(event) =>
                      setForm({ ...form, status: event.target.value as ProjectInput["status"] })
                    }
                    disabled={saving}
                    className={`${fieldClassName} mt-2 normal-case tracking-normal`}
                  >
                    {PROJECT_STATUS_OPTIONS.map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </label>
                <label className="md:col-span-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#718278]">
                  Açıklama
                  <textarea
                    maxLength={5000}
                    rows={5}
                    value={form.description}
                    onChange={(event) => setForm({ ...form, description: event.target.value })}
                    disabled={saving}
                    className={`${fieldClassName} mt-2 min-h-32 resize-y normal-case tracking-normal`}
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={saving || !form.name.trim()}
                className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#e1c272] px-5 py-3 text-xs font-semibold text-[#09110d] transition hover:bg-[#ecd48d] disabled:cursor-not-allowed disabled:opacity-55"
              >
                {saving ? <><LoaderCircle className="h-4 w-4 animate-spin" /> Proje kaydediliyor…</> : <><Save className="h-4 w-4" /> {mode === "create" ? "Projeyi Oluştur" : "Değişiklikleri Kaydet"}</>}
              </button>
            </form>
          ) : loadingProject ? (
            <div className="flex min-h-96 items-center justify-center gap-2 text-sm text-[#718278]">
              <LoaderCircle className="h-5 w-5 animate-spin" /> Proje bilgileri yükleniyor…
            </div>
          ) : activeProject ? (
            <div>
              <div className="flex flex-col gap-4 border-b border-white/8 pb-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#76cba3]">Aktif proje</div>
                  <h4 className="mt-2 break-words text-xl font-semibold text-white md:text-2xl">{activeProject.name}</h4>
                  <span className="mt-3 inline-flex rounded-full border border-[#d9bd72]/18 bg-[#d9bd72]/7 px-3 py-1.5 text-[10px] font-medium text-[#dcc57f]">
                    {statusLabels[activeProject.status] ?? activeProject.status}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={startEdit}
                  disabled={busy}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-xs font-medium text-[#b5c1b9] hover:border-white/18 hover:text-white disabled:opacity-50"
                >
                  <Pencil className="h-4 w-4" /> Düzenle
                </button>
              </div>

              <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  ["Ülke", activeProject.country ?? "Belirtilmedi"],
                  ["Sektör", activeProject.sector ?? "Belirtilmedi"],
                  ["Müşteri / Kurum", activeProject.clientOrganization ?? "Belirtilmedi"],
                  ["Son Güncelleme", new Date(activeProject.updatedAt).toLocaleString("tr-TR")],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/7 bg-white/[0.018] p-4">
                    <dt className="text-[9px] uppercase tracking-[0.16em] text-[#65776b]">{label}</dt>
                    <dd className="mt-2 break-words text-sm text-[#b4c0b8]">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-3 rounded-2xl border border-white/7 bg-white/[0.018] p-4">
                <div className="text-[9px] uppercase tracking-[0.16em] text-[#65776b]">Açıklama</div>
                <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-[#b4c0b8]">
                  {activeProject.description ?? "Açıklama eklenmedi."}
                </p>
              </div>

              <div className="mt-5 rounded-2xl border border-white/7 bg-white/[0.018] p-4 md:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      <History className="h-4 w-4 text-[#d9bd72]" /> Analiz Geçmişi
                    </div>
                    <div className="mt-1 text-[10px] text-[#67796e]">En yeni çalışmalar önce gösterilir.</div>
                  </div>
                </div>

                {historyError ? (
                  <p role="alert" className="mt-4 text-xs leading-5 text-[#df9a91]">{historyError}</p>
                ) : analysisHistory.length === 0 ? (
                  <p className="mt-4 text-xs text-[#718278]">Bu proje için henüz kayıtlı analiz yok.</p>
                ) : (
                  <div className="mt-4 space-y-2.5">
                    {analysisHistory.map((run) => (
                      <div key={run.id} className="rounded-xl border border-white/7 bg-black/10 p-3.5">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <div className="text-xs font-medium text-[#b6c2ba]">
                              {run.mode === "review-panel" ? "İnceleme Kurulu" : (specialistLabels[run.specialist] ?? run.specialist)}
                            </div>
                            <p className="mt-1.5 line-clamp-2 break-words text-[11px] leading-5 text-[#718278]">
                              {run.requestSummary ?? "Görev özeti bulunmuyor."}
                            </p>
                          </div>
                          <span className={`self-start rounded-full border px-2.5 py-1 text-[9px] font-medium ${
                            run.status === "completed"
                              ? "border-[#74cba2]/18 bg-[#74cba2]/7 text-[#8bd9b8]"
                              : run.status === "failed"
                                ? "border-[#d47d72]/18 bg-[#d47d72]/7 text-[#df9a91]"
                                : "border-[#d9bd72]/18 bg-[#d9bd72]/7 text-[#dcc57f]"
                          }`}>
                            {runStatusLabels[run.status]}
                          </span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 border-t border-white/6 pt-2.5 text-[9px] text-[#5f7166]">
                          <span>{new Date(run.createdAt).toLocaleString("tr-TR")}</span>
                          <span>{languageLabels[run.language]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-5 flex flex-col gap-3 border-t border-white/8 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-xs text-[#65776b]">
                  <Building2 className="h-4 w-4" /> Kayıt yalnız yerel Project Dossier veritabanındadır.
                </div>
                <button
                  type="button"
                  onClick={() => void archiveActiveProject()}
                  disabled={busy}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#d47d72]/20 bg-[#d47d72]/6 px-4 py-2.5 text-xs font-medium text-[#df9a91] hover:bg-[#d47d72]/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {archiving ? <><LoaderCircle className="h-4 w-4 animate-spin" /> Proje arşivleniyor…</> : <><Archive className="h-4 w-4" /> Projeyi Arşivle</>}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex min-h-96 flex-col items-center justify-center px-4 text-center">
              <FolderOpen className="h-8 w-8 text-[#65776b]" />
              <h4 className="mt-4 text-lg font-semibold text-white">Henüz aktif proje yok</h4>
              <p className="mt-2 max-w-sm text-sm leading-6 text-[#718278]">Yeni proje oluşturarak Project Dossier kaydını başlatabilirsiniz.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
