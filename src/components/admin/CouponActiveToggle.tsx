"use client";

import { useState } from "react";

export default function CouponActiveToggle({ couponId, isActive }: { couponId: string; isActive: boolean }) {
  const [active, setActive] = useState(isActive);
  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/coupons/${couponId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !active }),
      });
      if (!res.ok) throw new Error();
      setActive((prev) => !prev);
    } catch {
      // Swallow — button stays on its current, still-accurate state.
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isSaving}
      title={active ? "Click to deactivate" : "Click to activate"}
      className={`group w-24 rounded-full px-3 py-1 font-mulish text-[11px] font-bold uppercase tracking-wide transition-colors disabled:opacity-60 ${
        active ? "bg-maroon text-ivory hover:bg-maroonDeep" : "border border-line bg-ivoryDeep text-inkSoft hover:border-gold"
      }`}
    >
      <span className="group-hover:hidden">{isSaving ? "..." : active ? "Active" : "Inactive"}</span>
      <span className="hidden group-hover:inline">{active ? "Deactivate" : "Activate"}</span>
    </button>
  );
}
