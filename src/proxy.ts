import { NextRequest, NextResponse } from "next/server";
import { isLocale } from "@/i18n/locales";

export function proxy(request: NextRequest) {
  const locale = request.nextUrl.pathname.split("/")[1];
  if (!isLocale(locale)) return NextResponse.next();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-novertra-locale", locale);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/:locale(en|ar|fr|tr)/:path*"],
};
