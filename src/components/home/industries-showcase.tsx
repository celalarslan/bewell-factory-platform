"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import { industries } from "@/data/home";
import Reveal from "@/components/ui/reveal";
import SectionHeading from "@/components/ui/section-heading";

export default function IndustriesShowcase() {
  const initial = useMemo(() => industries[0], []);
  const [activeId, setActiveId] = useState(initial.id);

  const active = industries.find((industry) => industry.id === activeId) ?? initial;

  return (
    <section id="industries" className="border-y border-white/10 bg-[#090c10] py-24">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
        <SectionHeading
          eyebrow="Industries We Build"
          title="Integrated industrial systems designed around local needs, supply chains and long-term operating capability."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <div className="grid gap-3">
            {industries.map((industry, index) => {
              const isActive = industry.id === active.id;
              return (
                <Reveal key={industry.id} delay={index * 30}>
                  <button
                    type="button"
                    onClick={() => setActiveId(industry.id)}
                    className={`group w-full rounded-[22px] border px-5 py-4 text-left transition duration-300 ${
                      isActive
                        ? "border-[#b21f24]/55 bg-white/[0.06]"
                        : "border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className={`text-[11px] uppercase tracking-[0.28em] ${isActive ? "text-[#e9dfd7]" : "text-[#8f9a94]"}`}>
                          {String(index + 1).padStart(2, "0")}
                        </div>
                        <div className="mt-2 text-xl font-semibold tracking-[-0.03em] text-white">{industry.name}</div>
                      </div>
                      <ArrowUpRight className={`mt-1 h-4 w-4 ${isActive ? "text-[#d8d0c8]" : "text-[#77817a]"}`} />
                    </div>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-[#9aa59d]">{industry.description}</p>
                  </button>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#0a0e12] min-h-[620px]">
            <div className="absolute inset-0">
              {active.image ? (
                <>
                  <Image
                    key={active.id}
                    src={active.image}
                    alt={active.name}
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 56vw, 100vw"
                    className="object-cover transition-opacity duration-700"
                    style={{ objectPosition: active.imagePosition ?? "center center" }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,11,15,0.86)_0%,rgba(8,11,15,0.36)_42%,rgba(8,11,15,0.18)_100%)]" />
                </>
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(178,31,36,0.14),transparent_22%),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01))]">
                  <div className="industrial-grid absolute inset-0 opacity-20" />
                </div>
              )}
            </div>

            <div className="relative flex h-full min-h-[620px] flex-col justify-between p-6 md:p-8 lg:p-10">
              <div className="max-w-2xl">
                <div className="inline-flex items-center rounded-full border border-white/12 bg-black/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f4ebe3]">
                  {active.name}
                </div>
                <h3 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
                  {active.name}
                </h3>
                <p className="mt-5 max-w-xl text-base leading-8 text-[#e7e3df]">
                  {active.description}
                </p>
                <a
                  href="#start-project"
                  className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/[0.05] px-5 py-3 text-sm font-medium text-white transition hover:bg-white/[0.09]"
                >
                  Explore Capability
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {industries.slice(0, 3).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveId(item.id)}
                    className={`rounded-2xl border px-4 py-4 text-left text-xs uppercase tracking-[0.22em] transition ${
                      item.id === active.id
                        ? "border-[#b21f24]/60 bg-[#b21f24]/18 text-white"
                        : "border-white/10 bg-black/25 text-[#d8ddd7] hover:bg-black/35"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
