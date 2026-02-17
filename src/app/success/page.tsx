"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface OrderDetails {
  email: string;
  photoIds: string[];
  amount: number;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const hasFetched = useRef(false);
  const hasCleared = useRef(false);

  useEffect(() => {
    if (!hasCleared.current) {
      hasCleared.current = true;
      clearCart();
    }

    if (hasFetched.current || !sessionId) {
      if (!sessionId) setLoading(false);
      return;
    }

    hasFetched.current = true;

    fetch(`/api/order-details?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setOrderDetails(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load order details");
        setLoading(false);
      });
  }, [sessionId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-ocean-950 to-ocean-900">
        <div className="container-custom px-6 md:px-8 lg:px-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Thank You!
            </h1>
            <p className="text-lg text-white/70">Your purchase was successful</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom px-6 md:px-8 lg:px-12 max-w-2xl mx-auto">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-600 mx-auto"></div>
              <p className="mt-4 text-ocean-600">Loading your photos...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">{error}</p>
              <p className="mt-4 text-ocean-600">
                If you completed your purchase, please contact us at{" "}
                <a
                  href="mailto:mehlerc12@gmail.com"
                  className="text-teal-600 hover:underline"
                >
                  mehlerc12@gmail.com
                </a>
              </p>
            </div>
          ) : orderDetails ? (
            <div className="space-y-8">
              <div className="bg-sand-50 rounded-2xl p-6">
                <h2 className="font-display text-xl font-bold text-ocean-900 mb-4">
                  Order Details
                </h2>
                <p className="text-ocean-700 mb-2">
                  Confirmation sent to: <strong>{orderDetails.email}</strong>
                </p>
                <p className="text-ocean-700">
                  Total:{" "}
                  <strong>${(orderDetails.amount / 100).toFixed(2)}</strong>
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold text-ocean-900 mb-4">
                  Your Photos
                </h2>
                <p className="text-ocean-600 mb-4">
                  Click each photo to download the full-resolution, unwatermarked
                  version.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {orderDetails.photoIds.map((photoId) => (
                    <a
                      key={photoId}
                      href={`/api/download/${photoId}`}
                      download
                      className="block relative group"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/api/watermark/${photoId}?w=400`}
                        alt="Purchased photo"
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-ocean-900/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <span className="text-white font-semibold">Download</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="text-center pt-4">
                <p className="text-ocean-600 text-sm mb-4">
                  Having trouble? Contact us at{" "}
                  <a
                    href="mailto:mehlerc12@gmail.com"
                    className="text-teal-600 hover:underline"
                  >
                    mehlerc12@gmail.com
                  </a>
                </p>
                <Link href="/gallery" className="btn-primary inline-block">
                  Browse More Photos
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-ocean-600">No order details found.</p>
              <Link href="/gallery" className="btn-primary inline-block mt-4">
                Browse Photos
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-32 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-600 mx-auto"></div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
