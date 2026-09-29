import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import { getRatingsMap } from "@/lib/ratings";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Search — Ratan Mandir",
  robots: { index: false, follow: true },
};

// A basic case-insensitive text match on name/description. Full predictive
// search with facets (price/category/purpose/material/rating) is a later
// phase — this exists so the header search bar has a real destination.
export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q?.trim() ?? "";

  const products = query
    ? await prisma.product.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
        include: {
          images: { orderBy: { position: "asc" }, take: 1 },
          variants: { take: 1 },
          _count: { select: { variants: true } },
        },
        take: 24,
      })
    : [];

  const ratings = await getRatingsMap(products.map((p) => p.id));

  return (
    <div className="container-page py-12">
      <h1 className="font-marcellus text-3xl text-maroonDeep">
        {query ? `Search results for "${query}"` : "Search"}
      </h1>
      <p className="mt-2 font-mulish text-sm text-inkSoft">
        {query
          ? `${products.length} result${products.length === 1 ? "" : "s"} found`
          : "Enter a search term to find products."}
      </p>

      {query && products.length === 0 && (
        <p className="mt-10 font-mulish text-sm text-inkSoft">
          No products matched your search. Try a different term, or browse{" "}
          <a href="/shop/5" className="font-bold text-maroon underline underline-offset-4">
            Rudraksha
          </a>{" "}
          and{" "}
          <a href="/shop/gemstones" className="font-bold text-maroon underline underline-offset-4">
            Navratna Gemstones
          </a>
          .
        </p>
      )}

      {products.length > 0 && (
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
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
      )}
    </div>
  );
}
