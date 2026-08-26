"use client";

import { useState } from "react";

const STATUSES = ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"] as const;
type Status = (typeof STATUSES)[number];

export default function OrderStatusSelect({ orderId, status }: { orderId: string; status: Status }) {
  const [value, setValue] = useState<Status>(status);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = async (next: Status) => {
    const previous = value;
    setValue(next);
    setError(null);
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Could not update status.");
      }
    } catch (err) {
      setValue(previous);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <select
        value={value}
        disabled={isSaving}
        onChange={(e) => handleChange(e.target.value as Status)}
        className="rounded-card border border-line bg-ivory px-2 py-1.5 text-sm text-ink outline-none focus:border-gold disabled:opacity-60"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-maroon">{error}</p>}
    </div>
  );
}
