// Pure Web Crypto, no imports: runs in middleware, route handlers and plain node.
export const SESSION_COOKIE = "pm_admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 24; // seconds

const encoder = new TextEncoder();

const toB64Url = (buf: ArrayBuffer) =>
  btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

async function sign(payload: string, secret: string) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return toB64Url(await crypto.subtle.sign("HMAC", key, encoder.encode(payload)));
}

function sameString(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSessionToken(secret = process.env.ADMIN_SESSION_SECRET, now = Date.now()) {
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
  const exp = String(now + SESSION_MAX_AGE * 1000);
  return `${exp}.${await sign(exp, secret)}`;
}

export async function verifySessionToken(token?: string, secret = process.env.ADMIN_SESSION_SECRET, now = Date.now()) {
  if (!token || !secret) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || !(Number(exp) > now)) return false;
  return sameString(sig, await sign(exp, secret));
}

// Compare SHA-256 digests so the comparison does not leak the password length.
export async function checkPassword(input: string, expected = process.env.ADMIN_PASSWORD) {
  if (!expected) return false;
  const digest = async (s: string) => toB64Url(await crypto.subtle.digest("SHA-256", encoder.encode(s)));
  return sameString(await digest(input), await digest(expected));
}
