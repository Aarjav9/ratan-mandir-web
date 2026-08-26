import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ProductGallery from "@/components/ProductGallery";
import ProductPurchasePanel from "@/components/ProductPurchasePanel";
import ProductTabs from "@/components/ProductTabs";
import ProductCard from "@/components/ProductCard";
import TestimonialCard from "@/components/TestimonialCard";

interface ProductPageProps {
  params: { slug: string };
}

async function getProductPageData(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { position: "asc" } },
      variants: true,
      reviews: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!product) return { product: null, related: [] };

  const related = await prisma.product.findMany({
    where: {
      id: { not: product.id },
      OR: [
        product.mukhiNumber ? { mukhiNumber: product.mukhiNumber } : undefined,
        { categoryType: product.categoryType },
      ].filter(Boolean) as object[],
    },
    include: { images: { orderBy: { position: "asc" }, take: 1 } },
    take: 4,
  });

  return { product, related };
}

function buildTabContent(product: {
  description: string;
  categoryType: string;
  mukhiNumber: number | null;
  gemstoneName: string | null;
  origin: string | null;
  isCertified: boolean;
}) {
  const isRudraksha = product.categoryType === "RUDRAKSHA";

  return {
    description: product.description,
    benefits: isRudraksha
      ? `Traditionally, ${
          product.mukhiNumber ? `${product.mukhiNumber} Mukhi Rudraksha` : "this Rudraksha"
        } is worn to support focus, emotional balance and spiritual practice. Individual experiences vary, and this is not a substitute for medical or professional advice.`
      : `${
          product.gemstoneName ?? "This gemstone"
        } is traditionally associated with its ruling planet in Vedic astrology. We recommend consulting a qualified astrologer before wearing any gemstone for astrological purposes.`,
    howToWear: isRudraksha
      ? "Cleanse with clean water before first wear. Traditionally worn on a red or black thread, or a silver/gold chain, ideally on a Monday morning after a bath. Avoid wearing while sleeping, bathing, or during periods of impurity, per tradition."
      : "Gemstones are traditionally set in a ring or pendant of a metal recommended for the relevant planet, worn on a specific finger and day as advised by an astrologer, after a brief energising ritual.",
    certificate: product.isCertified
      ? `This product ships with a lab authenticity certificate confirming ${
          isRudraksha ? "mukhi count and natural origin" : "natural, untreated origin"
        }. Certificate numbers and lab partner details will be listed per product ahead of launch.`
      : "Certification details for this product will be added ahead of launch.",
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { product, related } = await getProductPageData(params.slug);

  if (!product) {
    notFound();
  }

  const galleryImages = product.images.length
    ? product.images.map((img: (typeof product.images)[number]) => ({
        url: img.url,
        altText: img.altText,
      }))
    : [{ url: "/images/placeholder/generic-product.jpg", altText: product.name }];

  const variants = product.variants.map((v: (typeof product.variants)[number]) => ({
    id: v.id,
    label: v.label,
    price: v.priceOverride ? Number(v.priceOverride) : Number(product.basePrice),
    stock: v.stock,
  }));

  const tabContent = buildTabContent(product);

  return (
    <div className="container-page py-12">
      <nav className="mb-8 font-mulish text-xs text-inkSoft" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-maroon">
          Home
        </Link>
        <span className="mx-2">/</span>
        {product.categoryType === "RUDRAKSHA" && product.mukhiNumber ? (
          <Link href={`/shop/${product.mukhiNumber}`} className="hover:text-maroon">
            {product.mukhiNumber} Mukhi Rudraksha
          </Link>
        ) : (
          <span>Gemstones</span>
        )}
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2">
        <ProductGallery images={galleryImages} />

        <div className="flex flex-col gap-6">
          <div>
            {product.badge && (
              <span className="mb-3 inline-block rounded-full bg-maroon px-3 py-1 font-mulish text-[11px] font-bold uppercase tracking-wide text-ivory">
                {product.badge}
              </span>
            )}
            <h1 className="font-marcellus text-3xl text-maroonDeep">{product.name}</h1>
            <p className="mt-3 font-mulish text-sm leading-relaxed text-inkSoft">
              {product.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-4 font-mulish text-xs text-inkSoft">
              {product.origin && <span>Origin: {product.origin}</span>}
              {product.isCertified && <span>Lab Certified</span>}
            </div>
          </div>

          <ProductPurchasePanel
            productId={product.id}
            productSlug={product.slug}
            productName={product.name}
            basePrice={Number(product.basePrice)}
            mrp={product.mrp ? Number(product.mrp) : null}
            image={galleryImages[0].url}
            variants={variants}
          />
        </div>
      </div>

      <div className="mt-16">
        <ProductTabs content={tabContent} />
      </div>

      {product.reviews.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 font-marcellus text-2xl text-maroonDeep">Customer Reviews</h2>
          {/* Sample/seed reviews — see prisma/seed.ts. isVerified: false marks
              these as illustrative content, not verified real purchases. */}
          <div className="grid gap-5 md:grid-cols-3">
            {product.reviews.map((review: (typeof product.reviews)[number]) => (
              <TestimonialCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 font-marcellus text-2xl text-maroonDeep">You May Also Like</h2>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((item: (typeof related)[number]) => (
              <ProductCard
                key={item.id}
                product={{
                  slug: item.slug,
                  name: item.name,
                  basePrice: item.basePrice.toString(),
                  mrp: item.mrp?.toString() ?? null,
                  badge: item.badge,
                  images: item.images,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
