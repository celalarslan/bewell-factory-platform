import { supplyClaims } from "@/data/home";
import Reveal from "@/components/ui/reveal";
import SectionHeading from "@/components/ui/section-heading";

export default function SupplyNetworkSection() {
  return (
    <section id="about" className="border-y border-white/10 bg-[#0a0e12] py-24">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Türkiye-Africa Supply Network"
              title="A Connected Industrial Delivery Network"
              description="Industrial delivery is supported by a practical network of engineering, manufacturing and local execution capability."
            />
            <ul className="mt-8 space-y-4 text-base leading-8 text-[#d8dbd7]">
              {supplyClaims.map((claim) => (
                <Reveal key={claim}>
                  <li className="border-l border-[#b21f24]/60 pl-4">{claim}</li>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="relative min-h-[420px] overflow-hidden rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_55%),linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]">
              <div className="industrial-grid absolute inset-0 opacity-25" />
              <svg viewBox="0 0 1000 520" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <g fill="none" stroke="rgba(178,31,36,0.42)" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M225 120 C365 95, 430 155, 520 175" />
                  <path d="M520 175 C615 196, 705 232, 810 205" />
                  <path d="M360 250 C430 220, 510 235, 615 315" />
                  <path d="M615 315 C710 360, 800 340, 900 270" />
                  <path d="M250 350 C345 300, 420 330, 515 300" />
                </g>
                <g fill="rgba(245,243,240,0.88)">
                  <circle cx="225" cy="120" r="6" />
                  <circle cx="520" cy="175" r="6" />
                  <circle cx="810" cy="205" r="6" />
                  <circle cx="360" cy="250" r="6" />
                  <circle cx="615" cy="315" r="6" />
                  <circle cx="900" cy="270" r="6" />
                  <circle cx="250" cy="350" r="6" />
                  <circle cx="515" cy="300" r="6" />
                </g>
              </svg>
              <div className="absolute left-6 top-6 rounded-full border border-white/12 bg-black/35 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#f1ebe5]">
                Regional delivery map
              </div>
              <div className="absolute bottom-6 left-6 right-6 grid gap-3 md:grid-cols-3">
                {["Türkiye engineering", "Regional sourcing", "African project delivery"].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-sm text-[#dde0db]">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
