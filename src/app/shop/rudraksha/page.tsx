import Link from "next/link";
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import { getRatingsMap } from "@/lib/ratings";
import MukhiFilterPanel from "@/components/shop/MukhiFilterPanel";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Rudraksha — Authentic & Lab-Certified | Ratan Mandir",
  description: "Shop our full range of authentic, lab-certified Rudraksha beads, malas and bracelets across every mukhi.",
  alternates: { canonical: `${SITE_URL}/shop/rudraksha` },
};

// The unfiltered Rudraksha hub — every Rudraksha product, not scoped to a
// single mukhi. Previously the "Rudraksha" nav/footer/hero links all went
// straight to /shop/5, forcing a specific-mukhi view by default; this page
// is the real "all Rudraksha" landing, with the mukhi picker available in
// the filter for narrowing down, not applied automatically.
export default async function AllRudrakshaPage() {
  const [products, stockedMukhiRows] = await Promise.all([
    prisma.product.findMany({
      where: { categoryType: "RUDRAKSHA", isActive: true },
      include: {
        images: { orderBy: { position: "asc" }, take: 1 },
        variants: { take: 1 },
        _count: { select: { variants: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.findMany({
      where: { categoryType: "RUDRAKSHA", mukhiNumber: { not: null }, isActive: true },
      distinct: ["mukhiNumber"],
      select: { mukhiNumber: true },
    }),
  ]);

  const ratings = await getRatingsMap(products.map((p) => p.id));
  const stockedMukhis = stockedMukhiRows.map((r) => r.mukhiNumber).filter((n): n is number => n !== null);

  return (
    <div className="container-page py-12">
      <nav className="mb-6 font-mulish text-xs text-inkSoft" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-maroon">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">Rudraksha</span>
      </nav>

      <div className="mb-10">
        <h1 className="font-marcellus text-3xl text-maroonDeep">Rudraksha</h1>
        <p className="mt-2 max-w-2xl font-mulish text-sm text-inkSoft">
          Lab-certified beads, malas and bracelets across every mukhi. Pick a mukhi from the
          filter to narrow down, or browse everything below.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-[220px_1fr]">
        <MukhiFilterPanel mukhiNumber={null} stockedMukhis={stockedMukhis} />

        <div>
          {products.length > 0 ? (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
              {products.map((product: (typeof products)[number]) => (
                <ProductCard
                  key={product.id}
                  product={{
                    slug: product.slug,
                    name: product.name,
                    basePrice: product.basePrice.toString(),
                    mrp: product.mrp?.toString() ?? null,
                    badge: product.badge,
                    images: product.images,
                    productId: product.id,
                    rating: ratings[product.id]?.rating ?? null,
                    reviewCount: ratings[product.id]?.count ?? null,
                    variantCount: product._count.variants,
                    defaultVariant: product.variants[0]
                      ? {
                          id: product.variants[0].id,
                          label: product.variants[0].label,
                          price: Number(product.variants[0].priceOverride ?? product.basePrice),
                        }
                      : null,
                  }}
                />
              ))}
            </div>
          ) : (
            <p className="font-mulish text-sm text-inkSoft">
              No Rudraksha products are listed yet. Check back soon.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
