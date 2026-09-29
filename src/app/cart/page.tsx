"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useCoupon } from "@/context/CouponContext";
import { formatInr } from "@/lib/format";
import CouponField from "@/components/CouponField";

export default function CartPage() {
  const { items, updateQty, removeItem, subtotal } = useCart();
  const { coupon } = useCoupon();
  const discountAmount = coupon ? Math.round(subtotal * (coupon.discountPercent / 100)) : 0;
  const total = subtotal - discountAmount;

  if (items.length === 0) {
    return (
      <div className="container-page flex flex-col items-center gap-6 py-24 text-center">
        <h1 className="font-marcellus text-3xl text-maroonDeep">Your Cart is Empty</h1>
        <p className="max-w-md font-mulish text-sm text-inkSoft">
          Explore our Rudraksha and gemstone collections to find a piece that resonates
          with you.
        </p>
        <Link
          href="/"
          className="rounded-card bg-maroon px-7 py-3 font-mulish text-sm font-bold text-ivory shadow-soft transition-colors hover:bg-maroonDeep"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-12">
      <h1 className="mb-8 font-marcellus text-3xl text-maroonDeep">Your Cart</h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
        <div className="flex flex-col divide-y divide-line rounded-card border border-line bg-card shadow-soft">
          {items.map((item) => (
            <div
              key={`${item.productId}::${item.variantId ?? "default"}`}
              className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-card border border-line bg-ivoryDeep">
                <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
              </div>

              <div className="flex-1">
                <Link
                  href={`/products/${item.slug}`}
                  className="font-marcellus text-base text-ink hover:text-maroon"
                >
                  {item.name}
                </Link>
                {item.variantLabel && (
                  <p className="mt-1 font-mulish text-xs text-inkSoft">{item.variantLabel}</p>
                )}
                <p className="mt-1 flex items-baseline gap-2 font-mulish text-sm">
                  <span className="font-bold text-maroon">{formatInr(item.price)}</span>
                  {!!item.mrp && item.mrp > item.price && (
                    <span className="text-xs text-inkSoft line-through">{formatInr(item.mrp)}</span>
                  )}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-card border border-line">
                  <button
                    type="button"
                    onClick={() => updateQty(item.productId, item.variantId, item.qty - 1)}
                    className="px-3 py-2 font-mulish text-ink hover:text-maroon"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="min-w-8 text-center font-mulish text-sm font-semibold text-ink">
                    {item.qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQty(item.productId, item.variantId, item.qty + 1)}
                    className="px-3 py-2 font-mulish text-ink hover:text-maroon"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(item.productId, item.variantId)}
                  className="font-mulish text-xs font-semibold text-maroon underline underline-offset-4 hover:text-maroonDeep"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-card border border-line bg-card p-6 shadow-soft">
          <h2 className="font-marcellus text-lg text-ink">Order Summary</h2>

          <div className="mt-4">
            <CouponField subtotal={subtotal} />
          </div>

          <div className="mt-4 flex justify-between font-mulish text-sm text-inkSoft">
            <span>Subtotal</span>
            <span className="text-ink">{formatInr(subtotal)}</span>
          </div>
          {coupon && (
            <div className="mt-1 flex justify-between font-mulish text-sm text-inkSoft">
              <span>Discount ({coupon.discountPercent}%)</span>
              <span className="text-maroon">−{formatInr(discountAmount)}</span>
            </div>
          )}
          <div className="mt-1 flex justify-between font-mulish text-sm">
            <span className="font-semibold text-ink">Total</span>
            <span className="font-extrabold text-maroon">{formatInr(total)}</span>
          </div>
          <p className="mt-2 font-mulish text-xs text-inkSoft">
            Shipping and any applicable taxes are calculated at checkout.
          </p>
          <Link
            href="/checkout"
            className="mt-6 block rounded-card bg-maroon px-6 py-3 text-center font-mulish text-sm font-bold text-ivory shadow-soft transition-colors hover:bg-maroonDeep"
          >
            Proceed to Checkout
          </Link>
          <Link
            href="/"
            className="mt-3 block text-center font-mulish text-xs font-semibold text-maroon underline underline-offset-4 hover:text-maroonDeep"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
