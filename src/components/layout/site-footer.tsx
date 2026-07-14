import Image from "next/image";
import { getPublicContent } from "@/i18n/public-content";
import { localizedPath, type Locale } from "@/i18n/locales";

export default function SiteFooter({ locale = "en" }: { locale?: Locale }) {
  const content = getPublicContent(locale);
  const home = localizedPath(locale, "home");
  const footerLinks = [
    [content.navigation.capabilities, `${home}#capabilities`],
    [content.navigation.industries, `${home}#industries`],
    [content.navigation.delivery, `${home}#delivery-model`],
    [content.navigation.experience, `${home}#experience`],
    [content.navigation.start, `${home}#start-project`],
    [content.navigation.configurator, localizedPath(locale, "configure")],
  ];
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
              className="h-auto w-[230px] object-contain object-start"
            />
            <div className="mt-4 text-sm tracking-[0.16em] text-[#aab2ab]">{content.footer.tagline}</div>
            <p className="mt-4 max-w-lg text-base leading-8 text-[#97a59b]">{content.footer.mission}</p>
            <p className="mt-3 text-sm text-[#7f8b83]">{content.footer.parent}</p>
            <p className="mt-2 text-sm text-[#7f8b83]">{content.footer.operations}</p>
          </div>

          <div className="grid gap-3 text-sm text-[#c7cbc5] sm:grid-cols-2 lg:justify-items-end">
            {footerLinks.map(([label, href]) => (
              <a key={label} href={href} className="transition hover:text-white">
                {label}
              </a>
            ))}
            <span className="text-[#7c8780]">{content.footer.privacy} ({content.footer.pending})</span>
            <span className="text-[#7c8780]">{content.footer.terms} ({content.footer.pending})</span>
            <span className="text-[#7c8780]">{content.footer.compliance} ({content.footer.pending})</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
