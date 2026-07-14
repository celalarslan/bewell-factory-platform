import "server-only";

import {
  createHash,
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";

import { NextRequest, NextResponse } from "next/server";

export const ADMIN_SESSION_COOKIE = "novertra_admin_session";
export const ADMIN_SESSION_SECONDS = 8 * 60 * 60;

type AdminConfig = {
  username: string;
  password: string;
  sessionSecret: string;
};

export type AdminSession = {
  username: string;
  issuedAt: number;
  expiresAt: number;
};

type SessionPayload = {
  u: string;
  iat: number;
  exp: number;
  n: string;
};

type LoginAttempt = { failures: number; resetAt: number };
type AuthGlobals = typeof globalThis & {
  novertraLoginAttempts?: Map<string, LoginAttempt>;
};

const LOGIN_WINDOW_MS = 10 * 60 * 1000;
const LOGIN_MAX_FAILURES = 8;
const attempts = (globalThis as AuthGlobals).novertraLoginAttempts ??=
  new Map<string, LoginAttempt>();

function base64Url(value: Buffer | string) {
  return Buffer.from(value).toString("base64url");
}

function safeEqual(left: string, right: string) {
  const leftDigest = createHash("sha256").update(left).digest();
  const rightDigest = createHash("sha256").update(right).digest();
  return timingSafeEqual(leftDigest, rightDigest);
}

function signature(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function getAdminConfig(): AdminConfig | null {
  const username = process.env.ADMIN_USERNAME?.trim();
  const password = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;
  if (
    !username ||
    !password ||
    password.length < 20 ||
    !sessionSecret ||
    Buffer.byteLength(sessionSecret, "utf8") < 32
  ) {
    return null;
  }
  return { username, password, sessionSecret };
}

export function validateAdminCredentials(username: string, password: string) {
  const config = getAdminConfig();
  const expectedUsername = config?.username ?? "invalid-admin";
  const expectedPassword = config?.password ?? "invalid-password-value";
  const usernameMatches = safeEqual(username, expectedUsername);
  const passwordMatches = safeEqual(password, expectedPassword);
  return Boolean(config && usernameMatches && passwordMatches);
}

export function createAdminSessionToken() {
  const config = getAdminConfig();
  if (!config) return null;
  const issuedAt = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    u: config.username,
    iat: issuedAt,
    exp: issuedAt + ADMIN_SESSION_SECONDS,
    n: randomBytes(18).toString("base64url"),
  };
  const encoded = base64Url(JSON.stringify(payload));
  return `${encoded}.${signature(encoded, config.sessionSecret)}`;
}

export function verifyAdminSessionToken(token: string | undefined | null): AdminSession | null {
  const config = getAdminConfig();
  if (!config || !token) return null;
  const [encoded, providedSignature, extra] = token.split(".");
  if (!encoded || !providedSignature || extra) return null;
  if (!safeEqual(providedSignature, signature(encoded, config.sessionSecret))) return null;

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as SessionPayload;
    const now = Math.floor(Date.now() / 1000);
    if (
      typeof payload.u !== "string" ||
      typeof payload.iat !== "number" ||
      typeof payload.exp !== "number" ||
      typeof payload.n !== "string" ||
      payload.n.length < 16 ||
      !safeEqual(payload.u, config.username) ||
      payload.iat > now + 60 ||
      payload.exp <= now ||
      payload.exp - payload.iat !== ADMIN_SESSION_SECONDS
    ) {
      return null;
    }
    return { username: payload.u, issuedAt: payload.iat, expiresAt: payload.exp };
  } catch {
    return null;
  }
}

export function getAdminSessionFromRequest(request: NextRequest) {
  return verifyAdminSessionToken(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);
}

export function setAdminSessionCookie(response: NextResponse, token: string) {
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: ADMIN_SESSION_SECONDS,
  });
}

export function clearAdminSessionCookie(response: NextResponse) {
  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}

export function unauthorizedResponse() {
  return NextResponse.json(
    {
      ok: false,
      error: {
        code: "UNAUTHORIZED",
        message: "Bu işlem için yönetici oturumu gereklidir.",
      },
    },
    { status: 401 },
  );
}

export function assertSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (request.headers.get("sec-fetch-site") === "cross-site") return false;
  if (!origin) return true;
  try {
    const originUrl = new URL(origin);
    const expectedHost = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    const expectedProtocol = request.headers.get("x-forwarded-proto");
    return Boolean(
      expectedHost &&
      originUrl.host === expectedHost &&
      (!expectedProtocol || originUrl.protocol === `${expectedProtocol}:`),
    );
  } catch {
    return false;
  }
}

export function safeAdminRedirect(value: string | null | undefined) {
  return value === "/project-office" ? value : "/project-office";
}

function attemptKey(ip: string, username: string) {
  return createHash("sha256").update(`${ip}\0${username.toLowerCase()}`).digest("hex");
}

export function isLoginRateLimited(ip: string, username: string) {
  const key = attemptKey(ip, username);
  const attempt = attempts.get(key);
  if (!attempt) return false;
  if (attempt.resetAt <= Date.now()) {
    attempts.delete(key);
    return false;
  }
  return attempt.failures >= LOGIN_MAX_FAILURES;
}

export function recordLoginFailure(ip: string, username: string) {
  const key = attemptKey(ip, username);
  const current = attempts.get(key);
  if (!current || current.resetAt <= Date.now()) {
    attempts.set(key, { failures: 1, resetAt: Date.now() + LOGIN_WINDOW_MS });
    return;
  }
  current.failures += 1;
}

export function clearLoginFailures(ip: string, username: string) {
  attempts.delete(attemptKey(ip, username));
}

export function loginClientIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}
