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
  Network,
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
import { useMemo, useState } from "react";

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
    name: "Project Coordination",
    role: "Coordination Function",
    icon: BrainCircuit,
    status: "active",
    confidence: 93,
    task: "Consolidating Sudan Feed Hub decision file",
    output: "Executive decision brief",
    authority: "Distribute tasks and prepare decision cards",
    blocked: "Cannot approve commitments or contact clients",
    specialty: ["Task routing", "Conflict detection", "Executive synthesis"],
  },
  {
    id: "technical",
    name: "Technical Review",
    role: "Technical Review Function",
    icon: Settings2,
    status: "active",
    confidence: 86,
    task: "Validating 10 t/h feed line utility loads",
    output: "Process basis & technical specification",
    authority: "Create engineering drafts and data requests",
    blocked: "Cannot issue signed engineering documents",
    specialty: ["Process design", "Capacity", "Utilities & layout"],
  },
  {
    id: "pmo",
    name: "Project Manager",
    role: "PMO Function",
    icon: Workflow,
    status: "active",
    confidence: 91,
    task: "Rebuilding Gate 3 milestone dependencies",
    output: "Schedule, risk register & action plan",
    authority: "Open tasks and flag schedule variance",
    blocked: "Cannot change contract dates externally",
    specialty: ["WBS", "Milestones", "Risk & dependencies"],
  },
  {
    id: "procurement",
    name: "Supplier Manager",
    role: "Procurement Function",
    icon: SearchCheck,
    status: "review",
    confidence: 82,
    task: "Normalising 4 silo and conveying quotations",
    output: "Supplier comparison & shortlist",
    authority: "Prepare RFQs for approved supplier pool",
    blocked: "Cannot place orders or disclose client identity",
    specialty: ["Supplier discovery", "RFQ", "Commercial comparison"],
  },
  {
    id: "finance",
    name: "Finance Structuring",
    role: "Investment Function",
    icon: HandCoins,
    status: "waiting",
    confidence: 74,
    task: "Waiting for sponsor equity evidence",
    output: "Three-scenario financial model",
    authority: "Model debt, equity, BOT and offtake options",
    blocked: "Cannot promise finance or approve guarantees",
    specialty: ["Cash flow", "Bankability", "Deal structures"],
  },
  {
    id: "legal",
    name: "Contract & Compliance",
    role: "Legal Risk Function",
    icon: Scale,
    status: "review",
    confidence: 88,
    task: "Reviewing development mandate protections",
    output: "Clause risks & compliance checklist",
    authority: "Draft and redline internal documents",
    blocked: "Cannot provide final legal sign-off",
    specialty: ["Contracts", "Sanctions screening", "Project protection"],
  },
  {
    id: "cost",
    name: "Cost Engineering",
    role: "Cost Engineering Function",
    icon: Calculator,
    status: "active",
    confidence: 84,
    task: "Closing logistics and installation scope gaps",
    output: "BOQ, exclusions & target price",
    authority: "Build internal cost and proposal drafts",
    blocked: "Cannot issue a binding commercial offer",
    specialty: ["BOQ", "Cost build-up", "Scope-gap analysis"],
  },
  {
    id: "crm",
    name: "Commercial Intelligence",
    role: "Commercial Intelligence Function",
    icon: Database,
    status: "active",
    confidence: 96,
    task: "Qualifying 6 new opportunity submissions",
    output: "Clean project records & daily brief",
    authority: "Update CRM and request missing internal data",
    blocked: "Cannot send external messages without approval",
    specialty: ["CRM", "Project memory", "Document control"],
  },
  {
    id: "redteam",
    name: "Independent Review",
    role: "Independent Review Function",
    icon: ShieldAlert,
    status: "review",
    confidence: 90,
    task: "Testing downside assumptions and hidden exclusions",
    output: "Contradictions, failure cases & stop conditions",
    authority: "Challenge every specialist output independently",
    blocked: "Cannot modify original analysis or approve work",
    specialty: ["Adversarial review", "Evidence audit", "Failure testing"],
  },
];

const initialDecisions: Decision[] = [
  {
    id: "DEC-0217",
    title: "Move to paid pre-feasibility",
    project: "Sudan Feed Industries",
    recommendation: "Approve with conditions",
    reason: "Land and raw-material pathway are credible; sponsor funding evidence remains incomplete.",
    risk: "Do not release detailed engineering before development mandate and advance payment.",
    value: "$45K development stage",
    status: "pending",
  },
  {
    id: "DEC-0219",
    title: "Open supplier RFQ round",
    project: "Ghana Cold Chain Center",
    recommendation: "Request more information",
    reason: "Cold-room capacity is defined, but grid quality and refrigerant compliance data are missing.",
    risk: "Wrong utility assumptions could move CAPEX by more than 12%.",
    value: "$3.8–4.6M project",
    status: "pending",
  },
  {
    id: "DEC-0221",
    title: "Reject unprotected introduction",
    project: "Cameroon Food Processing Hub",
    recommendation: "Reject current route",
    reason: "Intermediary will not sign a project protection and non-circumvention agreement.",
    risk: "High probability of bypass after technical concept disclosure.",
    value: "Commercial protection",
    status: "pending",
  },
];

