"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import ImageRowEditor, { type ImageRow } from "@/components/admin/ImageRowEditor";
import { formatInr } from "@/lib/format";

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

const EMPTY_NEW_VARIANT = { label: "", priceOverride: "", stock: "0" };

interface ProductDetail {
  id: string;
  name: string;
  description: string;
  categoryType: string;
  basePrice: string;
  mrp: string | null;
  origin: string | null;
  badge: string | null;
  isBestseller: boolean;
  isActive: boolean;
  images: { url: string; altText: string }[];
  variants: { id: string; label: string; stock: number; priceOverride: string | null }[];
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryType, setCategoryType] = useState("RUDRAKSHA");
  const [basePrice, setBasePrice] = useState("");
  const [mrp, setMrp] = useState("");
  const [origin, setOrigin] = useState("");
  const [badge, setBadge] = useState("");
  const [isBestseller, setIsBestseller] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [images, setImages] = useState<ImageRow[]>([]);
  const [existingVariants, setExistingVariants] = useState<ProductDetail["variants"]>([]);
  const [newVariants, setNewVariants] = useState<typeof EMPTY_NEW_VARIANT[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/products/${params.id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Could not load this product.");
        return res.json();
      })
      .then((data: { product: ProductDetail }) => {
        const p = data.product;
        setName(p.name);
        setDescription(p.description);
        setCategoryType(p.categoryType);
        setBasePrice(p.basePrice);
        setMrp(p.mrp ?? "");
        setOrigin(p.origin ?? "");
        setBadge(p.badge ?? "");
        setIsBestseller(p.isBestseller);
        setIsActive(p.isActive);
        setImages(p.images);
        setExistingVariants(p.variants);
        setLoaded(true);
      })
      .catch((err) => setLoadError(err instanceof Error ? err.message : "Something went wrong."));
  }, [params.id]);

  const updateNewVariant = (index: number, field: keyof typeof EMPTY_NEW_VARIANT) => (e: ChangeEvent<HTMLInputElement>) => {
    setNewVariants((prev) => prev.map((row, i) => (i === index ? { ...row, [field]: e.target.value } : row)));
  };

  const handleSubmit = async () => {
    setError(null);
    setSaved(false);

    if (!name.trim() || !description.trim() || !basePrice.trim()) {
      setError("Please fill in name, description and base price.");
      return;
    }
    if (images.some((img) => !img.url.trim() || !img.altText.trim())) {
      setError("Every image needs a URL and alt text (or remove the row).");
      return;
    }
    if (newVariants.some((v) => !v.label.trim())) {
      setError("Every new variant needs a label (or remove the row).");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/admin/products/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
          categoryType,
          basePrice: Number(basePrice),
          mrp: mrp.trim() ? Number(mrp) : null,
          origin: origin.trim() || null,
          badge: badge.trim() || null,
          isBestseller,
          isActive,
          images: images.map((img) => ({ url: img.url.trim(), altText: img.altText.trim() })),
          ...(newVariants.length > 0 && {
            newVariants: newVariants.map((v) => ({
              label: v.label.trim(),
              priceOverride: v.priceOverride.trim() ? Number(v.priceOverride) : null,
              stock: v.stock.trim() ? Number(v.stock) : 0,
            })),
          }),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Could not save changes.");
      }

      setNewVariants([]);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadError) return <p className="text-sm text-maroon">{loadError}</p>;
  if (!loaded) return <p className="text-sm text-inkSoft">Loading...</p>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-marcellus text-2xl text-maroonDeep">Edit Product</h1>
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="font-mulish text-xs font-semibold text-inkSoft underline underline-offset-4 hover:text-maroon"
        >
          Back to Products
        </button>
      </div>

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

        <label className="flex items-center gap-2 font-mulish text-sm text-ink">
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
          Active (visible on the storefront)
        </label>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mulish text-xs font-semibold text-inkSoft">Images</span>
            <button
              type="button"
              onClick={() => setImages((prev) => [...prev, { url: "", altText: "" }])}
              className="font-mulish text-xs font-bold text-maroon underline underline-offset-4"
            >
              + Add Image
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {images.map((img, i) => (
              <ImageRowEditor
                key={i}
                value={img}
                onChange={(next) => setImages((prev) => prev.map((row, idx) => (idx === i ? next : row)))}
                onRemove={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
                removeDisabled={images.length === 1}
              />
            ))}
          </div>
        </div>

        <div>
          <span className="font-mulish text-xs font-semibold text-inkSoft">Existing Variants</span>
          <p className="mt-1 font-mulish text-[11px] text-inkSoft">
            Edit stock and price for these from the Products list page — they aren&apos;t removable here since
            past orders may already reference them.
          </p>
          <div className="mt-2 flex flex-col gap-1.5">
            {existingVariants.map((v) => (
              <div key={v.id} className="flex items-center justify-between rounded-card border border-line bg-ivory px-3 py-2 font-mulish text-xs text-inkSoft">
                <span>{v.label}</span>
                <span>
                  Stock: {v.stock} {v.priceOverride && `· ${formatInr(v.priceOverride)}`}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mulish text-xs font-semibold text-inkSoft">Add New Variant</span>
            <button
              type="button"
              onClick={() => setNewVariants((prev) => [...prev, { ...EMPTY_NEW_VARIANT }])}
              className="font-mulish text-xs font-bold text-maroon underline underline-offset-4"
            >
              + Add Variant
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {newVariants.map((variant, i) => (
              <div key={i} className="grid grid-cols-[1fr_100px_80px_auto] gap-2">
                <input
                  placeholder="Label (e.g. Standard)"
                  value={variant.label}
                  onChange={updateNewVariant(i, "label")}
                  className="rounded-card border border-line bg-ivory px-3 py-2 font-mulish text-sm text-ink outline-none focus:border-gold"
                />
                <input
                  placeholder="Price"
                  type="number"
                  value={variant.priceOverride}
                  onChange={updateNewVariant(i, "priceOverride")}
                  className="rounded-card border border-line bg-ivory px-3 py-2 font-mulish text-sm text-ink outline-none focus:border-gold"
                />
                <input
                  placeholder="Stock"
                  type="number"
                  value={variant.stock}
                  onChange={updateNewVariant(i, "stock")}
                  className="rounded-card border border-line bg-ivory px-3 py-2 font-mulish text-sm text-ink outline-none focus:border-gold"
                />
                <button
                  type="button"
                  onClick={() => setNewVariants((prev) => prev.filter((_, idx) => idx !== i))}
                  className="rounded-card border border-line px-3 text-xs text-inkSoft"
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
          {isSubmitting ? "Saving..." : saved ? "Saved ✓" : "Save Changes"}
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
