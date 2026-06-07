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
  const year = new Date().getFullYear();

  // Absolute origin (e.g. https://waterdogproductions.com), derived from the
  // signed download URLs, used for the watermarked thumbnail previews.
  const origin =
    params.downloads[0]?.url.split("/api/download")[0] ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://waterdogproductions.com";

  const FONT =
    "-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

  // One row per photo: watermarked thumbnail + bulletproof teal Download button.
  const photoRows = params.downloads
    .map((d, i) => {
      const thumb = `${origin}/api/watermark/${d.photoId}?w=240`;
      return `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #eef2f5;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            <tr>
              <td width="64" style="vertical-align:middle;">
                <img src="${thumb}" width="56" height="56" alt="Photo ${i + 1}" style="display:block;width:56px;height:56px;object-fit:cover;border-radius:8px;border:1px solid #e2e8f0;" />
              </td>
              <td style="vertical-align:middle;padding-left:14px;font-family:${FONT};font-size:14px;font-weight:600;color:#0f2942;">
                Photo ${i + 1}
              </td>
              <td align="right" style="vertical-align:middle;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate;">
                  <tr>
                    <td bgcolor="#0d9488" style="border-radius:8px;">
                      <a href="${d.url}" style="display:inline-block;padding:9px 20px;font-family:${FONT};font-size:13px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:8px;">Download</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>`;
    })
    .join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="color-scheme" content="light" />
</head>
<body style="margin:0;padding:0;background-color:#f3ecdd;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3ecdd;">
    <tr>
      <td align="center" style="padding:28px 12px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td bgcolor="#0f2942" style="background-color:#0f2942;background-image:linear-gradient(135deg,#0a1b2a,#1d4d73);padding:28px 32px;">
              <div style="font-family:${FONT};font-size:24px;font-weight:800;letter-spacing:2px;color:#ffffff;">WATERDOG</div>
              <div style="font-family:${FONT};font-size:11px;letter-spacing:5px;color:#14b8a6;font-weight:700;margin-top:3px;">PRODUCTIONS</div>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <h1 style="margin:0 0 12px;font-family:${FONT};font-size:22px;font-weight:800;color:#0f2942;">Thank you for your order!</h1>
              <p style="margin:0 0 22px;font-family:${FONT};font-size:14px;line-height:1.6;color:#475569;">
                Your purchase of <strong style="color:#0f2942;">${count} photo${count !== 1 ? "s" : ""}</strong>
                (total <strong style="color:#0f2942;">$${total}</strong>) is complete. Download your
                full-resolution, unwatermarked photos below. These links are tied to your order —
                please keep this email.
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-top:1px solid #eef2f5;">
                ${photoRows}
              </table>
              <p style="margin:26px 0 0;font-family:${FONT};font-size:13px;line-height:1.6;color:#64748b;">
                Having trouble with a download? Just reply to this email, or reach us at
                <a href="mailto:${SUPPORT_EMAIL}" style="color:#0d9488;text-decoration:none;font-weight:600;">${SUPPORT_EMAIL}</a>.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td bgcolor="#0a1b2a" style="background-color:#0a1b2a;padding:22px 32px;">
              <div style="font-family:${FONT};font-size:13px;font-weight:800;letter-spacing:1.5px;color:#ffffff;">WATERDOG PRODUCTIONS</div>
              <div style="font-family:${FONT};font-size:11px;color:#64748b;margin-top:6px;line-height:1.6;">
                In the water. In the moment. &middot; Huntington Beach, CA<br />
                <a href="https://instagram.com/waterdogproductions" style="color:#14b8a6;text-decoration:none;">@waterdogproductions</a>
              </div>
            </td>
          </tr>
        </table>
        <div style="font-family:${FONT};font-size:11px;color:#94a3b8;margin-top:14px;">
          &copy; ${year} Waterdog Productions. All rights reserved.
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;

  // Plain-text fallback for accessibility and deliverability.
  const text = [
    "Thank you for your order!",
    "",
    `Your purchase of ${count} photo${count !== 1 ? "s" : ""} (total $${total}) is complete.`,
    "Download your full-resolution, unwatermarked photos:",
    "",
    ...params.downloads.map((d, i) => `Photo ${i + 1}: ${d.url}`),
    "",
    "These links are tied to your order — please keep this email.",
    "",
    `Questions? Reply to this email or contact ${SUPPORT_EMAIL}.`,
    "",
    "Waterdog Productions",
  ].join("\n");

  await resend.emails.send({
    from,
    to: params.to,
    replyTo: SUPPORT_EMAIL,
    subject: `Your Waterdog Productions photos (${count} photo${count !== 1 ? "s" : ""})`,
    html,
    text,
  });

  return { sent: true };
}
