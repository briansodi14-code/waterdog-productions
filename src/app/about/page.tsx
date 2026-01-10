import Image from "next/image";
import Link from "next/link";

const stats = [
  { value: "500+", label: "Sessions Shot" },
  { value: "10K+", label: "Photos Delivered" },
  { value: "4", label: "Locations Covered" },
  { value: "100%", label: "In-Water" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/IMG_4340.JPG"
            alt="Surf photography in action"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-950/80 via-ocean-950/70 to-ocean-950/90" />
        </div>

        <div className="container-custom px-6 md:px-8 lg:px-12 relative">
          <div className="max-w-3xl">
            <span className="text-sm font-medium tracking-widest uppercase text-teal-400 mb-4 block">
              Our Story
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              About Waterdog Productions
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Born from a love of surfing and photography, Waterdog Productions brings you
              the perspective that only comes from being in the water.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-white">
        <div className="container-custom px-6 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div>
              <span className="text-sm font-medium tracking-widest uppercase text-teal-600 mb-4 block">
                The Beginning
              </span>
              <h2 className="heading-section text-ocean-900 mb-6">
                Started From the Lineup
              </h2>
              <div className="space-y-4 text-body">
                <p>
                  It started simple: I wanted to capture what it actually feels like to surf.
                  Not from the beach, not from a drone, but from right there in the water,
                  next to the surfers, in the middle of the action.
                </p>
                <p>
                  Most surf photos you see are shot from shore. They&apos;re beautiful, but they
                  miss something. They can&apos;t show you the spray off the lip, the texture of the
                  wave face, or that split-second moment when everything comes together.
                </p>
                <p>
                  That&apos;s what I chase every session. I&apos;m out there before dawn, swimming
                  through the impact zone, positioning myself where the action happens.
                  It&apos;s challenging, it&apos;s physical, and it produces images you can&apos;t get
                  any other way.
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="/images/IMG_4366.JPG"
                  alt="In-water surf photography"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full bg-teal-100 rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* What Makes It Different Section */}
      <section className="section-padding bg-sand-50">
        <div className="container-custom px-6 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="/images/IMG_4392.JPG"
                  alt="Water-level surf photography perspective"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -z-10 -bottom-6 -left-6 w-full h-full bg-ocean-100 rounded-2xl" />
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <span className="text-sm font-medium tracking-widest uppercase text-teal-600 mb-4 block">
                The Difference
              </span>
              <h2 className="heading-section text-ocean-900 mb-6">
                Why In-Water Photography?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-ocean-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-ocean-900 mb-1">Unique Perspective</h3>
                    <p className="text-sm text-ocean-700/80">
                      Shots from eye level with the wave show what surfing actually looks and feels like.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-ocean-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-ocean-900 mb-1">Action & Energy</h3>
                    <p className="text-sm text-ocean-700/80">
                      Closer to the action means more dynamic shots with real spray, motion, and intensity.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-ocean-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-ocean-900 mb-1">Personal Connection</h3>
                    <p className="text-sm text-ocean-700/80">
                      I&apos;m a surfer first. I understand the moments that matter and when to capture them.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-ocean-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-ocean-900 mb-1">Quality Guaranteed</h3>
                    <p className="text-sm text-ocean-700/80">
                      Professional equipment built for the water, plus careful editing for every shot.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-ocean-950">
        <div className="container-custom px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="block font-display text-4xl md:text-5xl font-bold text-teal-400 mb-2">
                  {stat.value}
                </span>
                <span className="text-sm text-white/70 uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photographer Section */}
      <section className="section-padding bg-white">
        <div className="container-custom px-6 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-center">
              {/* Photo Placeholder */}
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-ocean-200 to-teal-100 flex items-center justify-center">
                  <div className="text-center p-6">
                    <svg className="w-16 h-16 mx-auto text-ocean-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <p className="text-sm text-ocean-600">Photographer photo coming soon</p>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <span className="text-sm font-medium tracking-widest uppercase text-teal-600 mb-4 block">
                  Behind the Lens
                </span>
                <h2 className="heading-section text-ocean-900 mb-6">
                  Meet the Photographer
                </h2>
                <div className="space-y-4 text-body">
                  <p>
                    Based in Huntington Beach, I spend most mornings in the water—either surfing
                    or shooting. Usually both. After years of wanting better photos of my own
                    sessions, I invested in water housing equipment and started Waterdog Productions.
                  </p>
                  <p>
                    Now I&apos;m out there every swell, capturing the local crew and visitors alike.
                    From HB Pier to San Clemente, I know these breaks and I know when the light
                    is going to be perfect.
                  </p>
                </div>
                <div className="mt-6 flex gap-4">
                  <a
                    href="https://instagram.com/waterdogproductions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-ocean-800 hover:text-teal-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    @waterdogproductions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-ocean-800 via-ocean-900 to-ocean-950 text-white">
        <div className="container-custom px-6 md:px-8 lg:px-12 text-center">
          <h2 className="heading-section mb-4">Ready to Get Shot?</h2>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            Whether you&apos;re looking for your photos from a recent session or want to book
            dedicated coverage, let&apos;s connect.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/gallery" className="btn-primary bg-white text-ocean-900 hover:bg-sand-100">
              Find Your Photos
            </Link>
            <Link href="/book" className="btn-outline-light">
              Book a Session
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
