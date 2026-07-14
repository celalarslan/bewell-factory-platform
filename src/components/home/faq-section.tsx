import type { PublicContent } from "@/i18n/public-content";
import Reveal from "@/components/ui/reveal";
import SectionHeading from "@/components/ui/section-heading";

export default function FaqSection({ content }: { content: PublicContent["faq"] }) {
  return (
    <section id="questions" className="border-y border-white/10 bg-[#090c10] py-24">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
        <SectionHeading eyebrow={content.eyebrow} title={content.title} />
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {content.items.map((item, index) => (
            <Reveal key={item.question} delay={index * 40} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-lg font-semibold leading-7 text-white">{item.question}</h3>
              <p className="mt-3 text-sm leading-7 text-[#9eaaa2]">{item.answer}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
