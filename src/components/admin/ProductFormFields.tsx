"use client";

import type { ChangeEvent } from "react";
import ImageRowEditor, { type ImageRow } from "@/components/admin/ImageRowEditor";

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

export interface ProductFormValues {
  name: string;
  description: string;
  categoryType: string;
  basePrice: string;
  mrp: string;
  origin: string;
  badge: string;
  isBestseller: boolean;
  isActive: boolean;
  images: ImageRow[];
}

export function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-card border border-line bg-card p-6 shadow-soft">
      <div className="mb-5">
        <h2 className="font-marcellus text-lg text-maroonDeep">{title}</h2>
        {description && <p className="mt-1 font-mulish text-xs text-inkSoft">{description}</p>}
      </div>
      <div className="flex flex-col gap-5">{children}</div>
    </section>
  );
}

export function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
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
        placeholder={placeholder}
        className="rounded-card border border-line bg-ivory px-3 py-2 font-mulish text-sm text-ink outline-none focus:border-gold"
      />
    </label>
  );
}

/**
 * Fields shared verbatim between "Add Product" and "Edit Product" — split
 * out so the two pages can't drift out of sync with each other.
 */
export default function ProductFormFields({
  values,
  onChange,
}: {
  values: ProductFormValues;
  onChange: (patch: Partial<ProductFormValues>) => void;
}) {
  return (
    <>
      <FormSection title="Basic Details" description="What the product is called and how it's described on its page.">
        <Field label="Name" value={values.name} onChange={(e) => onChange({ name: e.target.value })} required />

        <label className="flex flex-col gap-1.5">
          <span className="font-mulish text-xs font-semibold text-inkSoft">
            Description<span className="text-maroon"> *</span>
          </span>
          <textarea
            value={values.description}
            onChange={(e) => onChange({ description: e.target.value })}
            rows={4}
            className="rounded-card border border-line bg-ivory px-3 py-2 font-mulish text-sm text-ink outline-none focus:border-gold"
          />
        </label>

        <label className="flex flex-col gap-1.5 sm:max-w-xs">
          <span className="font-mulish text-xs font-semibold text-inkSoft">Category</span>
          <select
            value={values.categoryType}
            onChange={(e) => onChange({ categoryType: e.target.value })}
            className="rounded-card border border-line bg-ivory px-3 py-2 font-mulish text-sm text-ink outline-none focus:border-gold"
          >
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </FormSection>

      <FormSection title="Pricing & Visibility" description="Price shown to shoppers, and whether the product appears on the live site.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Base Price (₹)" type="number" value={values.basePrice} onChange={(e) => onChange({ basePrice: e.target.value })} required />
          <Field label="MRP (₹, optional)" type="number" value={values.mrp} onChange={(e) => onChange({ mrp: e.target.value })} placeholder="For showing a strikethrough discount" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Origin (optional)" value={values.origin} onChange={(e) => onChange({ origin: e.target.value })} placeholder="e.g. Nepal" />
          <Field label="Badge (optional)" value={values.badge} onChange={(e) => onChange({ badge: e.target.value })} placeholder="e.g. New, Bestseller" />
        </div>

        <div className="flex flex-col gap-3 border-t border-line pt-4">
          <label className="flex items-center gap-2 font-mulish text-sm text-ink">
            <input type="checkbox" checked={values.isBestseller} onChange={(e) => onChange({ isBestseller: e.target.checked })} />
            Mark as bestseller (shows in homepage &quot;Most Loved&quot; carousel)
          </label>

          <label className="flex items-center gap-2 font-mulish text-sm text-ink">
            <input type="checkbox" checked={values.isActive} onChange={(e) => onChange({ isActive: e.target.checked })} />
            Active — visible on the storefront
          </label>
          {!values.isActive && (
            <p className="rounded-card bg-ivoryDeep px-3 py-2 font-mulish text-[11px] text-inkSoft">
              This product will be hidden from listings, search and its own page until you switch this back on.
            </p>
          )}
        </div>
      </FormSection>

      <FormSection title="Images" description="The first image is used as the product's main thumbnail.">
        <div className="flex flex-col gap-3">
          {values.images.map((img, i) => (
            <ImageRowEditor
              key={i}
              value={img}
              onChange={(next) => onChange({ images: values.images.map((row, idx) => (idx === i ? next : row)) })}
              onRemove={() => onChange({ images: values.images.filter((_, idx) => idx !== i) })}
              removeDisabled={values.images.length === 1}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => onChange({ images: [...values.images, { url: "", altText: "" }] })}
          className="self-start font-mulish text-xs font-bold text-maroon underline underline-offset-4"
        >
          + Add Image
        </button>
      </FormSection>
    </>
  );
}
