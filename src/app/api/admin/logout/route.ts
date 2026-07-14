import { NextRequest, NextResponse } from "next/server";

import {
  assertSameOrigin,
  clearAdminSessionCookie,
} from "@/lib/auth/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function POST(request: NextRequest) {
  if (!assertSameOrigin(request)) {
    return NextResponse.json(
      { ok: false, error: { code: "INVALID_ORIGIN", message: "İstek reddedildi." } },
      { status: 403 },
    );
  }
  const response = NextResponse.json({ ok: true });
  clearAdminSessionCookie(response);
  return response;
}
