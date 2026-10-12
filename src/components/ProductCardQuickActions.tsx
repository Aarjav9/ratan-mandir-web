"use client";

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

// Quick Add (and the "Choose Options" variant of it) was removed from
// product cards per request — wishlist is the only quick action left here.
// Adding to cart now always goes through the PDP, where variant selection
// is unambiguous.
export default function ProductCardQuickActions({ product }: { product: QuickActionsProduct }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
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

  return (
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
  );
}
