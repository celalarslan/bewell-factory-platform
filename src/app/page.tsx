import type { Metadata } from "next";
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
import StartProjectSection from "@/components/home/start-project-section";

export const metadata: Metadata = {
  title: "Novertra Industrial | Industrial Project Development & Delivery",
  description:
    "Novertra develops and delivers industrial projects across manufacturing, energy, agro-industry, mining, food processing and strategic infrastructure.",
  openGraph: {
    title: "Novertra Industrial | Industrial Project Development & Delivery",
    description:
      "Novertra develops and delivers industrial projects across manufacturing, energy, agro-industry, mining, food processing and strategic infrastructure.",
    images: ["/assets/optimized/novertra-industrial-hero.webp"],
  },
};

export default function HomePage() {
  return (
    <main className="bg-[#080b0f] text-[#f5f3f0]">
      <SiteHeader />
      <HeroSection />
      <TrustStrip />
      <CapabilitiesSection />
      <IndustriesShowcase />
      <DeliveryModelSection />
      <ExperienceSection />
      <SupplyNetworkSection />
      <TechnologyIntelligenceSection />
      <StartProjectSection />
      <SiteFooter />
    </main>
  );
}
