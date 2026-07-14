import type { Metadata } from "next";
import nextDynamic from "next/dynamic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from "@/lib/auth/admin-auth";

const AICompanyOS = nextDynamic(() => import("@/components/ai-company-os"));

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Project Office | Novertra Industrial",
  description: "Internal project office demonstration environment.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ProjectOfficePage() {
  const cookieStore = await cookies();
  const session = verifyAdminSessionToken(
    cookieStore.get(ADMIN_SESSION_COOKIE)?.value,
  );
  if (!session) redirect("/admin/login?next=/project-office");

  return (
    <main className="bg-[#080b0f] pt-20 text-[#f5f3f0]">
      <SiteHeader />
      <AICompanyOS adminUsername={session.username} />
      <SiteFooter />
    </main>
  );
}
