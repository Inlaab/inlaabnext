const enc = new TextEncoder();
const dec = new TextDecoder();

function toB64Url(input: Uint8Array | ArrayBuffer): string {
  const bytes = ArrayBuffer.isView(input) ? new Uint8Array(input.buffer as ArrayBuffer) : new Uint8Array(input as ArrayBuffer);
  return btoa(Array.from(bytes, (b) => String.fromCharCode(b)).join(""))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function fromB64Url(str: string): Uint8Array {
  const rem    = str.length % 4;
  const padded = rem ? str + "=".repeat(4 - rem) : str;
  const binary = atob(padded.replace(/-/g, "+").replace(/_/g, "/"));
  const result = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) result[i] = binary.charCodeAt(i);
  return result;
}

async function importKey(secret: string, usage: KeyUsage[]) {
  return crypto.subtle.importKey(
    "raw", enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false, usage
  );
}

export async function createToken(secret: string): Promise<string> {
  const payload = toB64Url(enc.encode(JSON.stringify({ exp: Date.now() + 86_400_000 })));
  const key     = await importKey(secret, ["sign"]);
  const sig     = toB64Url(await crypto.subtle.sign("HMAC", key, enc.encode(payload)));
  return `${payload}.${sig}`;
}

export async function verifyToken(token: string, secret: string): Promise<boolean> {
  try {
    const [payload, sig] = token.split(".");
    if (!payload || !sig) return false;
    const { exp } = JSON.parse(dec.decode(fromB64Url(payload)));
    if (exp < Date.now()) return false;
    const key    = await importKey(secret, ["verify"]);
    const sigBuf = fromB64Url(sig);
    return crypto.subtle.verify("HMAC", key, sigBuf.buffer as ArrayBuffer, enc.encode(payload));
  } catch {
    return false;
  }
}
