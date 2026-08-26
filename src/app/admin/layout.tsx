"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV_LINKS = [
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

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
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span className="font-marcellus text-lg text-maroonDeep">Ratan Mandir Admin</span>
          <nav className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors hover:text-maroon ${
                  pathname.startsWith(link.href) ? "text-maroon" : "text-inkSoft"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-card border border-gold/60 bg-ivory px-3 py-1.5 text-xs font-semibold text-maroon hover:border-gold"
            >
              Log Out
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}
