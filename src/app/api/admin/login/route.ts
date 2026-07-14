import { NextRequest, NextResponse } from "next/server";

import {
  assertSameOrigin,
  clearLoginFailures,
  createAdminSessionToken,
  isLoginRateLimited,
  loginClientIp,
  recordLoginFailure,
  setAdminSessionCookie,
  validateAdminCredentials,
} from "@/lib/auth/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 8 * 1024;
const MIN_RESPONSE_MS = 350;

function invalidCredentials(status = 401) {
  return NextResponse.json(
    {
      ok: false,
      error: {
        code: "INVALID_CREDENTIALS",
        message: "Kullanıcı adı veya parola hatalı.",
      },
    },
    { status },
  );
}

async function minimumDelay(startedAt: number) {
  const remaining = MIN_RESPONSE_MS - (Date.now() - startedAt);
  if (remaining > 0) await new Promise((resolve) => setTimeout(resolve, remaining));
}

async function readBody(request: NextRequest) {
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return null;
  }
  const declared = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) return null;
  if (!request.body) return null;
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_BODY_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  const body = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    return JSON.parse(new TextDecoder().decode(body)) as unknown;
  } catch {
    return null;
  }
}

function credentials(value: unknown) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  if (
    Object.keys(record).some((key) => !["username", "password"].includes(key)) ||
    typeof record.username !== "string" ||
    typeof record.password !== "string" ||
    !record.username.trim() ||
    !record.password
  ) {
    return null;
  }
  return { username: record.username.trim(), password: record.password };
}

export async function POST(request: NextRequest) {
  const startedAt = Date.now();
  if (!assertSameOrigin(request)) {
    await minimumDelay(startedAt);
    return invalidCredentials(403);
  }
  const input = credentials(await readBody(request));
  const username = input?.username ?? "invalid-admin";
  const password = input?.password ?? "invalid-password-value";
  const ip = loginClientIp(request);
  const limited = isLoginRateLimited(ip, username);
  const valid = validateAdminCredentials(username, password);
  await minimumDelay(startedAt);

  if (!input || limited || !valid) {
    recordLoginFailure(ip, username);
    return invalidCredentials(limited ? 429 : 401);
  }

  const token = createAdminSessionToken();
  if (!token) return invalidCredentials();
  clearLoginFailures(ip, username);
  const response = NextResponse.json({ ok: true });
  setAdminSessionCookie(response, token);
  return response;
}
