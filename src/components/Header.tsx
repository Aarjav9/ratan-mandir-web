"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const NAV_LINKS = [
  { href: "/shop/5", label: "Rudraksha" },
  { href: "/#navratna", label: "Gemstones" },
  { href: "/#brand-story", label: "Our Story" },
  { href: "/#astro-consultation", label: "Astro Consultation" },
];

export default function Header() {
  const { itemCount } = useCart();
  const { customer } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory/95 backdrop-blur">
      <div className="container-page flex h-20 items-center justify-between">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-marcellus text-2xl text-maroon">Ratan Mandir</span>
          <span className="font-yatra mt-1 text-xs tracking-wide text-inkSoft">
            रतन मंदिर · Authentic Rudraksha &amp; Gemstones
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mulish text-sm font-semibold text-ink transition-colors hover:text-maroon"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href={customer ? "/account/orders" : "/account/login"}
            className="rounded-card border border-gold/60 bg-card px-4 py-2 font-mulish text-sm font-semibold text-maroon shadow-soft transition-colors hover:border-gold"
          >
            {customer ? customer.name.split(" ")[0] : "Login"}
          </Link>
          <Link
            href="/cart"
            className="relative flex items-center gap-2 rounded-card border border-gold/60 bg-card px-4 py-2 font-mulish text-sm font-semibold text-maroon shadow-soft transition-colors hover:border-gold"
          >
            Cart
            {itemCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-maroon px-1 font-mulish text-xs font-bold text-ivory">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
