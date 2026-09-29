import prisma from "@/lib/prisma";
import TrustStrip from "@/components/TrustStrip";
import TrustBand from "@/components/TrustBand";
import ProductCard, { type ProductCardData } from "@/components/ProductCard";
import ProductCarousel from "@/components/ProductCarousel";
import PurposeCard from "@/components/PurposeCard";
import TestimonialCard from "@/components/TestimonialCard";
import FaqAccordion from "@/components/FaqAccordion";
import { DEFAULT_FAQS } from "@/lib/faqData";
import MandalaMotif from "@/components/MandalaMotif";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryIconStrip from "@/components/CategoryIconStrip";
import Section from "@/components/Section";
import { PURPOSE_TAXONOMY } from "@/lib/purposeTaxonomy";
import { getRatingsMap } from "@/lib/ratings";

export const revalidate = 0;

function toProductCardData(
  product: {
    id: string;
    slug: string;
    name: string;
    basePrice: unknown;
    mrp: unknown;
    badge: string | null;
    images: { url: string; altText: string }[];
    variants: { id: string; label: string; priceOverride: unknown }[];
    _count: { variants: number };
  },
  ratings: Record<string, { rating: number; count: number }>
): ProductCardData {
  return {
    slug: product.slug,
    name: product.name,
    basePrice: String(product.basePrice),
    mrp: product.mrp ? String(product.mrp) : null,
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
  };
}

async function getHomepageData() {
  const [bestsellers, newArrivals, testimonials] = await Promise.all([
    prisma.product.findMany({
      where: { isBestseller: true },
      include: {
        images: { orderBy: { position: "asc" }, take: 1 },
        variants: { take: 1 },
        _count: { select: { variants: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
    prisma.product.findMany({
      include: {
        images: { orderBy: { position: "asc" }, take: 1 },
        variants: { take: 1 },
        _count: { select: { variants: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
    prisma.review.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
  ]);

  const allProductIds = Array.from(
    new Set([...bestsellers.map((p) => p.id), ...newArrivals.map((p) => p.id)])
  );
  const ratings = await getRatingsMap(allProductIds);

  return { bestsellers, newArrivals, testimonials, ratings };
}

export default async function HomePage() {
  const { bestsellers, newArrivals, testimonials, ratings } = await getHomepageData();

  return (
    <>
      <HeroCarousel />
      <CategoryIconStrip />
      <TrustStrip />

      {/* Most Loved — moved up to right after the banner, replacing the
          "Shop By Category" grid (redundant with the category icon strip
          above the banner already covering category navigation). */}
      <Section>
        {bestsellers.length > 0 ? (
          <ProductCarousel title="Most Loved" subtitle="The pieces our customers return for, again and again.">
            {bestsellers.map((product) => (
              <div key={product.id} className="w-[230px] shrink-0 snap-start sm:w-[260px]">
                <ProductCard product={toProductCardData(product, ratings)} />
              </div>
            ))}
          </ProductCarousel>
        ) : (
          <p className="text-center font-mulish text-sm text-inkSoft">
            Bestsellers will appear here once the catalog is seeded.
          </p>
        )}
      </Section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <Section tone="ivoryDeep">
          <ProductCarousel title="New to the Collection" subtitle="Freshly added, still finding their first homes.">
            {newArrivals.map((product) => (
              <div key={product.id} className="w-[230px] shrink-0 snap-start sm:w-[260px]">
                <ProductCard product={toProductCardData(product, ratings)} />
              </div>
            ))}
          </ProductCarousel>
        </Section>
      )}

      {/* Shop by Purpose */}
      <Section
        heading="Choose What You Seek"
        subtitle="Shop by intention, not just category — find the piece that matches what you're looking for."
      >
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {PURPOSE_TAXONOMY.map((purpose) => (
            <PurposeCard key={purpose.slug} purpose={purpose} />
          ))}
        </div>
      </Section>

      {/* Why Choose Us / Trust & Authenticity */}
      <Section tone="maroonDeep" heading="Authenticity You Can Feel">
        <TrustBand />
      </Section>

      {/* Certificate / Authenticity band */}
      <Section id="authenticity">
        <div className="grid items-center gap-10 rounded-card border border-line bg-card p-10 shadow-soft md:grid-cols-2">
          <div>
            <h2 className="font-marcellus text-3xl text-maroonDeep">
              Every Piece, Certified for Authenticity
            </h2>
            <p className="mt-4 font-mulish text-sm leading-relaxed text-inkSoft">
              Ratan Mandir products are independently lab-tested and certified — for
              Rudraksha, this verifies mukhi count and natural origin; for gemstones, this
              verifies that the stone is natural and untreated. Certificate numbers and
              lab partner details will be listed here and on individual product pages
              ahead of launch.
            </p>
          </div>
          <div className="flex justify-center">
            <MandalaMotif className="h-56 w-56" strokeColor="#7A1620" />
          </div>
        </div>
      </Section>

      {/* Brand story */}
      <Section id="brand-story" tone="ivoryDeep">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="order-2 flex justify-center md:order-1">
            <MandalaMotif className="h-56 w-56" strokeColor="#C9A24B" />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="font-marcellus text-3xl text-maroonDeep">Our Story</h2>
            <p className="mt-4 font-mulish text-sm leading-relaxed text-inkSoft">
              Ratan Mandir began with a simple belief: that Rudraksha and gemstones carry
              real meaning only when their authenticity is beyond question. What started as
              a small family effort to source genuine beads for our own community has grown
              into a dedicated house for authentic, ethically sourced Rudraksha and
              gemstones — built on transparency, certification, and respect for the
              traditions these pieces come from.
            </p>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <Section heading="What Customers Say">
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((review: (typeof testimonials)[number]) => (
              <TestimonialCard key={review.id} review={review} />
            ))}
          </div>
        </Section>
      )}

      {/* FAQ */}
      <Section id="faq" tone="ivoryDeep" heading="Frequently Asked Questions">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: DEFAULT_FAQS.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            }),
          }}
        />
        <FaqAccordion />
      </Section>
    </>
  );
}
