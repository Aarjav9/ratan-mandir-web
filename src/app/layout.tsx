import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Marcellus, Yatra_One, Mulish } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marcellus",
  display: "swap",
});

const yatraOne = Yatra_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-yatra",
  display: "swap",
});

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-mulish",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ratan Mandir — Authentic Rudraksha & Gemstones",
    template: "%s | Ratan Mandir",
  },
  description:
    "Ratan Mandir offers lab-certified, authentic Rudraksha beads, malas and Navratna gemstones sourced directly from Nepal, Indonesia and Ceylon.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    siteName: "Ratan Mandir",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${marcellus.variable} ${yatraOne.variable} ${mulish.variable}`}>
      <body className="font-mulish bg-ivory text-ink antialiased">
        <CartProvider>
          <AuthProvider>
            <WishlistProvider>
              <Header />
              <main className="pb-16 md:pb-0">{children}</main>
              <Footer />
              <ScrollToTopButton />
            </WishlistProvider>
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
