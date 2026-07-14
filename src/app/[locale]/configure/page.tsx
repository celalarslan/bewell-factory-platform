import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import FactoryConfigurator from "@/components/configurator/factory-configurator";
import { getPublicContent } from "@/i18n/public-content";
import { alternateLanguages, isLocale, locales, localizedPath } from "@/i18n/locales";

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const content = getPublicContent(locale);
  const canonical = localizedPath(locale, "configure");
  return {
    title: content.meta.configureTitle,
    description: content.meta.configureDescription,
    alternates: { canonical, languages: alternateLanguages("configure") },
    openGraph: { type: "website", url: canonical, title: content.meta.configureTitle, description: content.meta.configureDescription, images: ["/assets/optimized/novertra-industrial-hero.webp"] },
    twitter: { card: "summary_large_image", title: content.meta.configureTitle, description: content.meta.configureDescription },
  };
}

export default async function LocalizedConfigurePage({ params }: PageProps) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const locale = value;
  const content = getPublicContent(locale);
  const homePath = localizedPath(locale, "home");
  const configurePath = localizedPath(locale, "configure");
  return (
    <main id="main-content" className="bg-[#080b0f] pt-[72px] text-[#f5f3f0]">
      <a href="#configurator" className="skip-link">{content.navigation.skip}</a>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Novertra Industrial", item: `https://novertra.com${homePath}` },
          { "@type": "ListItem", position: 2, name: content.navigation.configurator, item: `https://novertra.com${configurePath}` },
        ],
      }).replace(/</g, "\\u003c") }} />
      <SiteHeader locale={locale} page="configure" />
      <div className="mx-auto max-w-[1440px] px-5 pt-8 lg:px-10">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#8d9991]">
          <Link href={homePath} className="transition hover:text-white">Novertra Industrial</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-[#c5ccc7]">{content.navigation.configurator}</span>
        </nav>
      </div>
      <div id="configurator"><FactoryConfigurator content={content.configurator} startProjectHref={`${homePath}#start-project`} /></div>
      <SiteFooter locale={locale} />
    </main>
  );
}
