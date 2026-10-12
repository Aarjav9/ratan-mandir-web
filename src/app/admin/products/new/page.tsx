"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductFormFields, { FormSection, type ProductFormValues } from "@/components/admin/ProductFormFields";
import VariantRowsEditor, { type VariantFormRow } from "@/components/admin/VariantRowsEditor";
import FormActionBar from "@/components/admin/FormActionBar";

const EMPTY_VALUES: ProductFormValues = {
  name: "",
  description: "",
  categoryType: "RUDRAKSHA",
  basePrice: "",
  mrp: "",
  origin: "",
  badge: "",
  isBestseller: false,
  isActive: true,
  images: [{ url: "", altText: "" }],
};

export default function NewProductPage() {
  const router = useRouter();

  const [values, setValues] = useState<ProductFormValues>(EMPTY_VALUES);
  const [variants, setVariants] = useState<VariantFormRow[]>([{ label: "", priceOverride: "", stock: "0" }]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const patch = (next: Partial<ProductFormValues>) => setValues((prev) => ({ ...prev, ...next }));

  const handleSubmit = async () => {
    setError(null);

    if (!values.name.trim() || !values.description.trim() || !values.basePrice.trim()) {
      setError("Please fill in name, description and base price.");
      return;
    }
    if (values.images.some((img) => !img.url.trim() || !img.altText.trim())) {
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
          name: values.name.trim(),
          description: values.description.trim(),
          categoryType: values.categoryType,
          basePrice: Number(values.basePrice),
          mrp: values.mrp.trim() ? Number(values.mrp) : null,
          origin: values.origin.trim() || undefined,
          badge: values.badge.trim() || undefined,
          isBestseller: values.isBestseller,
          isActive: values.isActive,
          images: values.images.map((img) => ({ url: img.url.trim(), altText: img.altText.trim() })),
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

      <div className="flex max-w-3xl flex-col gap-6">
        <ProductFormFields values={values} onChange={patch} />

        <FormSection title="Variants" description="At least one variant is required — use a single row if the product has no real options.">
          <VariantRowsEditor rows={variants} onChange={setVariants} minRows={1} />
        </FormSection>

        <FormActionBar onSave={handleSubmit} isSubmitting={isSubmitting} idleLabel="Create Product" error={error} />
      </div>
    </div>
  );
}
