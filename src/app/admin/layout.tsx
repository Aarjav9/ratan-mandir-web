"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV_LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/coupons", label: "Coupons" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/customers", label: "Customers" },
  { href: "/admin/reviews", label: "Reviews" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  useEffect(() => {
    if (isLoginPage) return;
    fetch("/api/admin/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { email: string } | null) => setAdminEmail(data?.email ?? null))
      .catch(() => setAdminEmail(null));
  }, [isLoginPage]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  if (isLoginPage) {
    return <div className="min-h-screen bg-ivory font-mulish text-ink">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-ivory font-mulish text-ink">
      <header className="border-b border-line bg-card">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-4">
          <span className="font-marcellus text-lg text-maroonDeep">Ratan Mandir Admin</span>
          <div className="flex items-center gap-4">
            {adminEmail && <span className="font-mulish text-xs text-inkSoft">{adminEmail}</span>}
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-card border border-gold/60 bg-ivory px-3 py-1.5 text-xs font-semibold text-maroon hover:border-gold"
            >
              Log Out
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-2 px-6 pb-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors hover:text-maroon ${
                (link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href))
                  ? "text-maroon"
                  : "text-inkSoft"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
