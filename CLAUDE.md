# Waterdog Productions — Project Context

In-water surf photography site that sells photos via Stripe Checkout.

## Stack
- Next.js 14 (App Router), React 18, Tailwind CSS
- Sanity CMS for photos + orders (project ID `4osx568p`, dataset `production`)
- Sharp for server-side watermarking
- Resend for transactional email
- Deployed on Vercel (project `waterdog-productions`, team `brian-sodis-projects`)

## Accounts (IMPORTANT — they're split)
- **Stripe** "Waterdog Productions" → under **Chase's** Google login
  `mehlerc12@gmail.com`. **LIVE** as of 2026-06-07 (`sk_live_…`, live account
  `acct_1T1H2mJx1eLWFv3c`). Live webhook → `/api/webhooks/stripe`,
  event `checkout.session.completed`. (Earlier sandbox testing used a SEPARATE
  account `acct_1T1H2wF6F11OaxXc`.)
- **Resend** → also under **Chase's** `mehlerc12@gmail.com` (separate from
  Brian's Resend account). Domain `waterdogproductions.com` verified; sends from
  `orders@waterdogproductions.com`, reply-to `mehlerc12@gmail.com`.
- **Vercel** → under **Brian's** `briansodi14@gmail.com`. DNS for the domain is
  on Vercel nameservers (so Resend DNS records were added manually in Vercel).
- Support email shown to customers: `mehlerc12@gmail.com`.

## Pricing
**$8 per photo, 5 for $30** (bundle discount every 5). Defined in:
`src/context/CartContext.tsx`, `src/app/api/checkout/route.ts`,
`src/app/cart/page.tsx`, and marketing copy (home, gallery, footer, layout meta).

## Checkout architecture
- `POST /api/webhooks/stripe` — source of truth: on `checkout.session.completed`
  creates the Sanity order (idempotent) + sends the Resend email.
- `/api/order-details` — read-only; returns signed download URLs for the success page.
- `/api/download/[id]` — requires an HMAC-signed, session-bound token
  (`src/lib/downloadToken.ts`); verifies payment, revokes on refund.
- `src/lib/orders.ts` (non-CDN Sanity client), `src/lib/email.ts` (Resend).
- Spec: `docs/superpowers/specs/2026-06-06-stripe-webhook-email-delivery-design.md`

## Key gotchas
- **SVG watermark fails on Vercel:** Sharp/librsvg silently renders transparent
  PNGs on Vercel serverless. Use raw RGBA pixel buffers (see
  `src/app/api/watermark/[id]/route.ts`, bitmap font). `Response` body needs
  `new Uint8Array(buffer)` (Buffer → TS error).
- **Cold Vercel builds can hang** on npm install for 10+ min. Cancel + redeploy;
  the warm build finishes in ~50-100s.
- Gallery uses plain `<img>` (not Next `<Image>`) to avoid exposing Sanity URLs.

## Status (2026-06-07): LIVE 🎉
Store is taking real money. Stripe live, branded email shipped, $8 / 5-for-$30
pricing live. Full flow verified end to end with a real purchase.

### Optional / later
- Clean up TEST-mode order docs in Sanity (sandbox + first live test).
- Sales tax (Stripe Tax) skipped at activation — revisit if nexus thresholds
  require it (would need `automatic_tax` added to `api/checkout/route.ts`).

## Guides for Chase (PDF + source HTML)
- `docs/guides/uploading-photos-cheatsheet.pdf` — how to upload photos in Studio
- `docs/guides/running-the-site-cheatsheet.pdf` — site, Stripe, orders, customer service

## Cross-machine session protocol
- START of session: run `git pull` first — another computer may have pushed.
- END of session ("wrap up"): update `.claude-memory/` (current focus, decisions, in-flight work),
  then commit and push. Memory files are committed — they sync across machines via git.
- NEVER put secrets (API keys, tokens, passwords) in CLAUDE.md or `.claude-memory/` — secrets
  live in `.env` files, which stay gitignored and local.
