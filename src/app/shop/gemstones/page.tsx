import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import { getRatingsMap } from "@/lib/ratings";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Navratna Gemstones — Authentic & Lab-Certified | Ratan Mandir",
  description:
    "Shop authentic, lab-certified Navratna gemstones — the nine sacred stones of Vedic astrology, each aligned with a ruling planet.",
  alternates: { canonical: `${SITE_URL}/shop/gemstones` },
};

export default async function GemstonesPage() {
  const products = await prisma.product.findMany({
    where: { categoryType: "GEMSTONE" },
    include: {
      images: { orderBy: { position: "asc" }, take: 1 },
      variants: { take: 1 },
      _count: { select: { variants: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const ratings = await getRatingsMap(products.map((p) => p.id));

  return (
    <div className="container-page py-12">
      <div className="mb-10">
        <h1 className="font-marcellus text-3xl text-maroonDeep">Navratna Gemstones</h1>
        <p className="mt-2 max-w-2xl font-mulish text-sm text-inkSoft">
          The nine sacred gemstones of Vedic astrology, each aligned with a ruling planet and a
          distinct life significance.
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
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
        <p className="font-mulish text-sm text-inkSoft">No gemstones are listed yet. Check back soon.</p>
      )}
    </div>
  );
}
