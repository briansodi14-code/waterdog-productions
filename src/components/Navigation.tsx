"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Find Your Photos" },
  { href: "/book", label: "Book a Session" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="container-custom px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={`font-display text-xl md:text-2xl font-bold tracking-tight transition-colors duration-300 ${
              isScrolled ? "text-ocean-900" : "text-white"
            }`}
          >
            WATERDOG
            <span
              className={`block text-xs font-normal tracking-[0.2em] uppercase ${
                isScrolled ? "text-ocean-600" : "text-white/80"
              }`}
            >
              Productions
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${
                  isScrolled
                    ? "text-ocean-800 hover:text-ocean-600"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Cart + CTA (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/cart"
              className={`relative p-2 rounded-full transition-colors ${
                isScrolled
                  ? "text-ocean-800 hover:text-ocean-600"
                  : "text-white/90 hover:text-white"
              }`}
              aria-label="Shopping cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-teal-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <Link
              href="/gallery"
              className={`inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ${
                isScrolled
                  ? "bg-ocean-800 text-white hover:bg-ocean-700"
                  : "bg-white/20 text-white border border-white/40 hover:bg-white/30"
              }`}
            >
              Find Your Photos
            </Link>
          </div>

          {/* Mobile Cart + Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/cart"
              className={`relative p-2 rounded-lg transition-colors ${
                isScrolled ? "text-ocean-800" : "text-white"
              }`}
              aria-label="Shopping cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-teal-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isScrolled ? "text-ocean-800" : "text-white"
              }`}
              aria-label="Toggle menu"
            >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100 mt-6" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={`rounded-2xl p-6 space-y-4 ${
              isScrolled ? "bg-sand-100" : "bg-white/10 backdrop-blur-md"
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-2 font-medium transition-colors ${
                  isScrolled
                    ? "text-ocean-800 hover:text-ocean-600"
                    : "text-white hover:text-white/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
