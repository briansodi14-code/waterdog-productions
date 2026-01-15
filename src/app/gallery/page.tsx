"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const allPhotos = [
  { id: 1, src: "/images/DSC00351.JPG", date: "2024-01-09", location: "HB Pier" },
  { id: 2, src: "/images/DSC00352.JPG", date: "2024-01-09", location: "HB Pier" },
  { id: 3, src: "/images/DSC00353.JPG", date: "2024-01-09", location: "HB Pier" },
  { id: 4, src: "/images/DSC00354.JPG", date: "2024-01-09", location: "HB Pier" },
  { id: 5, src: "/images/IMG_4419.JPG", date: "2024-01-08", location: "HB Pier" },
  { id: 6, src: "/images/IMG_4317.JPG", date: "2024-01-08", location: "HB Pier" },
  { id: 7, src: "/images/IMG_4279.JPG", date: "2024-01-07", location: "Newport" },
  { id: 8, src: "/images/IMG_4280.JPG", date: "2024-01-07", location: "Newport" },
  { id: 9, src: "/images/IMG_4320.JPG", date: "2024-01-06", location: "San Clemente" },
  { id: 10, src: "/images/IMG_4340.JPG", date: "2024-01-06", location: "San Clemente" },
  { id: 11, src: "/images/IMG_4366.JPG", date: "2024-01-05", location: "Laguna" },
  { id: 12, src: "/images/IMG_4381.JPG", date: "2024-01-05", location: "Laguna" },
  { id: 13, src: "/images/IMG_4392.JPG", date: "2024-01-04", location: "HB Pier" },
  { id: 14, src: "/images/IMG_4400.JPG", date: "2024-01-04", location: "HB Pier" },
];

const locations = ["All Locations", "HB Pier", "Newport", "San Clemente", "Laguna"];
const dates = ["All Dates", "2024-01-09", "2024-01-08", "2024-01-07", "2024-01-06", "2024-01-05", "2024-01-04"];

