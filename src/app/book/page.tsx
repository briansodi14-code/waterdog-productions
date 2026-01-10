"use client";

import { useState } from "react";
import Image from "next/image";

const packages = [
  {
    name: "Dawn Patrol",
    duration: "1 hour",
    price: 150,
    description: "Perfect for the early morning session. One hour of dedicated coverage at your favorite break.",
    features: [
      "1 hour in-water coverage",
      "20+ edited photos delivered",
      "Digital delivery within 48 hours",
      "Print-ready high resolution",
    ],
    popular: false,
  },
  {
    name: "Full Session",
    duration: "2 hours",
    price: 250,
    description: "Our most popular package. Extended coverage to capture your best waves across multiple sets.",
    features: [
      "2 hours in-water coverage",
      "40+ edited photos delivered",
      "Digital delivery within 48 hours",
      "Print-ready high resolution",
      "Social media edits included",
    ],
    popular: true,
  },
  {
    name: "Epic Day",
    duration: "4 hours",
    price: 400,
    description: "For when the conditions are firing. Full morning or evening session coverage.",
    features: [
      "4 hours in-water coverage",
      "80+ edited photos delivered",
      "Priority digital delivery (24 hours)",
      "Print-ready high resolution",
      "Social media edits included",
      "Short video clips",
    ],
    popular: false,
  },
];

const locations = ["HB Pier", "Newport Beach", "San Clemente", "Laguna Beach", "Other"];

export default function BookPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    location: "",
    package: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/IMG_4381.JPG"
            alt="Surf photography session"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-950/80 via-ocean-950/70 to-ocean-950/90" />
        </div>

        <div className="container-custom px-6 md:px-8 lg:px-12 relative">
          <div className="max-w-3xl">
            <span className="text-sm font-medium tracking-widest uppercase text-teal-400 mb-4 block">
              Private Sessions
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Book Your Session
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Get dedicated in-water coverage of your surf session. Perfect for progression tracking,
              competition prep, or just capturing your best waves with professional quality.
            </p>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="section-padding bg-sand-50">
        <div className="container-custom px-6 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="heading-section text-ocean-900 mb-4">Session Packages</h2>
            <p className="text-body max-w-2xl mx-auto">
              Choose the package that fits your needs. All sessions include professional editing
              and high-resolution digital delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-xl ${
                  pkg.popular ? "ring-2 ring-teal-500 shadow-lg" : "border border-sand-200"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-teal-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="font-display text-xl font-bold text-ocean-900 mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-sm text-ocean-600">{pkg.duration}</p>
                </div>

                <div className="text-center mb-6">
                  <span className="text-4xl font-display font-bold text-ocean-900">${pkg.price}</span>
                </div>

                <p className="text-sm text-ocean-700/80 text-center mb-6">
                  {pkg.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-ocean-700">
                      <svg className="w-5 h-5 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, package: pkg.name }));
                    document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                    pkg.popular
                      ? "bg-teal-500 text-white hover:bg-teal-600"
                      : "bg-ocean-800 text-white hover:bg-ocean-700"
                  }`}
                >
                  Select Package
                </button>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-ocean-600 mt-8">
            Need something custom? <a href="/contact" className="text-teal-600 font-medium hover:underline">Contact us</a> for event coverage and group rates.
          </p>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking-form" className="section-padding bg-white">
        <div className="container-custom px-6 md:px-8 lg:px-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-section text-ocean-900 mb-4">Request a Session</h2>
              <p className="text-body">
                Fill out the form below and I&apos;ll get back to you within 24 hours to confirm your session.
              </p>
            </div>

            {isSubmitted ? (
              <div className="text-center py-12 px-6 bg-teal-50 rounded-2xl">
                <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-bold text-ocean-900 mb-2">Request Submitted!</h3>
                <p className="text-ocean-700">
                  Thanks for your interest! I&apos;ll be in touch within 24 hours to confirm your session details.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-ocean-800 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-sand-300 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition-shadow"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-ocean-800 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-sand-300 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition-shadow"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-ocean-800 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-sand-300 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition-shadow"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-ocean-800 mb-2">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-sand-300 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition-shadow"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-ocean-800 mb-2">
                      Preferred Location *
                    </label>
                    <select
                      id="location"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-sand-300 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition-shadow appearance-none bg-white"
                    >
                      <option value="">Select a location</option>
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="package" className="block text-sm font-medium text-ocean-800 mb-2">
                      Package
                    </label>
                    <select
                      id="package"
                      name="package"
                      value={formData.package}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-sand-300 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition-shadow appearance-none bg-white"
                    >
                      <option value="">Select a package</option>
                      {packages.map((pkg) => (
                        <option key={pkg.name} value={pkg.name}>
                          {pkg.name} - ${pkg.price}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-ocean-800 mb-2">
                    Additional Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-sand-300 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition-shadow resize-none"
                    placeholder="Tell me about your session goals, skill level, or any special requests..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Submit Request"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-sand-50">
        <div className="container-custom px-6 md:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-section text-ocean-900 text-center mb-12">Common Questions</h2>

            <div className="space-y-6">
              {[
                {
                  q: "What happens if conditions are bad?",
                  a: "We&apos;ll reschedule at no extra cost. I monitor the forecast closely and will reach out if I think we should move the session to a better day.",
                },
                {
                  q: "How long until I receive my photos?",
                  a: "Standard delivery is within 48 hours. Epic Day packages include priority 24-hour delivery. You&apos;ll receive a link to download your high-resolution images.",
                },
                {
                  q: "Can I choose which photos I want?",
                  a: "Absolutely! After the session, I&apos;ll send you a gallery of all the shots. You can pick your favorites for the final edit, or I can curate the best ones for you.",
                },
                {
                  q: "Do you shoot video?",
                  a: "The Epic Day package includes short video clips. For full video coverage, contact me for custom pricing.",
                },
              ].map((faq, i) => (
                <div key={i} className="bg-white rounded-xl p-6">
                  <h3 className="font-display font-semibold text-ocean-900 mb-2">{faq.q}</h3>
                  <p className="text-ocean-700/80 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
