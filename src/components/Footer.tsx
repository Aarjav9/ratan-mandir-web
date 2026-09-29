"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { CATEGORY_TAXONOMY } from "@/lib/categoryTaxonomy";

const WHATSAPP_NUMBER = "910000000000";
const PAYMENT_METHODS = ["UPI", "Visa", "Mastercard", "Razorpay", "COD"];
const SOCIAL_LINKS = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
];

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      {/* Mobile: collapsible accordion. Desktop: always expanded — same
          content rendered twice rather than toggled with JS state, since
          a plain <details> needs no extra logic. */}
      <details className="group md:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between font-marcellus text-lg text-gold">
          {title}
          <span className="font-mulish text-base transition-transform group-open:rotate-45">+</span>
        </summary>
        <ul className="mt-4 space-y-2 font-mulish text-sm text-ivory/75">{children}</ul>
      </details>
      <div className="hidden md:block">
        <h3 className="font-marcellus text-lg text-gold">{title}</h3>
        <ul className="mt-4 space-y-2 font-mulish text-sm text-ivory/75">{children}</ul>
      </div>
    </div>
  );
}

function NewsletterForm() {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubscribed(true);
  };

  if (subscribed) {
    return <p className="mt-4 font-mulish text-sm text-gold">Thanks for subscribing!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
      <input
        type="email"
        required
        placeholder="Your email"
        className="min-w-0 flex-1 rounded-card border border-ivory/20 bg-ivory/5 px-3 py-2 font-mulish text-sm text-ivory placeholder:text-ivory/50 outline-none focus:border-gold"
      />
      <button
        type="submit"
        className="shrink-0 rounded-card bg-gold px-4 py-2 font-mulish text-sm font-bold text-maroonDeep transition-colors hover:bg-saffron"
      >
        Subscribe
      </button>
    </form>
  );
}

export default function Footer() {
  return (
    <footer className="bg-maroonDeep text-ivory">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <span className="font-marcellus text-2xl">Ratan Mandir</span>
          <p className="mt-3 font-mulish text-sm leading-relaxed text-ivory/75">
            Authentic, lab-certified Rudraksha beads, malas and gemstones — sourced with
            care and shipped with a certificate of authenticity for every piece.
          </p>
          {/* Placeholders — real business contact details to be supplied by the client. */}
          <ul className="mt-4 space-y-1 font-mulish text-xs text-ivory/60">
            <li>[PHONE NUMBER]</li>
            <li>[EMAIL ADDRESS]</li>
            <li>[BUSINESS ADDRESS]</li>
          </ul>

          <div className="mt-4 flex items-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform hover:scale-105"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.38-.49.08-1.11.11-1.79-.11-.41-.13-.94-.31-1.62-.6-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09.99-2.37.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.57.81 1.98.88 2.12.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.21 1.37.28.14.44.12.61-.07.16-.19.7-.81.88-1.09.19-.28.37-.23.62-.14.26.09 1.64.77 1.92.91.28.14.47.21.54.33.07.12.07.68-.17 1.36Z" />
              </svg>
            </a>
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 text-ivory/75 transition-colors hover:border-gold hover:text-gold"
              >
                <span className="font-mulish text-xs font-bold">{social.label.slice(0, 1)}</span>
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title="Shop">
          {CATEGORY_TAXONOMY.map((category) => (
            <li key={category.slug}>
              <Link href={category.href} className="hover:text-gold">
                {category.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/shop/gemstones" className="hover:text-gold">
              Gemstones
            </Link>
          </li>
        </FooterColumn>

        <FooterColumn title="Help">
          <li>
            <Link href="/account/orders" className="hover:text-gold">
              Track Order
            </Link>
          </li>
          <li>
            <Link href="/#faq" className="hover:text-gold">
              FAQs
            </Link>
          </li>
          <li>
            {/* Follow-up: build a real /shipping page before launch. */}
            <span className="cursor-default">Shipping &amp; Delivery</span>
          </li>
          <li>
            {/* Follow-up: required by Razorpay for live activation — see README. */}
            <span className="cursor-default">Returns &amp; Refund Policy</span>
          </li>
          <li>
            <span className="cursor-default">Contact Us</span>
          </li>
        </FooterColumn>

        <div>
          <FooterColumn title="About">
            <li>
              <Link href="/#brand-story" className="hover:text-gold">
                Our Story
              </Link>
            </li>
            <li>
              <Link href="/#authenticity" className="hover:text-gold">
                Authenticity
              </Link>
            </li>
            <li>
              {/* Follow-up: educational/journal content is a later phase. */}
              <span className="cursor-default">Our Process</span>
            </li>
            <li>
              <span className="cursor-default">Journal</span>
            </li>
          </FooterColumn>

          <div className="mt-6">
            <h3 className="font-marcellus text-base text-gold">Stay Updated</h3>
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="border-t border-ivory/15">
        <div className="container-page flex flex-col items-center gap-3 py-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {PAYMENT_METHODS.map((method) => (
              <span
                key={method}
                className="rounded-card border border-ivory/20 px-2.5 py-1 font-mulish text-[10px] font-semibold text-ivory/70"
              >
                {method}
              </span>
            ))}
          </div>
          <div className="flex flex-col items-center justify-between gap-3 font-mulish text-xs text-ivory/60 md:w-full md:flex-row">
            <p>&copy; {new Date().getFullYear()} Ratan Mandir. All rights reserved.</p>
            <div className="flex gap-4">
              {/* Legal pages required before live payments go active — see README checklist. */}
              <span className="cursor-default">Privacy Policy</span>
              <span className="cursor-default">Terms of Service</span>
              <span className="cursor-default">Refund Policy</span>
            </div>
            <p>Handled with reverence, shipped with care.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
