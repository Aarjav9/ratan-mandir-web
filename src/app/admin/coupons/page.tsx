"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CouponActiveToggle from "@/components/admin/CouponActiveToggle";
import { formatInr } from "@/lib/format";

interface CouponView {
  id: string;
  code: string;
  description: string | null;
  discountPercent: number;
  minOrderValue: string | null;
  isActive: boolean;
  expiresAt: string | null;
  createdAt: string;
}

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<CouponView[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/coupons")
      .then(async (res) => {
        if (!res.ok) throw new Error("Could not load coupons.");
        return res.json();
      })
      .then((data: { coupons: CouponView[] }) => setCoupons(data.coupons))
      .catch((err) => setError(err instanceof Error ? err.message : "Something went wrong."));
  }, []);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-marcellus text-2xl text-maroonDeep">Coupons</h1>
        <Link
          href="/admin/coupons/new"
          className="rounded-card bg-maroon px-4 py-2 font-mulish text-sm font-bold text-ivory shadow-soft transition-colors hover:bg-maroonDeep"
        >
          + Add Coupon
        </Link>
      </div>

      {error && <p className="text-sm text-maroon">{error}</p>}
      {!error && coupons === null && <p className="text-sm text-inkSoft">Loading...</p>}
      {coupons && coupons.length === 0 && (
        <p className="font-mulish text-sm text-inkSoft">No coupons yet — create one to offer a discount code.</p>
      )}

      {coupons && coupons.length > 0 && (
        <div className="overflow-x-auto rounded-card border border-line bg-card shadow-soft">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-line text-xs font-semibold uppercase tracking-wide text-inkSoft">
                <th className="px-4 py-3">Code</th>
                <th className="px-4 py-3">Discount</th>
                <th className="px-4 py-3">Min. Order</th>
                <th className="px-4 py-3">Expires</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-3">
                    <span className="font-mulish text-sm font-bold text-ink">{coupon.code}</span>
                    {coupon.description && (
                      <p className="mt-0.5 font-mulish text-xs text-inkSoft">{coupon.description}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mulish text-sm text-ink">{coupon.discountPercent}%</td>
                  <td className="px-4 py-3 font-mulish text-sm text-inkSoft">
                    {coupon.minOrderValue ? formatInr(coupon.minOrderValue) : "—"}
                  </td>
                  <td className="px-4 py-3 font-mulish text-sm text-inkSoft">
                    {coupon.expiresAt ? new Date(coupon.expiresAt).toLocaleDateString("en-IN") : "Never"}
                  </td>
                  <td className="px-4 py-3">
                    <CouponActiveToggle couponId={coupon.id} isActive={coupon.isActive} />
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/coupons/${coupon.id}/edit`}
                      className="font-mulish text-xs font-bold text-maroon underline underline-offset-4 hover:text-maroonDeep"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
