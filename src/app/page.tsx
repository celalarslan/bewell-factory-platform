"use client";

import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  Check,
  ChevronDown,
  CircleDollarSign,
  ClipboardCheck,
  Factory,
  Gauge,
  Globe2,
  Leaf,
  Menu,
  PackageCheck,
  PanelTop,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Truck,
  Users,
  Waves,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import AICompanyOS from "@/components/ai-company-os";

const factoryTypes = [
  {
    id: "feed",
    name: "Feed & Grain Hub",
    description: "Animal feed, grain intake, silos, laboratory and packaging.",
    icon: Factory,
    baseInvestment: 3200000,
    baseLand: 18000,
    baseMonths: 11,
    tag: "Recommended pilot",
  },
  {
    id: "cold",
    name: "Cold Chain Center",
    description: "Cold storage, packhouse, reefer handling and food logistics.",
    icon: PackageCheck,
    baseInvestment: 2400000,
    baseLand: 12000,
    baseMonths: 9,
    tag: "Food security",
  },
  {
    id: "dairy",
    name: "Dairy Processing",
    description: "Milk collection, pasteurisation, yoghurt, cheese and cold chain.",
    icon: Waves,
    baseInvestment: 4100000,
    baseLand: 16000,
    baseMonths: 12,
    tag: "High local impact",
  },
  {
    id: "flour",
    name: "Flour Mill",
    description: "Grain cleaning, milling, packaging and finished-goods storage.",
    icon: Building2,
    baseInvestment: 5200000,
    baseLand: 22000,
    baseMonths: 14,
    tag: "Import substitution",
  },
  {
    id: "solar",
    name: "Industrial Utility Module",
    description: "Solar, battery, generator, water treatment and smart controls.",
    icon: SunMedium,
    baseInvestment: 1800000,
    baseLand: 8000,
    baseMonths: 7,
    tag: "Add-on system",
  },
  {
    id: "processing",
    name: "Food Processing Hub",
    description: "Cleaning, drying, grading, packaging and quality laboratory.",
    icon: Leaf,
    baseInvestment: 2900000,
    baseLand: 15000,
    baseMonths: 10,
    tag: "Export ready",
  },
];

const countries = [
  "Sudan",
  "South Sudan",
  "Burkina Faso",
  "Cameroon",
  "Uganda",
  "Nigeria",
  "Zambia",
  "Other African market",
];

const capacities = [
  { id: "small", label: "Small", subtitle: "Entry / pilot", factor: 0.7 },
  { id: "medium", label: "Medium", subtitle: "Commercial scale", factor: 1 },
  { id: "large", label: "Large", subtitle: "Regional supply", factor: 1.65 },
];

const energyOptions = [
  { id: "grid", label: "Grid + backup", factor: 1 },
  { id: "hybrid", label: "Solar hybrid", factor: 1.16 },
  { id: "offgrid", label: "Fully off-grid", factor: 1.28 },
];

