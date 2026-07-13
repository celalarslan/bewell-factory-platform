"use client";

import { ArrowRight, Check, ChevronDown, ClipboardCheck } from "lucide-react";
import { useMemo, useState } from "react";
import {
  capacities,
  countries,
  energyOptions,
  financeOptions,
  factoryTypes,
} from "@/data/configurator";
import SectionHeading from "@/components/ui/section-heading";

function money(value: number) {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  return `$${Math.round(value / 1000)}K`;
}

export default function FactoryConfigurator() {
  const [factoryId, setFactoryId] = useState("feed");
  const [country, setCountry] = useState("Sudan");
  const [capacity, setCapacity] = useState("medium");
  const [energy, setEnergy] = useState("hybrid");
  const [funding, setFunding] = useState("structured");
  const [submitted, setSubmitted] = useState(false);

  const selectedFactory = factoryTypes.find((item) => item.id === factoryId) ?? factoryTypes[0];
  const selectedCapacity = capacities.find((item) => item.id === capacity) ?? capacities[1];
  const selectedEnergy = energyOptions.find((item) => item.id === energy) ?? energyOptions[1];
  const SelectedFactoryIcon = selectedFactory.icon;

  const model = useMemo(() => {
    const midpoint = selectedFactory.baseInvestment * selectedCapacity.factor * selectedEnergy.factor;
    return {
      low: midpoint * 0.86,
      high: midpoint * 1.18,
      land: Math.round(selectedFactory.baseLand * selectedCapacity.factor),
      months: Math.round(selectedFactory.baseMonths * (0.9 + selectedCapacity.factor * 0.15)),
      jobs: Math.round(42 * selectedCapacity.factor + (factoryId === "cold" ? 18 : 0)),
      readiness: funding === "secured" ? 78 : funding === "structured" ? 61 : 44,
    };
  }, [selectedFactory, selectedCapacity, selectedEnergy, funding, factoryId]);

  return (
    <section className="border-y border-white/10 bg-[#080b0f] py-24">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
        <div className="mb-12 text-center">
          <SectionHeading
            eyebrow="Factory Configurator"
            title="Turn an idea into a qualified project brief."
            description="Indicative figures are generated for early project screening and do not constitute a binding technical or commercial offer."
            align="center"
          />
        </div>

        <div className="grid overflow-hidden rounded-[32px] border border-white/10 bg-[#0b0e12] lg:grid-cols-[1.12fr_.88fr]">
          <div className="p-6 md:p-9 lg:p-10">
            <div className="grid gap-8">
              <fieldset>
                <legend className="config-label">1. Select factory system</legend>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {factoryTypes.map((item) => {
                    const Icon = item.icon;
                    const active = factoryId === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setFactoryId(item.id)}
                        className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
                          active ? "border-[#b21f24]/55 bg-[#b21f24]/10" : "border-white/10 bg-white/[0.03] hover:border-white/20"
                        }`}
                      >
                        <div
                          className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                            active ? "bg-[#b21f24] text-white" : "bg-white/[0.05] text-[#cfd3cc]"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{item.name}</div>
                          <div className="mt-1 text-[11px] text-[#8c9890]">{item.tag}</div>
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
                      className="h-14 w-full appearance-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition focus:border-[#b21f24]/55"
                    >
                      {countries.map((item) => (
                        <option key={item} value={item} className="bg-[#0b0e12]">
                          {item}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7d8680]" />
                  </div>
                </label>

                <fieldset>
                  <legend className="config-label">3. Capacity band</legend>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {capacities.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setCapacity(item.id)}
                        className={`rounded-2xl border px-3 py-3 text-center transition ${
                          capacity === item.id ? "border-[#b21f24]/55 bg-[#b21f24]/10" : "border-white/10 bg-white/[0.025]"
                        }`}
                      >
                        <div className="text-sm font-semibold text-white">{item.label}</div>
                        <div className="mt-1 text-[10px] text-[#7f8a84]">{item.subtitle}</div>
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
                      type="button"
                      onClick={() => setEnergy(item.id)}
                      className={`rounded-2xl border px-4 py-4 text-sm font-medium transition ${
                        energy === item.id ? "border-[#b21f24]/55 bg-[#b21f24]/10 text-white" : "border-white/10 bg-white/[0.02] text-[#a6b0aa]"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="config-label">5. Funding position</legend>
                <div className="mt-4 grid gap-2 md:grid-cols-3">
                  {financeOptions.map(([id, label]) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setFunding(id)}
                      className={`rounded-2xl border px-4 py-4 text-sm font-medium transition ${
                        funding === id ? "border-[#b21f24]/55 bg-[#b21f24]/10 text-white" : "border-white/10 bg-white/[0.02] text-[#a6b0aa]"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>

          <aside className="border-t border-white/10 bg-[#0f1216] p-6 md:p-9 lg:border-l lg:border-t-0 lg:p-10">
            {!submitted ? (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-[#879089]">Indicative project model</div>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{selectedFactory.name}</h3>
                    <p className="mt-2 text-sm text-[#9aa49d]">
                      {country} · {selectedCapacity.label} scale · {selectedEnergy.label}
                    </p>
                  </div>
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[#b21f24]/20 bg-[#b21f24]/10 text-[#f3dede]">
                    <SelectedFactoryIcon className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  {[
                    [`${money(model.low)}–${money(model.high)}`, "Indicative investment"],
                    [`${model.land.toLocaleString()} m²`, "Indicative land"],
                    [`${model.months} months`, "Delivery window"],
                    [`${model.jobs}+`, "Direct jobs"],
                  ].map(([value, label]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="text-lg font-semibold text-white">{value}</div>
                      <div className="mt-1 text-[11px] leading-4 text-[#79837d]">{label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-7 rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#a4ada7]">Project readiness</span>
                    <span className="font-semibold text-white">{model.readiness}%</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/6">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#b21f24] to-[#f0c87a]" style={{ width: `${model.readiness}%` }} />
                  </div>
                  <p className="mt-4 text-xs leading-5 text-[#79837d]">
                    Readiness reflects funding status only. Land, raw material, market and legal validation remain required.
                  </p>
                </div>

                <div className="mt-7 space-y-3">
                  {[
                    "Country opportunity review",
                    "Raw material & market validation",
                    "Supplier configuration",
                    "Finance pathway assessment",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-[#aab2ab]">
                      <Check className="h-4 w-4 text-[#c82c32]" /> {item}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setSubmitted(true)}
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#b21f24] px-5 py-4 font-semibold text-white transition hover:bg-[#c2252a]"
                >
                  Generate project brief <ArrowRight className="h-4 w-4" />
                </button>
                <p className="mt-3 text-center text-[10px] leading-4 text-[#69756f]">
                  No commercial commitment. Indicative values are generated for qualification purposes.
                </p>
              </>
            ) : (
              <div className="flex min-h-[600px] flex-col justify-center">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-[#b21f24]/12 text-[#f2d1d3]">
                  <ClipboardCheck className="h-7 w-7" />
                </div>
                <div className="mt-6 text-xs uppercase tracking-[0.22em] text-[#879089]">Indicative assessment</div>
                <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white">Preliminary project configuration prepared.</h3>
                <p className="mt-4 text-sm leading-7 text-[#95a199]">
                  Your preliminary {selectedFactory.name.toLowerCase()} brief for {country} is ready for opportunity validation.
                </p>

                <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="text-xs uppercase tracking-widest text-[#7b8480]">Next decision gate</div>
                  <div className="mt-2 text-lg font-semibold text-white">Opportunity Assessment</div>
                  <p className="mt-2 text-xs leading-5 text-[#79837d]">
                    Verify land, raw material, buyer, local partner and funding evidence before detailed engineering.
                  </p>
                </div>

                <div className="mt-7 space-y-3">
                  {["Configuration reviewed locally", "Indicative scenario prepared", "Country checklist outlined", "Development mandate pending"].map((item, index) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-[#aab2ab]">
                      <div className={`grid h-6 w-6 place-items-center rounded-full ${index < 3 ? "bg-[#b21f24]/15 text-[#f1d1d2]" : "border border-white/10 text-[#66706a]"}`}>
                        {index < 3 ? <Check className="h-3.5 w-3.5" /> : index + 1}
                      </div>
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <button type="button" className="rounded-2xl bg-[#b21f24] px-4 py-4 text-sm font-semibold text-white">
                    Review next steps
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="rounded-2xl border border-white/10 px-4 py-4 text-sm font-medium text-white"
                  >
                    Edit configuration
                  </button>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
