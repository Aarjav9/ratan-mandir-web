"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useCartDrawer } from "@/context/CartDrawerContext";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import AnnouncementBar from "@/components/header/AnnouncementBar";
import SearchBar from "@/components/header/SearchBar";
import MegaMenu from "@/components/header/MegaMenu";
import MobileNav from "@/components/header/MobileNav";
import MobileStickyNav from "@/components/header/MobileStickyNav";
import type { MegaMenuPreview } from "@/lib/megaMenuPreview";

export default function Header() {
  const { itemCount } = useCart();
  const { open: openCartDrawer } = useCartDrawer();
  const { customer } = useAuth();
  const { count: wishlistCount } = useWishlist();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [menuPreview, setMenuPreview] = useState<MegaMenuPreview>({});

  // Fetched client-side (not in the root layout) so the header never
  // depends on a per-navigation server-side DB query — that previously
  // made every page transition re-run a full-catalog fetch as part of
  // rendering the shared layout, causing a visible flash/delay.
  useEffect(() => {
    fetch("/api/mega-menu-preview")
      .then((res) => res.json())
      .then((data: { preview: MegaMenuPreview }) => setMenuPreview(data.preview))
      .catch(() => setMenuPreview({}));
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-ivory/95 backdrop-blur">
        <AnnouncementBar />

        <div className="container-page flex h-20 items-center gap-4">
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open menu"
            className="flex flex-col gap-1.5 p-1 md:hidden"
          >
            <span className="block h-0.5 w-6 bg-ink" />
            <span className="block h-0.5 w-6 bg-ink" />
            <span className="block h-0.5 w-6 bg-ink" />
          </button>

          <Link href="/" className="flex flex-col leading-none">
            <span className="font-marcellus text-2xl text-maroon">Ratan Mandir</span>
            <span className="font-yatra mt-1 hidden text-xs tracking-wide text-inkSoft sm:block">
              रतन मंदिर · Authentic Rudraksha &amp; Gemstones
            </span>
          </Link>

          <div className="hidden flex-1 justify-center px-8 md:flex">
            <SearchBar className="max-w-md" />
          </div>

          <div className="ml-auto flex items-center gap-3">
            <Link
              href={customer ? "/account/orders" : "/account/login"}
              className="hidden rounded-card border border-gold/60 bg-card px-4 py-2 font-mulish text-sm font-semibold text-maroon shadow-soft transition-colors hover:border-gold md:block"
            >
              {customer ? customer.name.split(" ")[0] : "Login"}
            </Link>
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative hidden items-center rounded-card border border-gold/60 bg-card p-2.5 text-maroon shadow-soft transition-colors hover:border-gold md:flex"
            >
              <HeartIcon />
              {wishlistCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-maroon px-1 font-mulish text-xs font-bold text-ivory">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={openCartDrawer}
              className="relative flex items-center gap-2 rounded-card border border-gold/60 bg-card px-4 py-2 font-mulish text-sm font-semibold text-maroon shadow-soft transition-colors hover:border-gold"
            >
              Cart
              {itemCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-maroon px-1 font-mulish text-xs font-bold text-ivory">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="hidden border-t border-line md:block">
          <div className="container-page flex h-14 items-center">
            <MegaMenu menuPreview={menuPreview} />
          </div>
        </div>
      </header>

      <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} menuPreview={menuPreview} />
      <MobileStickyNav onOpenCategories={() => setMobileNavOpen(true)} />
    </>
  );
}

function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 20s-7-4.35-9.5-8.5C.8 8 2.5 4.5 6 4.5c2 0 3.5 1 6 3.5 2.5-2.5 4-3.5 6-3.5 3.5 0 5.2 3.5 3.5 7-2.5 4.15-9.5 8.5-9.5 8.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
