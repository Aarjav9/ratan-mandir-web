import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import { getRatingsMap } from "@/lib/ratings";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const MAX_MUKHI = 18;

// This route handles /shop/<mukhi number>, e.g. /shop/5. Named `[category]`
// (not `[mukhi]`) purely because Next.js requires sibling dynamic segments
// at the same path depth to share one param name — /shop/[category]/[variety]
// lives right below it. The URL and behavior here are unchanged; only the
// internal param name changed.
interface ShopMukhiPageProps {
  params: { category: string };
}

// Beaded-mala-style pill picker — rounded, bead-like buttons rather than
// a plain checkbox list, so the mukhi switcher reads as something unique to
// a Rudraksha site rather than a generic e-commerce filter. `stockedMukhis`
// (fetched live, same as the sitemap's query) decides which numbers get a
// filled "live" look vs. a faint "coming soon" one — nothing here is
// hardcoded to a fixed set of mukhis.
function FilterGroups({
  mukhiNumber,
  stockedMukhis,
}: {
  mukhiNumber: number;
  stockedMukhis: number[];
}) {
  const stocked = new Set(stockedMukhis);

  return (
    <>
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <p className="font-mulish text-xs font-bold uppercase tracking-wide text-inkSoft">Mukhi</p>
          <Link
            href="/shop/rudraksha/mukhi"
            className="font-mulish text-xs font-semibold text-maroon underline underline-offset-4 hover:text-maroonDeep"
          >
            View all 1–18
          </Link>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {Array.from({ length: MAX_MUKHI }, (_, i) => i + 1).map((m) => {
            const isActive = m === mukhiNumber;
            const hasStock = stocked.has(m);
            return (
              <Link
                key={m}
                href={`/shop/${m}`}
                aria-current={isActive}
                className={`flex h-7 w-7 items-center justify-center rounded-full border font-mulish text-xs font-bold transition-colors ${
                  isActive
                    ? "border-maroon bg-maroon text-ivory"
                    : hasStock
                      ? "border-gold/50 bg-ivoryDeep text-ink hover:border-maroon hover:text-maroon"
                      : "border-line bg-ivory text-inkSoft/50 hover:border-gold"
                }`}
              >
                {m}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <p className="font-mulish text-xs font-bold uppercase tracking-wide text-inkSoft">Format</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {["Mala", "Bracelet", "Pendant"].map((label) => (
            <span
              key={label}
              className="cursor-default rounded-full border border-line bg-ivoryDeep px-3 py-1.5 font-mulish text-xs text-inkSoft"
              title="Coming soon"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </>
  );
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
        <span className="text-ink">{mukhiNumber} Mukhi Rudraksha</span>
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

      <div className="grid gap-10 md:grid-cols-[260px_1fr]">
        {/* Sidebar filters — static UI for now beyond the mukhi picker.
            Wiring up real filtering (by price range, bead count,
            certification) is a follow-up item once query params are
            finalised. On mobile this is a collapsed <details> dropdown,
            closed by default, so the product grid is the first thing a
            visitor sees instead of a tall filter panel pushing it below
            the fold. Desktop keeps the always-expanded sidebar. */}
        <aside className="h-fit rounded-card border border-line bg-card shadow-soft md:p-6">
          <details className="group md:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-marcellus text-base text-ink">
              Filter
              <span className="font-mulish text-lg transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="border-t border-line px-5 pb-5">
              <FilterGroups mukhiNumber={mukhiNumber} stockedMukhis={stockedMukhis} />
            </div>
          </details>
          <div className="hidden md:block">
            <h2 className="font-marcellus text-base text-ink">Filter</h2>
            <FilterGroups mukhiNumber={mukhiNumber} stockedMukhis={stockedMukhis} />
          </div>
        </aside>

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
