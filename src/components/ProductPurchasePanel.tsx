"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { formatInr } from "@/lib/format";

export interface PurchaseVariant {
  id: string;
  label: string;
  price: number;
  stock: number;
}

interface ProductPurchasePanelProps {
  productId: string;
  productSlug: string;
  productName: string;
  basePrice: number;
  mrp: number | null;
  image: string;
  variants: PurchaseVariant[];
}

export default function ProductPurchasePanel({
  productId,
  productSlug,
  productName,
  basePrice,
  mrp,
  image,
  variants,
}: ProductPurchasePanelProps) {
  const router = useRouter();
  const { addItem } = useCart();

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    variants.length > 0 ? variants[0].id : null
  );
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const selectedVariant = useMemo(
    () => variants.find((v) => v.id === selectedVariantId) ?? null,
    [variants, selectedVariantId]
  );

  const activePrice = selectedVariant?.price ?? basePrice;

  const handleAddToCart = () => {
    addItem(
      {
        productId,
        variantId: selectedVariant?.id ?? null,
        name: productName,
        variantLabel: selectedVariant?.label ?? null,
        price: activePrice,
        image,
        slug: productSlug,
      },
      qty
    );
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-baseline gap-3">
        <span className="font-mulish text-3xl font-extrabold text-maroon">
          {formatInr(activePrice)}
        </span>
        {mrp && mrp > activePrice && (
          <span className="font-mulish text-lg text-inkSoft line-through">{formatInr(mrp)}</span>
        )}
      </div>

      {variants.length > 0 && (
        <div>
          <p className="mb-2 font-mulish text-xs font-bold uppercase tracking-wide text-inkSoft">
            Choose an option
          </p>
          <div className="flex flex-wrap gap-2">
            {variants.map((variant) => (
              <button
                key={variant.id}
                type="button"
                onClick={() => setSelectedVariantId(variant.id)}
                className={`rounded-card border px-4 py-2 font-mulish text-sm font-semibold transition-colors ${
                  selectedVariantId === variant.id
                    ? "border-maroon bg-maroon text-ivory"
                    : "border-line bg-card text-ink hover:border-gold"
                }`}
              >
                {variant.label}
              </button>
            ))}
          </div>
          {selectedVariant && selectedVariant.stock <= 5 && selectedVariant.stock > 0 && (
            <p className="mt-2 font-mulish text-xs text-saffronDeep">
              Only {selectedVariant.stock} left in stock
            </p>
          )}
          {selectedVariant && selectedVariant.stock === 0 && (
            <p className="mt-2 font-mulish text-xs text-maroon">Currently out of stock</p>
          )}
        </div>
      )}

      <div>
        <p className="mb-2 font-mulish text-xs font-bold uppercase tracking-wide text-inkSoft">
          Quantity
        </p>
        <div className="flex w-fit items-center rounded-card border border-line">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-4 py-2 font-mulish text-lg text-ink hover:text-maroon"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="min-w-10 text-center font-mulish text-sm font-semibold text-ink">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            className="px-4 py-2 font-mulish text-lg text-ink hover:text-maroon"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 rounded-card border border-maroon px-6 py-3 font-mulish text-sm font-bold text-maroon transition-colors hover:bg-maroon hover:text-ivory"
        >
          {justAdded ? "Added to Cart" : "Add to Cart"}
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          className="flex-1 rounded-card bg-maroon px-6 py-3 font-mulish text-sm font-bold text-ivory shadow-soft transition-colors hover:bg-maroonDeep"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
