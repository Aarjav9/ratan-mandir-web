import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

interface ShopMukhiPageProps {
  params: { mukhi: string };
}

async function getMukhiPageData(mukhiNumber: number) {
  const [mukhiInfo, products] = await Promise.all([
    prisma.mukhiInfo.findUnique({ where: { mukhiNumber } }),
    prisma.product.findMany({
      where: { mukhiNumber, categoryType: "RUDRAKSHA" },
      include: { images: { orderBy: { position: "asc" }, take: 1 } },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return { mukhiInfo, products };
}

export default async function ShopMukhiPage({ params }: ShopMukhiPageProps) {
  const mukhiNumber = parseInt(params.mukhi, 10);

  if (Number.isNaN(mukhiNumber) || mukhiNumber < 1 || mukhiNumber > 14) {
    notFound();
  }

  const { mukhiInfo, products } = await getMukhiPageData(mukhiNumber);

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
            item once the catalog and query params are finalised. */}
        <aside className="h-fit rounded-card border border-line bg-card p-6 shadow-soft">
          <h2 className="font-marcellus text-base text-ink">Filter</h2>

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
