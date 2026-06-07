import { Resend } from "resend";

export interface DownloadLink {
  photoId: string;
  url: string;
}

export interface OrderConfirmationParams {
  to: string;
  amount: number; // cents
  downloads: DownloadLink[];
}

const SUPPORT_EMAIL = "mehlerc12@gmail.com";

// Sends the order confirmation with download links. No-ops (with a logged
// warning) when RESEND_API_KEY is missing so local dev and builds don't crash.
export async function sendOrderConfirmation(
  params: OrderConfirmationParams
): Promise<{ sent: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — skipping confirmation email");
    return { sent: false };
  }

  const resend = new Resend(apiKey);
  const from =
    process.env.EMAIL_FROM || "Waterdog Productions <onboarding@resend.dev>";

  const total = (params.amount / 100).toFixed(2);
  const count = params.downloads.length;

  const linkRows = params.downloads
    .map(
      (d, i) =>
        `<tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;">
          <a href="${d.url}" style="color:#0d9488;text-decoration:none;font-weight:600;">
            Download Photo ${i + 1}
          </a>
        </td></tr>`
    )
    .join("");

  const html = `
  <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;margin:0 auto;color:#0f172a;">
    <h1 style="font-size:22px;margin:0 0 8px;">Thank you for your order!</h1>
    <p style="color:#475569;margin:0 0 24px;">
      Your purchase of ${count} photo${count !== 1 ? "s" : ""} is complete
      (total $${total}). Download your full-resolution, unwatermarked photos
      below. These links are tied to your order — please keep this email.
    </p>
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      ${linkRows}
    </table>
    <p style="color:#64748b;font-size:13px;">
      Having trouble? Reply to this email or contact us at
      <a href="mailto:${SUPPORT_EMAIL}" style="color:#0d9488;">${SUPPORT_EMAIL}</a>.
    </p>
    <p style="color:#94a3b8;font-size:12px;margin-top:24px;">Waterdog Productions</p>
  </div>`;

  await resend.emails.send({
    from,
    to: params.to,
    replyTo: SUPPORT_EMAIL,
    subject: `Your Waterdog Productions photos (${count} photo${count !== 1 ? "s" : ""})`,
    html,
  });

  return { sent: true };
}
