"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useCartDrawer } from "@/context/CartDrawerContext";
import { useWishlist } from "@/context/WishlistContext";

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 11 12 4l8 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 10v10h12V10" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function CategoriesIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.6" />
      <line x1="15.5" y1="15.5" x2="20.5" y2="20.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function WishlistIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 20s-7-4.35-9.5-8.5C.8 8 2.5 4.5 6 4.5c2 0 3.5 1 6 3.5 2.5-2.5 4-3.5 6-3.5 3.5 0 5.2 3.5 3.5 7-2.5 4.15-9.5 8.5-9.5 8.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 8h12l-1 12H7L6 8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function NavIcon({
  label,
  icon,
  count,
  onClick,
  href,
}: {
  label: string;
  icon: ReactNode;
  count?: number;
  onClick?: () => void;
  href?: string;
}) {
  const content = (
    <div className="relative flex flex-1 flex-col items-center gap-1 py-2 text-ink">
      {icon}
      <span className="font-mulish text-[10px] font-semibold">{label}</span>
      {!!count && count > 0 && (
        <span className="absolute -top-0.5 right-1/2 flex h-4 min-w-4 translate-x-4 items-center justify-center rounded-full bg-maroon px-1 font-mulish text-[9px] font-bold text-ivory">
          {count}
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="flex-1">
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className="flex-1">
      {content}
    </button>
  );
}

export default function MobileStickyNav({ onOpenCategories }: { onOpenCategories: () => void }) {
  const { itemCount } = useCart();
  const { open: openCartDrawer } = useCartDrawer();
  const { count: wishlistCount } = useWishlist();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 flex border-t border-line bg-card shadow-soft md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <NavIcon label="Home" icon={<HomeIcon />} href="/" />
      <NavIcon label="Categories" icon={<CategoriesIcon />} onClick={onOpenCategories} />
      <NavIcon label="Search" icon={<SearchIcon />} href="/search" />
      <NavIcon label="Wishlist" icon={<WishlistIcon />} href="/wishlist" count={wishlistCount} />
      <NavIcon label="Cart" icon={<CartIcon />} onClick={openCartDrawer} count={itemCount} />
    </nav>
  );
}
