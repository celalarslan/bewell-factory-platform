import type { PublicContent } from "@/i18n/public-content";
import Reveal from "@/components/ui/reveal";
import SectionHeading from "@/components/ui/section-heading";

export default function TechnologyIntelligenceSection({ content }: { content: PublicContent["technology"] }) {
  return (
    <section id="insights" className="bg-[#080b0f] py-24">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow={content.eyebrow}
              title={content.title}
              description={content.description}
            />
          </div>

          <Reveal className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="grid gap-3 md:grid-cols-2">
              {content.points.map((item, index) => (
                <div
                  key={item}
                  className="rounded-[22px] border border-white/10 bg-black/25 p-5 transition duration-300 hover:-translate-y-1 hover:bg-black/35"
                >
                  <div className="text-[11px] font-semibold tracking-[0.28em] text-[#9aa39b]">
                    0{index + 1}
                  </div>
                  <div className="mt-4 text-lg font-semibold tracking-[-0.03em] text-white">{item}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
