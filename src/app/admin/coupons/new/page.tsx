"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormSection, Field } from "@/components/admin/ProductFormFields";
import FormActionBar from "@/components/admin/FormActionBar";

export default function NewCouponPage() {
  const router = useRouter();

  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [minOrderValue, setMinOrderValue] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);

    if (!code.trim() || !discountPercent.trim()) {
      setError("Please fill in a code and discount percentage.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: code.trim(),
          description: description.trim() || undefined,
          discountPercent: Number(discountPercent),
          minOrderValue: minOrderValue.trim() ? Number(minOrderValue) : null,
          isActive,
          expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Could not create coupon.");
      }

      router.push("/admin/coupons");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="mb-6 font-marcellus text-2xl text-maroonDeep">Add Coupon</h1>

      <div className="flex max-w-2xl flex-col gap-6">
        <FormSection title="Coupon Details" description="Shoppers enter this code at checkout to get a percentage off their order.">
          <Field label="Code" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} required placeholder="e.g. WELCOME10" />
          <Field label="Description (optional, for your own reference)" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. Diwali sale" />

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Discount %" type="number" value={discountPercent} onChange={(e) => setDiscountPercent(e.target.value)} required />
            <Field label="Minimum Order (₹, optional)" type="number" value={minOrderValue} onChange={(e) => setMinOrderValue(e.target.value)} />
          </div>

          <label className="flex flex-col gap-1.5 sm:max-w-xs">
            <span className="font-mulish text-xs font-semibold text-inkSoft">Expires On (optional)</span>
            <input
              type="date"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              className="rounded-card border border-line bg-ivory px-3 py-2 font-mulish text-sm text-ink outline-none focus:border-gold"
            />
          </label>

          <label className="flex items-center gap-2 border-t border-line pt-4 font-mulish text-sm text-ink">
            <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
            Active — shoppers can use this code right away
          </label>
        </FormSection>

        <FormActionBar onSave={handleSubmit} isSubmitting={isSubmitting} idleLabel="Create Coupon" error={error} />
      </div>
    </div>
  );
}
