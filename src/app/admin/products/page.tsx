"use client";

import { useEffect, useState } from "react";
import VariantEditor, { type VariantEditorData } from "@/components/admin/VariantEditor";
import { formatInr } from "@/lib/format";

interface ProductView {
  id: string;
  name: string;
  categoryType: "RUDRAKSHA" | "GEMSTONE";
  basePrice: string;
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

  return (
    <div>
      <h1 className="mb-6 font-marcellus text-2xl text-maroonDeep">Products &amp; Inventory</h1>

      {error && <p className="text-sm text-maroon">{error}</p>}
      {!error && products === null && <p className="text-sm text-inkSoft">Loading...</p>}

      <div className="flex flex-col gap-6">
        {products?.map((product) => (
          <div key={product.id} className="rounded-card border border-line bg-card p-5 shadow-soft">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-marcellus text-lg text-ink">{product.name}</h2>
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
  );
}
