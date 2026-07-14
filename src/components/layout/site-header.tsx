"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { getPublicContent } from "@/i18n/public-content";
import {
  localeLabels,
  locales,
  localizedPath,
  type Locale,
} from "@/i18n/locales";

const sectionIds = ["capabilities", "industries", "delivery-model", "experience", "about", "insights", "start-project"];

export default function SiteHeader({
  locale,
  page = "home",
}: {
  locale?: Locale;
  page?: "home" | "configure";
}) {
  const activeLocale = locale ?? "en";
  const content = getPublicContent(activeLocale);
  const basePath = localizedPath(activeLocale, "home");
  const navigationLinks = [
    { label: content.navigation.capabilities, href: `${basePath}#capabilities` },
    { label: content.navigation.industries, href: `${basePath}#industries` },
    { label: content.navigation.delivery, href: `${basePath}#delivery-model` },
    { label: content.navigation.experience, href: `${basePath}#experience` },
    { label: content.navigation.about, href: `${basePath}#about` },
    { label: content.navigation.insights, href: `${basePath}#insights` },
  ];
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState(page === "home" ? "capabilities" : "");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nodes = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -58% 0px", threshold: [0.1, 0.2, 0.35] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const headerClass = useMemo(
    () =>
      `fixed inset-x-0 top-0 z-50 border-b border-white/10 transition-colors duration-300 ${
        scrolled ? "bg-[#080b0f]/92 backdrop-blur-xl" : "bg-transparent"
      }`,
    [scrolled],
  );

  return (
    <header className={headerClass}>
      <div className="mx-auto flex h-20 max-w-[1560px] items-center justify-between gap-6 px-5 xl:px-8 2xl:px-10">
        <Link href={`${basePath}#top`} className="flex shrink-0 items-center overflow-visible">
          <Image
            src="/assets/brand/novertra-logo-final.png"
            alt="Novertra Industrial"
            width={800}
            height={200}
            sizes="(min-width: 1280px) 200px, (min-width: 640px) 170px, 160px"
            className="block h-auto w-[160px] flex-shrink-0 object-contain object-start sm:w-[170px] xl:w-[200px]"
            priority
          />
        </Link>

        <nav className="hidden min-w-0 items-center gap-5 whitespace-nowrap text-[12px] font-medium text-[#c9cec7] 2xl:gap-7 2xl:text-[13px] xl:flex">
          {navigationLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`transition hover:text-white ${active === link.href.split("#")[1] ? "text-white" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 whitespace-nowrap xl:flex 2xl:gap-4">
          <div className="flex items-center gap-3 text-[11px] text-[#a7afa8] 2xl:text-[12px]">
            <Link href={localizedPath(activeLocale, "configure")} className="transition hover:text-white">
              {content.navigation.configurator}
            </Link>
          </div>
          {locale ? (
            <div className="flex items-center gap-1" aria-label={content.navigation.language}>
              {locales.map((item) => (
                <Link
                  key={item}
                  href={localizedPath(item, page)}
                  hrefLang={item}
                  aria-current={item === activeLocale ? "page" : undefined}
                  onClick={() => window.localStorage.setItem("novertra-locale", item)}
                  className={`grid h-9 min-w-9 place-items-center rounded-lg text-[10px] font-semibold transition ${item === activeLocale ? "bg-white/10 text-white" : "text-[#879189] hover:text-white"}`}
                >
                  {localeLabels[item]}
                </Link>
              ))}
            </div>
          ) : null}
          <Link
            href={`${basePath}#start-project`}
            className="inline-flex min-h-11 items-center whitespace-nowrap rounded-xl border border-[#b21f24]/55 bg-[#b21f24] px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#c2252a] 2xl:px-5"
          >
            {content.navigation.start}
          </Link>
        </div>

        <button
          type="button"
          aria-label={content.navigation.menu}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white xl:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen ? (
        <div id="mobile-navigation" className="border-t border-white/10 bg-[#080b0f]/98 px-5 py-4 xl:hidden">
          <nav className="flex flex-col text-sm text-[#d8dad7]" aria-label="Mobile navigation">
            {navigationLinks.map((link) => (
              <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="flex min-h-11 items-center">
                {link.label}
              </Link>
            ))}
            <Link href={localizedPath(activeLocale, "configure")} onClick={() => setMobileOpen(false)} className="flex min-h-11 items-center text-[#f0d8d9]">
              {content.navigation.configurator}
            </Link>
            {locale ? (
              <div className="my-3 flex flex-wrap gap-2 border-y border-white/8 py-3" aria-label={content.navigation.language}>
                {locales.map((item) => (
                  <Link
                    key={item}
                    href={localizedPath(item, page)}
                    hrefLang={item}
                    aria-current={item === activeLocale ? "page" : undefined}
                    onClick={() => window.localStorage.setItem("novertra-locale", item)}
                    className={`grid min-h-11 min-w-11 place-items-center rounded-xl border text-xs font-semibold ${item === activeLocale ? "border-white/20 bg-white/10 text-white" : "border-white/8 text-[#9da69f]"}`}
                  >
                    {localeLabels[item]}
                  </Link>
                ))}
              </div>
            ) : null}
            <Link
              href={`${basePath}#start-project`}
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[#b21f24] px-5 py-3 font-semibold text-white"
            >
              {content.navigation.start}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
