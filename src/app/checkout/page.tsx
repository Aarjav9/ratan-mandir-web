"use client";

import { useState, type ChangeEvent } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useCoupon } from "@/context/CouponContext";
import { formatInr } from "@/lib/format";

interface ShippingForm {
  name: string;
  email: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
}

const EMPTY_FORM: ShippingForm = {
  name: "",
  email: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
};

// Minimal shape of the window.Razorpay checkout constructor, loaded via the
// Razorpay checkout.js script below. Only used in LIVE mode (real keys set).
declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const { coupon, removeCoupon } = useCoupon();
  const discountAmount = coupon ? Math.round(subtotal * (coupon.discountPercent / 100)) : 0;
  const total = subtotal - discountAmount;
  const [form, setForm] = useState<ShippingForm>(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (field: keyof ShippingForm) => (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handlePay = async () => {
    setError(null);

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    const requiredFields: (keyof ShippingForm)[] = [
      "name",
      "email",
      "phone",
      "line1",
      "city",
      "state",
      "pincode",
    ];
    const missing = requiredFields.filter((field) => !form[field].trim());
    if (missing.length > 0) {
      setError("Please fill in all required shipping details.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.qty,
            price: item.price,
          })),
          shippingAddress: form,
          couponCode: coupon?.code ?? null,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Could not start checkout. Please try again.");
      }

      const data: {
        razorpayOrderId: string;
        amount: number;
        currency: string;
        isMock: boolean;
        dbOrderId: string;
      } = await res.json();

      if (data.isMock || !window.Razorpay) {
        // STUB MODE: no live Razorpay keys configured (see src/lib/razorpay.ts).
        // We simulate a successful payment locally so the checkout flow can
        // be demoed end-to-end. In LIVE mode, the branch below opens the real
        // Razorpay checkout modal instead.
        clearCart();
        removeCoupon();
        setSuccessMessage(
          `Order placed (demo mode). Reference: ${data.dbOrderId}. In production, this step opens the real Razorpay payment modal.`
        );
        setIsSubmitting(false);
        return;
      }

      // LIVE MODE: open the real Razorpay checkout modal.
      const razorpay = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Ratan Mandir",
        description: "Order payment",
        order_id: data.razorpayOrderId,
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: "#7A1620" },
        handler: () => {
          clearCart();
          removeCoupon();
          setSuccessMessage(
            `Payment successful. Order reference: ${data.dbOrderId}. Your order confirmation will follow shortly.`
          );
        },
        modal: {
          ondismiss: () => setIsSubmitting(false),
        },
      });
      razorpay.open();
      setIsSubmitting(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setIsSubmitting(false);
    }
  };

  if (successMessage) {
    return (
      <div className="container-page flex flex-col items-center gap-4 py-24 text-center">
        <h1 className="font-marcellus text-3xl text-maroonDeep">Thank You</h1>
        <p className="max-w-md font-mulish text-sm text-inkSoft">{successMessage}</p>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="rounded-card bg-maroon px-7 py-3 font-mulish text-sm font-bold text-ivory shadow-soft transition-colors hover:bg-maroonDeep"
        >
          Return to Homepage
        </button>
      </div>
    );
  }

  return (
    <div className="container-page py-12">
      {/* Loaded only so the LIVE-mode Razorpay branch above has window.Razorpay
          available. Harmless to load even when keys are unset. */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <h1 className="mb-8 font-marcellus text-3xl text-maroonDeep">Checkout</h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <form
          className="flex flex-col gap-5 rounded-card border border-line bg-card p-6 shadow-soft"
          onSubmit={(e) => e.preventDefault()}
        >
          <h2 className="font-marcellus text-lg text-ink">Shipping Address</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name" value={form.name} onChange={handleChange("name")} required />
            <Field
              label="Email"
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              required
            />
          </div>

          <Field label="Phone" type="tel" value={form.phone} onChange={handleChange("phone")} required />
          <Field label="Address Line 1" value={form.line1} onChange={handleChange("line1")} required />
          <Field label="Address Line 2 (optional)" value={form.line2} onChange={handleChange("line2")} />

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="City" value={form.city} onChange={handleChange("city")} required />
            <Field label="State" value={form.state} onChange={handleChange("state")} required />
            <Field label="Pincode" value={form.pincode} onChange={handleChange("pincode")} required />
          </div>
        </form>

        <div className="h-fit rounded-card border border-line bg-card p-6 shadow-soft">
          <h2 className="font-marcellus text-lg text-ink">Order Summary</h2>
          <div className="mt-4 flex flex-col gap-2 font-mulish text-sm text-inkSoft">
            {items.map((item) => (
              <div
                key={`${item.productId}::${item.variantId ?? "default"}`}
                className="flex justify-between"
              >
                <span>
                  {item.name} × {item.qty}
                </span>
                <span className="text-ink">{formatInr(item.price * item.qty)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-line pt-4">
            {coupon && (
              <div className="mb-2 flex justify-between font-mulish text-sm text-inkSoft">
                <span>
                  Discount (&quot;{coupon.code}&quot; · {coupon.discountPercent}%)
                </span>
                <span className="text-maroon">−{formatInr(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between font-mulish text-sm">
              <span className="font-semibold text-ink">Total</span>
              <span className="font-extrabold text-maroon">{formatInr(total)}</span>
            </div>
          </div>

          {error && <p className="mt-4 font-mulish text-xs text-maroon">{error}</p>}

          <button
            type="button"
            onClick={handlePay}
            disabled={isSubmitting}
            className="mt-6 w-full rounded-card bg-maroon px-6 py-3 font-mulish text-sm font-bold text-ivory shadow-soft transition-colors hover:bg-maroonDeep disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Processing..." : "Pay with Razorpay"}
          </button>
          <p className="mt-3 font-mulish text-[11px] text-inkSoft">
            Payments are processed securely via Razorpay. Card and bank details are never
            stored on our servers.
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mulish text-xs font-semibold text-inkSoft">
        {label}
        {required && <span className="text-maroon"> *</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="rounded-card border border-line bg-ivory px-3 py-2 font-mulish text-sm text-ink outline-none focus:border-gold"
      />
    </label>
  );
}
