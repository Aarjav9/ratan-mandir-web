"use client";

import { useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";

const CATEGORY_OPTIONS: { value: string; label: string }[] = [
  { value: "RUDRAKSHA", label: "Rudraksha" },
  { value: "GEMSTONE", label: "Gemstone" },
  { value: "ENERGY_STONE", label: "Energy Stone" },
  { value: "SPIRITUAL_JEWELLERY", label: "Spiritual Jewellery" },
  { value: "KARUNGALI", label: "Karungali" },
  { value: "VASTU", label: "Vastu" },
  { value: "ZODIAC", label: "Zodiac" },
  { value: "GIFT_HAMPER", label: "Gift Hamper" },
];

interface ImageRow {
  url: string;
  altText: string;
}

interface VariantRow {
  label: string;
  priceOverride: string;
  stock: string;
}

const EMPTY_IMAGE: ImageRow = { url: "", altText: "" };
const EMPTY_VARIANT: VariantRow = { label: "", priceOverride: "", stock: "0" };

export default function NewProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryType, setCategoryType] = useState("RUDRAKSHA");
  const [basePrice, setBasePrice] = useState("");
  const [mrp, setMrp] = useState("");
  const [origin, setOrigin] = useState("");
  const [badge, setBadge] = useState("");
  const [isBestseller, setIsBestseller] = useState(false);
  const [images, setImages] = useState<ImageRow[]>([{ ...EMPTY_IMAGE }]);
  const [variants, setVariants] = useState<VariantRow[]>([{ ...EMPTY_VARIANT }]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateImage = (index: number, field: keyof ImageRow) => (e: ChangeEvent<HTMLInputElement>) => {
    setImages((prev) => prev.map((row, i) => (i === index ? { ...row, [field]: e.target.value } : row)));
  };

  const updateVariant = (index: number, field: keyof VariantRow) => (e: ChangeEvent<HTMLInputElement>) => {
    setVariants((prev) => prev.map((row, i) => (i === index ? { ...row, [field]: e.target.value } : row)));
  };

  const handleSubmit = async () => {
    setError(null);

    if (!name.trim() || !description.trim() || !basePrice.trim()) {
      setError("Please fill in name, description and base price.");
      return;
    }
    if (images.some((img) => !img.url.trim() || !img.altText.trim())) {
      setError("Every image needs a URL and alt text (or remove the row).");
      return;
    }
    if (variants.some((v) => !v.label.trim())) {
      setError("Every variant needs a label (or remove the row).");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
          categoryType,
          basePrice: Number(basePrice),
          mrp: mrp.trim() ? Number(mrp) : null,
          origin: origin.trim() || undefined,
          badge: badge.trim() || undefined,
          isBestseller,
          images: images.map((img) => ({ url: img.url.trim(), altText: img.altText.trim() })),
          variants: variants.map((v) => ({
            label: v.label.trim(),
            priceOverride: v.priceOverride.trim() ? Number(v.priceOverride) : null,
            stock: v.stock.trim() ? Number(v.stock) : 0,
          })),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Could not create product.");
      }

      router.push("/admin/products");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="mb-6 font-marcellus text-2xl text-maroonDeep">Add Product</h1>

      <div className="flex max-w-2xl flex-col gap-5 rounded-card border border-line bg-card p-6 shadow-soft">
        <Field label="Name" value={name} onChange={(e) => setName(e.target.value)} required />

        <label className="flex flex-col gap-1.5">
          <span className="font-mulish text-xs font-semibold text-inkSoft">
            Description<span className="text-maroon"> *</span>
          </span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="rounded-card border border-line bg-ivory px-3 py-2 font-mulish text-sm text-ink outline-none focus:border-gold"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="font-mulish text-xs font-semibold text-inkSoft">Category</span>
          <select
            value={categoryType}
            onChange={(e) => setCategoryType(e.target.value)}
            className="rounded-card border border-line bg-ivory px-3 py-2 font-mulish text-sm text-ink outline-none focus:border-gold"
          >
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Base Price (₹)" type="number" value={basePrice} onChange={(e) => setBasePrice(e.target.value)} required />
          <Field label="MRP (₹, optional)" type="number" value={mrp} onChange={(e) => setMrp(e.target.value)} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Origin (optional)" value={origin} onChange={(e) => setOrigin(e.target.value)} />
          <Field label="Badge (optional)" value={badge} onChange={(e) => setBadge(e.target.value)} />
        </div>

        <label className="flex items-center gap-2 font-mulish text-sm text-ink">
          <input type="checkbox" checked={isBestseller} onChange={(e) => setIsBestseller(e.target.checked)} />
          Mark as bestseller
        </label>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mulish text-xs font-semibold text-inkSoft">Images</span>
            <button
              type="button"
              onClick={() => setImages((prev) => [...prev, { ...EMPTY_IMAGE }])}
              className="font-mulish text-xs font-bold text-maroon underline underline-offset-4"
            >
              + Add Image
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {images.map((img, i) => (
              <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2">
                <input
                  placeholder="/images/placeholder/example.jpg"
                  value={img.url}
                  onChange={updateImage(i, "url")}
                  className="rounded-card border border-line bg-ivory px-3 py-2 font-mulish text-sm text-ink outline-none focus:border-gold"
                />
                <input
                  placeholder="Alt text"
                  value={img.altText}
                  onChange={updateImage(i, "altText")}
                  className="rounded-card border border-line bg-ivory px-3 py-2 font-mulish text-sm text-ink outline-none focus:border-gold"
                />
                <button
                  type="button"
                  onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
                  disabled={images.length === 1}
                  className="rounded-card border border-line px-3 text-xs text-inkSoft disabled:opacity-40"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mulish text-xs font-semibold text-inkSoft">Variants</span>
            <button
              type="button"
              onClick={() => setVariants((prev) => [...prev, { ...EMPTY_VARIANT }])}
              className="font-mulish text-xs font-bold text-maroon underline underline-offset-4"
            >
              + Add Variant
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {variants.map((variant, i) => (
              <div key={i} className="grid grid-cols-[1fr_100px_80px_auto] gap-2">
                <input
                  placeholder="Label (e.g. Standard)"
                  value={variant.label}
                  onChange={updateVariant(i, "label")}
                  className="rounded-card border border-line bg-ivory px-3 py-2 font-mulish text-sm text-ink outline-none focus:border-gold"
                />
                <input
                  placeholder="Price"
                  type="number"
                  value={variant.priceOverride}
                  onChange={updateVariant(i, "priceOverride")}
                  className="rounded-card border border-line bg-ivory px-3 py-2 font-mulish text-sm text-ink outline-none focus:border-gold"
                />
                <input
                  placeholder="Stock"
                  type="number"
                  value={variant.stock}
                  onChange={updateVariant(i, "stock")}
                  className="rounded-card border border-line bg-ivory px-3 py-2 font-mulish text-sm text-ink outline-none focus:border-gold"
                />
                <button
                  type="button"
                  onClick={() => setVariants((prev) => prev.filter((_, idx) => idx !== i))}
                  disabled={variants.length === 1}
                  className="rounded-card border border-line px-3 text-xs text-inkSoft disabled:opacity-40"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {error && <p className="font-mulish text-xs text-maroon">{error}</p>}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="rounded-card bg-maroon px-6 py-3 font-mulish text-sm font-bold text-ivory shadow-soft transition-colors hover:bg-maroonDeep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Creating..." : "Create Product"}
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mulish text-xs font-semibold text-inkSoft">
        {label}
        {required && <span className="text-maroon"> *</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="rounded-card border border-line bg-ivory px-3 py-2 font-mulish text-sm text-ink outline-none focus:border-gold"
      />
    </label>
  );
}
