import { experience } from "@/data/home";
import Reveal from "@/components/ui/reveal";
import SectionHeading from "@/components/ui/section-heading";

export default function ExperienceSection() {
  return (
    <section id="experience" className="bg-[#090c10] py-24">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
        <SectionHeading
          eyebrow="Proven Experience"
          title="Experience Built in the Field"
          description="The following items are the verified project references available in the current codebase and user-provided material."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          {experience.map((item, index) => (
            <Reveal key={item.title} delay={index * 60} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:bg-white/[0.05]">
              <div className="text-xs uppercase tracking-[0.24em] text-[#bdb7ae]">{item.note}</div>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">{item.title}</h3>
              <div className="mt-2 text-sm text-[#cfd2cb]">{item.location}</div>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#9aa59d]">{item.scope}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
