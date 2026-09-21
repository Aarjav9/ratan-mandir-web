import Link from "next/link";
import { CATEGORY_TAXONOMY } from "@/lib/categoryTaxonomy";

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
        </div>

        <div>
          <h3 className="font-marcellus text-lg text-gold">Shop</h3>
          <ul className="mt-4 space-y-2 font-mulish text-sm text-ivory/75">
            {CATEGORY_TAXONOMY.map((category) => (
              <li key={category.slug}>
                <Link href={category.href} className="hover:text-gold">
                  {category.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#navratna" className="hover:text-gold">
                Gemstones
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-marcellus text-lg text-gold">Help</h3>
          <ul className="mt-4 space-y-2 font-mulish text-sm text-ivory/75">
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
          </ul>
        </div>

        <div>
          <h3 className="font-marcellus text-lg text-gold">About</h3>
          <ul className="mt-4 space-y-2 font-mulish text-sm text-ivory/75">
            <li>
              <Link href="/#brand-story" className="hover:text-gold">
                Our Story
              </Link>
            </li>
            <li>
              <Link href="/#navratna" className="hover:text-gold">
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
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/15">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 font-mulish text-xs text-ivory/60 md:flex-row">
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
    </footer>
  );
}
