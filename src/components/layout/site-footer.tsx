import Image from "next/image";
import { footerLinks, brandMission, brandOperations, brandTagline } from "@/data/home";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#06080b]">
      <div className="mx-auto max-w-[1440px] px-5 py-14 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_.9fr] lg:items-end">
          <div className="max-w-xl">
            <Image
              src="/assets/brand/novertra-logo-final.png"
              alt="Novertra Industrial"
              width={800}
              height={200}
              className="h-auto w-[230px] object-contain object-left"
            />
            <div className="mt-4 text-sm tracking-[0.22em] text-[#aab2ab]">{brandTagline}</div>
            <p className="mt-4 max-w-lg text-base leading-8 text-[#97a59b]">{brandMission}</p>
            <p className="mt-3 text-sm text-[#7f8b83]">A Bewell Global Company</p>
            <p className="mt-2 text-sm text-[#7f8b83]">{brandOperations}</p>
          </div>

          <div className="grid gap-3 text-sm text-[#c7cbc5] sm:grid-cols-2 lg:justify-items-end">
            {footerLinks.map((link) => (
              <a key={link.label} href={link.href} className="transition hover:text-white">
                {link.label}
              </a>
            ))}
            <span className="text-[#7c8780]">Privacy (information page pending)</span>
            <span className="text-[#7c8780]">Terms (information page pending)</span>
            <span className="text-[#7c8780]">Compliance (information page pending)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
