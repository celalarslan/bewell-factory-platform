"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { navigationLinks, secondaryLinks } from "@/data/home";

const sectionIds = ["capabilities", "industries", "delivery-model", "experience", "about", "insights", "start-project"];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("capabilities");

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
        <Link href="/#top" className="flex shrink-0 items-center overflow-visible">
          <Image
            src="/assets/brand/novertra-logo-final.png"
            alt="Novertra Industrial"
            width={800}
            height={200}
            sizes="(min-width: 1280px) 200px, (min-width: 640px) 170px, 160px"
            className="block h-auto w-[160px] flex-shrink-0 object-contain object-left sm:w-[170px] xl:w-[200px]"
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
            {secondaryLinks.map((link) => (
              <Link key={link.label} href={link.href} className="transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            href="/#start-project"
            className="inline-flex min-h-11 items-center whitespace-nowrap rounded-xl border border-[#b21f24]/55 bg-[#b21f24] px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#c2252a] 2xl:px-5"
          >
            Start a Project
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
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
            {secondaryLinks.map((link) => (
              <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="flex min-h-11 items-center text-[#f0d8d9]">
                {link.label}
              </Link>
            ))}
            <Link
              href="/#start-project"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[#b21f24] px-5 py-3 font-semibold text-white"
            >
              Start a Project
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
