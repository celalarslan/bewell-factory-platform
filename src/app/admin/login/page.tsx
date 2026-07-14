import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import AdminLoginForm from "@/components/admin-login-form";
import {
  ADMIN_SESSION_COOKIE,
  safeAdminRedirect,
  verifyAdminSessionToken,
} from "@/lib/auth/admin-auth";

export const metadata: Metadata = {
  title: "Admin Login | Novertra Project Office",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const cookieStore = await cookies();
  const session = verifyAdminSessionToken(
    cookieStore.get(ADMIN_SESSION_COOKIE)?.value,
  );
  if (session) redirect("/project-office");
  const nextPath = safeAdminRedirect((await searchParams).next);
  return <AdminLoginForm nextPath={nextPath} />;
}
