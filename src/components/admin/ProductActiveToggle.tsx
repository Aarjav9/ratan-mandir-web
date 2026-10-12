"use client";

import { useState } from "react";

export default function ProductActiveToggle({ productId, isActive }: { productId: string; isActive: boolean }) {
  const [active, setActive] = useState(isActive);
  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !active }),
      });
      if (!res.ok) throw new Error();
      setActive((prev) => !prev);
    } catch {
      // Swallow — the button simply stays on its current state, which is
      // still accurate since the request didn't succeed.
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isSaving}
      className={`rounded-full px-3 py-1 font-mulish text-[11px] font-bold uppercase tracking-wide transition-colors disabled:opacity-60 ${
        active ? "bg-maroon text-ivory hover:bg-maroonDeep" : "border border-line bg-ivoryDeep text-inkSoft hover:border-gold"
      }`}
    >
      {active ? "Active" : "Inactive"}
    </button>
  );
}
