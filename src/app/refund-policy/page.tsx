{/* DRAFT — NOT reviewed by an attorney. NOT legal advice. Fill every [BRACKETED PLACEHOLDER] and have a lawyer review before publishing. */}
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Return Policy | Waterdog Productions",
  description: "Our policy on refunds for digital photo purchases and session bookings.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RefundPolicyPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 bg-ocean-950">
        <div className="container-custom px-6 md:px-8 lg:px-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Refund &amp; Return Policy
          </h1>
          <p className="text-white/50 text-sm">Last updated: [EFFECTIVE DATE]</p>
        </div>
      </section>

      {/* Body */}
      <section className="section-padding bg-white">
        <div className="container-custom px-6 md:px-8 lg:px-12 max-w-3xl mx-auto space-y-10 text-body">
          <div>
            <p>
              All products currently sold on waterdogproductions.com are{" "}
              <strong>digital photo downloads</strong> — Waterdog Productions does
              not ship physical prints, so there is nothing to physically return.
              This policy explains when refunds are and are not available.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-2xl text-ocean-900 mb-4">
              1. Digital Photo Downloads
            </h2>
            <p className="mb-4">
              Because each photo is a digital file that is delivered instantly by
              download link once payment is confirmed, <strong>all digital photo
              purchases are final and non-refundable once the download link has
              been delivered and is accessible to you</strong>, except in the
              circumstances described below.
            </p>
            <p className="mb-2">We will provide a refund or a replacement download link if:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You were charged more than once for the same order (duplicate charge);</li>
              <li>Your download link fails to work or the image file is corrupted, and we are unable to fix or reissue it within a reasonable time; or</li>
              <li>You were charged for photos that were never made available to you.</li>
            </ul>
            <p className="mt-4">
              To request a refund under one of these circumstances, contact us at
              [SUPPORT/PRIVACY EMAIL] within [CONFIRM: return/refund request window,
              e.g., 7 days] of your purchase, including your order confirmation
              email. [CONFIRM: whether any restocking or processing fee applies —
              typically not applicable to digital goods.]
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-2xl text-ocean-900 mb-4">
              2. Change of Mind
            </h2>
            <p>
              Because digital downloads cannot be &ldquo;returned&rdquo; once
              delivered, we are unable to offer refunds simply because you changed
              your mind, purchased the wrong photo, or no longer want an image
              after it has been downloaded or made accessible to you.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-2xl text-ocean-900 mb-4">
              3. Physical Prints (If Ever Offered)
            </h2>
            <p>
              We do not currently sell physical prints — every purchase is a
              digital file. [CONFIRM: if physical prints are added in the future,
              this section must be updated with a specific return window (e.g., 14
              days), condition requirements, who pays return shipping, and the
              process for items damaged in transit.]
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-2xl text-ocean-900 mb-4">
              4. Session Bookings
            </h2>
            <p>
              &ldquo;Book a Session&rdquo; requests submitted through the Site are
              inquiries only; no payment is collected at the time of the request.
              [CONFIRM: cancellation/rescheduling/weather policy and refund terms
              once a session is confirmed and paid for — none are currently
              published.]
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-2xl text-ocean-900 mb-4">
              5. How Refunds Are Issued
            </h2>
            <p>
              Approved refunds are issued to the original payment method through
              Stripe. Please allow [CONFIRM: typical bank/card processing time,
              e.g., 5–10 business days] for the refund to appear on your statement.
              Card details are held by Stripe, not Waterdog Productions — we are
              unable to refund to a different card or payment method.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-2xl text-ocean-900 mb-4">
              6. Contact Us
            </h2>
            <p>
              Questions about a purchase or a refund request? Contact us at
              [SUPPORT/PRIVACY EMAIL].
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