function money(value: number) {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  return `$${Math.round(value / 1000)}K`;
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [factoryId, setFactoryId] = useState("feed");
  const [country, setCountry] = useState("Sudan");
  const [capacity, setCapacity] = useState("medium");
  const [energy, setEnergy] = useState("hybrid");
  const [funding, setFunding] = useState("structured");
  const [submitted, setSubmitted] = useState(false);

  const selectedFactory = factoryTypes.find((item) => item.id === factoryId)!;
  const selectedCapacity = capacities.find((item) => item.id === capacity)!;
  const selectedEnergy = energyOptions.find((item) => item.id === energy)!;
  const SelectedFactoryIcon = selectedFactory.icon;

  const model = useMemo(() => {
    const midpoint =
      selectedFactory.baseInvestment * selectedCapacity.factor * selectedEnergy.factor;
    return {
      low: midpoint * 0.86,
      high: midpoint * 1.18,
      land: Math.round(selectedFactory.baseLand * selectedCapacity.factor),
      months: Math.round(selectedFactory.baseMonths * (0.9 + selectedCapacity.factor * 0.15)),
      jobs: Math.round(42 * selectedCapacity.factor + (factoryId === "cold" ? 18 : 0)),
      readiness:
        funding === "secured" ? 78 : funding === "structured" ? 61 : 44,
    };
  }, [selectedFactory, selectedCapacity, selectedEnergy, funding, factoryId]);

  return (
    <main className="min-h-screen bg-[#07100d] text-[#eef5ef] selection:bg-[#d7b86c] selection:text-[#07100d]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-[#07100d]/82 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 lg:px-10">
          <a href="#top" className="group flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-[#d7b86c]/35 bg-[#d7b86c]/10">
              <Factory className="h-5 w-5 text-[#e8ca7c]" />
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9db0a4]">
                Bewell Global
              </div>
              <div className="text-[15px] font-semibold tracking-tight text-white">
                Factory Systems
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-[#afbeb4] lg:flex">
            <a href="#solutions" className="transition hover:text-white">Solutions</a>
            <a href="#how" className="transition hover:text-white">How it works</a>
            <a href="#configure" className="transition hover:text-white">Configurator</a>
            <a href="#ai-office" className="transition hover:text-white">AI Project Office</a>
            <a href="#platform" className="transition hover:text-white">Project portal</a>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button className="rounded-full px-4 py-2 text-sm text-[#afbeb4] transition hover:text-white">
              Client login
            </button>
            <a
              href="#configure"
              className="inline-flex items-center gap-2 rounded-full bg-[#e1c272] px-5 py-2.5 text-sm font-semibold text-[#0b130f] transition hover:-translate-y-0.5 hover:bg-[#f0d68d]"
            >
              Configure a project <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <button
            onClick={() => setMobileOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {mobileOpen && (
          <div className="border-t border-white/8 bg-[#07100d] px-5 py-5 lg:hidden">
            <div className="flex flex-col gap-4 text-sm text-[#c4d0c7]">
              <a href="#solutions" onClick={() => setMobileOpen(false)}>Solutions</a>
              <a href="#how" onClick={() => setMobileOpen(false)}>How it works</a>
              <a href="#configure" onClick={() => setMobileOpen(false)}>Configurator</a>
              <a href="#ai-office" onClick={() => setMobileOpen(false)}>AI Project Office</a>
              <a href="#platform" onClick={() => setMobileOpen(false)}>Project portal</a>
            </div>
          </div>
        )}
      </header>

      <section id="top" className="relative overflow-hidden pt-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-20 h-[420px] w-[420px] rounded-full bg-[#1b6b4b]/18 blur-[110px]" />
          <div className="absolute right-[-100px] top-[-80px] h-[520px] w-[520px] rounded-full bg-[#bd9d4f]/12 blur-[130px]" />
          <div className="industrial-grid absolute inset-0 opacity-30" />
        </div>

        <div className="relative mx-auto grid min-h-[760px] max-w-[1440px] items-center gap-14 px-5 py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-10 lg:py-28">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#8ad8b2]/20 bg-[#8ad8b2]/8 px-4 py-2 text-xs font-medium tracking-wide text-[#a7e3c5]">
              <Sparkles className="h-3.5 w-3.5" /> Türkiye engineering. Africa execution.
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] text-white md:text-7xl xl:text-[86px]">
              From African demand to an operating factory.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#aebdb3] md:text-xl">
              We configure, finance, deliver and operate modular industrial facilities by combining Türkiye&apos;s manufacturing base with local African opportunity.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#configure"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#e1c272] px-6 py-3.5 font-semibold text-[#0b130f] transition hover:-translate-y-0.5 hover:bg-[#f0d68d]"
              >
                Build your project <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#solutions"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3.5 font-medium text-white transition hover:bg-white/[0.07]"
              >
                Explore factory systems
              </a>
              <a
                href="#ai-office"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#79d5ad]/18 bg-[#79d5ad]/7 px-6 py-3.5 font-medium text-[#a6dfc4] transition hover:bg-[#79d5ad]/12"
              >
                Meet the AI project office
              </a>
            </div>

            <div className="mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/10 pt-7">
              {[
                ["6", "Factory systems"],
                ["4", "Financing models"],
                ["1", "Accountable integrator"],
              ].map(([value, label]) => (
                <div key={label}>
                  <div className="text-2xl font-semibold text-white md:text-3xl">{value}</div>
                  <div className="mt-1 text-xs leading-5 text-[#8fa094] md:text-sm">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-5 rounded-[36px] bg-gradient-to-br from-[#79d5ad]/10 via-transparent to-[#d9bb6d]/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[32px] border border-white/12 bg-[#0b1712]/92 shadow-2xl shadow-black/35">
              <div className="flex items-center justify-between border-b border-white/8 px-6 py-5">
                <div>
                  <div className="text-xs uppercase tracking-[0.22em] text-[#7e9185]">Live project model</div>
                  <div className="mt-1 font-semibold text-white">Integrated Feed & Grain Hub</div>
                </div>
                <div className="rounded-full border border-[#73d1a7]/20 bg-[#73d1a7]/10 px-3 py-1 text-xs font-medium text-[#95dfbe]">
                  Configurable
                </div>
              </div>

              <div className="relative h-[340px] overflow-hidden border-b border-white/8 p-6">
                <div className="absolute inset-0 factory-floor opacity-70" />
                <div className="relative h-full">
                  <div className="absolute left-[6%] top-[18%] h-[52%] w-[30%] rounded-xl border border-[#e5c777]/40 bg-[#d2b45d]/10 shadow-[0_0_80px_rgba(214,184,103,0.08)]">
                    <div className="absolute inset-x-4 top-4 flex items-center justify-between text-[10px] uppercase tracking-widest text-[#e2cc91]">
                      Processing <Factory className="h-3.5 w-3.5" />
                    </div>
                    <div className="absolute inset-x-5 bottom-5 space-y-2">
                      <div className="h-2 rounded-full bg-[#d9bb6d]/30" />
                      <div className="h-2 w-4/5 rounded-full bg-[#d9bb6d]/20" />
                      <div className="h-2 w-2/3 rounded-full bg-[#d9bb6d]/15" />
                    </div>
                  </div>
                  <div className="absolute right-[7%] top-[12%] flex gap-3">
                    {[0, 1, 2].map((item) => (
                      <div key={item} className="relative h-28 w-12 rounded-t-full border border-[#8bd6b3]/35 bg-[#5fbd93]/8">
                        <div className="absolute inset-x-2 bottom-2 h-14 rounded-t-full bg-[#67c59a]/12" />
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-[12%] right-[5%] h-[26%] w-[43%] rounded-xl border border-white/12 bg-white/[0.035]">
                    <div className="grid h-full grid-cols-3 gap-2 p-3">
                      {[0, 1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="rounded-md border border-white/8 bg-white/[0.025]" />
                      ))}
                    </div>
                  </div>
                  <div className="absolute bottom-[3%] left-[3%] flex items-center gap-2 rounded-full border border-white/10 bg-[#08110d]/80 px-3 py-2 text-[11px] text-[#9fb0a5] backdrop-blur-md">
                    <Zap className="h-3.5 w-3.5 text-[#e0c16e]" /> Solar hybrid utility
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 divide-x divide-white/8">
                {[
                  ["$3.8–5.2M", "Investment class"],
                  ["18–24K m²", "Indicative land"],
                  ["10–13 mo", "Delivery window"],
                ].map(([value, label]) => (
                  <div key={label} className="px-5 py-5">
                    <div className="font-semibold text-white">{value}</div>
                    <div className="mt-1 text-[11px] leading-4 text-[#829187]">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="solutions" className="border-y border-white/8 bg-[#09130f] py-24">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="eyebrow">Modular industrial systems</div>
              <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.035em] text-white md:text-6xl">
                Start focused. Expand without rebuilding.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-[#95a69b]">
              Each system is designed in scalable capacity bands and can include energy, water, civil works, automation and operating support.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {factoryTypes.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setFactoryId(item.id);
                    document.getElementById("configure")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group relative min-h-[260px] overflow-hidden rounded-[26px] border border-white/9 bg-white/[0.025] p-6 text-left transition duration-300 hover:-translate-y-1 hover:border-[#dabe72]/35 hover:bg-white/[0.045]"
                >
                  <div className="absolute right-0 top-0 text-[90px] font-semibold leading-none text-white/[0.018]">
                    0{index + 1}
                  </div>
                  <div className="flex items-start justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.035] text-[#dbbd70]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-white/8 px-3 py-1 text-[10px] uppercase tracking-widest text-[#819087]">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="mt-8 text-2xl font-semibold tracking-tight text-white">{item.name}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-[#8fa096]">{item.description}</p>
                  <div className="absolute bottom-6 left-6 flex items-center gap-2 text-sm font-medium text-[#d7be7b] opacity-70 transition group-hover:gap-3 group-hover:opacity-100">
                    Configure system <ArrowRight className="h-4 w-4" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="how" className="py-24">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <div className="eyebrow">One accountable partner</div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-white md:text-6xl">
                Not machinery. A complete industrial outcome.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-[#93a49a]">
                Bewell remains the client-facing project architect while selected Turkish manufacturers, engineering teams and local partners operate inside one controlled delivery system.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { icon: Globe2, step: "01", title: "Opportunity validation", text: "Country, market, raw material, land, buyer and decision-maker are verified before engineering begins." },
                { icon: BarChart3, step: "02", title: "Project configuration", text: "Capacity, process, utilities, buildings, automation and expansion phases are configured as one system." },
                { icon: CircleDollarSign, step: "03", title: "Deal structuring", text: "EPC, export credit, investor SPV, offtake or BOT structures are matched to project bankability." },
                { icon: Truck, step: "04", title: "Delivery & commissioning", text: "Procurement, quality, logistics, installation, performance testing and operator training are centrally managed." },
                { icon: Gauge, step: "05", title: "Operate & optimise", text: "Remote monitoring, spare parts, maintenance and first-year operating support protect the investment." },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.step} className="group grid gap-5 rounded-[24px] border border-white/8 bg-white/[0.02] p-6 transition hover:bg-white/[0.04] md:grid-cols-[70px_1fr_46px] md:items-center">
                    <div className="text-sm font-semibold tracking-widest text-[#64776b]">{item.step}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#8fa096]">{item.text}</p>
                    </div>
                    <div className="grid h-11 w-11 place-items-center rounded-xl border border-[#d8bc74]/15 bg-[#d8bc74]/7 text-[#d8bc74]">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="configure" className="border-y border-white/8 bg-[#0a1511] py-24">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
          <div className="mb-12 text-center">
            <div className="eyebrow justify-center">Interactive project configurator</div>
            <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.035em] text-white md:text-6xl">
              Turn an idea into a qualified project brief.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#93a49a]">
              A preliminary model only. Final design, pricing and bankability require validated country data and a signed development mandate.
            </p>
          </div>

          <div className="grid overflow-hidden rounded-[32px] border border-white/10 bg-[#07100d] shadow-2xl shadow-black/30 lg:grid-cols-[1.12fr_.88fr]">
            <div className="p-6 md:p-9 lg:p-10">
              <div className="grid gap-8">
                <fieldset>
                  <legend className="config-label">1. Select factory system</legend>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {factoryTypes.slice(0, 4).map((item) => {
                      const Icon = item.icon;
                      const active = factoryId === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setFactoryId(item.id)}
                          className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${active ? "border-[#e0c16e]/60 bg-[#e0c16e]/10" : "border-white/9 bg-white/[0.02] hover:border-white/18"}`}
                        >
                          <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${active ? "bg-[#e0c16e] text-[#07100d]" : "bg-white/[0.045] text-[#a6b6ac]"}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white">{item.name}</div>
                            <div className="mt-1 text-[11px] text-[#76877d]">{item.tag}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="grid gap-6 md:grid-cols-2">
                  <label>
                    <span className="config-label">2. Target market</span>
                    <div className="relative mt-4">
                      <select
                        value={country}
                        onChange={(event) => setCountry(event.target.value)}
                        className="h-14 w-full appearance-none rounded-2xl border border-white/10 bg-white/[0.035] px-4 text-sm text-white outline-none transition focus:border-[#dabe72]/50"
                      >
                        {countries.map((item) => <option key={item} value={item} className="bg-[#0a1511]">{item}</option>)}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#78887f]" />
                    </div>
                  </label>

                  <fieldset>
                    <legend className="config-label">3. Capacity band</legend>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {capacities.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setCapacity(item.id)}
                          className={`rounded-2xl border px-3 py-3 text-center transition ${capacity === item.id ? "border-[#7bd2aa]/50 bg-[#7bd2aa]/10" : "border-white/9 bg-white/[0.025]"}`}
                        >
                          <div className="text-sm font-semibold text-white">{item.label}</div>
                          <div className="mt-1 text-[10px] text-[#76877d]">{item.subtitle}</div>
                        </button>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <fieldset>
                  <legend className="config-label">4. Energy model</legend>
                  <div className="mt-4 grid gap-2 md:grid-cols-3">
                    {energyOptions.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setEnergy(item.id)}
                        className={`rounded-2xl border px-4 py-4 text-sm font-medium transition ${energy === item.id ? "border-[#e0c16e]/55 bg-[#e0c16e]/9 text-white" : "border-white/9 bg-white/[0.02] text-[#9cad9f]"}`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="config-label">5. Funding position</legend>
                  <div className="mt-4 grid gap-2 md:grid-cols-3">
                    {[
                      ["secured", "Capital secured"],
                      ["structured", "Needs structuring"],
                      ["early", "Early-stage concept"],
                    ].map(([id, label]) => (
                      <button
                        key={id}
                        onClick={() => setFunding(id)}
                        className={`rounded-2xl border px-4 py-4 text-sm font-medium transition ${funding === id ? "border-[#7bd2aa]/50 bg-[#7bd2aa]/9 text-white" : "border-white/9 bg-white/[0.02] text-[#9cad9f]"}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>

            <aside className="border-t border-white/8 bg-[#0d1b15] p-6 md:p-9 lg:border-l lg:border-t-0 lg:p-10">
              {!submitted ? (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-[#6f8377]">Preliminary project model</div>
                      <h3 className="mt-2 text-2xl font-semibold text-white">{selectedFactory.name}</h3>
                      <p className="mt-2 text-sm text-[#8fa096]">{country} · {selectedCapacity.label} scale · {selectedEnergy.label}</p>
                    </div>
                    <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[#dabe72]/20 bg-[#dabe72]/8 text-[#dabe72]">
                      <SelectedFactoryIcon className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-3">
                    {[
                      [money(model.low) + "–" + money(model.high), "Indicative investment"],
                      [model.land.toLocaleString() + " m²", "Indicative land"],
                      [model.months + " months", "Delivery window"],
                      [model.jobs + "+", "Direct jobs"],
                    ].map(([value, label]) => (
                      <div key={label} className="rounded-2xl border border-white/8 bg-black/10 p-4">
                        <div className="text-lg font-semibold text-white">{value}</div>
                        <div className="mt-1 text-[11px] leading-4 text-[#75887c]">{label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 rounded-2xl border border-white/8 bg-black/10 p-5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#9dad9f]">Project readiness</span>
                      <span className="font-semibold text-white">{model.readiness}%</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/6">
                      <div className="h-full rounded-full bg-gradient-to-r from-[#61b98d] to-[#e1c272] transition-all duration-500" style={{ width: `${model.readiness}%` }} />
                    </div>
                    <p className="mt-4 text-xs leading-5 text-[#74867a]">
                      Readiness reflects funding status only. Land, raw material, market and legal validation remain required.
                    </p>
                  </div>

                  <div className="mt-7 space-y-3">
                    {["Country opportunity review", "Raw material & market validation", "Supplier configuration", "Finance pathway assessment"].map((item) => (
                      <div key={item} className="flex items-center gap-3 text-sm text-[#a5b4aa]">
                        <Check className="h-4 w-4 text-[#76cba3]" /> {item}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setSubmitted(true)}
                    className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#e1c272] px-5 py-4 font-semibold text-[#09110d] transition hover:bg-[#efd58b]"
                  >
                    Generate project brief <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="mt-3 text-center text-[10px] leading-4 text-[#617268]">
                    No commercial commitment. Indicative values are generated for qualification purposes.
                  </p>
                </>
              ) : (
                <div className="flex min-h-[600px] flex-col justify-center">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-[#73cda4]/12 text-[#8fddb9]">
                    <ClipboardCheck className="h-7 w-7" />
                  </div>
                  <div className="mt-6 text-xs uppercase tracking-[0.22em] text-[#6f8377]">Project brief created</div>
                  <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white">BFS-{new Date().getFullYear()}-0217</h3>
                  <p className="mt-4 text-sm leading-7 text-[#91a198]">
                    Your preliminary {selectedFactory.name.toLowerCase()} brief for {country} is ready for opportunity validation.
                  </p>

                  <div className="mt-8 rounded-2xl border border-white/9 bg-black/10 p-5">
                    <div className="text-xs uppercase tracking-widest text-[#6c7c72]">Next decision gate</div>
                    <div className="mt-2 text-lg font-semibold text-white">Opportunity Assessment</div>
                    <p className="mt-2 text-xs leading-5 text-[#788a7f]">Verify land, raw material, buyer, local partner and funding evidence before detailed engineering.</p>
                  </div>

                  <div className="mt-7 space-y-3">
                    {["Project workspace created", "Configuration snapshot saved", "Country checklist prepared", "Development mandate pending"].map((item, index) => (
                      <div key={item} className="flex items-center gap-3 text-sm text-[#a7b5ac]">
                        <div className={`grid h-6 w-6 place-items-center rounded-full ${index < 3 ? "bg-[#72c99f]/12 text-[#84d8b2]" : "border border-white/10 text-[#66776c]"}`}>
                          {index < 3 ? <Check className="h-3.5 w-3.5" /> : index + 1}
                        </div>
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    <button className="rounded-2xl bg-[#e1c272] px-4 py-4 text-sm font-semibold text-[#08110d]">Open project portal</button>
                    <button onClick={() => setSubmitted(false)} className="rounded-2xl border border-white/10 px-4 py-4 text-sm font-medium text-white">Edit configuration</button>
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      <AICompanyOS />

      <section id="platform" className="py-24">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
          <div className="grid items-center gap-14 lg:grid-cols-[.85fr_1.15fr]">
            <div>
              <div className="eyebrow">Client project portal</div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-white md:text-6xl">
                One source of truth from mandate to operation.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-[#93a49a]">
                Every qualified project receives a secure workspace for documents, milestones, approvals, payments, supplier progress and commissioning records.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  [ShieldCheck, "Secure data room"],
                  [PanelTop, "Live milestone board"],
                  [Users, "Role-based access"],
                  [BadgeCheck, "Approval trail"],
                ].map(([Icon, label]) => {
                  const LucideIcon = Icon as typeof ShieldCheck;
                  return (
                    <div key={label as string} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4 text-sm text-[#abb9b0]">
                      <LucideIcon className="h-4 w-4 text-[#d8bb70]" /> {label as string}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[#0a1511] shadow-2xl shadow-black/30">
              <div className="flex items-center justify-between border-b border-white/8 px-5 py-4 md:px-7">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#d8bb70]/10 text-[#d8bb70]"><Factory className="h-4 w-4" /></div>
                  <div>
                    <div className="text-sm font-semibold text-white">Sudan Feed Industries</div>
                    <div className="text-[10px] uppercase tracking-widest text-[#6e8074]">Project BFS-2026-0217</div>
                  </div>
                </div>
                <span className="rounded-full border border-[#72c99f]/20 bg-[#72c99f]/8 px-3 py-1 text-[10px] font-medium text-[#89d9b5]">Gate 3 · Development</span>
              </div>

              <div className="grid md:grid-cols-[170px_1fr]">
                <div className="border-b border-white/8 p-4 md:border-b-0 md:border-r md:p-5">
                  <div className="space-y-1">
                    {[
                      [BarChart3, "Overview", true],
                      [ClipboardCheck, "Milestones", false],
                      [PanelTop, "Documents", false],
                      [CircleDollarSign, "Finance", false],
                      [Users, "Stakeholders", false],
                    ].map(([Icon, label, active]) => {
                      const NavIcon = Icon as typeof BarChart3;
                      return (
                        <div key={label as string} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-xs ${active ? "bg-white/[0.055] text-white" : "text-[#74857a]"}`}>
                          <NavIcon className="h-4 w-4" /> {label as string}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-5 md:p-7">
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      ["61%", "Readiness"],
                      ["4 / 7", "Validation items"],
                      ["12 Aug", "Next review"],
                    ].map(([value, label]) => (
                      <div key={label} className="rounded-2xl border border-white/8 bg-black/10 p-4">
                        <div className="text-xl font-semibold text-white">{value}</div>
                        <div className="mt-1 text-[10px] text-[#74867a]">{label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl border border-white/8 bg-black/10 p-5">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-white">Development milestones</div>
                      <div className="text-[10px] uppercase tracking-widest text-[#74867a]">Updated today</div>
                    </div>
                    <div className="mt-5 space-y-4">
                      {[
                        ["Country opportunity review", "Complete", 100],
                        ["Raw material validation", "In review", 72],
                        ["Land & utilities evidence", "Pending client", 46],
                        ["Supplier budgetary configuration", "Queued", 16],
                      ].map(([title, status, progress]) => (
                        <div key={title as string}>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-[#a9b7ae]">{title as string}</span>
                            <span className="text-[#718278]">{status as string}</span>
                          </div>
                          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/6">
                            <div className="h-full rounded-full bg-[#74cba2]" style={{ width: `${Number(progress)}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/8 bg-[#050b08] py-10">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-6 px-5 md:flex-row md:items-center lg:px-10">
          <div>
            <div className="text-sm font-semibold text-white">Bewell Factory Systems</div>
            <div className="mt-1 text-xs text-[#64756a]">Project development · Engineering integration · Africa execution</div>
          </div>
          <div className="text-xs text-[#596a60]">A Bewell Global A.Ş. initiative · İzmir, Türkiye</div>
        </div>
      </footer>
    </main>
  );
}
