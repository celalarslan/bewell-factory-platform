import { headers } from "next/headers";
import Link from "next/link";
import { getPublicContent } from "@/i18n/public-content";
import { isLocale, localizedPath } from "@/i18n/locales";

export default async function NotFound() {
  const requestedLocale = (await headers()).get("x-novertra-locale") ?? "en";
  const locale = isLocale(requestedLocale) ? requestedLocale : "en";
  const content = getPublicContent(locale);
  return (
    <main className="grid min-h-screen place-items-center bg-[#080b0f] px-5 text-[#f5f3f0]">
      <div className="max-w-xl text-center">
        <div className="text-xs font-semibold tracking-[0.28em] text-[#b21f24]">404</div>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">{content.system.notFoundTitle}</h1>
        <p className="mt-5 text-base leading-8 text-[#96a79d]">{content.system.notFoundText}</p>
        <Link href={localizedPath(locale, "home")} className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[#b21f24] px-6 py-3 text-sm font-semibold text-white">{content.system.backHome}</Link>
      </div>
    </main>
  );
}
