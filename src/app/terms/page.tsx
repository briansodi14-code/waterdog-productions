{/* DRAFT — NOT reviewed by an attorney. NOT legal advice. Fill every [BRACKETED PLACEHOLDER] and have a lawyer review before publishing. */}
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Waterdog Productions",
  description: "The terms that govern your use of waterdogproductions.com and your purchase of photos.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 bg-ocean-950">
        <div className="container-custom px-6 md:px-8 lg:px-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-white/50 text-sm">Last updated: [EFFECTIVE DATE]</p>
        </div>
      </section>

      {/* Body */}
      <section className="section-padding bg-white">
        <div className="container-custom px-6 md:px-8 lg:px-12 max-w-3xl mx-auto space-y-10 text-body">
          <div>
            <h2 className="font-display font-bold text-2xl text-ocean-900 mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and
              use of waterdogproductions.com (the &ldquo;Site&rdquo;), operated by
              [LEGAL ENTITY NAME] (&ldquo;Waterdog Productions,&rdquo;
              &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By browsing the
              Site, purchasing photos, or submitting a booking or contact request,
              you agree to be bound by these Terms. If you do not agree, do not use
              the Site.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-2xl text-ocean-900 mb-4">
              2. Description of the Store
            </h2>
            <p>
              Waterdog Productions is an in-water surf photography business. The
              Site sells digital photographs of surf sessions, priced at $8 per
              photo or 5 photos for $30 (pricing subject to change and displayed at
              checkout), and offers dedicated photography session bookings
              (&ldquo;Book a Session&rdquo;). Booking requests submitted through the
              Site are inquiries only — a session is not confirmed, and no payment
              is collected, until we separately confirm details and arrange payment
              with you. [CONFIRM: describe how session bookings are actually paid
              for/confirmed, e.g., invoice, deposit, in-person.]
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-2xl text-ocean-900 mb-4">
              3. Intellectual Property &amp; License to Use Photos
            </h2>
            <p className="mb-4">
              All photographs offered on the Site are original works created by
              Waterdog Productions. Waterdog Productions and its photographer(s)
              retain full copyright and all other intellectual property rights in
              every photograph, whether or not it has been purchased.
            </p>
            <p className="mb-4">
              When you purchase a digital photo, we grant you a limited,
              non-exclusive, non-transferable license to download, print, and use
              that photo for your own personal, non-commercial purposes (for
              example, printing it, sharing it with friends and family, or posting
              it to your personal social media with credit to
              @waterdogproductions). This license does not permit you to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Resell, sublicense, or redistribute the photo for commercial gain;</li>
              <li>Use the photo in advertising, merchandise, or other commercial products without our prior written consent;</li>
              <li>Remove or alter any watermark, credit, or copyright notice; or</li>
              <li>Claim authorship or copyright ownership of the photo.</li>
            </ul>
            <p>
              [CONFIRM: whether any package includes an extended/commercial license,
              and any specific credit requirements.]
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-2xl text-ocean-900 mb-4">
              4. Orders, Pricing &amp; Payment
            </h2>
            <p>
              All prices are listed in U.S. dollars and are displayed at checkout
              before you pay. Payment is processed securely through Stripe&rsquo;s
              hosted checkout; we do not receive or store your full card details
              (see our{" "}
              <a href="/privacy-policy" className="text-teal-600 underline hover:text-teal-700">
                Privacy Policy
              </a>
              ). An order is complete once Stripe confirms your payment, at which
              point we email you download links for your purchased photos.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-2xl text-ocean-900 mb-4">
              5. Delivery
            </h2>
            <p>
              All photos are delivered digitally by download link — Waterdog
              Productions does not ship physical prints or merchandise. If you want
              a physical print, you are responsible for printing the digital file
              yourself or through a third-party print service, subject to the
              license terms in Section 3. See our{" "}
              <a href="/refund-policy" className="text-teal-600 underline hover:text-teal-700">
                Refund &amp; Return Policy
              </a>{" "}
              for what happens if a download fails or is inaccessible.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-2xl text-ocean-900 mb-4">
              6. Session Bookings
            </h2>
            <p>
              If you book a dedicated photography session, additional terms may
              apply regarding scheduling, weather/surf conditions, cancellations,
              and rescheduling. [CONFIRM: session-specific cancellation/weather
              policy and deposit terms — none are currently published.]
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-2xl text-ocean-900 mb-4">
              7. Disclaimer of Warranties
            </h2>
            <p>
              The Site and all photos are provided &ldquo;as is&rdquo; and
              &ldquo;as available,&rdquo; without warranties of any kind, whether
              express or implied, including but not limited to implied warranties
              of merchantability, fitness for a particular purpose, and
              non-infringement. We do not guarantee that the Site will be
              uninterrupted, error-free, or secure.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-2xl text-ocean-900 mb-4">
              8. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, Waterdog Productions and its
              owners, employees, and contractors will not be liable for any
              indirect, incidental, special, consequential, or punitive damages
              arising out of or related to your use of the Site or purchase of any
              photo. Our total liability for any claim arising from these Terms or
              your purchase will not exceed the amount you actually paid for the
              photo(s) or session giving rise to the claim.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-2xl text-ocean-900 mb-4">
              9. Indemnification
            </h2>
            <p>
              You agree to indemnify and hold Waterdog Productions harmless from
              any claims, damages, or expenses (including reasonable attorneys&rsquo;
              fees) arising from your violation of these Terms or misuse of any
              purchased photo, including use outside the license granted in Section 3.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-2xl text-ocean-900 mb-4">
              10. Governing Law
            </h2>
            <p>
              These Terms are governed by the laws of the State of
              [GOVERNING LAW — STATE], without regard to its conflict-of-laws
              principles. Any dispute arising under these Terms will be subject to
              the exclusive jurisdiction of the state and federal courts located in
              [GOVERNING LAW — STATE].
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-2xl text-ocean-900 mb-4">
              11. Changes to These Terms
            </h2>
            <p>
              We may update these Terms from time to time. The updated version will
              be posted on this page with a revised &ldquo;Last updated&rdquo; date.
              Continued use of the Site after changes take effect constitutes
              acceptance of the revised Terms.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-2xl text-ocean-900 mb-4">
              12. Contact Us
            </h2>
            <p>
              Questions about these Terms? Contact us at [SUPPORT/PRIVACY EMAIL] or
              [BUSINESS MAILING ADDRESS].
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
