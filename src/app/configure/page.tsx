import type { Metadata } from "next";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import FactoryConfigurator from "@/components/configurator/factory-configurator";

export const metadata: Metadata = {
  title: "Factory Configurator | Novertra Industrial",
  description: "Indicative factory configurator for early project screening.",
};

export default function ConfigurePage() {
  return (
    <main className="bg-[#080b0f] text-[#f5f3f0] pt-[72px]">
      <SiteHeader />
      <FactoryConfigurator />
      <SiteFooter />
    </main>
  );
}
