"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface QuickActionsProduct {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  mrp?: number | null;
  defaultVariant?: { id: string; label: string; price: number } | null;
  variantCount?: number;
}

export default function ProductCardQuickActions({ product }: { product: QuickActionsProduct }) {
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [justAdded, setJustAdded] = useState(false);
  const wishlisted = isWishlisted(product.productId);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      productId: product.productId,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.image,
    });
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.defaultVariant) return;
    addItem({
      productId: product.productId,
      variantId: product.defaultVariant.id,
      name: product.name,
      variantLabel: product.defaultVariant.label,
      price: product.defaultVariant.price,
      mrp: product.mrp,
      image: product.image,
      slug: product.slug,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleWishlist}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={wishlisted}
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-card/90 text-maroon shadow-soft transition-transform hover:scale-110"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} aria-hidden="true">
          <path
            d="M12 20s-7-4.35-9.5-8.5C.8 8 2.5 4.5 6 4.5c2 0 3.5 1 6 3.5 2.5-2.5 4-3.5 6-3.5 3.5 0 5.2 3.5 3.5 7-2.5 4.15-9.5 8.5-9.5 8.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {(product.variantCount ?? 0) > 1 ? (
        // More than one variant — don't guess which one the shopper wants.
        // No onClick: the ancestor <Link> (the whole card) already
        // navigates to the PDP on click, so this just needs to look like
        // a button, not behave like a second nested link.
        <div className="absolute inset-x-3 bottom-3 z-10 rounded-card border border-maroon bg-card/95 py-2 text-center font-mulish text-xs font-bold text-maroon shadow-soft transition-all duration-200 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          Choose Options
        </div>
      ) : (
        product.defaultVariant && (
          <button
            type="button"
            onClick={handleQuickAdd}
            className="absolute inset-x-3 bottom-3 z-10 rounded-card bg-ink/90 py-2 font-mulish text-xs font-bold text-ivory shadow-soft transition-all duration-200 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
          >
            {justAdded ? "Added ✓" : "Quick Add"}
          </button>
        )
      )}
    </>
  );
}
