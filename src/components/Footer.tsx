import Link from "next/link";

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
        </div>

        <div>
          <h3 className="font-marcellus text-lg text-gold">Shop</h3>
          <ul className="mt-4 space-y-2 font-mulish text-sm text-ivory/75">
            <li><Link href="/shop/1" className="hover:text-gold">1 Mukhi Rudraksha</Link></li>
            <li><Link href="/shop/5" className="hover:text-gold">5 Mukhi Rudraksha</Link></li>
            <li><Link href="/shop/7" className="hover:text-gold">7 Mukhi Rudraksha</Link></li>
            <li><Link href="/shop/9" className="hover:text-gold">9 Mukhi Rudraksha</Link></li>
            <li><Link href="/#navratna" className="hover:text-gold">Navratna Gemstones</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-marcellus text-lg text-gold">Help</h3>
          <ul className="mt-4 space-y-2 font-mulish text-sm text-ivory/75">
            <li>
              {/* Follow-up: build a real /shipping page before launch. */}
              <span className="cursor-default">Shipping &amp; Delivery</span>
            </li>
            <li>
              {/* Follow-up: required by Razorpay for live activation — see README. */}
              <span className="cursor-default">Returns &amp; Refund Policy</span>
            </li>
            <li>
              <span className="cursor-default">Privacy Policy</span>
            </li>
            <li>
              <span className="cursor-default">Terms of Service</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-marcellus text-lg text-gold">Contact</h3>
          <ul className="mt-4 space-y-2 font-mulish text-sm text-ivory/75">
            {/* Placeholders — real business contact details to be supplied by the client. */}
            <li>[PHONE NUMBER]</li>
            <li>[EMAIL ADDRESS]</li>
            <li>[BUSINESS ADDRESS]</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/15">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 font-mulish text-xs text-ivory/60 md:flex-row">
          <p>&copy; {new Date().getFullYear()} Ratan Mandir. All rights reserved.</p>
          <p>Handled with reverence, shipped with care.</p>
        </div>
      </div>
    </footer>
  );
}
