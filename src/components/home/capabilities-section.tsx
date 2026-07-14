import { capabilityIcons } from "@/data/home";
import type { PublicContent } from "@/i18n/public-content";
import Reveal from "@/components/ui/reveal";
import SectionHeading from "@/components/ui/section-heading";

export default function CapabilitiesSection({ content }: { content: PublicContent["capabilities"] }) {
  return (
    <section id="capabilities" className="bg-[#080b0f] py-24">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {content.items.map((item, index) => {
            const Icon = capabilityIcons[index];
            return (
              <Reveal
                key={item.title}
                delay={index * 70}
                className="group min-h-[240px] rounded-[24px] border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#b21f24]/45 hover:bg-white/[0.05]"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="text-xs font-semibold tracking-[0.28em] text-[#9faaa4]">{String(index + 1).padStart(2, "0")}</div>
                    <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-white">{item.title}</h3>
                  </div>
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-black/20 text-[#d9dad8]">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <p className="mt-6 max-w-sm text-sm leading-7 text-[#98a59b]">{item.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
