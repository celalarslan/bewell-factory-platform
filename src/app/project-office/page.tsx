import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import { canAccessInternalProjectOffice } from "@/lib/ai/access";

const AICompanyOS =
  process.env.NODE_ENV === "development"
    ? dynamic(() => import("@/components/ai-company-os"))
    : null;

export const metadata: Metadata = {
  title: "Project Office | Novertra Industrial",
  description: "Internal project office demonstration environment.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ProjectOfficePage() {
  const requestHeaders = await headers();
  if (!AICompanyOS || !canAccessInternalProjectOffice(requestHeaders.get("host"))) {
    notFound();
  }

  return (
    <main className="bg-[#080b0f] pt-20 text-[#f5f3f0]">
      <SiteHeader />
      <AICompanyOS />
      <SiteFooter />
    </main>
  );
}
