import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { PublicContent } from "@/i18n/public-content";

export default function HeroSection({ content, rtl }: { content: PublicContent["hero"]; rtl: boolean }) {
  return (
    <section id="top" className="relative min-h-[78vh] overflow-hidden pt-20 md:min-h-[88vh]">
      <div className="absolute inset-0">
        <Image
          src="/assets/optimized/novertra-industrial-hero.webp"
          alt={content.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center]"
        />
        <div className={`absolute inset-0 ${rtl ? "bg-[linear-gradient(270deg,rgba(8,11,15,0.96)_0%,rgba(8,11,15,0.86)_36%,rgba(8,11,15,0.56)_58%,rgba(8,11,15,0.14)_100%)]" : "bg-[linear-gradient(90deg,rgba(8,11,15,0.96)_0%,rgba(8,11,15,0.86)_36%,rgba(8,11,15,0.56)_58%,rgba(8,11,15,0.14)_100%)]"}`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_38%,rgba(178,31,36,0.12),transparent_26%),radial-gradient(circle_at_20%_25%,rgba(255,255,255,0.05),transparent_18%)]" />
        <div className="industrial-grid absolute inset-0 opacity-25" />
      </div>

      <div className="relative mx-auto grid min-h-[calc(78vh-80px)] max-w-[1440px] items-center px-5 py-14 md:min-h-[calc(88vh-80px)] md:py-16 lg:px-10">
        <div className="max-w-4xl">
          <p className="max-w-xl text-[11px] font-semibold tracking-[0.24em] text-[#d6d2cb] sm:tracking-[0.32em] md:text-[13px]">
            {content.eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl text-[46px] font-semibold leading-[0.94] tracking-[-0.055em] text-white sm:text-5xl md:text-7xl xl:text-[92px]">
            {content.lead}
            <span className="block">
              <span className="text-[#b21f24]">{content.accent}</span>
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-[#e7e4de] md:text-lg">
            {content.description}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            {[
              { label: content.primary, href: "#start-project" },
              { label: content.secondary, href: "#capabilities" },
            ].map((button, index) => (
              <a
                key={button.label}
                href={button.href}
                className={
                  index === 0
                    ? "inline-flex items-center justify-center gap-2 rounded-full bg-[#b21f24] px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#c2252a]"
                    : "inline-flex items-center justify-center gap-2 rounded-full border border-white/14 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/[0.08]"
                }
              >
                {button.label}
                {index === 0 ? <ArrowRight className="directional-icon h-4 w-4" /> : null}
              </a>
            ))}
          </div>

          <div className="mt-10 grid gap-3 text-sm text-[#d8ddd8] sm:grid-cols-3">
            {content.bullets.map((bullet) => (
              <div key={bullet} className="border-s border-white/15 ps-4">
                {bullet}
              </div>
            ))}
          </div>

          <div className="mt-8 text-sm tracking-[0.12em] text-[#f2dfcf]">{content.operations}</div>
        </div>
      </div>
    </section>
  );
}
