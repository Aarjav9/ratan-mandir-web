"use client";

import { useState, type FormEvent } from "react";
import { useCoupon } from "@/context/CouponContext";

export default function CouponField({ subtotal }: { subtotal: number }) {
  const { coupon, isApplying, error, applyCoupon, removeCoupon } = useCoupon();
  const [code, setCode] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    applyCoupon(code, subtotal);
  };

  if (coupon) {
    return (
      <div className="flex items-center justify-between rounded-card border border-maroon/30 bg-maroon/5 px-3 py-2">
        <span className="font-mulish text-xs font-semibold text-maroon">
          &quot;{coupon.code}&quot; applied — {coupon.discountPercent}% off
        </span>
        <button
          type="button"
          onClick={removeCoupon}
          className="font-mulish text-xs font-semibold text-inkSoft underline underline-offset-4 hover:text-maroon"
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1.5">
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Coupon code"
          className="min-w-0 flex-1 rounded-card border border-line bg-ivory px-3 py-2 font-mulish text-sm uppercase text-ink outline-none focus:border-gold"
        />
        <button
          type="submit"
          disabled={isApplying || !code.trim()}
          className="shrink-0 rounded-card border border-maroon px-4 py-2 font-mulish text-xs font-bold text-maroon transition-colors hover:bg-maroon hover:text-ivory disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isApplying ? "Applying..." : "Apply"}
        </button>
      </div>
      {error && <p className="font-mulish text-xs text-maroon">{error}</p>}
    </form>
  );
}
