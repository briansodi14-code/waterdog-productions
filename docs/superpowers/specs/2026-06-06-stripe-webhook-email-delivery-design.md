# Stripe Webhook + Email Delivery with Secure Download Links

**Date:** 2026-06-06
**Status:** Approved

## Problem

After a successful Stripe purchase, download links are shown **only** on the
`/success` page. If the customer never sees that page (tab closed, lost
connection) they have no way to retrieve their photos, and no email is sent.
Separately, `/api/download/[id]` serves the original un-watermarked image to
**anyone** with a photo `_id` — there is no paywall.

## Goals

1. Deliver download links by email, reliably, regardless of whether the
   customer sees the success page.
2. Gate the download endpoint so only paying customers can fetch originals.
3. Make order creation reliable and idempotent.

## Decisions

- **Email provider:** Resend.
- **Link security:** signed HMAC tokens tied to the Stripe **session ID**.
- **Trigger:** Stripe webhook (`checkout.session.completed`) is the single
  source of truth for order creation + email. The success page only reads.

## Architecture

```
Stripe payment → POST /api/webhooks/stripe (checkout.session.completed)
                   ├─ createOrderIfNotExists()  (idempotent by session ID)
                   └─ sendOrderConfirmation()    (Resend email, signed links)
/success         → GET /api/order-details → returns signed download URLs
Email + success  → GET /api/download/[id]?session=&token= → verify, then serve
```

### Components

- **`src/lib/downloadToken.ts`** — `signDownloadToken`, `verifyDownloadToken`
  (HMAC-SHA256 over `${sessionId}:${photoId}`, base64url, timing-safe compare),
  and `buildDownloadUrl`. Key = `DOWNLOAD_TOKEN_SECRET`, falling back to
  `STRIPE_SECRET_KEY` so it works without extra config.
- **`src/lib/orders.ts`** — non-CDN Sanity client + `getOrderBySession` and
  `createOrderIfNotExists` (idempotent). Shared by webhook and download route.
- **`src/lib/email.ts`** — `sendOrderConfirmation` via Resend. No-op with a
  logged warning if `RESEND_API_KEY` is unset (so dev/builds don't crash).
- **`src/app/api/webhooks/stripe/route.ts`** — verifies signature with
  `STRIPE_WEBHOOK_SECRET` over the raw body, handles
  `checkout.session.completed`, creates order, sends email.
- **`src/app/api/download/[id]/route.ts`** (modified) — requires
  `?session=&token=`. Verifies HMAC, then authorizes: if a Sanity order exists,
  allow when status ≠ `refunded` and it contains the photo; otherwise fall back
  to retrieving the Stripe session and checking `payment_status === "paid"`
  (covers the window before the webhook lands).
- **`src/app/api/order-details/route.ts`** (modified) — no longer creates the
  order; returns `email`, `amount`, `photoIds`, and tokenized `downloads`.
- **`src/app/success/page.tsx`** (modified) — renders `downloads[].url`.

### Token tied to session (not order) ID

Both the webhook and the success page can generate identical links from the
Stripe session ID without depending on the Sanity order existing yet. This
removes the webhook-vs-success-page race.

## Environment variables

- `STRIPE_SECRET_KEY` (already required)
- `STRIPE_WEBHOOK_SECRET` (new — from Stripe Dashboard webhook)
- `RESEND_API_KEY` (new)
- `EMAIL_FROM` (new — e.g. `Waterdog Productions <orders@yourdomain>`)
- `DOWNLOAD_TOKEN_SECRET` (optional — falls back to `STRIPE_SECRET_KEY`)
- `NEXT_PUBLIC_SITE_URL` (optional — absolute origin for email links)

## New dependency

- `resend`

## Manual setup after build

1. Register `https://<domain>/api/webhooks/stripe` in the Stripe Dashboard and
   copy the signing secret into `STRIPE_WEBHOOK_SECRET`.
2. Verify a sending domain in Resend (or use `onboarding@resend.dev` to start)
   and set `RESEND_API_KEY` + `EMAIL_FROM`.

## Out of scope

- Refund automation (manual status change in Sanity already revokes downloads).
- Re-send-email / order-history customer portal.
