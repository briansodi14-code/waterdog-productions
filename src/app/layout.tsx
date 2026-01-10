import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Waterdog Productions | In-Water Surf Photography | Huntington Beach",
  description:
    "Professional in-water surf photography in Huntington Beach, Newport, San Clemente, and Laguna. Capturing your best moments from inside the waves. $5/image or 5 for $20.",
  keywords: [
    "surf photography",
    "Huntington Beach",
    "in-water photography",
    "surf photos",
    "ocean photography",
    "HB Pier",
    "Newport Beach",
    "San Clemente",
    "Laguna Beach",
    "California surf",
  ],
  authors: [{ name: "Waterdog Productions" }],
  openGraph: {
    title: "Waterdog Productions | In-Water Surf Photography",
    description:
      "Professional in-water surf photography capturing your best moments from inside the waves.",
    url: "https://waterdogproductions.com",
    siteName: "Waterdog Productions",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Waterdog Productions | In-Water Surf Photography",
    description:
      "Professional in-water surf photography capturing your best moments from inside the waves.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
