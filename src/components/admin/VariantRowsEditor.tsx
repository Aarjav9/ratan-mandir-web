"use client";

export interface VariantFormRow {
  label: string;
  priceOverride: string;
  stock: string;
}

/**
 * Labeled grid for editing a list of not-yet-saved variant rows — used by
 * both "Add Product" (all variants) and "Edit Product" (new variants only,
 * appended to the existing ones listed read-only above it).
 */
export default function VariantRowsEditor({
  rows,
  onChange,
  minRows = 0,
}: {
  rows: VariantFormRow[];
  onChange: (rows: VariantFormRow[]) => void;
  minRows?: number;
}) {
  const updateRow = (index: number, field: keyof VariantFormRow, value: string) => {
    onChange(rows.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  };

  return (
    <div className="flex flex-col gap-2">
      {rows.length > 0 && (
        <div className="grid grid-cols-[1fr_110px_90px_auto] gap-2 px-1 font-mulish text-[11px] font-semibold uppercase tracking-wide text-inkSoft">
          <span>Label</span>
          <span>Price override</span>
          <span>Stock</span>
          <span />
        </div>
      )}
      {rows.map((row, i) => (
        <div key={i} className="grid grid-cols-[1fr_110px_90px_auto] gap-2">
          <input
            placeholder="e.g. Standard, 8mm"
            value={row.label}
            onChange={(e) => updateRow(i, "label", e.target.value)}
            className="rounded-card border border-line bg-ivory px-3 py-2 font-mulish text-sm text-ink outline-none focus:border-gold"
          />
          <input
            placeholder="Optional"
            type="number"
            value={row.priceOverride}
            onChange={(e) => updateRow(i, "priceOverride", e.target.value)}
            className="rounded-card border border-line bg-ivory px-3 py-2 font-mulish text-sm text-ink outline-none focus:border-gold"
          />
          <input
            placeholder="0"
            type="number"
            value={row.stock}
            onChange={(e) => updateRow(i, "stock", e.target.value)}
            className="rounded-card border border-line bg-ivory px-3 py-2 font-mulish text-sm text-ink outline-none focus:border-gold"
          />
          <button
            type="button"
            onClick={() => onChange(rows.filter((_, idx) => idx !== i))}
            disabled={rows.length <= minRows}
            className="rounded-card border border-line px-3 text-xs text-inkSoft disabled:opacity-40"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...rows, { label: "", priceOverride: "", stock: "0" }])}
        className="self-start font-mulish text-xs font-bold text-maroon underline underline-offset-4"
      >
        + Add Variant
      </button>
    </div>
  );
}
