import Link from "next/link";
import prisma from "@/lib/prisma";
import TrustStrip from "@/components/TrustStrip";
import TrustBand from "@/components/TrustBand";
import MukhiCard from "@/components/MukhiCard";
import ProductCard, { type ProductCardData } from "@/components/ProductCard";
import ProductCarousel from "@/components/ProductCarousel";
import CategoryCard from "@/components/CategoryCard";
import PurposeCard from "@/components/PurposeCard";
import GemstoneCard from "@/components/GemstoneCard";
import TestimonialCard from "@/components/TestimonialCard";
import FaqAccordion from "@/components/FaqAccordion";
import { DEFAULT_FAQS } from "@/lib/faqData";
import MandalaMotif from "@/components/MandalaMotif";
import Section from "@/components/Section";
import { CATEGORY_TAXONOMY } from "@/lib/categoryTaxonomy";
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
  const [mukhiInfos, gemstoneInfos, bestsellers, newArrivals, testimonials] = await Promise.all([
    prisma.mukhiInfo.findMany({
      where: { mukhiNumber: { in: [1, 5, 7, 9] } },
      orderBy: { mukhiNumber: "asc" },
    }),
    prisma.gemstoneInfo.findMany({ orderBy: { name: "asc" } }),
    prisma.product.findMany({
      where: { isBestseller: true },
      include: {
        images: { orderBy: { position: "asc" }, take: 1 },
        variants: { take: 1 },
      },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
    prisma.product.findMany({
      include: {
        images: { orderBy: { position: "asc" }, take: 1 },
        variants: { take: 1 },
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

  return { mukhiInfos, gemstoneInfos, bestsellers, newArrivals, testimonials, ratings };
}

export default async function HomePage() {
  const { mukhiInfos, gemstoneInfos, bestsellers, newArrivals, testimonials, ratings } =
    await getHomepageData();

  return (
    <>
      {/* Hero */}
      <section className="diya-glow relative overflow-hidden border-b border-line">
        <MandalaMotif className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] opacity-50" />
        <div className="container-page relative grid gap-10 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-28">
          <div className="flex flex-col items-start gap-6">
            <span className="animate-fade-up font-yatra text-lg text-saffronDeep">रतन मंदिर</span>
            <h1
              className="max-w-2xl animate-fade-up font-marcellus text-4xl leading-tight text-maroonDeep md:text-5xl"
              style={{ animationDelay: "80ms" }}
            >
              Ancient Wisdom. Modern Energy.
            </h1>
            <p
              className="max-w-xl animate-fade-up font-mulish text-base leading-relaxed text-inkSoft"
              style={{ animationDelay: "160ms" }}
            >
              Discover thoughtfully sourced, lab-certified Rudraksha and gemstones designed to
              become part of your everyday journey — sourced directly from Nepal, Indonesia and
              Ceylon.
            </p>
            <div className="flex animate-fade-up flex-wrap gap-4" style={{ animationDelay: "240ms" }}>
              <Link
                href="/shop/5"
                className="rounded-card bg-maroon px-7 py-3 font-mulish text-sm font-bold text-ivory shadow-soft transition-colors hover:bg-maroonDeep"
              >
                Explore Collection
              </Link>
              <Link
                href="#navratna"
                className="rounded-card border border-gold px-7 py-3 font-mulish text-sm font-bold text-maroon transition-colors hover:bg-card"
              >
                Find Your Energy
              </Link>
            </div>
          </div>
          <div
            className="relative hidden aspect-[4/5] animate-fade-up items-center justify-center rounded-card border border-gold/30 bg-card/60 shadow-soft md:flex"
            style={{ animationDelay: "200ms" }}
          >
            <MandalaMotif className="h-64 w-64 opacity-80" strokeColor="#7A1620" />
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* Category Discovery */}
      <Section
        heading="Shop By Category"
        subtitle="From Rudraksha to Vastu — explore the full house of Ratan Mandir, built around what these pieces are for."
      >
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORY_TAXONOMY.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </Section>

      {/* Shop by Mukhi */}
      <Section
        tone="ivoryDeep"
        heading="Shop by Mukhi"
        subtitle="Each Rudraksha mukhi carries its own deity and traditional significance. Begin your search with the mukhi that resonates with your intention."
      >
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {mukhiInfos.map((mukhi: (typeof mukhiInfos)[number]) => (
            <MukhiCard key={mukhi.id} mukhi={mukhi} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/shop/5"
            className="font-mulish text-sm font-bold text-maroon underline underline-offset-4 hover:text-maroonDeep"
          >
            View all mukhis
          </Link>
        </div>
      </Section>

      {/* The Navratna — original section, unrelated to japam's "Energy Stones"
          framing; these are the 9 Vedic astrological gemstones, not western
          healing crystals. */}
      <Section
        id="navratna"
        tone="ivoryDeep"
        heading="The Navratna"
        subtitle="The nine sacred gemstones of Vedic astrology, each aligned with a ruling planet and a distinct life significance."
      >
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
          {gemstoneInfos.map((gem: (typeof gemstoneInfos)[number]) => (
            <GemstoneCard key={gem.id} gemstone={gem} />
          ))}
        </div>
      </Section>

      {/* Most Loved */}
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
      <Section>
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

      {/* Astro Consultation CTA */}
      <section id="astro-consultation" className="diya-glow relative overflow-hidden py-20">
        <MandalaMotif className="pointer-events-none absolute -left-20 -bottom-20 h-96 w-96 opacity-50" />
        <div className="container-page relative flex flex-col items-center gap-5 text-center">
          <h2 className="font-marcellus text-3xl text-maroonDeep">
            Not Sure Which Piece Is Right for You?
          </h2>
          <p className="max-w-xl font-mulish text-sm leading-relaxed text-inkSoft">
            Book a personal astrological consultation and receive guidance on the mukhi or
            gemstone best suited to your birth chart and intentions.
          </p>
          <Link
            href="#"
            className="rounded-card bg-saffron px-7 py-3 font-mulish text-sm font-bold text-ivory shadow-soft transition-colors hover:bg-saffronDeep"
          >
            Book a Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
