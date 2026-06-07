"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, removeItem, clearCart, itemCount, totalPrice } = useCart();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const bundles = Math.floor(itemCount / 5);
  const remainder = itemCount % 5;
  const savings = itemCount >= 5 ? bundles * 10 : 0;

  const handleCheckout = async () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items,
          customerEmail: email,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 bg-gradient-to-b from-ocean-950 to-ocean-900">
        <div className="container-custom px-6 md:px-8 lg:px-12">
          <div className="text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Your Cart
            </h1>
            <p className="text-lg text-white/70">
              {itemCount === 0
                ? "Your cart is empty"
                : `${itemCount} photo${itemCount !== 1 ? "s" : ""} selected`}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white min-h-[50vh]">
        <div className="container-custom px-6 md:px-8 lg:px-12">
          {itemCount === 0 ? (
            <div className="text-center py-16">
              <svg
                className="w-20 h-20 mx-auto text-ocean-200 mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              <p className="text-ocean-600 text-lg mb-6">
                No photos in your cart yet.
              </p>
              <Link
                href="/gallery"
                className="btn-primary inline-flex items-center"
              >
                Browse Photos
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-[1fr_380px] gap-8">
              {/* Cart Items */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-ocean-900">
                    Selected Photos
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-sm text-ocean-500 hover:text-red-500 transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="group relative aspect-square rounded-xl overflow-hidden bg-sand-100"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.imageUrl}
                        alt={`Surf photo${item.location ? ` at ${item.location}` : ""}`}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                      />

                      {/* Info overlay */}
                      {(item.location || item.date) && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ocean-950/70 to-transparent p-3 pt-8">
                          {item.location && (
                            <p className="text-white/80 text-xs">
                              {item.location}
                            </p>
                          )}
                          {item.date && (
                            <p className="text-white text-xs font-medium">
                              {new Date(item.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Remove button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="absolute top-2 right-2 w-7 h-7 bg-white/90 hover:bg-red-500 hover:text-white rounded-full flex items-center justify-center text-ocean-600 transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Remove from cart"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Link
                    href="/gallery"
                    className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                  >
                    + Add more photos
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:sticky lg:top-24 h-fit">
                <div className="bg-sand-50 rounded-2xl p-6">
                  <h2 className="text-lg font-semibold text-ocean-900 mb-4">
                    Order Summary
                  </h2>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-ocean-600">
                        {itemCount} photo{itemCount !== 1 ? "s" : ""} x $8
                      </span>
                      <span className="text-ocean-800">${itemCount * 8}</span>
                    </div>

                    {savings > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-teal-600">
                          Bundle discount ({bundles}x 5-pack)
                        </span>
                        <span className="text-teal-600 font-medium">
                          -${savings}
                        </span>
                      </div>
                    )}

                    {remainder > 0 && remainder < 5 && itemCount >= 5 && (
                      <p className="text-xs text-ocean-500">
                        Add {5 - remainder} more for another 5-pack discount!
                      </p>
                    )}

                    {itemCount > 0 && itemCount < 5 && (
                      <p className="text-xs text-teal-600">
                        Add {5 - itemCount} more to get 5 for $30!
                      </p>
                    )}
                  </div>

                  <div className="border-t border-sand-200 pt-4 mb-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-ocean-900">
                        Total
                      </span>
                      <span className="text-lg font-bold text-ocean-900">
                        ${totalPrice}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-ocean-800 mb-2"
                    >
                      Email for delivery *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-sand-300 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent text-ocean-900"
                      required
                    />
                    <p className="text-xs text-ocean-500 mt-1">
                      Download link will be sent here
                    </p>
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm mb-3">{error}</p>
                  )}

                  <button
                    onClick={handleCheckout}
                    disabled={isLoading || itemCount === 0}
                    className="w-full btn-primary py-3 text-center rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Processing..." : `Checkout — $${totalPrice}`}
                  </button>

                  <p className="text-xs text-ocean-500 text-center mt-3">
                    Secure payment powered by Stripe
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
