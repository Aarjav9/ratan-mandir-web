import prisma from "@/lib/prisma";
import { formatInr } from "@/lib/format";

export interface CouponValidationResult {
  valid: boolean;
  message?: string;
  couponId?: string;
  code?: string;
  discountPercent?: number;
  discountAmount?: number;
}

/**
 * Single source of truth for coupon validation — used by both the
 * client-preview endpoint (/api/coupons/validate) and checkout itself
 * (which re-validates server-side rather than trusting a client-supplied
 * discount, same pattern as price re-derivation in /api/checkout).
 */
export async function validateCoupon(rawCode: string, subtotal: number): Promise<CouponValidationResult> {
  const code = rawCode.trim().toUpperCase();
  if (!code) return { valid: false, message: "Please enter a coupon code." };

  const coupon = await prisma.coupon.findUnique({ where: { code } });

  if (!coupon || !coupon.isActive) {
    return { valid: false, message: "Invalid or expired coupon code." };
  }
  if (coupon.expiresAt && coupon.expiresAt < new Date()) {
    return { valid: false, message: "This coupon has expired." };
  }
  if (coupon.minOrderValue && subtotal < Number(coupon.minOrderValue)) {
    return {
      valid: false,
      message: `This coupon requires a minimum order of ${formatInr(coupon.minOrderValue.toString())}.`,
    };
  }

  const discountAmount = Math.round(subtotal * (coupon.discountPercent / 100));

  return {
    valid: true,
    couponId: coupon.id,
    code: coupon.code,
    discountPercent: coupon.discountPercent,
    discountAmount,
  };
}
