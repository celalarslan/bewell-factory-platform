import "server-only";

const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "[::1]"]);

export function canAccessInternalProjectOffice(host: string | null) {
  if (process.env.NODE_ENV === "production" || !host) {
    return false;
  }

  try {
    const hostname = new URL(`http://${host}`).hostname;
    return LOCAL_HOSTNAMES.has(hostname);
  } catch {
    return false;
  }
}
