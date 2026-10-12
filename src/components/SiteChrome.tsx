"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import WhatsAppButton from "@/components/WhatsAppButton";
import CartDrawer from "@/components/CartDrawer";

/**
 * The admin panel has its own header/nav (src/app/admin/layout.tsx) and
 * isn't part of the storefront — so the storefront chrome (header, footer,
 * cart drawer, floating buttons) is skipped there rather than stacking on
 * top of it.
 */
export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="pb-16 md:pb-0">{children}</main>
      <Footer />
      <CartDrawer />
      <ScrollToTopButton />
      <WhatsAppButton />
    </>
  );
}
