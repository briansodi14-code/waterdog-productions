"use client";

import { useState } from "react";
import Image from "next/image";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
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
            src="/images/IMG_4400.JPG"
            alt="Surf photography"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-950/80 via-ocean-950/70 to-ocean-950/90" />
        </div>

        <div className="container-custom px-6 md:px-8 lg:px-12 relative">
          <div className="max-w-3xl">
            <span className="text-sm font-medium tracking-widest uppercase text-teal-400 mb-4 block">
              Get in Touch
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Contact Us
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Questions about photos? Want to book a session? Or just want to talk surf?
              Reach out—I&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-white">
        <div className="container-custom px-6 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">
            {/* Contact Info */}
            <div>
              <h2 className="heading-section text-ocean-900 mb-8">Let&apos;s Connect</h2>

              <div className="space-y-6 mb-10">
                <a
                  href="tel:561-607-1052"
                  className="flex items-start gap-4 p-4 bg-sand-50 rounded-xl hover:bg-sand-100 transition-colors group"
                >
                  <div className="w-12 h-12 bg-ocean-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-ocean-200 transition-colors">
                    <svg className="w-6 h-6 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-ocean-900 mb-1">Phone</h3>
                    <p className="text-ocean-700">(561) 607-1052</p>
                    <p className="text-sm text-ocean-500 mt-1">Text or call anytime</p>
                  </div>
                </a>

                <a
                  href="mailto:mehlerc12@gmail.com"
                  className="flex items-start gap-4 p-4 bg-sand-50 rounded-xl hover:bg-sand-100 transition-colors group"
                >
                  <div className="w-12 h-12 bg-ocean-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-ocean-200 transition-colors">
                    <svg className="w-6 h-6 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-ocean-900 mb-1">Email</h3>
                    <p className="text-ocean-700">mehlerc12@gmail.com</p>
                    <p className="text-sm text-ocean-500 mt-1">I&apos;ll respond within 24 hours</p>
                  </div>
                </a>

                <a
                  href="https://instagram.com/waterdogproductions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 bg-sand-50 rounded-xl hover:bg-sand-100 transition-colors group"
                >
                  <div className="w-12 h-12 bg-ocean-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-ocean-200 transition-colors">
                    <svg className="w-6 h-6 text-ocean-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-ocean-900 mb-1">Instagram</h3>
                    <p className="text-ocean-700">@waterdogproductions</p>
                    <p className="text-sm text-ocean-500 mt-1">Daily photo drops & stories</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 bg-sand-50 rounded-xl">
                  <div className="w-12 h-12 bg-ocean-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-ocean-900 mb-1">Location</h3>
                    <p className="text-ocean-700">Huntington Beach, CA</p>
                    <p className="text-sm text-ocean-500 mt-1">Covering HB to San Clemente</p>
                  </div>
                </div>
              </div>

              {/* Locations Covered */}
              <div className="p-6 bg-ocean-50 rounded-xl">
                <h3 className="font-display font-semibold text-ocean-900 mb-4">Locations I Cover</h3>
                <div className="flex flex-wrap gap-2">
                  {["HB Pier", "Newport Beach", "San Clemente", "Laguna Beach"].map((loc) => (
                    <span
                      key={loc}
                      className="px-3 py-1.5 bg-white text-ocean-700 text-sm rounded-full"
                    >
                      {loc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-sand-50 rounded-2xl p-8 md:p-10">
                <h2 className="heading-section text-ocean-900 mb-2">Send a Message</h2>
                <p className="text-body mb-8">
                  Have a question or want to discuss something specific? Drop me a line.
                </p>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-display font-bold text-ocean-900 mb-2">Message Sent!</h3>
                    <p className="text-ocean-700">
                      Thanks for reaching out. I&apos;ll get back to you as soon as possible.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-ocean-800 mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-sand-300 bg-white focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition-shadow"
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
                          className="w-full px-4 py-3 rounded-xl border border-sand-300 bg-white focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition-shadow"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-ocean-800 mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-sand-300 bg-white focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition-shadow appearance-none"
                      >
                        <option value="">What&apos;s this about?</option>
                        <option value="photos">Finding My Photos</option>
                        <option value="booking">Booking a Session</option>
                        <option value="pricing">Pricing Question</option>
                        <option value="event">Event Coverage</option>
                        <option value="other">Something Else</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-ocean-800 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-sand-300 bg-white focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition-shadow resize-none"
                        placeholder="Tell me what's on your mind..."
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
                          Sending...
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Response Section */}
      <section className="py-16 bg-ocean-950 text-white">
        <div className="container-custom px-6 md:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl font-bold mb-4">Need a Quick Response?</h2>
            <p className="text-white/70 mb-6">
              The fastest way to reach me is through text or Instagram DM.
              I check both throughout the day, even when I&apos;m in the water.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:561-607-1052"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Text Me
              </a>
              <a
                href="https://instagram.com/waterdogproductions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                </svg>
                DM on Instagram
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
