import crypto from "crypto";

// Signing key for download tokens. Falls back to the Stripe secret key so the
// feature works even if a dedicated secret isn't configured — but setting a
// dedicated DOWNLOAD_TOKEN_SECRET is recommended.
function getSecret(): string {
  const secret =
    process.env.DOWNLOAD_TOKEN_SECRET || process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    throw new Error(
      "No signing secret available (set DOWNLOAD_TOKEN_SECRET or STRIPE_SECRET_KEY)"
    );
  }
  return secret;
}

// Token is bound to the Stripe session ID (not the Sanity order ID) so the
// webhook and the success page can generate identical links without depending
// on the order document existing yet.
export function signDownloadToken(sessionId: string, photoId: string): string {
  return crypto
    .createHmac("sha256", getSecret())
    .update(`${sessionId}:${photoId}`)
    .digest("base64url");
}

export function verifyDownloadToken(
  sessionId: string,
  photoId: string,
  token: string
): boolean {
  if (!token) return false;
  const expected = signDownloadToken(sessionId, photoId);
  const a = Buffer.from(expected);
  const b = Buffer.from(token);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function buildDownloadUrl(
  origin: string,
  sessionId: string,
  photoId: string
): string {
  const token = signDownloadToken(sessionId, photoId);
  const params = new URLSearchParams({ session: sessionId, token });
  return `${origin}/api/download/${photoId}?${params.toString()}`;
}