const dossierItems = [
  ["Decision-maker", "Verified · Government-linked sponsor", "complete"],
  ["Land evidence", "18,400 m² allocation letter uploaded", "complete"],
  ["Raw material", "Sorghum and maize volumes under review", "review"],
  ["Power", "Grid profile missing · hybrid model proposed", "warning"],
  ["Offtake", "Three poultry producers identified", "review"],
  ["Funding", "Sponsor equity proof requested", "warning"],
  ["Development mandate", "Draft under legal review", "review"],
] as const;

const activity = [
  ["Commercial Intelligence", "Qualified a new dairy-processing lead from Uganda", "8 min"],
  ["Technical Review", "Raised transformer load inconsistency", "24 min"],
  ["Cost Engineering", "Added marine insurance exclusion to cost model", "41 min"],
  ["Independent Review", "Flagged unsupported feedstock-growth assumption", "1 hr"],
];

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
    <section id="project-office" className="border-y border-white/10 bg-[#08120e] py-24">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
        <div className="mb-8 rounded-[24px] border border-[#b21f24]/22 bg-[#b21f24]/8 p-5 text-sm leading-7 text-[#f3e8e8]">
          INTERNAL PROJECT OFFICE — DEMONSTRATION ENVIRONMENT. External commercial and contractual commitments require executive approval.
        </div>

        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_.72fr] lg:items-end">
          <div>
            <div className="eyebrow">Integrated Project Governance</div>
            <h2 className="mt-4 max-w-5xl text-4xl font-semibold tracking-[-0.04em] text-white md:text-6xl">
              A structured project office for evidence-led industrial decisions.
            </h2>
          </div>
          <div className="rounded-[24px] border border-[#d9bc70]/18 bg-[#d9bc70]/6 p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#e1c272]/12 text-[#e1c272]">
                <UserRoundCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-[#9a895e]">Executive approval</div>
                <div className="mt-1 font-semibold text-white">Celal Arslan · Platform President</div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-[#9eada3]">
              Specialist functions analyse, review and prepare recommendations. External commitments, investment decisions, pricing and contracts require executive approval.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-[34px] border border-white/10 bg-[#06100c] shadow-2xl shadow-black/35">
          <div className="flex flex-col gap-4 border-b border-white/8 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-7">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl border border-[#7ad1aa]/20 bg-[#7ad1aa]/8 text-[#88d9b5]">
                  <Network className="h-5 w-5" />
                </div>
                <div>
                <div className="text-sm font-semibold text-white">Novertra Project Office</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#66796d]">Controlled workflow · Evidence required</div>
                </div>
              </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-[#74cba2]/18 bg-[#74cba2]/8 px-3 py-1.5 text-[10px] font-medium text-[#8bd9b8]">
                7 workstreams active
              </span>
              <span className="rounded-full border border-[#d9bc70]/18 bg-[#d9bc70]/7 px-3 py-1.5 text-[10px] font-medium text-[#dcc57f]">
                {pendingDecisions} decisions pending
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[220px_1fr]">
            <aside className="border-b border-white/8 p-4 lg:border-b-0 lg:border-r lg:p-5">
              <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
                {[
                  ["command", Gauge, "Command Center"],
                  ["team", Bot, "Specialist Functions"],
                  ["decisions", ClipboardCheck, "Decision Queue"],
                  ["dossier", Database, "Project Dossier"],
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
                <div className="text-[10px] uppercase tracking-[0.18em] text-[#687a6f]">Governance model</div>
                <div className="mt-3 space-y-3 text-xs text-[#93a39a]">
                  <div className="flex items-start gap-2"><Check className="mt-0.5 h-3.5 w-3.5 text-[#76cba3]" /> Prepare and analyse</div>
                  <div className="flex items-start gap-2"><Eye className="mt-0.5 h-3.5 w-3.5 text-[#d9bd72]" /> Executive review required</div>
                  <div className="flex items-start gap-2"><XCircle className="mt-0.5 h-3.5 w-3.5 text-[#d47d72]" /> No external commitment without approval</div>
                </div>
              </div>
            </aside>

            <div className="min-h-[690px] p-5 md:p-7 lg:p-8">
              {activeTab === "command" && (
                <div>
                  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-[#6d8074]">Executive overview</div>
                    <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">Good morning, Celal.</h3>
                    <p className="mt-2 text-sm text-[#87998e]">Only exceptions, risks and decisions requiring your authority are surfaced here.</p>
                    </div>
                    <button onClick={() => setActiveTab("decisions")} className="inline-flex items-center gap-2 self-start rounded-full bg-[#e1c272] px-5 py-2.5 text-xs font-semibold text-[#09110d]">
                      Review {pendingDecisions} decisions <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {[
                      ["12", "Active projects", BriefcaseBusiness, "3 at decision gate"],
                      ["9", "Specialist functions", Bot, "All systems healthy"],
                      [String(pendingDecisions), "Your decisions", ClipboardCheck, "2 commercially critical"],
                      ["$28.4M", "Qualified pipeline", CircleDollarSign, "+$4.6M this week"],
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
                          <div className="text-sm font-semibold text-white">Decision priority</div>
                          <div className="mt-1 text-[10px] uppercase tracking-[0.17em] text-[#687a6f]">Prepared by Project Coordination + Independent Review</div>
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
                        <div className="text-sm font-semibold text-white">Workstream activity</div>
                        <Activity className="h-4 w-4 text-[#79cba5]" />
                      </div>
                      <div className="mt-5 space-y-5">
                        {activity.map(([agent, text, time]) => (
                          <div key={`${agent}-${time}`} className="flex gap-3">
                            <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#76cba3]" />
                            <div className="min-w-0">
                              <div className="text-xs font-medium text-[#bac6bf]">{agent}</div>
                              <div className="mt-1 text-xs leading-5 text-[#718278]">{text}</div>
                              <div className="mt-1 text-[9px] uppercase tracking-wider text-[#53655a]">{time} ago</div>
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
                      <div className="text-xs uppercase tracking-[0.2em] text-[#6d8074]">Specialist function workforce</div>
                      <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">Nine roles. Explicit boundaries.</h3>
                    </div>
                    <div className="text-xs text-[#718278]">Click a function to inspect its charter and authority.</div>
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
                              {agent.status}
                            </span>
                          </div>
                          <div className="mt-5 text-lg font-semibold text-white">{agent.name}</div>
                          <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[#718278]">{agent.role}</div>
                          <p className="mt-4 line-clamp-2 text-xs leading-5 text-[#85968c]">{agent.task}</p>
                          <div className="mt-5 flex items-center justify-between border-t border-white/7 pt-4">
                            <div>
                              <div className="text-[9px] uppercase tracking-wider text-[#5f7166]">Confidence</div>
                              <div className="mt-1 text-sm font-semibold text-white">{agent.confidence}%</div>
                            </div>
                            <div className="inline-flex items-center gap-1 text-[10px] font-medium text-[#d9bd72] opacity-70 transition group-hover:gap-2 group-hover:opacity-100">
                              Open charter <ChevronRight className="h-3.5 w-3.5" />
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
                    <div className="text-xs uppercase tracking-[0.2em] text-[#6d8074]">Executive approval gate</div>
                    <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">Celal Arslan Decision Queue</h3>
                    <p className="mt-2 text-sm text-[#87998e]">Every external commitment stops here until you approve, reject or request evidence.</p>
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
                            <div className="text-[9px] uppercase tracking-[0.16em] text-[#65776b]">Function recommendation</div>
                            <div className="mt-2 text-sm font-medium text-white">{decision.recommendation}</div>
                          </div>
                          <div className="rounded-2xl border border-white/7 bg-black/10 p-4 md:col-span-2">
                            <div className="text-[9px] uppercase tracking-[0.16em] text-[#65776b]">Reason</div>
                            <div className="mt-2 text-xs leading-5 text-[#9aa9a0]">{decision.reason}</div>
                          </div>
                        </div>

                        <div className="mt-3 flex items-start gap-3 rounded-2xl border border-[#d9bd72]/14 bg-[#d9bd72]/5 p-4 text-xs leading-5 text-[#b4a474]">
                          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" /> {decision.risk}
                        </div>

                        {decision.status === "pending" ? (
                          <div className="mt-5 grid gap-2 sm:grid-cols-3">
                            <button onClick={() => updateDecision(decision.id, "approved")} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#76cba3] px-4 py-3 text-xs font-semibold text-[#07100d]">
                              <CheckCircle2 className="h-4 w-4" /> Approve
                            </button>
                            <button onClick={() => updateDecision(decision.id, "info")} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#d9bd72]/22 bg-[#d9bd72]/6 px-4 py-3 text-xs font-medium text-[#dfc77f]">
                              <FileSearch className="h-4 w-4" /> Request evidence
                            </button>
                            <button onClick={() => updateDecision(decision.id, "rejected")} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/9 px-4 py-3 text-xs font-medium text-[#a3b1a8]">
                              <XCircle className="h-4 w-4" /> Reject
                            </button>
                          </div>
                        ) : (
                          <div className="mt-5 flex items-center justify-between rounded-xl border border-white/8 bg-black/10 px-4 py-3">
                            <div className="flex items-center gap-2 text-xs font-medium text-[#aebcb3]">
                              {decision.status === "approved" ? <CheckCircle2 className="h-4 w-4 text-[#76cba3]" /> : decision.status === "rejected" ? <XCircle className="h-4 w-4 text-[#d47d72]" /> : <FileSearch className="h-4 w-4 text-[#d9bd72]" />}
                              Decision recorded: {decision.status === "info" ? "More evidence requested" : decision.status}
                            </div>
                            <button onClick={() => updateDecision(decision.id, "pending")} className="text-[10px] text-[#718278] underline underline-offset-4">Undo</button>
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
                      <div className="text-xs uppercase tracking-[0.2em] text-[#6d8074]">Single source of truth</div>
                      <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">Project Dossier · BFS-2026-0217</h3>
                    </div>
                    <span className="self-start rounded-full border border-[#d9bd72]/18 bg-[#d9bd72]/7 px-3 py-1.5 text-[10px] font-medium text-[#dcc57f]">Gate 3 · Development</span>
                  </div>

                  <div className="mt-7 grid gap-5 xl:grid-cols-[1.1fr_.9fr]">
                    <div className="rounded-[24px] border border-white/8 bg-black/10 p-5 md:p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold text-white">Evidence register</div>
                          <div className="mt-1 text-[10px] text-[#67796e]">Every function reads and writes against the same structured record.</div>
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
                        <div className="text-sm font-semibold text-white">Function consensus</div>
                        <div className="mt-5 space-y-4">
                          {[
                            ["Technical", "Conditionally feasible", 78],
                            ["Commercial", "Attractive with mandate", 72],
                            ["Finance", "Evidence incomplete", 48],
                            ["Compliance", "Medium country risk", 67],
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
                        <div className="flex items-center gap-2 text-sm font-semibold text-white"><BadgeCheck className="h-4 w-4 text-[#d9bd72]" /> Recommended next gate</div>
                        <div className="mt-3 text-lg font-semibold text-[#e5cd86]">Paid Pre-Feasibility</div>
                        <p className="mt-3 text-xs leading-5 text-[#a99d78]">Release only after development mandate, advance payment and sponsor equity evidence.</p>
                        <button onClick={() => setActiveTab("decisions")} className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[#e2c97f]">Open approval card <ArrowRight className="h-3.5 w-3.5" /></button>
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
                <div className="text-[9px] uppercase tracking-wider text-[#65776b]">Status</div>
                <div className="mt-2 text-sm font-semibold capitalize text-white">{selectedAgent.status}</div>
              </div>
              <div className="rounded-2xl border border-white/8 bg-black/10 p-4">
                <div className="text-[9px] uppercase tracking-wider text-[#65776b]">Confidence</div>
                <div className="mt-2 text-sm font-semibold text-white">{selectedAgent.confidence}%</div>
              </div>
              <div className="rounded-2xl border border-white/8 bg-black/10 p-4">
                <div className="text-[9px] uppercase tracking-wider text-[#65776b]">Primary output</div>
                <div className="mt-2 text-xs font-medium leading-5 text-white">{selectedAgent.output}</div>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-white/8 bg-white/[0.02] p-5">
              <div className="text-[9px] uppercase tracking-[0.16em] text-[#65776b]">Current assignment</div>
              <div className="mt-2 text-sm leading-6 text-[#b0bdb5]">{selectedAgent.task}</div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-[#74cba2]/14 bg-[#74cba2]/5 p-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#8bd9b8]"><CheckCircle2 className="h-4 w-4" /> Permitted authority</div>
                <p className="mt-3 text-xs leading-5 text-[#91aa9e]">{selectedAgent.authority}</p>
              </div>
              <div className="rounded-2xl border border-[#d47d72]/14 bg-[#d47d72]/5 p-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#df9a91]"><XCircle className="h-4 w-4" /> Hard boundary</div>
                <p className="mt-3 text-xs leading-5 text-[#a98d89]">{selectedAgent.blocked}</p>
              </div>
            </div>

            <div className="mt-5">
              <div className="text-[9px] uppercase tracking-[0.16em] text-[#65776b]">Specialist capabilities</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedAgent.specialty.map((item) => <span key={item} className="rounded-full border border-white/9 bg-white/[0.025] px-3 py-1.5 text-[10px] text-[#96a69c]">{item}</span>)}
              </div>
            </div>

            <div className="mt-7 flex items-center justify-between border-t border-white/8 pt-5">
              <div className="flex items-center gap-2 text-[10px] text-[#65776b]"><BadgeCheck className="h-3.5 w-3.5" /> All outputs require cited evidence</div>
              <button onClick={() => setSelectedAgent(null)} className="rounded-full bg-[#e1c272] px-5 py-2.5 text-xs font-semibold text-[#09110d]">Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
