import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import { getRatingsMap } from "@/lib/ratings";
import MukhiFilterPanel from "@/components/shop/MukhiFilterPanel";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const MAX_MUKHI = 18;

// This route handles /shop/<mukhi number>, e.g. /shop/5 — a single specific
// mukhi. The unfiltered "all Rudraksha" view lives at the static sibling
// route /shop/rudraksha/page.tsx, which Next.js matches in preference to
// this dynamic segment. Named `[category]` (not `[mukhi]`) purely because
// Next.js requires sibling dynamic segments at the same path depth to share
// one param name — /shop/[category]/[variety] lives right below it. The
// URL and behavior here are otherwise unchanged; only the internal param
// name differs.
interface ShopMukhiPageProps {
  params: { category: string };
}

export async function generateMetadata({ params }: ShopMukhiPageProps): Promise<Metadata> {
  const mukhiNumber = parseInt(params.category, 10);
  if (Number.isNaN(mukhiNumber) || mukhiNumber < 1 || mukhiNumber > MAX_MUKHI) {
    return { title: "Rudraksha — Ratan Mandir" };
  }

  const mukhiInfo = await prisma.mukhiInfo.findUnique({ where: { mukhiNumber } });
  const title = `${mukhiNumber} Mukhi Rudraksha — Authentic & Lab-Certified | Ratan Mandir`;
  const description = mukhiInfo
    ? `Shop authentic, lab-certified ${mukhiNumber} Mukhi Rudraksha, associated with ${mukhiInfo.deity}. ${mukhiInfo.significance}`.slice(
        0,
        155
      )
    : `Shop authentic, lab-certified ${mukhiNumber} Mukhi Rudraksha beads, malas and bracelets.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/shop/${mukhiNumber}` },
    openGraph: { title, description, url: `${SITE_URL}/shop/${mukhiNumber}` },
  };
}

async function getMukhiPageData(mukhiNumber: number) {
  const [mukhiInfo, products, stockedMukhiRows] = await Promise.all([
    prisma.mukhiInfo.findUnique({ where: { mukhiNumber } }),
    prisma.product.findMany({
      where: { mukhiNumber, categoryType: "RUDRAKSHA" },
      include: {
        images: { orderBy: { position: "asc" }, take: 1 },
        variants: { take: 1 },
        _count: { select: { variants: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.findMany({
      where: { categoryType: "RUDRAKSHA", mukhiNumber: { not: null } },
      distinct: ["mukhiNumber"],
      select: { mukhiNumber: true },
    }),
  ]);

  const ratings = await getRatingsMap(products.map((p) => p.id));
  const stockedMukhis = stockedMukhiRows
    .map((r) => r.mukhiNumber)
    .filter((n): n is number => n !== null);

  return { mukhiInfo, products, ratings, stockedMukhis };
}

export default async function ShopMukhiPage({ params }: ShopMukhiPageProps) {
  const mukhiNumber = parseInt(params.category, 10);

  if (Number.isNaN(mukhiNumber) || mukhiNumber < 1 || mukhiNumber > MAX_MUKHI) {
    notFound();
  }

  const { mukhiInfo, products, ratings, stockedMukhis } = await getMukhiPageData(mukhiNumber);

  return (
    <div className="container-page py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 font-mulish text-xs text-inkSoft" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-maroon">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/shop/rudraksha" className="hover:text-maroon">
          Rudraksha
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{mukhiNumber} Mukhi</span>
      </nav>

      <div className="mb-10">
        <h1 className="font-marcellus text-3xl text-maroonDeep">
          {mukhiNumber} Mukhi Rudraksha
        </h1>
        {mukhiInfo && (
          <p className="mt-2 font-mulish text-sm text-inkSoft">
            Associated with <span className="font-semibold text-ink">{mukhiInfo.deity}</span> —{" "}
            {mukhiInfo.significance}.
          </p>
        )}
      </div>

      <div className="grid gap-10 md:grid-cols-[220px_1fr]">
        <MukhiFilterPanel mukhiNumber={mukhiNumber} stockedMukhis={stockedMukhis} />

        {/* Product grid */}
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
              No products are listed for {mukhiNumber} Mukhi Rudraksha yet. Check back soon,
              or browse another mukhi from the filter.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
