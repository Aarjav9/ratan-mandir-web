"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import OrderStatusSelect from "@/components/admin/OrderStatusSelect";
import { formatInr } from "@/lib/format";

interface OrderDetail {
  id: string;
  status: "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  totalAmount: string;
  discountAmount: string | null;
  razorpayOrderId: string | null;
  razorpayPaymentId: string | null;
  createdAt: string;
  customer: { name: string; email: string; phone: string | null } | null;
  shippingAddress: {
    line1: string;
    line2: string | null;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  } | null;
  coupon: { code: string; discountPercent: number } | null;
  items: {
    id: string;
    quantity: number;
    priceAtPurchase: string;
    product: { name: string };
    variant: { label: string } | null;
  }[];
}

export default function AdminOrderDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/admin/orders/${params.id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Could not load this order.");
        return res.json();
      })
      .then((data: { order: OrderDetail }) => setOrder(data.order))
      .catch((err) => setError(err instanceof Error ? err.message : "Something went wrong."));
  }, [params.id]);

  if (error) return <p className="text-sm text-maroon">{error}</p>;
  if (!order) return <p className="text-sm text-inkSoft">Loading...</p>;

  const subtotal = order.items.reduce((sum, item) => sum + Number(item.priceAtPurchase) * item.quantity, 0);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-marcellus text-2xl text-maroonDeep">Order #{order.id.slice(-8).toUpperCase()}</h1>
          <p className="mt-1 font-mulish text-xs text-inkSoft">
            Placed{" "}
            {new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
        <button
          type="button"
          onClick={() => router.push("/admin/orders")}
          className="font-mulish text-xs font-semibold text-inkSoft underline underline-offset-4 hover:text-maroon"
        >
          Back to Orders
        </button>
      </div>

      <div className="grid max-w-4xl gap-6 md:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-6">
          <section className="rounded-card border border-line bg-card p-6 shadow-soft">
            <h2 className="mb-4 font-marcellus text-lg text-maroonDeep">Items</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-line text-xs font-semibold uppercase tracking-wide text-inkSoft">
                  <th className="py-2 pr-4">Product</th>
                  <th className="py-2 pr-4">Qty</th>
                  <th className="py-2 pr-4">Price</th>
                  <th className="py-2 pr-4">Line Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id} className="border-b border-line text-sm last:border-0">
                    <td className="py-3 pr-4 text-ink">
                      {item.product.name}
                      {item.variant && <span className="text-inkSoft"> ({item.variant.label})</span>}
                    </td>
                    <td className="py-3 pr-4 text-inkSoft">{item.quantity}</td>
                    <td className="py-3 pr-4 text-inkSoft">{formatInr(item.priceAtPurchase)}</td>
                    <td className="py-3 pr-4 font-semibold text-ink">
                      {formatInr((Number(item.priceAtPurchase) * item.quantity).toString())}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex flex-col items-end gap-1 border-t border-line pt-4 font-mulish text-sm">
              <div className="flex w-48 justify-between text-inkSoft">
                <span>Subtotal</span>
                <span>{formatInr(subtotal.toString())}</span>
              </div>
              {order.coupon && order.discountAmount && (
                <div className="flex w-48 justify-between text-inkSoft">
                  <span>Discount ({order.coupon.code})</span>
                  <span>−{formatInr(order.discountAmount)}</span>
                </div>
              )}
              <div className="flex w-48 justify-between font-bold text-maroon">
                <span>Total</span>
                <span>{formatInr(order.totalAmount)}</span>
              </div>
            </div>
          </section>

          {order.shippingAddress && (
            <section className="rounded-card border border-line bg-card p-6 shadow-soft">
              <h2 className="mb-4 font-marcellus text-lg text-maroonDeep">Shipping Address</h2>
              <p className="font-mulish text-sm text-ink">
                {order.shippingAddress.line1}
                {order.shippingAddress.line2 && <>, {order.shippingAddress.line2}</>}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}
                <br />
                Phone: {order.shippingAddress.phone}
              </p>
            </section>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <section className="rounded-card border border-line bg-card p-6 shadow-soft">
            <h2 className="mb-4 font-marcellus text-lg text-maroonDeep">Status</h2>
            <OrderStatusSelect orderId={order.id} status={order.status} />
          </section>

          <section className="rounded-card border border-line bg-card p-6 shadow-soft">
            <h2 className="mb-4 font-marcellus text-lg text-maroonDeep">Customer</h2>
            {order.customer ? (
              <div className="font-mulish text-sm text-ink">
                <p>{order.customer.name}</p>
                <p className="text-inkSoft">{order.customer.email}</p>
                {order.customer.phone && <p className="text-inkSoft">{order.customer.phone}</p>}
              </div>
            ) : (
              <p className="font-mulish text-sm text-inkSoft">Guest checkout</p>
            )}
          </section>

          <section className="rounded-card border border-line bg-card p-6 shadow-soft">
            <h2 className="mb-4 font-marcellus text-lg text-maroonDeep">Payment</h2>
            <div className="flex flex-col gap-1 font-mulish text-xs text-inkSoft">
              <p>Razorpay Order: {order.razorpayOrderId ?? "—"}</p>
              <p>Razorpay Payment: {order.razorpayPaymentId ?? "—"}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
