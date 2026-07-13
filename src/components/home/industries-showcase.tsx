"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import { industries } from "@/data/home";
import Reveal from "@/components/ui/reveal";
import SectionHeading from "@/components/ui/section-heading";

function IndustryDetailGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border-t border-white/15 py-5 first:border-t-0 first:pt-0 xl:border-l xl:border-t-0 xl:px-5 xl:py-0 xl:first:border-l-0 xl:first:pl-0">
      <h4 className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c8c1ba]">
        {title}
      </h4>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[13px] leading-5 text-[#e1ddd8]">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#b21f24]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function IndustriesShowcase() {
  const initial = useMemo(() => industries[0], []);
  const [activeKey, setActiveKey] = useState(initial.key);

  const active = industries.find((industry) => industry.key === activeKey) ?? initial;

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
              const isActive = industry.key === active.key;
              return (
                <Reveal key={industry.key} delay={index * 30}>
                  <button
                    type="button"
                    onClick={() => setActiveKey(industry.key)}
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
                        <div className="mt-2 text-xl font-semibold tracking-[-0.03em] text-white">{industry.title}</div>
                      </div>
                      <ArrowUpRight className={`mt-1 h-4 w-4 ${isActive ? "text-[#d8d0c8]" : "text-[#77817a]"}`} />
                    </div>
                    <p className="mt-3 line-clamp-2 max-w-xl text-sm leading-6 text-[#9aa59d]">{industry.description}</p>
                  </button>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="relative min-h-[760px] overflow-hidden rounded-[30px] border border-white/10 bg-[#0a0e12]">
            <div className="absolute inset-0">
              {active.image ? (
                <>
                  <Image
                    key={active.key}
                    src={active.image}
                    alt={active.title}
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 56vw, 100vw"
                    className="object-cover transition-opacity duration-700"
                    style={{ objectPosition: active.imagePosition ?? "center center" }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,11,15,0.56)_0%,rgba(8,11,15,0.76)_38%,rgba(8,11,15,0.97)_100%)]" />
                </>
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(178,31,36,0.14),transparent_22%),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01))]">
                  <div className="industrial-grid absolute inset-0 opacity-20" />
                </div>
              )}
            </div>

            <div className="relative flex h-full min-h-[760px] flex-col justify-between p-6 md:p-8 lg:p-10">
              <div className="max-w-2xl">
                <div className="inline-flex items-center rounded-full border border-white/12 bg-black/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f4ebe3]">
                  {active.title}
                </div>
                <h3 className="mt-5 max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
                  {active.title}
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

              <div className="mt-10 border-t border-white/20 pt-6">
                <div className="grid xl:grid-cols-3">
                  <IndustryDetailGroup title="What We Develop" items={active.developmentAreas} />
                  <IndustryDetailGroup title="Typical Delivery Scope" items={active.deliveryScope} />
                  <IndustryDetailGroup title="Suitable Project Models" items={active.projectModels} />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
