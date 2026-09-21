import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ProductGallery from "@/components/ProductGallery";
import ProductPurchasePanel from "@/components/ProductPurchasePanel";
import ProductTabs from "@/components/ProductTabs";
import ProductCard from "@/components/ProductCard";
import TestimonialCard from "@/components/TestimonialCard";
import { getRatingsMap } from "@/lib/ratings";
import { getCategoryBySlug } from "@/lib/categoryTaxonomy";
import type { CategoryType } from "@prisma/client";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { images: { orderBy: { position: "asc" }, take: 1 } },
  });

  if (!product) {
    return { title: "Product Not Found — Ratan Mandir" };
  }

  const title = `${product.name} | Ratan Mandir`;
  const description = product.description.slice(0, 155);
  const image = product.images[0]?.url;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/products/${product.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/products/${product.slug}`,
      images: image ? [{ url: image }] : undefined,
      type: "website",
    },
  };
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

  if (!product) return { product: null, related: [], relatedRatings: {} };

  const related = await prisma.product.findMany({
    where: {
      id: { not: product.id },
      OR: [
        product.mukhiNumber ? { mukhiNumber: product.mukhiNumber } : undefined,
        { categoryType: product.categoryType },
      ].filter(Boolean) as object[],
    },
    include: {
      images: { orderBy: { position: "asc" }, take: 1 },
      variants: { take: 1 },
    },
    take: 4,
  });

  const relatedRatings = await getRatingsMap(related.map((p) => p.id));

  return { product, related, relatedRatings };
}

interface CategoryCopyEntry {
  benefits: (product: { mukhiNumber: number | null; gemstoneName: string | null }) => string;
  howToWear: string;
  howToWearLabel: string;
  certLabel: string;
}

const CATEGORY_COPY: Record<CategoryType, CategoryCopyEntry> = {
  RUDRAKSHA: {
    benefits: (p) =>
      `Traditionally, ${
        p.mukhiNumber ? `${p.mukhiNumber} Mukhi Rudraksha` : "this Rudraksha"
      } is worn to support focus, emotional balance and spiritual practice. Individual experiences vary, and this is not a substitute for medical or professional advice.`,
    howToWear:
      "Cleanse with clean water before first wear. Traditionally worn on a red or black thread, or a silver/gold chain, ideally on a Monday morning after a bath. Avoid wearing while sleeping, bathing, or during periods of impurity, per tradition.",
    howToWearLabel: "How to Wear",
    certLabel: "mukhi count and natural origin",
  },
  GEMSTONE: {
    benefits: (p) =>
      `${
        p.gemstoneName ?? "This gemstone"
      } is traditionally associated with its ruling planet in Vedic astrology. We recommend consulting a qualified astrologer before wearing any gemstone for astrological purposes.`,
    howToWear:
      "Gemstones are traditionally set in a ring or pendant of a metal recommended for the relevant planet, worn on a specific finger and day as advised by an astrologer, after a brief energising ritual.",
    howToWearLabel: "How to Wear",
    certLabel: "natural, untreated origin",
  },
  ENERGY_STONE: {
    benefits: () =>
      "Crystal wearables like this are traditionally associated with grounding, calm and everyday emotional balance. Individual experiences vary, and this is not a substitute for medical or professional advice.",
    howToWear:
      "Cleanse under running water before first wear. Worn on either wrist, or kept nearby during meditation. Avoid contact with soaps, perfumes or prolonged water exposure to preserve the stone's finish.",
    howToWearLabel: "How to Wear",
    certLabel: "natural origin",
  },
  SPIRITUAL_JEWELLERY: {
    benefits: () =>
      "A versatile everyday piece, worn as a subtle daily reminder of the symbol it carries and its traditional significance.",
    howToWear: "Suitable for daily wear. Remove before swimming, bathing or strenuous exercise to preserve the finish.",
    howToWearLabel: "How to Wear",
    certLabel: "material and craftsmanship",
  },
  KARUNGALI: {
    benefits: () =>
      "Karungali (black ebony wood) is traditionally worn for its protective, negativity-repelling properties in Tamil tradition.",
    howToWear:
      "Traditionally worn on the wrist or as a mala around the neck. Keep away from prolonged water exposure to preserve the wood's finish.",
    howToWearLabel: "How to Wear",
    certLabel: "natural origin",
  },
  VASTU: {
    benefits: () =>
      "Traditionally placed to support balance of the five elements within a home or workspace, according to Vastu Shastra principles.",
    howToWear:
      "Place according to the recommended direction for your space — consult a Vastu practitioner for guidance specific to your home or office layout.",
    howToWearLabel: "How to Place",
    certLabel: "material and craftsmanship",
  },
  ZODIAC: {
    benefits: () =>
      "Traditionally recommended for this zodiac sign in Vedic astrology, worn to support qualities associated with its ruling planet.",
    howToWear:
      "We recommend consulting a qualified astrologer to confirm the right piece, metal and timing for your birth chart before wearing.",
    howToWearLabel: "How to Wear",
    certLabel: "natural origin",
  },
  GIFT_HAMPER: {
    benefits: () =>
      "A curated set of spiritual pieces, thoughtfully packaged for gifting on this occasion.",
    howToWear: "Each item inside the hamper carries its own care instructions — see the individual pieces for details.",
    howToWearLabel: "What's Inside",
    certLabel: "materials used",
  },
};

function buildTabContent(product: {
  description: string;
  categoryType: CategoryType;
  mukhiNumber: number | null;
  gemstoneName: string | null;
  origin: string | null;
  isCertified: boolean;
}) {
  const copy = CATEGORY_COPY[product.categoryType];

  return {
    description: product.description,
    benefits: copy.benefits(product),
    howToWear: copy.howToWear,
    howToWearLabel: copy.howToWearLabel,
    certificate: product.isCertified
      ? `This product ships with a lab authenticity certificate confirming ${copy.certLabel}. Certificate numbers and lab partner details will be listed per product ahead of launch.`
      : "Certification details for this product will be added ahead of launch.",
  };
}

const CATEGORY_TYPE_TO_TAXONOMY_SLUG: Partial<Record<CategoryType, string>> = {
  ENERGY_STONE: "energy-stones",
  SPIRITUAL_JEWELLERY: "spiritual-jewellery",
  KARUNGALI: "karungali",
  VASTU: "vastu",
  ZODIAC: "zodiac",
  GIFT_HAMPER: "gifting",
};

function getCategoryCrumb(
  categoryType: CategoryType,
  mukhiNumber: number | null
): { name: string; href: string } {
  if (categoryType === "RUDRAKSHA" && mukhiNumber) {
    return { name: `${mukhiNumber} Mukhi Rudraksha`, href: `/shop/${mukhiNumber}` };
  }
  if (categoryType === "GEMSTONE") {
    return { name: "Gemstones", href: "/#navratna" };
  }
  const category = getCategoryBySlug(CATEGORY_TYPE_TO_TAXONOMY_SLUG[categoryType] ?? "");
  return category ? { name: category.label, href: category.href } : { name: "Shop", href: "/" };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { product, related, relatedRatings } = await getProductPageData(params.slug);

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

  const totalStock = variants.reduce((sum, v) => sum + v.stock, 0);
  const avgRating =
    product.reviews.length > 0
      ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
      : null;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: galleryImages.map((img) => `${SITE_URL}${img.url}`),
    sku: product.id,
    brand: { "@type": "Brand", name: "Ratan Mandir" },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/products/${product.slug}`,
      priceCurrency: "INR",
      price: Number(product.basePrice),
      availability:
        totalStock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
    ...(avgRating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: avgRating.toFixed(1),
        reviewCount: product.reviews.length,
      },
    }),
  };

  const categoryCrumb = getCategoryCrumb(product.categoryType, product.mukhiNumber);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: categoryCrumb.name, item: `${SITE_URL}${categoryCrumb.href}` },
      { "@type": "ListItem", position: 3, name: product.name, item: `${SITE_URL}/products/${product.slug}` },
    ],
  };

  return (
    <div className="container-page py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <nav className="mb-8 font-mulish text-xs text-inkSoft" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-maroon">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href={categoryCrumb.href} className="hover:text-maroon">
          {categoryCrumb.name}
        </Link>
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
                  productId: item.id,
                  rating: relatedRatings[item.id]?.rating ?? null,
                  reviewCount: relatedRatings[item.id]?.count ?? null,
                  defaultVariant: item.variants[0]
                    ? {
                        id: item.variants[0].id,
                        label: item.variants[0].label,
                        price: Number(item.variants[0].priceOverride ?? item.basePrice),
                      }
                    : null,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
