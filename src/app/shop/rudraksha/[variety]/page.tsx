import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import { getRatingsMap } from "@/lib/ratings";
import { getRudrakshaVariety, RUDRAKSHA_VARIETIES } from "@/lib/rudrakshaVarieties";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

interface VarietyPageProps {
  params: { variety: string };
}

export async function generateMetadata({ params }: VarietyPageProps): Promise<Metadata> {
  const variety = getRudrakshaVariety(params.variety);
  if (!variety) return { title: "Rudraksha — Ratan Mandir" };

  const title = `${variety.label} — Authentic & Lab-Certified | Ratan Mandir`;
  const description = variety.description.slice(0, 155);

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/shop/rudraksha/${variety.slug}` },
    openGraph: { title, description, url: `${SITE_URL}/shop/rudraksha/${variety.slug}` },
  };
}

export default async function RudrakshaVarietyPage({ params }: VarietyPageProps) {
  const variety = getRudrakshaVariety(params.variety);
  if (!variety) notFound();

  const products = await prisma.product.findMany({
    where: variety.where,
    include: {
      images: { orderBy: { position: "asc" }, take: 1 },
      variants: { take: 1 },
    },
    orderBy: { createdAt: "desc" },
  });

  const ratings = await getRatingsMap(products.map((p) => p.id));

  return (
    <div className="container-page py-12">
      <nav className="mb-6 font-mulish text-xs text-inkSoft" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-maroon">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/shop/5" className="hover:text-maroon">
          Rudraksha
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{variety.label}</span>
      </nav>

      <div className="mb-10">
        <h1 className="font-marcellus text-3xl text-maroonDeep">{variety.label}</h1>
        <p className="mt-2 max-w-2xl font-mulish text-sm text-inkSoft">{variety.description}</p>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        {Object.values(RUDRAKSHA_VARIETIES).map((v) => (
          <Link
            key={v.slug}
            href={`/shop/rudraksha/${v.slug}`}
            className={`rounded-card border px-4 py-2 font-mulish text-sm font-semibold transition-colors ${
              v.slug === variety.slug
                ? "border-maroon bg-maroon text-ivory"
                : "border-line bg-card text-ink hover:border-gold"
            }`}
          >
            {v.label}
          </Link>
        ))}
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
          No products are listed under {variety.label} yet. Check back soon.
        </p>
      )}
    </div>
  );
}
