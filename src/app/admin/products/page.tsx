"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import VariantEditor, { type VariantEditorData } from "@/components/admin/VariantEditor";
import ProductActiveToggle from "@/components/admin/ProductActiveToggle";
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

const PAGE_SIZE = 6;

interface ProductView {
  id: string;
  name: string;
  categoryType: CategoryType;
  basePrice: string;
  isActive: boolean;
  images: { url: string }[];
  variants: VariantEditorData[];
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductView[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryType | "ALL">("ALL");
  const [expanded, setExpanded] = useState<Partial<Record<CategoryType, boolean>>>({});

  useEffect(() => {
    fetch("/api/admin/products")
      .then(async (res) => {
        if (!res.ok) throw new Error("Could not load products.");
        return res.json();
      })
      .then((data: { products: ProductView[] }) => setProducts(data.products))
      .catch((err) => setError(err instanceof Error ? err.message : "Something went wrong."));
  }, []);

  const filtered = useMemo(() => {
    if (!products) return null;
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (categoryFilter !== "ALL" && p.categoryType !== categoryFilter) return false;
      if (q && !p.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [products, query, categoryFilter]);

  const grouped = useMemo(() => {
    if (!filtered) return null;
    const map = new Map<CategoryType, ProductView[]>();
    for (const product of filtered) {
      const bucket = map.get(product.categoryType) ?? [];
      bucket.push(product);
      map.set(product.categoryType, bucket);
    }
    return map;
  }, [filtered]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-marcellus text-2xl text-maroonDeep">Products &amp; Inventory</h1>
        <Link
          href="/admin/products/new"
          className="rounded-card bg-maroon px-4 py-2 font-mulish text-sm font-bold text-ivory shadow-soft transition-colors hover:bg-maroonDeep"
        >
          + Add Product
        </Link>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <input
          placeholder="Search products by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-xs rounded-card border border-line bg-card px-3 py-2 font-mulish text-sm text-ink outline-none focus:border-gold"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as CategoryType | "ALL")}
          className="rounded-card border border-line bg-card px-3 py-2 font-mulish text-sm text-ink outline-none focus:border-gold"
        >
          <option value="ALL">All categories</option>
          {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-sm text-maroon">{error}</p>}
      {!error && products === null && <p className="text-sm text-inkSoft">Loading...</p>}
      {filtered && filtered.length === 0 && (
        <p className="font-mulish text-sm text-inkSoft">No products match your search.</p>
      )}

      {grouped &&
        Array.from(grouped.entries()).map(([categoryType, categoryProducts]) => {
          const isExpanded = expanded[categoryType] ?? false;
          const visibleProducts = isExpanded ? categoryProducts : categoryProducts.slice(0, PAGE_SIZE);
          const remaining = categoryProducts.length - visibleProducts.length;

          return (
            <div key={categoryType} className="mb-10">
              <h2 className="mb-4 font-marcellus text-lg text-maroon">
                {CATEGORY_LABELS[categoryType]}{" "}
                <span className="font-mulish text-xs font-normal text-inkSoft">
                  ({categoryProducts.length})
                </span>
              </h2>
              <div className="flex flex-col gap-6">
                {visibleProducts.map((product) => (
                  <div key={product.id} className="rounded-card border border-line bg-card p-5 shadow-soft">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <h3 className="font-marcellus text-base text-ink">{product.name}</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-inkSoft">
                          Base price: {formatInr(product.basePrice)}
                        </span>
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="font-mulish text-xs font-bold text-maroon underline underline-offset-4 hover:text-maroonDeep"
                        >
                          Edit
                        </Link>
                        <ProductActiveToggle productId={product.id} isActive={product.isActive} />
                      </div>
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
                          <VariantEditor
                            key={variant.id}
                            variant={variant}
                            onDeleted={
                              product.variants.length > 1
                                ? () =>
                                    setProducts((prev) =>
                                      prev?.map((p) =>
                                        p.id === product.id
                                          ? { ...p, variants: p.variants.filter((v) => v.id !== variant.id) }
                                          : p
                                      ) ?? null
                                    )
                                : undefined
                            }
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
              {remaining > 0 && (
                <button
                  type="button"
                  onClick={() => setExpanded((prev) => ({ ...prev, [categoryType]: true }))}
                  className="mt-4 font-mulish text-xs font-bold text-maroon underline underline-offset-4"
                >
                  Show {remaining} more
                </button>
              )}
            </div>
          );
        })}
    </div>
  );
}
