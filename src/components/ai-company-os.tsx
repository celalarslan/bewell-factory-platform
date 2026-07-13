"use client";

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Calculator,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Clock3,
  Database,
  Eye,
  FileSearch,
  Gauge,
  HandCoins,
  LoaderCircle,
  Network,
  Play,
  Scale,
  SearchCheck,
  Settings2,
  ShieldAlert,
  Target,
  UserRoundCheck,
  Workflow,
  X,
  XCircle,
} from "lucide-react";
import { type FormEvent, useMemo, useRef, useState } from "react";
import type {
  ProjectOfficeMode,
  SpecialistId,
  SpecialistResult,
  SupportedLanguage,
} from "@/lib/ai/types";

type Agent = {
  id: string;
  name: string;
  role: string;
  icon: typeof Bot;
  status: "active" | "review" | "waiting";
  confidence: number;
  task: string;
  output: string;
  authority: string;
  blocked: string;
  specialty: string[];
};

type Decision = {
  id: string;
  title: string;
  project: string;
  recommendation: string;
  reason: string;
  risk: string;
  value: string;
  status: "pending" | "approved" | "rejected" | "info";
};

const agents: Agent[] = [
  {
    id: "chief",
    name: "Proje Koordinasyonu",
    role: "Koordinasyon Birimi",
    icon: BrainCircuit,
    status: "active",
    confidence: 93,
    task: "Sudan Yem Merkezi karar dosyasını birleştiriyor",
    output: "Yönetici karar özeti",
    authority: "Görev dağıtmak ve karar kartları hazırlamak",
    blocked: "Taahhütleri onaylayamaz veya müşterilerle iletişim kuramaz",
    specialty: ["Görev yönlendirme", "Çelişki tespiti", "Yönetici sentezi"],
  },
  {
    id: "technical",
    name: "Teknik İnceleme",
    role: "Teknik İnceleme Birimi",
    icon: Settings2,
    status: "active",
    confidence: 86,
    task: "10 t/sa yem hattı tesis yüklerini doğruluyor",
    output: "Proses esası ve teknik şartname",
    authority: "Mühendislik taslakları ve veri talepleri hazırlamak",
    blocked: "İmzalı mühendislik belgeleri yayımlayamaz",
    specialty: ["Proses tasarımı", "Kapasite", "Tesisatlar ve yerleşim"],
  },
  {
    id: "pmo",
    name: "Proje Yönetimi / PMO",
    role: "Proje Yönetim Birimi",
    icon: Workflow,
    status: "active",
    confidence: 91,
    task: "Aşama 3 kilometre taşı bağımlılıklarını yeniden kuruyor",
    output: "Takvim, risk kaydı ve eylem planı",
    authority: "Görev açmak ve takvim sapmalarını işaretlemek",
    blocked: "Sözleşme tarihlerini haricen değiştiremez",
    specialty: ["İş kırılım yapısı", "Kilometre taşları", "Risk ve bağımlılıklar"],
  },
  {
    id: "procurement",
    name: "Satın Alma ve Tedarikçi Değerlendirmesi",
    role: "Satın Alma Birimi",
    icon: SearchCheck,
    status: "review",
    confidence: 82,
    task: "Dört silo ve taşıma teklifini standartlaştırıyor",
    output: "Tedarikçi karşılaştırması ve kısa liste",
    authority: "Onaylı tedarikçi havuzu için teklif talepleri hazırlamak",
    blocked: "Sipariş veremez veya müşteri kimliğini açıklayamaz",
    specialty: ["Tedarikçi araştırması", "Teklif talebi", "Ticari karşılaştırma"],
  },
  {
    id: "finance",
    name: "Finansman ve Yatırım Yapılandırması",
    role: "Yatırım Birimi",
    icon: HandCoins,
    status: "waiting",
    confidence: 74,
    task: "Sponsor özkaynak kanıtını bekliyor",
    output: "Üç senaryolu finansal model",
    authority: "Borç, özkaynak, YİD ve alım garantisi seçeneklerini modellemek",
    blocked: "Finansman taahhüt edemez veya garantileri onaylayamaz",
    specialty: ["Nakit akışı", "Finanse edilebilirlik", "İşlem yapıları"],
  },
  {
    id: "legal",
    name: "Sözleşme ve Uyum İncelemesi",
    role: "Hukuki Risk Birimi",
    icon: Scale,
    status: "review",
    confidence: 88,
    task: "Geliştirme yetkisi korumalarını inceliyor",
    output: "Madde riskleri ve uyum kontrol listesi",
    authority: "Dahili belgeleri hazırlamak ve revize etmek",
    blocked: "Nihai hukuki onay veremez",
    specialty: ["Sözleşmeler", "Yaptırım taraması", "Proje koruması"],
  },
  {
    id: "cost",
    name: "Teklif ve Maliyet Mühendisliği",
    role: "Maliyet Mühendisliği Birimi",
    icon: Calculator,
    status: "active",
    confidence: 84,
    task: "Lojistik ve kurulum kapsam boşluklarını kapatıyor",
    output: "Metraj, istisnalar ve hedef fiyat",
    authority: "Dahili maliyet ve teklif taslakları hazırlamak",
    blocked: "Bağlayıcı ticari teklif yayımlayamaz",
    specialty: ["Metraj", "Maliyet oluşturma", "Kapsam boşluğu analizi"],
  },
  {
    id: "crm",
    name: "Ticari İstihbarat ve CRM",
    role: "Ticari İstihbarat Birimi",
    icon: Database,
    status: "active",
    confidence: 96,
    task: "Altı yeni fırsat başvurusunu nitelendiriyor",
    output: "Temiz proje kayıtları ve günlük özet",
    authority: "CRM'i güncellemek ve eksik dahili verileri istemek",
    blocked: "Onay olmadan harici mesaj gönderemez",
    specialty: ["CRM", "Proje hafızası", "Doküman kontrolü"],
  },
  {
    id: "redteam",
    name: "Bağımsız İnceleme",
    role: "Bağımsız İnceleme Birimi",
    icon: ShieldAlert,
    status: "review",
    confidence: 90,
    task: "Olumsuz senaryo varsayımlarını ve gizli istisnaları test ediyor",
    output: "Çelişkiler, başarısızlık durumları ve durdurma koşulları",
    authority: "Her uzman çıktısını bağımsız olarak sorgulamak",
    blocked: "Özgün analizi değiştiremez veya işi onaylayamaz",
    specialty: ["Karşıt inceleme", "Kanıt denetimi", "Başarısızlık testi"],
  },
];

