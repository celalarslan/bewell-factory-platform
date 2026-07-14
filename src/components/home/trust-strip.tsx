import Reveal from "@/components/ui/reveal";

export default function TrustStrip({ items }: { items: string[] }) {
  return (
    <section className="border-y border-white/10 bg-[#0b0e12]">
      <div className="mx-auto grid max-w-[1440px] gap-3 px-5 py-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        {items.map((point, index) => (
          <Reveal key={point} delay={index * 60} className="rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-4 text-sm font-medium tracking-wide text-[#eef2ec]">
            {point}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
