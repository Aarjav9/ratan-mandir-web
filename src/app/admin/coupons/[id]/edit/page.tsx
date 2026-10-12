"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FormSection, Field } from "@/components/admin/ProductFormFields";
import FormActionBar from "@/components/admin/FormActionBar";

interface CouponDetail {
  id: string;
  code: string;
  description: string | null;
  discountPercent: number;
  minOrderValue: string | null;
  isActive: boolean;
  expiresAt: string | null;
}

export default function EditCouponPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [minOrderValue, setMinOrderValue] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/coupons/${params.id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Could not load this coupon.");
        return res.json();
      })
      .then((data: { coupon: CouponDetail }) => {
        const c = data.coupon;
        setCode(c.code);
        setDescription(c.description ?? "");
        setDiscountPercent(String(c.discountPercent));
        setMinOrderValue(c.minOrderValue ?? "");
        setExpiresAt(c.expiresAt ? c.expiresAt.slice(0, 10) : "");
        setIsActive(c.isActive);
        setLoaded(true);
      })
      .catch((err) => setLoadError(err instanceof Error ? err.message : "Something went wrong."));
  }, [params.id]);

  const handleSubmit = async () => {
    setError(null);
    setSaved(false);

    if (!discountPercent.trim()) {
      setError("Please fill in a discount percentage.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/admin/coupons/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: description.trim() || null,
          discountPercent: Number(discountPercent),
          minOrderValue: minOrderValue.trim() ? Number(minOrderValue) : null,
          isActive,
          expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Could not save changes.");
      }

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
        <h1 className="font-marcellus text-2xl text-maroonDeep">Edit Coupon</h1>
        <button
          type="button"
          onClick={() => router.push("/admin/coupons")}
          className="font-mulish text-xs font-semibold text-inkSoft underline underline-offset-4 hover:text-maroon"
        >
          Back to Coupons
        </button>
      </div>

      <div className="flex max-w-2xl flex-col gap-6">
        <FormSection title="Coupon Details">
          <label className="flex flex-col gap-1.5">
            <span className="font-mulish text-xs font-semibold text-inkSoft">Code</span>
            <input
              value={code}
              disabled
              className="rounded-card border border-line bg-ivoryDeep px-3 py-2 font-mulish text-sm text-inkSoft outline-none"
            />
            <span className="font-mulish text-[11px] text-inkSoft">
              The code itself can&apos;t be changed once created — deactivate this one and create a new coupon instead.
            </span>
          </label>

          <Field label="Description (optional, for your own reference)" value={description} onChange={(e) => setDescription(e.target.value)} />

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
            Active — shoppers can use this code
          </label>
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
