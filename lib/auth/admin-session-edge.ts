const ADMIN_COOKIE = "bluish_admin_session";

function getSecret(): string {
  const secret = process.env.AUTH_SECRET ?? process.env.ADMIN_PASSWORD;
  if (!secret) return "";
  return secret;
}

function base64UrlDecode(value: string): string {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  return atob(padded);
}

function timingSafeEqualStr(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

async function signPayload(payload: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifyAdminSessionTokenEdge(
  token: string | undefined,
): Promise<boolean> {
  if (!token) return false;

  const secret = getSecret();
  if (!secret) return false;

  try {
    const decoded = base64UrlDecode(token);
    const separator = decoded.lastIndexOf("|");
    if (separator === -1) return false;

    const payload = decoded.slice(0, separator);
    const signature = decoded.slice(separator + 1);
    const expected = await signPayload(payload, secret);

    if (!timingSafeEqualStr(signature, expected)) return false;

    const data = JSON.parse(payload) as { role: string; exp: number };
    return data.role === "admin" && data.exp > Date.now();
  } catch {
    return false;
  }
}

export { ADMIN_COOKIE };
