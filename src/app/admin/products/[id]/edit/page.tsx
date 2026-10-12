"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductFormFields, { FormSection, type ProductFormValues } from "@/components/admin/ProductFormFields";
import VariantRowsEditor, { type VariantFormRow } from "@/components/admin/VariantRowsEditor";
import VariantEditor from "@/components/admin/VariantEditor";
import FormActionBar from "@/components/admin/FormActionBar";

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

  const [values, setValues] = useState<ProductFormValues | null>(null);
  const [existingVariants, setExistingVariants] = useState<ProductDetail["variants"]>([]);
  const [newVariants, setNewVariants] = useState<VariantFormRow[]>([]);

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
        setValues({
          name: p.name,
          description: p.description,
          categoryType: p.categoryType,
          basePrice: p.basePrice,
          mrp: p.mrp ?? "",
          origin: p.origin ?? "",
          badge: p.badge ?? "",
          isBestseller: p.isBestseller,
          isActive: p.isActive,
          images: p.images,
        });
        setExistingVariants(p.variants);
        setLoaded(true);
      })
      .catch((err) => setLoadError(err instanceof Error ? err.message : "Something went wrong."));
  }, [params.id]);

  const patch = (next: Partial<ProductFormValues>) =>
    setValues((prev) => (prev ? { ...prev, ...next } : prev));

  const handleSubmit = async () => {
    if (!values) return;
    setError(null);
    setSaved(false);

    if (!values.name.trim() || !values.description.trim() || !values.basePrice.trim()) {
      setError("Please fill in name, description and base price.");
      return;
    }
    if (values.images.some((img) => !img.url.trim() || !img.altText.trim())) {
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
          name: values.name.trim(),
          description: values.description.trim(),
          categoryType: values.categoryType,
          basePrice: Number(values.basePrice),
          mrp: values.mrp.trim() ? Number(values.mrp) : null,
          origin: values.origin.trim() || null,
          badge: values.badge.trim() || null,
          isBestseller: values.isBestseller,
          isActive: values.isActive,
          images: values.images.map((img) => ({ url: img.url.trim(), altText: img.altText.trim() })),
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

      const body = await res.json();
      if (newVariants.length > 0) {
        setExistingVariants(body.product.variants);
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
  if (!loaded || !values) return <p className="text-sm text-inkSoft">Loading...</p>;

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

      <div className="flex max-w-3xl flex-col gap-6">
        <ProductFormFields values={values} onChange={patch} />

        <FormSection title="Variants" description="A variant already used in a past order can't be removed — set its stock to 0 instead.">
          {existingVariants.length > 0 ? (
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
                {existingVariants.map((v) => (
                  <VariantEditor
                    key={v.id}
                    variant={v}
                    onDeleted={
                      existingVariants.length > 1
                        ? () => setExistingVariants((prev) => prev.filter((row) => row.id !== v.id))
                        : undefined
                    }
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <p className="font-mulish text-xs text-inkSoft">No variants yet.</p>
          )}

          <div className="border-t border-line pt-4">
            <span className="mb-2 block font-mulish text-xs font-semibold text-inkSoft">Add New Variant</span>
            <VariantRowsEditor rows={newVariants} onChange={setNewVariants} minRows={0} />
          </div>
        </FormSection>

        <FormActionBar
          onSave={handleSubmit}
          isSubmitting={isSubmitting}
          savedLabel={saved ? "Saved ✓" : undefined}
          idleLabel="Save Changes"
          error={error}
        />
      </div>
    </div>
  );
}
