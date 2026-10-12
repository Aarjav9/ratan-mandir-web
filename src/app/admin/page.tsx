import Link from "next/link";
import prisma from "@/lib/prisma";
import { formatInr } from "@/lib/format";

async function getDashboardData() {
  const [
    totalProducts,
    activeProducts,
    totalOrders,
    pendingOrders,
    lowStockVariants,
    revenueResult,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { isActive: true } }),
    prisma.order.count(),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.productVariant.count({ where: { stock: { lte: 3 } } }),
    prisma.order.aggregate({
      where: { status: { in: ["PAID", "SHIPPED", "DELIVERED"] } },
      _sum: { totalAmount: true },
    }),
  ]);

  return {
    totalProducts,
    activeProducts,
    inactiveProducts: totalProducts - activeProducts,
    totalOrders,
    pendingOrders,
    lowStockVariants,
    revenue: revenueResult._sum.totalAmount?.toString() ?? "0",
  };
}

function StatCard({ label, value, href }: { label: string; value: string; href?: string }) {
  const content = (
    <div className="rounded-card border border-line bg-card p-5 shadow-soft">
      <p className="font-mulish text-xs font-semibold uppercase tracking-wide text-inkSoft">{label}</p>
      <p className="mt-2 font-marcellus text-2xl text-maroonDeep">{value}</p>
    </div>
  );
  return href ? (
    <Link href={href} className="transition-opacity hover:opacity-80">
      {content}
    </Link>
  ) : (
    content
  );
}

export default async function AdminDashboardPage() {
  const data = await getDashboardData();

  return (
    <div>
      <h1 className="mb-6 font-marcellus text-2xl text-maroonDeep">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Total Orders" value={String(data.totalOrders)} href="/admin/orders" />
        <StatCard label="Pending Orders" value={String(data.pendingOrders)} href="/admin/orders" />
        <StatCard label="Revenue (Paid+)" value={formatInr(data.revenue)} href="/admin/orders" />
        <StatCard label="Active Products" value={String(data.activeProducts)} href="/admin/products" />
        <StatCard label="Inactive Products" value={String(data.inactiveProducts)} href="/admin/products" />
        <StatCard label="Low Stock Variants (≤3)" value={String(data.lowStockVariants)} href="/admin/products" />
      </div>

      <div className="mt-8 flex gap-4">
        <Link
          href="/admin/products/new"
          className="rounded-card bg-maroon px-5 py-2.5 font-mulish text-sm font-bold text-ivory shadow-soft transition-colors hover:bg-maroonDeep"
        >
          + Add Product
        </Link>
        <Link
          href="/admin/orders"
          className="rounded-card border border-gold/60 bg-card px-5 py-2.5 font-mulish text-sm font-bold text-maroon shadow-soft transition-colors hover:border-gold"
        >
          View Orders
        </Link>
      </div>
    </div>
  );
}
