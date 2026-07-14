import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import HeroSection from "@/components/home/hero-section";
import TrustStrip from "@/components/home/trust-strip";
import CapabilitiesSection from "@/components/home/capabilities-section";
import IndustriesShowcase from "@/components/home/industries-showcase";
import DeliveryModelSection from "@/components/home/delivery-model";
import ExperienceSection from "@/components/home/experience-section";
import SupplyNetworkSection from "@/components/home/supply-network";
import TechnologyIntelligenceSection from "@/components/home/technology-intelligence";
import FaqSection from "@/components/home/faq-section";
import StartProjectSection from "@/components/home/start-project-section";
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
  const canonical = localizedPath(locale, "home");
  return {
    title: content.meta.homeTitle,
    description: content.meta.homeDescription,
    alternates: { canonical, languages: alternateLanguages("home") },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_AR" : locale === "fr" ? "fr_FR" : locale === "tr" ? "tr_TR" : "en_US",
      url: canonical,
      title: content.meta.homeTitle,
      description: content.meta.homeDescription,
      images: ["/assets/optimized/novertra-industrial-hero.webp"],
    },
    twitter: { card: "summary_large_image", title: content.meta.homeTitle, description: content.meta.homeDescription, images: ["/assets/optimized/novertra-industrial-hero.webp"] },
  };
}

function JsonLd({ value }: { value: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(value).replace(/</g, "\\u003c") }} />;
}

export default async function LocalizedHomePage({ params }: PageProps) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const locale = value;
  const content = getPublicContent(locale);
  const canonical = `https://novertra.com${localizedPath(locale, "home")}`;

  return (
    <main id="main-content" className="bg-[#080b0f] text-[#f5f3f0]">
      <a href="#public-content" className="skip-link">{content.navigation.skip}</a>
      <JsonLd value={{
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "Organization", "@id": "https://novertra.com/#organization", name: "Novertra Industrial", url: "https://novertra.com", logo: "https://novertra.com/assets/brand/novertra-logo-final.png", description: content.meta.homeDescription },
          { "@type": "WebSite", "@id": "https://novertra.com/#website", url: "https://novertra.com", name: "Novertra Industrial", inLanguage: locale, publisher: { "@id": "https://novertra.com/#organization" } },
          { "@type": "Service", "@id": `${canonical}#service`, name: content.capabilities.title, description: content.capabilities.description, provider: { "@id": "https://novertra.com/#organization" }, areaServed: "International" },
          { "@type": "FAQPage", "@id": `${canonical}#faq`, mainEntity: content.faq.items.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
        ],
      }} />
      <SiteHeader locale={locale} />
      <div id="public-content">
        <HeroSection content={content.hero} rtl={locale === "ar"} />
        <TrustStrip items={content.trust} />
        <CapabilitiesSection content={content.capabilities} />
        <IndustriesShowcase content={content.industries} />
        <DeliveryModelSection content={content.delivery} />
        <ExperienceSection content={content.experience} />
        <SupplyNetworkSection content={content.supply} />
        <TechnologyIntelligenceSection content={content.technology} />
        <FaqSection content={content.faq} />
        <StartProjectSection content={content.contact} />
      </div>
      <SiteFooter locale={locale} />
    </main>
  );
}
