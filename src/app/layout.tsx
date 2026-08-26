import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Marcellus, Yatra_One, Mulish } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

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

export const metadata: Metadata = {
  title: "Ratan Mandir — Authentic Rudraksha & Gemstones",
  description:
    "Ratan Mandir offers lab-certified, authentic Rudraksha beads, malas and Navratna gemstones sourced directly from Nepal, Indonesia and Ceylon.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${marcellus.variable} ${yatraOne.variable} ${mulish.variable}`}>
      <body className="font-mulish bg-ivory text-ink antialiased">
        <CartProvider>
          <AuthProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
