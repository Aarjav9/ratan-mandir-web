"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import VariantEditor, { type VariantEditorData } from "@/components/admin/VariantEditor";
import { formatInr } from "@/lib/format";

type CategoryType =
  | "RUDRAKSHA"
  | "GEMSTONE"
  | "ENERGY_STONE"
  | "SPIRITUAL_JEWELLERY"
  | "KARUNGALI"
  | "VASTU"
  | "ZODIAC"
  | "GIFT_HAMPER";

const CATEGORY_LABELS: Record<CategoryType, string> = {
  RUDRAKSHA: "Rudraksha",
  GEMSTONE: "Gemstone",
  ENERGY_STONE: "Energy Stone",
  SPIRITUAL_JEWELLERY: "Spiritual Jewellery",
  KARUNGALI: "Karungali",
  VASTU: "Vastu",
  ZODIAC: "Zodiac",
  GIFT_HAMPER: "Gift Hamper",
};

interface ProductView {
  id: string;
  name: string;
  categoryType: CategoryType;
  basePrice: string;
  images: { url: string }[];
  variants: VariantEditorData[];
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductView[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/products")
      .then(async (res) => {
        if (!res.ok) throw new Error("Could not load products.");
        return res.json();
      })
      .then((data: { products: ProductView[] }) => setProducts(data.products))
      .catch((err) => setError(err instanceof Error ? err.message : "Something went wrong."));
  }, []);

  const grouped = useMemo(() => {
    if (!products) return null;
    const map = new Map<CategoryType, ProductView[]>();
    for (const product of products) {
      const bucket = map.get(product.categoryType) ?? [];
      bucket.push(product);
      map.set(product.categoryType, bucket);
    }
    return map;
  }, [products]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-marcellus text-2xl text-maroonDeep">Products &amp; Inventory</h1>
        <Link
          href="/admin/products/new"
          className="rounded-card bg-maroon px-4 py-2 font-mulish text-sm font-bold text-ivory shadow-soft transition-colors hover:bg-maroonDeep"
        >
          + Add Product
        </Link>
      </div>

      {error && <p className="text-sm text-maroon">{error}</p>}
      {!error && products === null && <p className="text-sm text-inkSoft">Loading...</p>}

      {grouped &&
        Array.from(grouped.entries()).map(([categoryType, categoryProducts]) => (
          <div key={categoryType} className="mb-10">
            <h2 className="mb-4 font-marcellus text-lg text-maroon">
              {CATEGORY_LABELS[categoryType]}{" "}
              <span className="font-mulish text-xs font-normal text-inkSoft">
                ({categoryProducts.length})
              </span>
            </h2>
            <div className="flex flex-col gap-6">
              {categoryProducts.map((product) => (
                <div key={product.id} className="rounded-card border border-line bg-card p-5 shadow-soft">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-marcellus text-base text-ink">{product.name}</h3>
                    <span className="text-xs font-semibold text-inkSoft">
                      Base price: {formatInr(product.basePrice)}
                    </span>
                  </div>
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-line text-xs font-semibold uppercase tracking-wide text-inkSoft">
                        <th className="py-2 pr-4">Variant</th>
                        <th className="py-2 pr-4">Stock</th>
                        <th className="py-2 pr-4">Price Override</th>
                        <th className="py-2 pr-4">Save</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.variants.map((variant) => (
                        <VariantEditor key={variant.id} variant={variant} />
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
