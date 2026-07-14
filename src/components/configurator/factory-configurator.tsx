"use client";

import { ArrowRight, Check, ChevronDown, ClipboardCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { factoryTypes } from "@/data/configurator";
import SectionHeading from "@/components/ui/section-heading";
import type { PublicContent } from "@/i18n/public-content";

function money(value: number) {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  return `$${Math.round(value / 1_000)}K`;
}

export default function FactoryConfigurator({ content, startProjectHref }: { content: PublicContent["configurator"]; startProjectHref: string }) {
  const [factoryId, setFactoryId] = useState("feed");
  const [country, setCountry] = useState(content.countries[0]);
  const [capacity, setCapacity] = useState("medium");
  const [energy, setEnergy] = useState("hybrid");
  const [funding, setFunding] = useState("structured");
  const [submitted, setSubmitted] = useState(false);

  const factoryBase = factoryTypes.find((item) => item.id === factoryId) ?? factoryTypes[0];
  const factoryText = content.factories.find((item) => item.id === factoryId) ?? content.factories[0];
  const capacityText = content.capacities.find((item) => item.id === capacity) ?? content.capacities[1];
  const energyText = content.energyOptions.find((item) => item.id === energy) ?? content.energyOptions[1];
  const capacityFactor = capacity === "small" ? 0.7 : capacity === "large" ? 1.65 : 1;
  const energyFactor = energy === "hybrid" ? 1.16 : energy === "offgrid" ? 1.28 : 1;
  const SelectedFactoryIcon = factoryBase.icon;

  const model = useMemo(() => {
    const midpoint = factoryBase.baseInvestment * capacityFactor * energyFactor;
    return {
      low: midpoint * 0.86,
      high: midpoint * 1.18,
      land: Math.round(factoryBase.baseLand * capacityFactor),
      months: Math.round(factoryBase.baseMonths * (0.9 + capacityFactor * 0.15)),
      jobs: Math.round(42 * capacityFactor + (factoryId === "cold" ? 18 : 0)),
      readiness: funding === "secured" ? 78 : funding === "structured" ? 61 : 44,
    };
  }, [capacityFactor, energyFactor, factoryBase, factoryId, funding]);

  return (
    <section className="border-y border-white/10 bg-[#080b0f] py-24">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
        <div className="mb-12 text-center">
          <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} align="center" level="h1" />
        </div>

        <div className="grid overflow-hidden rounded-[32px] border border-white/10 bg-[#0b0e12] lg:grid-cols-[1.12fr_.88fr]">
          <div className="p-6 md:p-9 lg:p-10">
            <div className="grid gap-8">
              <fieldset>
                <legend className="config-label">{content.factoryLabel}</legend>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {factoryTypes.map((item) => {
                    const text = content.factories.find((entry) => entry.id === item.id)!;
                    const Icon = item.icon;
                    const active = factoryId === item.id;
                    return (
                      <button key={item.id} type="button" aria-pressed={active} onClick={() => { setFactoryId(item.id); setSubmitted(false); }} className={`flex min-h-16 items-center gap-3 rounded-2xl border p-4 text-start transition ${active ? "border-[#b21f24]/55 bg-[#b21f24]/10" : "border-white/10 bg-white/[0.03] hover:border-white/20"}`}>
                        <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${active ? "bg-[#b21f24] text-white" : "bg-white/[0.05] text-[#cfd3cc]"}`}><Icon className="h-5 w-5" /></div>
                        <div><div className="text-sm font-semibold text-white">{text.name}</div><div className="mt-1 text-[11px] text-[#8c9890]">{text.tag}</div></div>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="grid gap-6 md:grid-cols-2">
                <label>
                  <span className="config-label">{content.marketLabel}</span>
                  <div className="relative mt-4">
                    <select value={country} onChange={(event) => { setCountry(event.target.value); setSubmitted(false); }} className="h-14 w-full appearance-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 pe-11 text-sm text-white outline-none transition focus:border-[#b21f24]/55">
                      {content.countries.map((item) => <option key={item} value={item} className="bg-[#0b0e12]">{item}</option>)}
                    </select>
                    <ChevronDown className="pointer-events-none absolute end-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7d8680]" />
                  </div>
                </label>

                <fieldset>
                  <legend className="config-label">{content.capacityLabel}</legend>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {content.capacities.map((item) => (
                      <button key={item.id} type="button" aria-pressed={capacity === item.id} onClick={() => { setCapacity(item.id); setSubmitted(false); }} className={`min-h-14 rounded-2xl border px-2 py-3 text-center transition ${capacity === item.id ? "border-[#b21f24]/55 bg-[#b21f24]/10" : "border-white/10 bg-white/[0.025]"}`}>
                        <div className="text-sm font-semibold text-white">{item.label}</div><div className="mt-1 text-[10px] text-[#7f8a84]">{item.subtitle}</div>
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>

              <fieldset>
                <legend className="config-label">{content.energyLabel}</legend>
                <div className="mt-4 grid gap-2 md:grid-cols-3">
                  {content.energyOptions.map((item) => <button key={item.id} type="button" aria-pressed={energy === item.id} onClick={() => { setEnergy(item.id); setSubmitted(false); }} className={`min-h-12 rounded-2xl border px-4 py-4 text-sm font-medium transition ${energy === item.id ? "border-[#b21f24]/55 bg-[#b21f24]/10 text-white" : "border-white/10 bg-white/[0.02] text-[#a6b0aa]"}`}>{item.label}</button>)}
                </div>
              </fieldset>

              <fieldset>
                <legend className="config-label">{content.fundingLabel}</legend>
                <div className="mt-4 grid gap-2 md:grid-cols-3">
                  {content.financeOptions.map((item) => <button key={item.id} type="button" aria-pressed={funding === item.id} onClick={() => { setFunding(item.id); setSubmitted(false); }} className={`min-h-12 rounded-2xl border px-4 py-4 text-sm font-medium transition ${funding === item.id ? "border-[#b21f24]/55 bg-[#b21f24]/10 text-white" : "border-white/10 bg-white/[0.02] text-[#a6b0aa]"}`}>{item.label}</button>)}
                </div>
              </fieldset>
            </div>
          </div>

          <aside className="border-t border-white/10 bg-[#0f1216] p-6 md:p-9 lg:border-s lg:border-t-0 lg:p-10">
            {!submitted ? (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div><div className="text-xs uppercase tracking-[0.16em] text-[#879089]">{content.modelLabel}</div><h2 className="mt-2 text-2xl font-semibold text-white">{factoryText.name}</h2><p className="mt-2 text-sm text-[#9aa49d]">{country} · {capacityText.label} {content.scale} · {energyText.label}</p></div>
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[#b21f24]/20 bg-[#b21f24]/10 text-[#f3dede]"><SelectedFactoryIcon className="h-5 w-5" /></div>
                </div>
                <p className="mt-4 text-xs leading-5 text-[#7f8a84]">{factoryText.description}</p>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  {[[`${money(model.low)}–${money(model.high)}`, content.investment], [`${model.land.toLocaleString()} m²`, content.land], [`${model.months} ${content.months}`, content.window], [`${model.jobs}+`, content.jobs]].map(([value, label]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-black/20 p-4"><div dir="ltr" className="text-lg font-semibold text-white">{value}</div><div className="mt-1 text-[11px] leading-4 text-[#79837d]">{label}</div></div>
                  ))}
                </div>

                <div className="mt-7 rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="flex items-center justify-between text-sm"><span className="text-[#a4ada7]">{content.readiness}</span><span className="font-semibold text-white">{model.readiness}%</span></div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/6"><div className="h-full rounded-full bg-gradient-to-r from-[#b21f24] to-[#f0c87a]" style={{ width: `${model.readiness}%` }} /></div>
                  <p className="mt-4 text-xs leading-5 text-[#79837d]">{content.readinessNote}</p>
                </div>

                <div className="mt-7 space-y-3">{content.checklist.map((item) => <div key={item} className="flex items-center gap-3 text-sm text-[#aab2ab]"><Check className="h-4 w-4 shrink-0 text-[#c82c32]" /> {item}</div>)}</div>

                <button type="button" onClick={() => setSubmitted(true)} className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#b21f24] px-5 py-4 font-semibold text-white transition hover:bg-[#c2252a]">{content.generate} <ArrowRight className="directional-icon h-4 w-4" /></button>
                <p className="mt-3 text-center text-[10px] leading-4 text-[#69756f]">{content.disclaimer}</p>
              </>
            ) : (
              <div className="flex min-h-[600px] flex-col justify-center" role="status">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-[#b21f24]/12 text-[#f2d1d3]"><ClipboardCheck className="h-7 w-7" /></div>
                <div className="mt-6 text-xs uppercase tracking-[0.16em] text-[#879089]">{content.resultEyebrow}</div>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">{content.resultTitle}</h2>
                <p className="mt-4 text-sm leading-7 text-[#95a199]">{content.resultDescription}</p>
                <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5"><div className="text-xs uppercase tracking-widest text-[#7b8480]">{content.gateLabel}</div><div className="mt-2 text-lg font-semibold text-white">{content.gateTitle}</div><p className="mt-2 text-xs leading-5 text-[#79837d]">{content.gateDescription}</p></div>
                <div className="mt-7 space-y-3">{content.resultSteps.map((item, index) => <div key={item} className="flex items-center gap-3 text-sm text-[#aab2ab]"><div className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${index < 3 ? "bg-[#b21f24]/15 text-[#f1d1d2]" : "border border-white/10 text-[#66706a]"}`}>{index < 3 ? <Check className="h-3.5 w-3.5" /> : index + 1}</div>{item}</div>)}</div>
                <div className="mt-8 grid gap-3 sm:grid-cols-2"><a href={startProjectHref} className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#b21f24] px-4 py-4 text-center text-sm font-semibold text-white">{content.next}</a><button type="button" onClick={() => setSubmitted(false)} className="min-h-12 rounded-2xl border border-white/10 px-4 py-4 text-sm font-medium text-white">{content.edit}</button></div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
