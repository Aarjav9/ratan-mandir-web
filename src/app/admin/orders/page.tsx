"use client";

import { useEffect, useState } from "react";
import OrderStatusSelect from "@/components/admin/OrderStatusSelect";
import { formatInr } from "@/lib/format";

interface OrderView {
  id: string;
  status: "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  totalAmount: string;
  createdAt: string;
  customer: { name: string; email: string } | null;
  items: { id: string; quantity: number; product: { name: string } }[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderView[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/orders")
      .then(async (res) => {
        if (!res.ok) throw new Error("Could not load orders.");
        return res.json();
      })
      .then((data: { orders: OrderView[] }) => setOrders(data.orders))
      .catch((err) => setError(err instanceof Error ? err.message : "Something went wrong."));
  }, []);

  return (
    <div>
      <h1 className="mb-6 font-marcellus text-2xl text-maroonDeep">Orders</h1>

      {error && <p className="text-sm text-maroon">{error}</p>}
      {!error && orders === null && <p className="text-sm text-inkSoft">Loading...</p>}
      {orders !== null && orders.length === 0 && (
        <p className="text-sm text-inkSoft">No orders yet.</p>
      )}

      <div className="overflow-x-auto rounded-card border border-line bg-card shadow-soft">
        {orders && orders.length > 0 && (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-line text-xs font-semibold uppercase tracking-wide text-inkSoft">
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-line text-sm last:border-0">
                  <td className="px-4 py-3 text-inkSoft">{order.id.slice(-8).toUpperCase()}</td>
                  <td className="px-4 py-3">
                    {order.customer ? (
                      <div>
                        <div className="text-ink">{order.customer.name}</div>
                        <div className="text-xs text-inkSoft">{order.customer.email}</div>
                      </div>
                    ) : (
                      <span className="text-inkSoft">Guest</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-inkSoft">
                    {order.items.map((item) => `${item.product.name} ×${item.quantity}`).join(", ")}
                  </td>
                  <td className="px-4 py-3 font-semibold text-maroon">{formatInr(order.totalAmount)}</td>
                  <td className="px-4 py-3 text-inkSoft">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <OrderStatusSelect orderId={order.id} status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