export default function GalleryPage() {
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedDate, setSelectedDate] = useState("All Dates");
  const [selectedPhoto, setSelectedPhoto] = useState<typeof allPhotos[0] | null>(null);
  const [cart, setCart] = useState<number[]>([]);

  const filteredPhotos = allPhotos.filter((photo) => {
    const matchesLocation = selectedLocation === "All Locations" || photo.location === selectedLocation;
    const matchesDate = selectedDate === "All Dates" || photo.date === selectedDate;
    return matchesLocation && matchesDate;
  });

  const toggleCart = (photoId: number) => {
    setCart((prev) =>
      prev.includes(photoId)
        ? prev.filter((id) => id !== photoId)
        : [...prev, photoId]
    );
  };

  const getPrice = () => {
    const count = cart.length;
    if (count === 0) return 0;
    if (count >= 5) {
      const bundles = Math.floor(count / 5);
      const remainder = count % 5;
      return bundles * 20 + remainder * 5;
    }
    return count * 5;
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-ocean-950 to-ocean-900">
        <div className="container-custom px-6 md:px-8 lg:px-12">
          <div className="text-center">
            <span className="text-sm font-medium tracking-widest uppercase text-teal-400 mb-4 block">
              Photo Gallery
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Find Your Photos
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Browse recent sessions. Filter by date and location to find yourself in the lineup.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-[72px] z-40 bg-white border-b border-sand-200 py-4 shadow-sm">
        <div className="container-custom px-6 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="appearance-none bg-sand-50 border border-sand-200 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-ocean-800 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent cursor-pointer"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ocean-600 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <div className="relative">
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="appearance-none bg-sand-50 border border-sand-200 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-ocean-800 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent cursor-pointer"
                >
                  {dates.map((date) => (
                    <option key={date} value={date}>
                      {date === "All Dates" ? date : new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </option>
                  ))}
                </select>
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ocean-600 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <span className="text-sm text-ocean-600">
                {filteredPhotos.length} photo{filteredPhotos.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Cart Summary */}
            {cart.length > 0 && (
              <div className="flex items-center gap-4 bg-ocean-50 px-4 py-2 rounded-lg">
                <span className="text-sm font-medium text-ocean-800">
                  {cart.length} selected
                </span>
                <span className="text-sm font-bold text-teal-600">
                  ${getPrice()}
                </span>
                <button className="btn-primary py-2 px-4 text-sm">
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Banner */}
      <section className="bg-sand-100 py-4">
        <div className="container-custom px-6 md:px-8 lg:px-12">
          <div className="flex items-center justify-center gap-4 text-sm">
            <span className="text-ocean-700">Pricing:</span>
            <span className="font-semibold text-ocean-900">$5/image</span>
            <span className="text-ocean-400">|</span>
            <span className="font-semibold text-teal-600">5 for $20</span>
            <span className="text-ocean-600 hidden md:inline">(Best Value!)</span>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom px-6 md:px-8 lg:px-12">
          {filteredPhotos.length === 0 ? (
            <div className="text-center py-16">
              <svg
                className="w-16 h-16 mx-auto text-ocean-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-ocean-600 text-lg">No photos found for the selected filters.</p>
              <button
                onClick={() => {
                  setSelectedLocation("All Locations");
                  setSelectedDate("All Dates");
                }}
                className="mt-4 text-teal-600 font-medium hover:text-teal-700"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="group relative aspect-square rounded-xl overflow-hidden bg-sand-100 cursor-pointer"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <Image
                    src={photo.src}
                    alt={`Surf photo at ${photo.location}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />

                  {/* Watermark Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-white/30 font-display font-bold text-xl rotate-[-30deg]">
                      WATERDOG
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white/80 text-xs mb-1">{photo.location}</p>
                      <p className="text-white text-sm font-medium">
                        {new Date(photo.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </p>
                    </div>
                  </div>

                  {/* Selection Checkbox */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCart(photo.id);
                    }}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                      cart.includes(photo.id)
                        ? "bg-teal-500 text-white"
                        : "bg-white/80 text-ocean-600 hover:bg-white"
                    }`}
                  >
                    {cart.includes(photo.id) ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-ocean-950/95 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-ocean-800 hover:bg-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid md:grid-cols-[2fr_1fr]">
              {/* Image */}
              <div className="relative aspect-square md:aspect-auto md:h-[600px] bg-sand-100">
                <Image
                  src={selectedPhoto.src}
                  alt={`Surf photo at ${selectedPhoto.location}`}
                  fill
                  className="object-contain"
                />
                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-white/20 font-display font-bold text-4xl rotate-[-30deg]">
                    WATERDOG
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 md:p-8 flex flex-col">
                <div className="mb-6">
                  <p className="text-sm text-ocean-600 mb-1">{selectedPhoto.location}</p>
                  <p className="text-lg font-semibold text-ocean-900">
                    {new Date(selectedPhoto.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                  </p>
                </div>

                <div className="mb-6 p-4 bg-sand-50 rounded-xl">
                  <p className="text-sm text-ocean-600 mb-2">Pricing</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-ocean-900">$5</span>
                    <span className="text-ocean-600">/image</span>
                  </div>
                  <p className="text-sm text-teal-600 mt-1">Buy 5 for $20</p>
                </div>

                <button
                  onClick={() => toggleCart(selectedPhoto.id)}
                  className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                    cart.includes(selectedPhoto.id)
                      ? "bg-teal-500 text-white hover:bg-teal-600"
                      : "bg-ocean-800 text-white hover:bg-ocean-700"
                  }`}
                >
                  {cart.includes(selectedPhoto.id) ? "Remove from Cart" : "Add to Cart"}
                </button>

                <div className="mt-auto pt-6 border-t border-sand-200">
                  <p className="text-xs text-ocean-500">
                    High-resolution digital download. Watermark removed after purchase.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-ocean-950 text-white">
        <div className="container-custom px-6 md:px-8 lg:px-12 text-center">
          <h2 className="heading-section mb-4">Don&apos;t See Your Session?</h2>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            I post new photos daily. Follow on Instagram for the latest drops, or book a private session.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://instagram.com/waterdogproductions"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-white text-ocean-900 hover:bg-sand-100"
            >
              Follow @waterdogproductions
            </a>
            <Link href="/book" className="btn-outline-light">
              Book a Session
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