const initialDecisions: Decision[] = [
  {
    id: "DEC-0217",
    title: "Ücretli ön fizibiliteye geçiş",
    project: "Sudan Yem Endüstrileri",
    recommendation: "Koşullu onay",
    reason: "Arazi ve hammadde yolu güvenilir; sponsor finansman kanıtı henüz tamamlanmadı.",
    risk: "Geliştirme yetkisi ve avans ödemesi alınmadan detay mühendislik yayımlanmasın.",
    value: "$45K geliştirme aşaması",
    status: "pending",
  },
  {
    id: "DEC-0219",
    title: "Tedarikçi teklif turunu aç",
    project: "Gana Soğuk Zincir Merkezi",
    recommendation: "Ek bilgi talep et",
    reason: "Soğuk oda kapasitesi tanımlı; şebeke kalitesi ve soğutucu akışkan uyum verileri eksik.",
    risk: "Yanlış tesisat varsayımları yatırım maliyetini %12'den fazla değiştirebilir.",
    value: "$3.8–4.6M proje",
    status: "pending",
  },
  {
    id: "DEC-0221",
    title: "Korumasız tanıştırmayı reddet",
    project: "Kamerun Gıda İşleme Merkezi",
    recommendation: "Mevcut yolu reddet",
    reason: "Aracı, proje koruma ve devre dışı bırakmama sözleşmesini imzalamıyor.",
    risk: "Teknik konsept açıklandıktan sonra devre dışı bırakılma olasılığı yüksek.",
    value: "Ticari koruma",
    status: "pending",
  },
];

const dossierItems = [
  ["Karar verici", "Doğrulandı · Kamu bağlantılı sponsor", "complete"],
  ["Arazi kanıtı", "18.400 m² tahsis yazısı yüklendi", "complete"],
  ["Hammadde", "Sorgum ve mısır hacimleri inceleniyor", "review"],
  ["Enerji", "Şebeke profili eksik · hibrit model önerildi", "warning"],
  ["Alım", "Üç kanatlı üreticisi belirlendi", "review"],
  ["Finansman", "Sponsor özkaynak kanıtı talep edildi", "warning"],
  ["Geliştirme yetkisi", "Taslak hukuki incelemede", "review"],
] as const;

const activity = [
  ["Ticari İstihbarat", "Uganda'dan yeni bir süt işleme fırsatını nitelendirdi", "8 dk"],
  ["Teknik İnceleme", "Trafo yükü tutarsızlığını gündeme getirdi", "24 dk"],
  ["Maliyet Mühendisliği", "Maliyet modeline deniz sigortası istisnası ekledi", "41 dk"],
  ["Bağımsız İnceleme", "Desteksiz hammadde büyüme varsayımını işaretledi", "1 sa"],
];

const specialistOptions: { id: SpecialistId; label: string }[] = [
  { id: "project-coordination", label: "Proje Koordinasyonu" },
  { id: "technical-review", label: "Teknik İnceleme" },
  { id: "project-management", label: "Proje Yönetimi / PMO" },
  { id: "procurement", label: "Satın Alma ve Tedarikçi Değerlendirmesi" },
  { id: "finance", label: "Finansman ve Yatırım Yapılandırması" },
  { id: "contract-compliance", label: "Sözleşme ve Uyum İncelemesi" },
  { id: "proposal-cost", label: "Teklif ve Maliyet Mühendisliği" },
  { id: "commercial-intelligence", label: "Ticari İstihbarat ve CRM" },
  { id: "independent-review", label: "Bağımsız İnceleme" },
];

const languageOptions: { id: SupportedLanguage; label: string }[] = [
  { id: "tr", label: "Türkçe" },
  { id: "en", label: "English" },
  { id: "ar", label: "العربية" },
];

const agentStatusLabels: Record<Agent["status"], string> = {
  active: "Aktif",
  review: "İncelemede",
  waiting: "Bekliyor",
};

const decisionStatusLabels: Record<Decision["status"], string> = {
  pending: "Bekliyor",
  approved: "Onaylandı",
  rejected: "Reddedildi",
  info: "Ek kanıt istendi",
};

const allowedModes = new Set<ProjectOfficeMode>(["single", "review-panel"]);
const allowedSpecialists = new Set<SpecialistId>(
  specialistOptions.map((specialist) => specialist.id),
);
const allowedLanguages = new Set<SupportedLanguage>(
  languageOptions.map((language) => language.id),
);

type WorkspaceStatus = "idle" | "loading" | "success" | "error";

type ApiSuccess = {
  ok: true;
  specialist: SpecialistId;
  result: SpecialistResult;
};

const fieldClassName =
  "min-h-11 w-full rounded-xl border border-white/10 bg-[#07100c] px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-[#52645a] focus:border-[#d9bd72]/45 focus:ring-2 focus:ring-[#d9bd72]/10";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isApiSuccess(value: unknown): value is ApiSuccess {
  if (!isRecord(value) || value.ok !== true || !isRecord(value.result)) {
    return false;
  }

  const result = value.result;
  return (
    typeof value.specialist === "string" &&
    allowedSpecialists.has(value.specialist as SpecialistId) &&
    typeof result.summary === "string" &&
    isStringArray(result.analysis) &&
    isStringArray(result.assumptions) &&
    isStringArray(result.missingEvidence) &&
    Array.isArray(result.risks) &&
    result.risks.every(
      (risk) =>
        isRecord(risk) &&
        ["low", "medium", "high", "critical"].includes(String(risk.level)) &&
        typeof risk.description === "string",
    ) &&
    isStringArray(result.recommendations) &&
    typeof result.decisionRequired === "boolean" &&
    isStringArray(result.proposedNextActions)
  );
}

