"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

function NavIcon({
  label,
  count,
  onClick,
  href,
}: {
  label: string;
  count?: number;
  onClick?: () => void;
  href?: string;
}) {
  const content = (
    <div className="relative flex flex-1 flex-col items-center gap-1 py-2">
      <span className="font-mulish text-[10px] font-semibold text-ink">{label}</span>
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
  const { count: wishlistCount } = useWishlist();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 flex border-t border-line bg-card shadow-soft md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <NavIcon label="Home" href="/" />
      <NavIcon label="Categories" onClick={onOpenCategories} />
      <NavIcon label="Search" href="/search" />
      <NavIcon label="Wishlist" href="/wishlist" count={wishlistCount} />
      <NavIcon label="Cart" href="/cart" count={itemCount} />
    </nav>
  );
}
