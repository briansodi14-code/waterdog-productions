{/* DRAFT — NOT reviewed by an attorney. NOT legal advice. Fill every [BRACKETED PLACEHOLDER] and have a lawyer review before publishing. */}
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Waterdog Productions",
  description: "How Waterdog Productions collects, uses, and protects your information.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 bg-ocean-950">
        <div className="container-custom px-6 md:px-8 lg:px-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-white/50 text-sm">Last updated: [EFFECTIVE DATE]</p>
        </div>
      </section>

      {/* Body */}
      <section className="section-padding bg-white">
        <div className="container-custom px-6 md:px-8 lg:px-12 max-w-3xl mx-auto space-y-10 text-body">
          <p>
            This Privacy Policy explains how Waterdog Productions (&ldquo;Waterdog
            Productions,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and
            shares information when you visit waterdogproductions.com, browse or
            purchase surf photos, or book a photography session (the
            &ldquo;Site&rdquo;).
          </p>

          <div>
            <h2 className="font-display font-bold text-2xl text-ocean-900 mb-4">
              1. Who We Are
            </h2>
            <p>
              Waterdog Productions is operated by [LEGAL ENTITY NAME], located at
              [BUSINESS MAILING ADDRESS]. For any privacy question or request, contact
              us at [SUPPORT/PRIVACY EMAIL].
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-2xl text-ocean-900 mb-4">
              2. Information We Collect
            </h2>
            <p className="mb-4">We collect the following categories of information:</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Checkout information.</strong> When you purchase photos, our
                payment processor Stripe collects your email address and payment
                details in order to process the transaction. We do not collect or
                store shipping addresses, because every photo we sell is a digital
                download — we do not ship physical prints.
              </li>
              <li>
                <strong>Order records.</strong> After a successful purchase, we store
                a record of your order in our content database (Sanity) consisting of
                your email address, the Stripe checkout session and payment
                identifiers, which photos you purchased, the amount paid, and the
                order status (e.g., paid, fulfilled, refunded). This lets us deliver
                your downloads and provide customer support.
              </li>
              <li>
                <strong>Booking and contact inquiries.</strong> If you use the
                &ldquo;Book a Session&rdquo; or &ldquo;Contact&rdquo; forms, we collect
                the information you submit, which may include your name, email
                address, phone number, preferred date, location, and message.
              </li>
              <li>
                <strong>Communications.</strong> If you email us or contact us for
                support, we keep a record of that correspondence.
              </li>
              <li>
                <strong>Analytics.</strong> As of this writing, the Site does not run
                any third-party analytics or advertising tracking (e.g., Google
                Analytics, Meta Pixel). [CONFIRM: if analytics/advertising tracking is
                added in the future, this policy must be updated to disclose it.]
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display font-bold text-2xl text-ocean-900 mb-4">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To process your order and deliver your purchased photos;</li>
              <li>To send order confirmations and download links by email;</li>
              <li>To respond to booking requests, contact inquiries, and customer support;</li>
              <li>To detect and prevent fraud, and to enforce our Terms of Service; and</li>
              <li>To comply with legal and tax obligations.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display font-bold text-2xl text-ocean-900 mb-4">
              4. How Payments Are Handled
            </h2>
            <p>
              All payments on this Site are processed through Stripe&rsquo;s
              hosted checkout. Your card number, expiration date, and other payment
              card details are entered directly into Stripe&rsquo;s secure checkout
              page and are transmitted to Stripe — they are never sent to or stored
              on Waterdog Productions&rsquo; own servers or database. We only
              receive confirmation that payment succeeded, the amount charged, and
              limited order metadata described above. Stripe&rsquo;s handling of
              your payment information is governed by Stripe&rsquo;s own privacy
              policy, available at{" "}
              <a
                href="https://stripe.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 underline hover:text-teal-700"
              >
                stripe.com/privacy
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-2xl text-ocean-900 mb-4">
              5. Third Parties We Work With
            </h2>
            <p className="mb-4">
              We share information with a small number of service providers who
              help us run the Site and fulfill orders:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Stripe</strong> — payment processing (see Section 4 above).
              </li>
              <li>
                <strong>Sanity</strong> — our content management system, used to
                store photo listings and order records.
              </li>
              <li>
                <strong>Resend</strong> — our transactional email provider, used to
                send order confirmations and download links.
              </li>
              <li>
                <strong>Vercel</strong> — our website hosting provider.
              </li>
            </ul>
            <p className="mt-4">
              We do not sell your personal information, and we do not share it with
              third parties for their own marketing purposes.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-2xl text-ocean-900 mb-4">
              6. Cookies
            </h2>
            <p>
              The Site uses only the cookies strictly necessary for it to function
              (for example, keeping items in your shopping cart as you browse). We
              do not currently use advertising or analytics cookies. [CONFIRM: update
              this section if that changes.]
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-2xl text-ocean-900 mb-4">
              7. Data Retention
            </h2>
            <p>
              We retain order records for as long as reasonably necessary to
              provide customer support, honor download access, comply with tax and
              accounting obligations, and resolve disputes. [CONFIRM: specific
              retention period, e.g., 7 years for financial records.] Booking and
              contact form submissions are retained only as long as needed to
              respond to your inquiry, unless you become a customer.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-2xl text-ocean-900 mb-4">
              8. Your Rights
            </h2>
            <p>
              Depending on where you live, you may have the right to access,
              correct, or delete the personal information we hold about you, and to
              object to or restrict certain processing (for example, under the
              GDPR if you are in the EU/UK, or the CCPA/CPRA if you are a
              California resident). To exercise any of these rights, contact us at
              [SUPPORT/PRIVACY EMAIL]. We will respond within the time required by
              applicable law.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-2xl text-ocean-900 mb-4">
              9. Children&rsquo;s Privacy
            </h2>
            <p>
              The Site is not directed to children under 13, and we do not
              knowingly collect personal information from children under 13.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-2xl text-ocean-900 mb-4">
              10. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will post the
              revised version on this page with an updated &ldquo;Last updated&rdquo;
              date.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-2xl text-ocean-900 mb-4">
              11. Contact Us
            </h2>
            <p>
              Questions about this Privacy Policy? Contact us at [SUPPORT/PRIVACY
              EMAIL] or [BUSINESS MAILING ADDRESS].
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
