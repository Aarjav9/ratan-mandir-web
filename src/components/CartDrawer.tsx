"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useCartDrawer } from "@/context/CartDrawerContext";
import { useCoupon } from "@/context/CouponContext";
import { formatInr } from "@/lib/format";
import CouponField from "@/components/CouponField";

const FREE_SHIPPING_THRESHOLD = 499;

export default function CartDrawer() {
  const { items, updateQty, removeItem, subtotal, itemCount } = useCart();
  const { isOpen, close } = useCartDrawer();
  const { coupon } = useCoupon();

  if (!isOpen) return null;

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const discountAmount = coupon ? Math.round(subtotal * (coupon.discountPercent / 100)) : 0;
  const total = subtotal - discountAmount;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close cart"
        className="absolute inset-0 bg-ink/40"
        onClick={close}
      />
      <div className="absolute inset-y-0 right-0 flex w-full flex-col bg-ivory shadow-soft md:w-[420px]">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <span className="font-marcellus text-lg text-maroon">
            Your Cart {itemCount > 0 && <span className="font-mulish text-sm text-inkSoft">({itemCount})</span>}
          </span>
          <button
            type="button"
            onClick={close}
            aria-label="Close cart"
            className="font-mulish text-2xl leading-none text-inkSoft"
          >
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-mulish text-sm text-inkSoft">Your cart is empty.</p>
            <Link
              href="/"
              onClick={close}
              className="rounded-card bg-maroon px-6 py-3 font-mulish text-sm font-bold text-ivory shadow-soft transition-colors hover:bg-maroonDeep"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="border-b border-line px-5 py-4">
              {remainingForFreeShipping > 0 ? (
                <p className="font-mulish text-xs text-inkSoft">
                  You&apos;re <span className="font-bold text-maroon">{formatInr(remainingForFreeShipping)}</span>{" "}
                  away from FREE shipping
                </p>
              ) : (
                <p className="font-mulish text-xs font-bold text-maroon">
                  🎉 You&apos;ve unlocked FREE shipping!
                </p>
              )}
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-line">
                <div
                  className="h-full rounded-full bg-maroon transition-all"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col divide-y divide-line">
                {items.map((item) => (
                  <div
                    key={`${item.productId}::${item.variantId ?? "default"}`}
                    className="flex gap-3 px-5 py-4"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-card border border-line bg-ivoryDeep">
                      <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={close}
                        className="font-marcellus text-sm text-ink hover:text-maroon"
                      >
                        {item.name}
                      </Link>
                      {item.variantLabel && (
                        <p className="mt-0.5 font-mulish text-xs text-inkSoft">{item.variantLabel}</p>
                      )}
                      <p className="mt-1 flex items-baseline gap-2 font-mulish text-sm">
                        <span className="font-bold text-maroon">{formatInr(item.price)}</span>
                        {!!item.mrp && item.mrp > item.price && (
                          <span className="text-xs text-inkSoft line-through">{formatInr(item.mrp)}</span>
                        )}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center rounded-card border border-line">
                          <button
                            type="button"
                            onClick={() => updateQty(item.productId, item.variantId, item.qty - 1)}
                            className="px-2.5 py-1 font-mulish text-sm text-ink hover:text-maroon"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="min-w-6 text-center font-mulish text-xs font-semibold text-ink">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQty(item.productId, item.variantId, item.qty + 1)}
                            className="px-2.5 py-1 font-mulish text-sm text-ink hover:text-maroon"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.productId, item.variantId)}
                          className="font-mulish text-xs font-semibold text-inkSoft underline underline-offset-4 hover:text-maroon"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-line px-5 py-5">
              <div className="mb-4">
                <CouponField subtotal={subtotal} />
              </div>

              <div className="flex justify-between font-mulish text-sm">
                <span className="text-inkSoft">Subtotal</span>
                <span className="text-ink">{formatInr(subtotal)}</span>
              </div>
              {coupon && (
                <div className="mt-1 flex justify-between font-mulish text-sm">
                  <span className="text-inkSoft">Discount ({coupon.discountPercent}%)</span>
                  <span className="text-maroon">−{formatInr(discountAmount)}</span>
                </div>
              )}
              <div className="mt-1 flex justify-between font-mulish text-sm">
                <span className="font-semibold text-ink">Total</span>
                <span className="font-extrabold text-maroon">{formatInr(total)}</span>
              </div>
              <p className="mt-1 font-mulish text-[11px] text-inkSoft">
                Shipping and any applicable taxes are calculated at checkout.
              </p>
              <Link
                href="/checkout"
                onClick={close}
                className="mt-4 block rounded-card bg-maroon px-6 py-3 text-center font-mulish text-sm font-bold text-ivory shadow-soft transition-colors hover:bg-maroonDeep"
              >
                Checkout
              </Link>
              <Link
                href="/cart"
                onClick={close}
                className="mt-3 block text-center font-mulish text-xs font-semibold text-maroon underline underline-offset-4 hover:text-maroonDeep"
              >
                View Full Cart
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
