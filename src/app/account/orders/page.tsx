"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { formatInr } from "@/lib/format";

interface OrderItemView {
  id: string;
  quantity: number;
  priceAtPurchase: string;
  product: { name: string; slug: string };
  variant: { label: string } | null;
}

interface OrderView {
  id: string;
  status: "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  totalAmount: string;
  createdAt: string;
  items: OrderItemView[];
}

const STATUS_STYLES: Record<OrderView["status"], string> = {
  PENDING: "bg-saffron/20 text-saffronDeep",
  PAID: "bg-gold/20 text-inkSoft",
  SHIPPED: "bg-maroon/10 text-maroon",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function AccountOrdersPage() {
  const router = useRouter();
  const { customer, isLoading: authLoading, logout } = useAuth();
  const [orders, setOrders] = useState<OrderView[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/account/orders")
      .then(async (res) => {
        if (!res.ok) throw new Error("Could not load your orders.");
        return res.json();
      })
      .then((data: { orders: OrderView[] }) => setOrders(data.orders))
      .catch((err) => setError(err instanceof Error ? err.message : "Something went wrong."));
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/account/login");
  };

  return (
    <div className="container-page py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-marcellus text-3xl text-maroonDeep">My Orders</h1>
          {!authLoading && customer && (
            <p className="mt-1 font-mulish text-sm text-inkSoft">
              Signed in as {customer.name} ({customer.email})
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-card border border-gold/60 bg-card px-4 py-2 font-mulish text-sm font-semibold text-maroon shadow-soft transition-colors hover:border-gold"
        >
          Log Out
        </button>
      </div>

      {error && <p className="font-mulish text-sm text-maroon">{error}</p>}

      {!error && orders === null && (
        <p className="font-mulish text-sm text-inkSoft">Loading your orders...</p>
      )}

      {orders !== null && orders.length === 0 && (
        <div className="rounded-card border border-line bg-card p-8 text-center shadow-soft">
          <p className="font-mulish text-sm text-inkSoft">You haven&apos;t placed any orders yet.</p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-card bg-maroon px-6 py-3 font-mulish text-sm font-bold text-ivory shadow-soft transition-colors hover:bg-maroonDeep"
          >
            Start Shopping
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {orders?.map((order) => (
          <div key={order.id} className="rounded-card border border-line bg-card p-6 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-mulish text-xs text-inkSoft">
                  Order #{order.id.slice(-8).toUpperCase()} ·{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 font-mulish text-xs font-semibold ${STATUS_STYLES[order.status]}`}
              >
                {order.status}
              </span>
            </div>

            <div className="mt-4 flex flex-col gap-2 border-t border-line pt-4 font-mulish text-sm text-inkSoft">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.product.name}
                    {item.variant ? ` (${item.variant.label})` : ""} × {item.quantity}
                  </span>
                  <span className="text-ink">
                    {formatInr(Number(item.priceAtPurchase) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between border-t border-line pt-4 font-mulish text-sm">
              <span className="font-semibold text-ink">Total</span>
              <span className="font-extrabold text-maroon">{formatInr(order.totalAmount)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
