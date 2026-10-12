"use client";

import { useState } from "react";

export interface VariantEditorData {
  id: string;
  label: string;
  stock: number;
  priceOverride: string | null;
}

export default function VariantEditor({
  variant,
  onDeleted,
}: {
  variant: VariantEditorData;
  /** When provided, a Remove button is shown that calls DELETE and, on success, invokes this. */
  onDeleted?: () => void;
}) {
  const [stock, setStock] = useState(String(variant.stock));
  const [priceOverride, setPriceOverride] = useState(variant.priceOverride ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const handleDelete = async () => {
    setError(null);
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/variants/${variant.id}`, { method: "DELETE" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Could not remove this variant.");
      }
      onDeleted?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setIsDeleting(false);
    }
  };

  const handleSave = async () => {
    setError(null);
    setSaved(false);

    const stockNum = Number(stock);
    if (!Number.isInteger(stockNum) || stockNum < 0) {
      setError("Stock must be a whole number ≥ 0.");
      return;
    }
    const priceNum = priceOverride.trim() === "" ? null : Number(priceOverride);
    if (priceNum !== null && (Number.isNaN(priceNum) || priceNum < 0)) {
      setError("Price must be a positive number.");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/variants/${variant.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock: stockNum, priceOverride: priceNum }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Could not save changes.");
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <tr className="border-b border-line last:border-0">
      <td className="py-2 pr-4 text-sm text-inkSoft">{variant.label}</td>
      <td className="py-2 pr-4">
        <input
          type="number"
          min={0}
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-24 rounded-card border border-line bg-ivory px-2 py-1 text-sm text-ink outline-none focus:border-gold"
        />
      </td>
      <td className="py-2 pr-4">
        <input
          type="number"
          min={0}
          placeholder="base price"
          value={priceOverride}
          onChange={(e) => setPriceOverride(e.target.value)}
          className="w-28 rounded-card border border-line bg-ivory px-2 py-1 text-sm text-ink outline-none focus:border-gold"
        />
      </td>
      <td className="py-2 pr-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving || isDeleting}
            className="rounded-card bg-maroon px-3 py-1.5 text-xs font-bold text-ivory transition-colors hover:bg-maroonDeep disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Saving..." : saved ? "Saved" : "Save"}
          </button>
          {onDeleted && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isSaving || isDeleting}
              title="Remove this variant"
              className="rounded-card border border-line px-3 py-1.5 text-xs text-inkSoft transition-colors hover:border-maroon hover:text-maroon disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isDeleting ? "Removing..." : "Remove"}
            </button>
          )}
        </div>
        {error && <p className="mt-1 text-xs text-maroon">{error}</p>}
      </td>
    </tr>
  );
}
