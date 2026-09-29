import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import { getRatingsMap } from "@/lib/ratings";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// This route handles /shop/<mukhi number>, e.g. /shop/5. Named `[category]`
// (not `[mukhi]`) purely because Next.js requires sibling dynamic segments
// at the same path depth to share one param name — /shop/[category]/[variety]
// lives right below it. The URL and behavior here are unchanged; only the
// internal param name changed.
interface ShopMukhiPageProps {
  params: { category: string };
}

function FilterGroups({ mukhiNumber }: { mukhiNumber: number }) {
  return (
    <>
      <div className="mt-5">
        <p className="font-mulish text-xs font-bold uppercase tracking-wide text-inkSoft">
          Mukhi
        </p>
        <div className="mt-2 flex flex-col gap-2 font-mulish text-sm text-ink">
          {[1, 5, 7, 9].map((m) => (
            <Link
              key={m}
              href={`/shop/${m}`}
              className={m === mukhiNumber ? "font-bold text-maroon" : "hover:text-maroon"}
            >
              {m} Mukhi
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="font-mulish text-xs font-bold uppercase tracking-wide text-inkSoft">
          Price
        </p>
        <div className="mt-2 flex flex-col gap-2 font-mulish text-sm text-inkSoft">
          <label className="flex items-center gap-2">
            <input type="checkbox" disabled /> Under ₹1,000
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" disabled /> ₹1,000 – ₹5,000
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" disabled /> Above ₹5,000
          </label>
        </div>
      </div>

      <div className="mt-6">
        <p className="font-mulish text-xs font-bold uppercase tracking-wide text-inkSoft">
          Format
        </p>
        <div className="mt-2 flex flex-col gap-2 font-mulish text-sm text-inkSoft">
          <label className="flex items-center gap-2">
            <input type="checkbox" disabled /> Mala
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" disabled /> Bracelet
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" disabled /> Pendant
          </label>
        </div>
      </div>
    </>
  );
}

export async function generateMetadata({ params }: ShopMukhiPageProps): Promise<Metadata> {
  const mukhiNumber = parseInt(params.category, 10);
  if (Number.isNaN(mukhiNumber) || mukhiNumber < 1 || mukhiNumber > 14) {
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
  const [mukhiInfo, products] = await Promise.all([
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
  ]);

  const ratings = await getRatingsMap(products.map((p) => p.id));

  return { mukhiInfo, products, ratings };
}

export default async function ShopMukhiPage({ params }: ShopMukhiPageProps) {
  const mukhiNumber = parseInt(params.category, 10);

  if (Number.isNaN(mukhiNumber) || mukhiNumber < 1 || mukhiNumber > 14) {
    notFound();
  }

  const { mukhiInfo, products, ratings } = await getMukhiPageData(mukhiNumber);

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

      <div className="grid gap-10 md:grid-cols-[240px_1fr]">
        {/* Sidebar filters — static UI for now. Wiring up real filtering
            (by size, price range, bead count, certification) is a follow-up
            item once the catalog and query params are finalised.
            On mobile this is a collapsed <details> dropdown, closed by
            default, so the product grid is the first thing a visitor sees
            instead of a tall filter panel pushing it below the fold.
            Desktop keeps the always-expanded sidebar. */}
        <aside className="h-fit rounded-card border border-line bg-card shadow-soft md:p-6">
          <details className="group md:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-marcellus text-base text-ink">
              Filter
              <span className="font-mulish text-lg transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="border-t border-line px-5 pb-5">
              <FilterGroups mukhiNumber={mukhiNumber} />
            </div>
          </details>
          <div className="hidden md:block">
            <h2 className="font-marcellus text-base text-ink">Filter</h2>
            <FilterGroups mukhiNumber={mukhiNumber} />
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
