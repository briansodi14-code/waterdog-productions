import Image from "next/image";
import Link from "next/link";

const galleryImages = [
  { src: "/images/IMG_4419.JPG", alt: "Surfer catching a wave" },
  { src: "/images/IMG_4317.JPG", alt: "In-water surf action shot" },
  { src: "/images/IMG_4279.JPG", alt: "Barrel shot from inside the wave" },
  { src: "/images/IMG_4280.JPG", alt: "Surfer on a perfect wave" },
  { src: "/images/IMG_4340.JPG", alt: "Dynamic surf photography" },
  { src: "/images/IMG_4366.JPG", alt: "Water-level surf shot" },
  { src: "/images/IMG_4381.JPG", alt: "Surfer carving" },
  { src: "/images/IMG_4392.JPG", alt: "Ocean wave photography" },
];

const services = [
  {
    title: "Session Coverage",
    description: "I'm in the water at your favorite breaks, capturing every wave. Find your photos from recent sessions.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    link: "/gallery",
    linkText: "Browse Photos",
  },
  {
    title: "Private Sessions",
    description: "Book a dedicated in-water photography session. Perfect for pros, progression tracking, or special occasions.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    link: "/book",
    linkText: "Book Now",
  },
  {
    title: "Event Coverage",
    description: "Competitions, surf camps, and group events. Professional coverage that captures the energy of the day.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    link: "/contact",
    linkText: "Get in Touch",
  },
];

const locations = ["HB Pier", "Newport", "San Clemente", "Laguna"];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/IMG_4419.JPG"
            alt="Surfer riding a wave - Waterdog Productions"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-950/70 via-ocean-950/40 to-ocean-950/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-950/50 via-transparent to-ocean-950/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 md:px-8 max-w-5xl mx-auto">
          {/* Location Tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-8 opacity-0 animate-fade-in-down">
            {locations.map((location) => (
              <span
                key={location}
                className="px-4 py-1.5 text-xs font-medium tracking-wider uppercase bg-white/10 backdrop-blur-sm rounded-full text-white/90 border border-white/20"
              >
                {location}
              </span>
            ))}
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 opacity-0 animate-fade-in-up tracking-tight">
            In the Water.
            <br />
            <span className="text-teal-400">In the Moment.</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto opacity-0 animate-fade-in-up animation-delay-200 leading-relaxed">
            Professional in-water surf photography capturing your best waves
            from inside the action. Based in Huntington Beach, CA.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up animation-delay-400">
            <Link href="/gallery" className="btn-primary">
              Find Your Photos
            </Link>
            <Link href="/book" className="btn-outline-light">
              Book a Session
            </Link>
          </div>

          {/* Pricing Badge */}
          <div className="mt-12 opacity-0 animate-fade-in animation-delay-600">
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white/90 border border-white/20">
              <span className="text-sm">Photos starting at</span>
              <span className="font-display font-bold text-teal-400">$5/image</span>
              <span className="text-white/40">|</span>
              <span className="font-display font-bold text-teal-400">5 for $20</span>
            </span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="flex flex-col items-center gap-2 text-white/50">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="section-padding bg-sand-50">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-sm font-medium tracking-widest uppercase text-teal-600 mb-4 block">
              Recent Shots
            </span>
            <h2 className="heading-section text-ocean-900 mb-4">
              From the Lineup
            </h2>
            <p className="text-body max-w-2xl mx-auto">
              Every session, I&apos;m in the water with you, capturing the waves you&apos;ll want to remember.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {galleryImages.map((image, index) => (
              <Link
                key={image.src}
                href="/gallery"
                className={`group relative aspect-square rounded-xl overflow-hidden image-zoom card-hover ${
                  index === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes={index === 0 ? "(max-width: 768px) 50vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/80 via-ocean-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 md:p-6">
                  <span className="text-white font-medium text-sm md:text-base flex items-center gap-2">
                    View Gallery
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link href="/gallery" className="btn-secondary">
              Browse All Photos
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden image-zoom">
                <Image
                  src="/images/IMG_4317.JPG"
                  alt="In-water surf photography perspective"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 bg-ocean-800 text-white px-6 py-4 rounded-xl shadow-xl">
                <span className="block text-3xl font-display font-bold">100%</span>
                <span className="text-sm text-white/80">In-Water Shots</span>
              </div>
            </div>

            {/* Content */}
            <div>
              <span className="text-sm font-medium tracking-widest uppercase text-teal-600 mb-4 block">
                About Waterdog
              </span>
              <h2 className="heading-section text-ocean-900 mb-6">
                Where the Best Shots Are Made
              </h2>
              <div className="space-y-4 text-body">
                <p>
                  There&apos;s a perspective you can only get from being in the water yourself.
                  That&apos;s where I shoot—swimming past the lineup, treading water between sets,
                  getting the angle that shows what it really feels like to be out there.
                </p>
                <p>
                  Based in Huntington Beach, I cover the best breaks from HB Pier
                  down to San Clemente. Whether you&apos;re a local ripper, visiting pro,
                  or just caught your first wave, I&apos;m there to document it.
                </p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/about" className="btn-primary">
                  Our Story
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-ocean-950 text-white">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-sm font-medium tracking-widest uppercase text-teal-400 mb-4 block">
              What We Do
            </span>
            <h2 className="heading-section mb-4">
              Capture Your Sessions
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              From regular lineup coverage to private sessions and events,
              we&apos;ve got your surf photography needs covered.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500"
              >
                <div className="text-teal-400 mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="font-display text-xl font-bold mb-3">
                  {service.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <Link
                  href={service.link}
                  className="inline-flex items-center gap-2 text-teal-400 font-medium text-sm hover:gap-3 transition-all duration-300"
                >
                  {service.linkText}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram CTA Section */}
      <section className="section-padding bg-gradient-to-br from-ocean-800 via-ocean-900 to-ocean-950 text-white overflow-hidden relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 bg-noise" />

        <div className="container-custom relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-8">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
            <h2 className="heading-section mb-6">
              Follow the Action
            </h2>
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              Daily drops from the lineup. See the latest shots, find your session,
              and tag yourself in the waves.
            </p>
            <a
              href="https://instagram.com/waterdogproductions"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-white text-ocean-900 hover:bg-sand-100"
            >
              @waterdogproductions
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