function safeApiError(value: unknown) {
  if (
    isRecord(value) &&
    isRecord(value.error) &&
    typeof value.error.message === "string" &&
    value.error.message.length <= 500
  ) {
    return value.error.message;
  }

  return "Uzman analizi tamamlanamadı. Lütfen yeniden deneyin.";
}

function ResultList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border-t border-white/8 py-5 first:border-t-0 first:pt-0">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#718278]">
        {title}
      </div>
      {items.length > 0 ? (
        <ul className="mt-3 space-y-2.5">
          {items.map((item, index) => (
            <li key={`${title}-${index}`} className="flex min-w-0 gap-3 text-sm leading-6 text-[#b4c0b8]">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#76cba3]" />
              <span className="min-w-0 break-words">{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-[#5f7166]">Belirlenmedi.</p>
      )}
    </div>
  );
}

function SpecialistWorkspace() {
  const [mode, setMode] = useState<ProjectOfficeMode>("single");
  const [specialistId, setSpecialistId] =
    useState<SpecialistId>("project-coordination");
  const [language, setLanguage] = useState<SupportedLanguage>("tr");
  const [projectContext, setProjectContext] = useState("");
  const [task, setTask] = useState("");
  const [evidenceText, setEvidenceText] = useState("");
  const [status, setStatus] = useState<WorkspaceStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState<SpecialistResult | null>(null);
  const requestInFlight = useRef(false);

  const evidence = evidenceText
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);

  const validate = () => {
    if (!allowedModes.has(mode) || !allowedSpecialists.has(specialistId)) {
      return "Geçerli bir çalışma modu ve uzman seçin.";
    }
    if (!allowedLanguages.has(language)) {
      return "Geçerli bir çıktı dili seçin.";
    }
    if (!projectContext.trim()) {
      return "Proje bağlamı zorunludur.";
    }
    if (projectContext.trim().length > 20_000) {
      return "Proje bağlamı 20.000 karakter sınırını aşıyor.";
    }
    if (!task.trim()) {
      return "Görev / Talimat alanı zorunludur.";
    }
    if (task.trim().length > 4_000) {
      return "Görev / Talimat alanı 4.000 karakter sınırını aşıyor.";
    }
    if (evidence.length > 10) {
      return "Kanıtlar en fazla 10 dolu satır içerebilir.";
    }
    if (evidence.some((item) => item.length > 8_000)) {
      return "Her kanıt kaydı en fazla 8.000 karakter olabilir.";
    }
    return null;
  };

  const runAnalysis = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (requestInFlight.current) return;

    const validationError = validate();
    if (validationError) {
      setStatus("error");
      setErrorMessage(validationError);
      return;
    }

    requestInFlight.current = true;
    setStatus("loading");
    setErrorMessage("");
    setResult(null);

    try {
      const response = await fetch("/api/project-office", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          specialistId,
          projectContext: projectContext.trim(),
          task: task.trim(),
          evidence,
          language,
        }),
      });
      const payload: unknown = await response.json().catch(() => null);

      if (!response.ok || !isApiSuccess(payload)) {
        throw new Error(safeApiError(payload));
      }

      setResult(payload.result);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Uzman analizi tamamlanamadı. Lütfen yeniden deneyin.",
      );
    } finally {
      requestInFlight.current = false;
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-[#6d8074]">Yönetim komutu</div>
          <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
            Yeni Görev Ver
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#87998e]">
            Uzman birimi seçin, proje bağlamını tanımlayın ve karar desteği için açık bir talimat oluşturun.
          </p>
        </div>
        <span className="self-start rounded-full border border-[#74cba2]/18 bg-[#74cba2]/8 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#8bd9b8]">
          Yalnız dahili kullanım
        </span>
      </div>

      <div className="mt-7 grid min-w-0 gap-5 xl:grid-cols-[.92fr_1.08fr]">
        <form onSubmit={runAnalysis} className="min-w-0 rounded-[24px] border border-white/8 bg-black/10 p-5 md:p-6">
          <div className="grid gap-5 md:grid-cols-2">
            <fieldset className="min-w-0">
              <legend className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#718278]">Çalışma Modu</legend>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {[
                  ["single", "Tek Uzman"],
                  ["review-panel", "İnceleme Kurulu"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={mode === value}
                    onClick={() => setMode(value as ProjectOfficeMode)}
                    className={`min-h-11 rounded-xl border px-3 py-2.5 text-xs font-medium transition ${
                      mode === value
                        ? "border-[#d9bd72]/35 bg-[#d9bd72]/9 text-[#e7cf88]"
                        : "border-white/9 bg-[#07100c] text-[#899a90] hover:border-white/16"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="min-w-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#718278]">
              Çıktı Dili
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value as SupportedLanguage)}
                className={`${fieldClassName} mt-2 normal-case tracking-normal`}
              >
                {languageOptions.map((option) => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
            </label>
          </div>

          {mode === "review-panel" && (
            <div className="mt-4 flex gap-3 rounded-xl border border-[#d9bd72]/16 bg-[#d9bd72]/5 p-4 text-xs leading-5 text-[#b6a675]">
              <Eye className="mt-0.5 h-4 w-4 shrink-0" />
              Birden fazla uzman birim talebi inceleyecek. Seçtiğiniz uzman, değerlendirmenin merkez alanı olarak kalacak.
            </div>
          )}

          <label className="mt-5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#718278]">
            Uzman
            <select
              required
              value={specialistId}
              onChange={(event) => setSpecialistId(event.target.value as SpecialistId)}
              className={`${fieldClassName} mt-2 normal-case tracking-normal`}
            >
              {specialistOptions.map((option) => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))}
            </select>
          </label>

          <label className="mt-5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#718278]">
            Proje Bağlamı
            <textarea
              required
              maxLength={20_000}
              rows={4}
              value={projectContext}
              onChange={(event) => setProjectContext(event.target.value)}
              placeholder="Projeyi, mevcut aşamayı, çalışma koşullarını ve bilinen kısıtları açıklayın."
              className={`${fieldClassName} mt-2 min-h-28 resize-y normal-case tracking-normal`}
            />
            <span className="mt-1.5 block text-right text-[9px] font-normal tracking-normal text-[#53655a]">{projectContext.length.toLocaleString()} / 20,000</span>
          </label>

          <label className="mt-4 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#718278]">
            Görev / Talimat
            <textarea
              required
              maxLength={4_000}
              rows={8}
              value={task}
              onChange={(event) => setTask(event.target.value)}
              placeholder="Uzman ekibin yapmasını istediğiniz analizi, incelemeyi veya karar desteğini açık ve doğrudan yazın."
              className={`${fieldClassName} mt-2 min-h-52 resize-y normal-case tracking-normal`}
            />
            <span className="mt-1.5 block text-right text-[9px] font-normal tracking-normal text-[#53655a]">{task.length.toLocaleString()} / 4,000</span>
          </label>

          <label className="mt-4 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#718278]">
            Kanıtlar ve Belgeler
            <textarea
              maxLength={80_010}
              rows={4}
              value={evidenceText}
              onChange={(event) => setEvidenceText(event.target.value)}
              placeholder="Her satıra bir kanıt veya belge notu yazın. En fazla 10 kayıt."
              className={`${fieldClassName} mt-2 min-h-28 resize-y normal-case tracking-normal`}
            />
            <span className={`mt-1.5 block text-right text-[9px] font-normal tracking-normal ${evidence.length > 10 ? "text-[#df9a91]" : "text-[#53655a]"}`}>
              {evidence.length} / 10 dolu kayıt
            </span>
          </label>

          {status === "error" && (
            <div role="alert" className="mt-5 flex gap-3 rounded-xl border border-[#d47d72]/18 bg-[#d47d72]/6 p-4 text-xs leading-5 text-[#dfaaa3]">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <span className="break-words">{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#e1c272] px-5 py-3 text-xs font-semibold text-[#09110d] transition hover:bg-[#ecd48d] disabled:cursor-not-allowed disabled:opacity-55"
          >
            {status === "loading" ? (
              <><LoaderCircle className="h-4 w-4 animate-spin" /> Uzman analizi hazırlanıyor…</>
            ) : (
              <><Play className="h-4 w-4" /> Analizi Başlat</>
            )}
          </button>
        </form>

        <div className="min-w-0 rounded-[24px] border border-white/8 bg-black/10 p-5 md:p-6" aria-live="polite">
          {status === "idle" && (
            <div className="flex min-h-80 flex-col items-center justify-center text-center">
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/9 bg-white/[0.03] text-[#718278]">
                <FileSearch className="h-5 w-5" />
              </div>
              <div className="mt-4 text-sm font-semibold text-white">Görev Özeti</div>
              <div className="mt-5 w-full max-w-md space-y-3 text-left">
                <div className="flex items-center justify-between gap-4 border-b border-white/7 pb-3 text-xs">
                  <span className="text-[#65776b]">Çalışma modu</span>
                  <span className="text-right font-medium text-[#b4c0b8]">{mode === "single" ? "Tek Uzman" : "İnceleme Kurulu"}</span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-white/7 pb-3 text-xs">
                  <span className="text-[#65776b]">Uzman</span>
                  <span className="text-right font-medium text-[#b4c0b8]">{specialistOptions.find((item) => item.id === specialistId)?.label}</span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-white/7 pb-3 text-xs">
                  <span className="text-[#65776b]">Çıktı dili</span>
                  <span className="text-right font-medium text-[#b4c0b8]">{languageOptions.find((item) => item.id === language)?.label}</span>
                </div>
                <div className="flex items-center justify-between gap-4 text-xs">
                  <span className="text-[#65776b]">Kanıt kaydı</span>
                  <span className="font-medium text-[#b4c0b8]">{evidence.length}</span>
                </div>
              </div>
            </div>
          )}

          {status === "loading" && (
            <div className="flex min-h-80 flex-col items-center justify-center text-center">
              <LoaderCircle className="h-7 w-7 animate-spin text-[#d9bd72]" />
              <div className="mt-4 text-sm font-semibold text-white">Uzman analizi hazırlanıyor…</div>
              <p className="mt-2 text-xs text-[#65776b]">Gönderilen bağlam ve kanıtlar inceleniyor.</p>
            </div>
          )}

          {status === "error" && !result && (
            <div className="flex min-h-80 flex-col items-center justify-center text-center">
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[#d47d72]/18 bg-[#d47d72]/6 text-[#df9a91]">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="mt-4 text-sm font-semibold text-white">Analiz kullanılamıyor</div>
              <p className="mt-2 max-w-sm break-words text-xs leading-5 text-[#9b817d]">{errorMessage}</p>
            </div>
          )}

          {status === "success" && result && (
            <div className="min-w-0">
              <div className="flex flex-col gap-3 border-b border-white/8 pb-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#76cba3]">Uzman analizi tamamlandı</div>
                  <h4 className="mt-2 text-xl font-semibold text-white">Yapılandırılmış İnceleme</h4>
                </div>
                <span className={`self-start rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                  result.decisionRequired
                    ? "border-[#d9bd72]/22 bg-[#d9bd72]/7 text-[#dcc57f]"
                    : "border-[#74cba2]/18 bg-[#74cba2]/8 text-[#8bd9b8]"
                }`}>
                  Yönetici Kararı Gerekli: {result.decisionRequired ? "Evet" : "Hayır"}
                </span>
              </div>

              <div className="py-5">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#718278]">Yönetici Özeti</div>
                <p className="mt-3 break-words text-base leading-7 text-[#d4ddd7]">{result.summary}</p>
              </div>

              <ResultList title="Analiz" items={result.analysis} />
              <ResultList title="Varsayımlar" items={result.assumptions} />
              <ResultList title="Eksik Kanıtlar" items={result.missingEvidence} />

              <div className="border-t border-white/8 py-5">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#718278]">Riskler</div>
                {result.risks.length > 0 ? (
                  <div className="mt-3 space-y-2.5">
                    {result.risks.map((risk, index) => {
                      const riskStyle = {
                        low: "border-[#74cba2]/18 bg-[#74cba2]/6 text-[#8bd9b8]",
                        medium: "border-[#d9bd72]/18 bg-[#d9bd72]/6 text-[#dcc57f]",
                        high: "border-[#d88d62]/20 bg-[#d88d62]/7 text-[#e0a27f]",
                        critical: "border-[#d47d72]/22 bg-[#d47d72]/8 text-[#e29b92]",
                      }[risk.level];
                      return (
                        <div key={`${risk.level}-${index}`} className="flex min-w-0 flex-col gap-2 rounded-xl border border-white/7 bg-white/[0.018] p-3 sm:flex-row sm:items-start">
                          <span className={`shrink-0 self-start rounded-full border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] ${riskStyle}`}>{{ low: "Düşük", medium: "Orta", high: "Yüksek", critical: "Kritik" }[risk.level]}</span>
                          <span className="min-w-0 break-words text-sm leading-6 text-[#b4c0b8]">{risk.description}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-[#5f7166]">Belirlenmedi.</p>
                )}
              </div>

              <ResultList title="Öneriler" items={result.recommendations} />
              <ResultList title="Önerilen Sonraki Adımlar" items={result.proposedNextActions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AICompanyOS() {
  const [activeTab, setActiveTab] = useState<"command" | "team" | "decisions" | "dossier">("command");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [decisions, setDecisions] = useState<Decision[]>(initialDecisions);

  const pendingDecisions = useMemo(
    () => decisions.filter((decision) => decision.status === "pending").length,
    [decisions],
  );

  const updateDecision = (id: string, status: Decision["status"]) => {
    setDecisions((current) =>
      current.map((decision) => (decision.id === id ? { ...decision, status } : decision)),
    );
  };

  return (
    <section id="project-office" className="border-y border-white/10 bg-[#08120e] py-10 lg:py-14">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
        <div className="grid gap-5 lg:grid-cols-[1fr_.72fr] lg:items-end">
          <div>
            <div className="eyebrow">Dahili Yönetim Ekranı</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white md:text-4xl">
              Novertra Proje Ofisi
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[#87998e] md:text-base">
              Uzman ekipleri yönetin, proje görevleri oluşturun ve karar önerilerini inceleyin.
            </p>
          </div>
          <div className="rounded-[20px] border border-[#d9bc70]/16 bg-[#d9bc70]/5 p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#e1c272]/10 text-[#e1c272]">
                <UserRoundCheck className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-[#9a895e]">Yönetici onayı</div>
                <div className="mt-1 text-sm font-semibold text-white">Celal Arslan · Platform Başkanı</div>
              </div>
            </div>
            <p className="mt-3 text-xs leading-5 text-[#9eada3]">
              Harici ticari, finansal ve sözleşmesel taahhütler yönetici onayı gerektirir.
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-[9px] uppercase tracking-[0.16em] text-[#5f7166]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#d9bd72]" />
          Dahili Proje Ofisi · Demo ortamı
        </div>

        <div className="mt-7 rounded-[30px] border border-white/10 bg-[#06100c] p-5 shadow-2xl shadow-black/30 md:p-7 lg:p-8">
          <SpecialistWorkspace />
        </div>

        <div className="mt-8 overflow-hidden rounded-[34px] border border-white/10 bg-[#06100c] shadow-2xl shadow-black/35">
          <div className="flex flex-col gap-4 border-b border-white/8 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-7">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl border border-[#7ad1aa]/20 bg-[#7ad1aa]/8 text-[#88d9b5]">
                  <Network className="h-5 w-5" />
                </div>
                <div>
                <div className="text-sm font-semibold text-white">Novertra Yönetim Panosu</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#66796d]">Kontrollü iş akışı · Kanıt gerekli</div>
                </div>
              </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-[#74cba2]/18 bg-[#74cba2]/8 px-3 py-1.5 text-[10px] font-medium text-[#8bd9b8]">
                7 çalışma akışı aktif
              </span>
              <span className="rounded-full border border-[#d9bc70]/18 bg-[#d9bc70]/7 px-3 py-1.5 text-[10px] font-medium text-[#dcc57f]">
                {pendingDecisions} karar bekliyor
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[220px_1fr]">
            <aside className="border-b border-white/8 p-4 lg:border-b-0 lg:border-r lg:p-5">
              <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
                {[
                  ["command", Gauge, "Yönetici Özeti"],
                  ["decisions", ClipboardCheck, "Karar Kuyruğu"],
                  ["dossier", Database, "Proje Dosyası"],
                  ["team", Bot, "Uzman Birimler"],
                ].map(([id, Icon, label]) => {
                  const NavIcon = Icon as typeof Gauge;
                  const active = activeTab === id;
                  return (
                    <button
                      key={id as string}
                      onClick={() => setActiveTab(id as typeof activeTab)}
                      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left text-xs transition ${
                        active
                          ? "border border-white/8 bg-white/[0.065] text-white"
                          : "border border-transparent text-[#718278] hover:bg-white/[0.03] hover:text-[#aebbb3]"
                      }`}
                    >
                      <NavIcon className="h-4 w-4" /> {label as string}
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 hidden rounded-2xl border border-white/8 bg-black/10 p-4 lg:block">
                <div className="text-[10px] uppercase tracking-[0.18em] text-[#687a6f]">Yönetişim modeli</div>
                <div className="mt-3 space-y-3 text-xs text-[#93a39a]">
                  <div className="flex items-start gap-2"><Check className="mt-0.5 h-3.5 w-3.5 text-[#76cba3]" /> Hazırla ve analiz et</div>
                  <div className="flex items-start gap-2"><Eye className="mt-0.5 h-3.5 w-3.5 text-[#d9bd72]" /> Yönetici incelemesi gerekli</div>
                  <div className="flex items-start gap-2"><XCircle className="mt-0.5 h-3.5 w-3.5 text-[#d47d72]" /> Onay olmadan harici taahhüt verilemez</div>
                </div>
              </div>
            </aside>

            <div className="min-h-[690px] p-5 md:p-7 lg:p-8">
              {activeTab === "command" && (
                <div>
                  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-[#6d8074]">Yönetici Özeti</div>
                    <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">Günaydın Celal.</h3>
                    <p className="mt-2 text-sm text-[#87998e]">Yalnız yetkinizi gerektiren istisnalar, riskler ve kararlar burada gösterilir.</p>
                    </div>
                    <button onClick={() => setActiveTab("decisions")} className="inline-flex items-center gap-2 self-start rounded-full bg-[#e1c272] px-5 py-2.5 text-xs font-semibold text-[#09110d]">
                      {pendingDecisions} kararı incele <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {[
                      ["12", "Aktif projeler", BriefcaseBusiness, "3 proje karar aşamasında"],
                      ["9", "Uzman birimler", Bot, "Tüm birimler çalışıyor"],
                      [String(pendingDecisions), "Kararlarınız", ClipboardCheck, "2 kritik ticari karar"],
                      ["$28.4M", "Nitelikli proje hattı", CircleDollarSign, "Bu hafta +$4.6M"],
                    ].map(([value, label, Icon, note]) => {
                      const MetricIcon = Icon as typeof Activity;
                      return (
                        <div key={label as string} className="rounded-[22px] border border-white/8 bg-white/[0.025] p-5">
                          <div className="flex items-center justify-between">
                            <MetricIcon className="h-4 w-4 text-[#d9bd72]" />
                            <span className="h-2 w-2 rounded-full bg-[#75cba2] shadow-[0_0_12px_rgba(117,203,162,.6)]" />
                          </div>
                          <div className="mt-5 text-3xl font-semibold text-white">{value as string}</div>
                          <div className="mt-1 text-xs text-[#98a79e]">{label as string}</div>
                          <div className="mt-3 text-[10px] text-[#65786c]">{note as string}</div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-5 grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
                    <div className="rounded-[24px] border border-white/8 bg-black/10 p-5 md:p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold text-white">Karar Öncelikleri</div>
                          <div className="mt-1 text-[10px] uppercase tracking-[0.17em] text-[#687a6f]">Proje Koordinasyonu + Bağımsız İnceleme tarafından hazırlandı</div>
                        </div>
                        <Target className="h-5 w-5 text-[#d9bd72]" />
                      </div>
                      <div className="mt-5 space-y-3">
                        {decisions.filter((item) => item.status === "pending").slice(0, 3).map((decision, index) => (
                          <button
                            key={decision.id}
                            onClick={() => setActiveTab("decisions")}
                            className="group grid w-full gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-left transition hover:border-[#d9bd72]/25 hover:bg-white/[0.04] md:grid-cols-[34px_1fr_auto] md:items-center"
                          >
                            <div className={`grid h-8 w-8 place-items-center rounded-full text-xs font-semibold ${index === 0 ? "bg-[#d9bd72]/12 text-[#e1c77e]" : "bg-white/[0.05] text-[#74867a]"}`}>
                              {index + 1}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white">{decision.title}</div>
                              <div className="mt-1 text-[11px] text-[#74867a]">{decision.project} · {decision.value}</div>
                            </div>
                            <ChevronRight className="hidden h-4 w-4 text-[#66776d] transition group-hover:translate-x-1 group-hover:text-[#d9bd72] md:block" />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-white/8 bg-black/10 p-5 md:p-6">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold text-white">Çalışma Akışları</div>
                        <Activity className="h-4 w-4 text-[#79cba5]" />
                      </div>
                      <div className="mt-5 space-y-5">
                        {activity.map(([agent, text, time]) => (
                          <div key={`${agent}-${time}`} className="flex gap-3">
                            <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#76cba3]" />
                            <div className="min-w-0">
                              <div className="text-xs font-medium text-[#bac6bf]">{agent}</div>
                              <div className="mt-1 text-xs leading-5 text-[#718278]">{text}</div>
                              <div className="mt-1 text-[9px] uppercase tracking-wider text-[#53655a]">{time} önce</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "team" && (
                <div>
                  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-[#6d8074]">Uzman birim yapısı</div>
                      <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">Dokuz rol. Açık yetki sınırları.</h3>
                    </div>
                    <div className="text-xs text-[#718278]">Görev tanımı ve yetki sınırlarını incelemek için bir birim seçin.</div>
                  </div>

                  <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {agents.map((agent) => {
                      const Icon = agent.icon;
                      return (
                        <button
                          key={agent.id}
                          onClick={() => setSelectedAgent(agent)}
                          className="group min-h-[240px] rounded-[22px] border border-white/8 bg-white/[0.022] p-5 text-left transition hover:-translate-y-0.5 hover:border-[#d9bd72]/25 hover:bg-white/[0.04]"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/8 bg-white/[0.04] text-[#d9bd72]">
                              <Icon className="h-5 w-5" />
                            </div>
                            <span className={`rounded-full border px-2.5 py-1 text-[9px] uppercase tracking-wider ${
                              agent.status === "active"
                                ? "border-[#74cba2]/18 bg-[#74cba2]/8 text-[#89d9b5]"
                                : agent.status === "review"
                                  ? "border-[#d9bd72]/18 bg-[#d9bd72]/7 text-[#dcc57f]"
                                  : "border-white/10 bg-white/[0.03] text-[#819086]"
                            }`}>
                              {agentStatusLabels[agent.status]}
                            </span>
                          </div>
                          <div className="mt-5 text-lg font-semibold text-white">{agent.name}</div>
                          <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[#718278]">{agent.role}</div>
                          <p className="mt-4 line-clamp-2 text-xs leading-5 text-[#85968c]">{agent.task}</p>
                          <div className="mt-5 flex items-center justify-between border-t border-white/7 pt-4">
                            <div>
                              <div className="text-[9px] uppercase tracking-wider text-[#5f7166]">Güven</div>
                              <div className="mt-1 text-sm font-semibold text-white">{agent.confidence}%</div>
                            </div>
                            <div className="inline-flex items-center gap-1 text-[10px] font-medium text-[#d9bd72] opacity-70 transition group-hover:gap-2 group-hover:opacity-100">
                              Görev tanımını aç <ChevronRight className="h-3.5 w-3.5" />
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === "decisions" && (
                <div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-[#6d8074]">Yönetici onay kapısı</div>
                    <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">Celal Arslan Karar Kuyruğu</h3>
                    <p className="mt-2 text-sm text-[#87998e]">Her harici taahhüt siz onaylayana, reddedene veya kanıt isteyene kadar burada bekler.</p>
                  </div>

                  <div className="mt-7 space-y-4">
                    {decisions.map((decision) => (
                      <div key={decision.id} className={`rounded-[24px] border p-5 md:p-6 ${
                        decision.status === "pending"
                          ? "border-white/9 bg-white/[0.025]"
                          : decision.status === "approved"
                            ? "border-[#74cba2]/18 bg-[#74cba2]/5"
                            : decision.status === "rejected"
                              ? "border-[#d47d72]/18 bg-[#d47d72]/5"
                              : "border-[#d9bd72]/18 bg-[#d9bd72]/5"
                      }`}>
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[10px] uppercase tracking-[0.16em] text-[#677a6e]">{decision.id}</span>
                              <span className="rounded-full border border-white/8 bg-black/10 px-2.5 py-1 text-[9px] text-[#7f9086]">{decision.project}</span>
                            </div>
                            <h4 className="mt-3 text-xl font-semibold text-white">{decision.title}</h4>
                          </div>
                          <div className="rounded-xl border border-white/8 bg-black/10 px-3 py-2 text-xs font-medium text-[#d9bd72]">{decision.value}</div>
                        </div>

                        <div className="mt-5 grid gap-3 md:grid-cols-3">
                          <div className="rounded-2xl border border-white/7 bg-black/10 p-4">
                            <div className="text-[9px] uppercase tracking-[0.16em] text-[#65776b]">Birim önerisi</div>
                            <div className="mt-2 text-sm font-medium text-white">{decision.recommendation}</div>
                          </div>
                          <div className="rounded-2xl border border-white/7 bg-black/10 p-4 md:col-span-2">
                            <div className="text-[9px] uppercase tracking-[0.16em] text-[#65776b]">Gerekçe</div>
                            <div className="mt-2 text-xs leading-5 text-[#9aa9a0]">{decision.reason}</div>
                          </div>
                        </div>

                        <div className="mt-3 flex items-start gap-3 rounded-2xl border border-[#d9bd72]/14 bg-[#d9bd72]/5 p-4 text-xs leading-5 text-[#b4a474]">
                          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" /> {decision.risk}
                        </div>

                        {decision.status === "pending" ? (
                          <div className="mt-5 grid gap-2 sm:grid-cols-3">
                            <button onClick={() => updateDecision(decision.id, "approved")} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#76cba3] px-4 py-3 text-xs font-semibold text-[#07100d]">
                              <CheckCircle2 className="h-4 w-4" /> Onayla
                            </button>
                            <button onClick={() => updateDecision(decision.id, "info")} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#d9bd72]/22 bg-[#d9bd72]/6 px-4 py-3 text-xs font-medium text-[#dfc77f]">
                              <FileSearch className="h-4 w-4" /> Kanıt iste
                            </button>
                            <button onClick={() => updateDecision(decision.id, "rejected")} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/9 px-4 py-3 text-xs font-medium text-[#a3b1a8]">
                              <XCircle className="h-4 w-4" /> Reddet
                            </button>
                          </div>
                        ) : (
                          <div className="mt-5 flex items-center justify-between rounded-xl border border-white/8 bg-black/10 px-4 py-3">
                            <div className="flex items-center gap-2 text-xs font-medium text-[#aebcb3]">
                              {decision.status === "approved" ? <CheckCircle2 className="h-4 w-4 text-[#76cba3]" /> : decision.status === "rejected" ? <XCircle className="h-4 w-4 text-[#d47d72]" /> : <FileSearch className="h-4 w-4 text-[#d9bd72]" />}
                              Karar kaydedildi: {decisionStatusLabels[decision.status]}
                            </div>
                            <button onClick={() => updateDecision(decision.id, "pending")} className="text-[10px] text-[#718278] underline underline-offset-4">Geri al</button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "dossier" && (
                <div>
                  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-[#6d8074]">Tek doğruluk kaynağı</div>
                      <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">Proje Dosyası · BFS-2026-0217</h3>
                    </div>
                    <span className="self-start rounded-full border border-[#d9bd72]/18 bg-[#d9bd72]/7 px-3 py-1.5 text-[10px] font-medium text-[#dcc57f]">Aşama 3 · Geliştirme</span>
                  </div>

                  <div className="mt-7 grid gap-5 xl:grid-cols-[1.1fr_.9fr]">
                    <div className="rounded-[24px] border border-white/8 bg-black/10 p-5 md:p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold text-white">Kanıt kaydı</div>
                          <div className="mt-1 text-[10px] text-[#67796e]">Her birim aynı yapılandırılmış kayıt üzerinden okur ve yazar.</div>
                        </div>
                        <Database className="h-5 w-5 text-[#79cba5]" />
                      </div>
                      <div className="mt-5 space-y-2">
                        {dossierItems.map(([label, value, state]) => (
                          <div key={label} className="grid gap-3 rounded-2xl border border-white/7 bg-white/[0.018] p-4 md:grid-cols-[150px_1fr_auto] md:items-center">
                            <div className="text-xs font-medium text-[#aebbb3]">{label}</div>
                            <div className="text-xs leading-5 text-[#74867a]">{value}</div>
                            <div className={`flex h-7 w-7 items-center justify-center rounded-full ${
                              state === "complete" ? "bg-[#74cba2]/10 text-[#82d4b0]" : state === "review" ? "bg-[#d9bd72]/9 text-[#d9bd72]" : "bg-[#d47d72]/9 text-[#d9958c]"
                            }`}>
                              {state === "complete" ? <Check className="h-3.5 w-3.5" /> : state === "review" ? <Clock3 className="h-3.5 w-3.5" /> : <AlertTriangle className="h-3.5 w-3.5" />}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className="rounded-[24px] border border-white/8 bg-black/10 p-5 md:p-6">
                        <div className="text-sm font-semibold text-white">Birim görüş birliği</div>
                        <div className="mt-5 space-y-4">
                          {[
                            ["Teknik", "Koşullu olarak uygulanabilir", 78],
                            ["Ticari", "Yetki ile cazip", 72],
                            ["Finansman", "Kanıt eksik", 48],
                            ["Uyum", "Orta ülke riski", 67],
                          ].map(([label, value, progress]) => (
                            <div key={label as string}>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-[#9baaa1]">{label as string}</span>
                                <span className="text-[#718278]">{value as string}</span>
                              </div>
                              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/6">
                                <div className="h-full rounded-full bg-[#76cba3]" style={{ width: `${progress}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-[24px] border border-[#d9bd72]/16 bg-[#d9bd72]/5 p-5 md:p-6">
                        <div className="flex items-center gap-2 text-sm font-semibold text-white"><BadgeCheck className="h-4 w-4 text-[#d9bd72]" /> Önerilen sonraki aşama</div>
                        <div className="mt-3 text-lg font-semibold text-[#e5cd86]">Ücretli Ön Fizibilite</div>
                        <p className="mt-3 text-xs leading-5 text-[#a99d78]">Yalnız geliştirme yetkisi, avans ödemesi ve sponsor özkaynak kanıtından sonra ilerletin.</p>
                        <button onClick={() => setActiveTab("decisions")} className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[#e2c97f]">Onay kartını aç <ArrowRight className="h-3.5 w-3.5" /></button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedAgent && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm md:items-center md:p-6" onClick={() => setSelectedAgent(null)}>
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-[30px] border border-white/10 bg-[#09140f] p-6 shadow-2xl md:rounded-[30px] md:p-8" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="grid h-13 w-13 place-items-center rounded-2xl border border-[#d9bd72]/18 bg-[#d9bd72]/7 text-[#d9bd72]">
                  <selectedAgent.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xl font-semibold text-white">{selectedAgent.name}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[#718278]">{selectedAgent.role}</div>
                </div>
              </div>
              <button onClick={() => setSelectedAgent(null)} className="grid h-9 w-9 place-items-center rounded-xl border border-white/9 text-[#819187]"><X className="h-4 w-4" /></button>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/8 bg-black/10 p-4">
                <div className="text-[9px] uppercase tracking-wider text-[#65776b]">Durum</div>
                <div className="mt-2 text-sm font-semibold text-white">{agentStatusLabels[selectedAgent.status]}</div>
              </div>
              <div className="rounded-2xl border border-white/8 bg-black/10 p-4">
                <div className="text-[9px] uppercase tracking-wider text-[#65776b]">Güven</div>
                <div className="mt-2 text-sm font-semibold text-white">{selectedAgent.confidence}%</div>
              </div>
              <div className="rounded-2xl border border-white/8 bg-black/10 p-4">
                <div className="text-[9px] uppercase tracking-wider text-[#65776b]">Ana çıktı</div>
                <div className="mt-2 text-xs font-medium leading-5 text-white">{selectedAgent.output}</div>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-white/8 bg-white/[0.02] p-5">
              <div className="text-[9px] uppercase tracking-[0.16em] text-[#65776b]">Mevcut görev</div>
              <div className="mt-2 text-sm leading-6 text-[#b0bdb5]">{selectedAgent.task}</div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-[#74cba2]/14 bg-[#74cba2]/5 p-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#8bd9b8]"><CheckCircle2 className="h-4 w-4" /> İzin verilen yetki</div>
                <p className="mt-3 text-xs leading-5 text-[#91aa9e]">{selectedAgent.authority}</p>
              </div>
              <div className="rounded-2xl border border-[#d47d72]/14 bg-[#d47d72]/5 p-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#df9a91]"><XCircle className="h-4 w-4" /> Kesin sınır</div>
                <p className="mt-3 text-xs leading-5 text-[#a98d89]">{selectedAgent.blocked}</p>
              </div>
            </div>

            <div className="mt-5">
              <div className="text-[9px] uppercase tracking-[0.16em] text-[#65776b]">Uzman yetkinlikleri</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedAgent.specialty.map((item) => <span key={item} className="rounded-full border border-white/9 bg-white/[0.025] px-3 py-1.5 text-[10px] text-[#96a69c]">{item}</span>)}
              </div>
            </div>

            <div className="mt-7 flex items-center justify-between border-t border-white/8 pt-5">
              <div className="flex items-center gap-2 text-[10px] text-[#65776b]"><BadgeCheck className="h-3.5 w-3.5" /> Tüm çıktılar kaynak gösterilmiş kanıt gerektirir</div>
              <button onClick={() => setSelectedAgent(null)} className="rounded-full bg-[#e1c272] px-5 py-2.5 text-xs font-semibold text-[#09110d]">Kapat</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
