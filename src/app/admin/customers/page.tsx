"use client";

import { useEffect, useMemo, useState } from "react";
import { formatInr } from "@/lib/format";

interface CustomerView {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  createdAt: string;
  orderCount: number;
  totalSpent: number;
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<CustomerView[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/api/admin/customers")
      .then(async (res) => {
        if (!res.ok) throw new Error("Could not load customers.");
        return res.json();
      })
      .then((data: { customers: CustomerView[] }) => setCustomers(data.customers))
      .catch((err) => setError(err instanceof Error ? err.message : "Something went wrong."));
  }, []);

  const filtered = useMemo(() => {
    if (!customers) return null;
    const q = query.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter(
      (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || (c.phone ?? "").includes(q)
    );
  }, [customers, query]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="font-marcellus text-2xl text-maroonDeep">Customers</h1>
        <input
          placeholder="Search name, email or phone..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-xs rounded-card border border-line bg-card px-3 py-2 font-mulish text-sm text-ink outline-none focus:border-gold"
        />
      </div>

      {error && <p className="text-sm text-maroon">{error}</p>}
      {!error && customers === null && <p className="text-sm text-inkSoft">Loading...</p>}
      {filtered && filtered.length === 0 && (
        <p className="font-mulish text-sm text-inkSoft">No customers found.</p>
      )}

      {filtered && filtered.length > 0 && (
        <div className="overflow-x-auto rounded-card border border-line bg-card shadow-soft">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-line text-xs font-semibold uppercase tracking-wide text-inkSoft">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Orders</th>
                <th className="px-4 py-3">Total Spent</th>
                <th className="px-4 py-3">Joined</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-line text-sm last:border-0">
                  <td className="px-4 py-3 text-ink">{c.name}</td>
                  <td className="px-4 py-3 text-inkSoft">
                    <div>{c.email}</div>
                    {c.phone && <div className="text-xs">{c.phone}</div>}
                  </td>
                  <td className="px-4 py-3 text-inkSoft">{c.orderCount}</td>
                  <td className="px-4 py-3 font-semibold text-maroon">{formatInr(c.totalSpent.toString())}</td>
                  <td className="px-4 py-3 text-inkSoft">
                    {new Date(c.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
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
