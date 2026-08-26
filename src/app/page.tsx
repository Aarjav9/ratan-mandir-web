import Link from "next/link";
import prisma from "@/lib/prisma";
import TrustStrip from "@/components/TrustStrip";
import MukhiCard from "@/components/MukhiCard";
import GemstoneCard from "@/components/GemstoneCard";
import ProductCard from "@/components/ProductCard";
import TestimonialCard from "@/components/TestimonialCard";
import FaqAccordion from "@/components/FaqAccordion";
import MandalaMotif from "@/components/MandalaMotif";

export const revalidate = 0;

async function getHomepageData() {
  const [mukhiInfos, gemstoneInfos, bestsellers, testimonials] = await Promise.all([
    prisma.mukhiInfo.findMany({
      where: { mukhiNumber: { in: [1, 5, 7, 9] } },
      orderBy: { mukhiNumber: "asc" },
    }),
    prisma.gemstoneInfo.findMany({ orderBy: { name: "asc" } }),
    prisma.product.findMany({
      where: { isBestseller: true },
      include: { images: { orderBy: { position: "asc" }, take: 1 } },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
    prisma.review.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
  ]);

  return { mukhiInfos, gemstoneInfos, bestsellers, testimonials };
}

export default async function HomePage() {
  const { mukhiInfos, gemstoneInfos, bestsellers, testimonials } = await getHomepageData();

  return (
    <>
      {/* Hero */}
      <section className="diya-glow relative overflow-hidden border-b border-line">
        <MandalaMotif className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] opacity-60" />
        <div className="container-page relative flex flex-col items-start gap-6 py-24">
          <span className="font-yatra text-lg text-saffronDeep">रतन मंदिर</span>
          <h1 className="max-w-2xl font-marcellus text-4xl leading-tight text-maroonDeep md:text-5xl">
            Authentic Rudraksha &amp; Gemstones, Sourced with Reverence
          </h1>
          <p className="max-w-xl font-mulish text-base leading-relaxed text-inkSoft">
            Every bead and gemstone at Ratan Mandir is lab-certified for authenticity and
            sourced directly from Nepal, Indonesia and Ceylon — carrying centuries of
            tradition into everyday life.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/shop/5"
              className="rounded-card bg-maroon px-7 py-3 font-mulish text-sm font-bold text-ivory shadow-soft transition-colors hover:bg-maroonDeep"
            >
              Shop Rudraksha
            </Link>
            <Link
              href="#navratna"
              className="rounded-card border border-gold px-7 py-3 font-mulish text-sm font-bold text-maroon transition-colors hover:bg-card"
            >
              Explore Navratna Gemstones
            </Link>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* Shop by Mukhi */}
      <section className="container-page py-20">
        <div className="mb-10 text-center">
          <h2 className="font-marcellus text-3xl text-maroonDeep">Shop by Mukhi</h2>
          <p className="mx-auto mt-3 max-w-xl font-mulish text-sm text-inkSoft">
            Each Rudraksha mukhi carries its own deity and traditional significance. Begin
            your search with the mukhi that resonates with your intention.
          </p>
        </div>
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
      </section>

      {/* Navratna */}
      <section id="navratna" className="bg-ivoryDeep py-20">
        <div className="container-page">
          <div className="mb-10 text-center">
            <h2 className="font-marcellus text-3xl text-maroonDeep">The Navratna</h2>
            <p className="mx-auto mt-3 max-w-xl font-mulish text-sm text-inkSoft">
              The nine sacred gemstones of Vedic astrology, each aligned with a ruling
              planet and a distinct life significance.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
            {gemstoneInfos.map((gem: (typeof gemstoneInfos)[number]) => (
              <GemstoneCard key={gem.id} gemstone={gem} />
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="container-page py-20">
        <div className="mb-10 text-center">
          <h2 className="font-marcellus text-3xl text-maroonDeep">Bestsellers</h2>
          <p className="mx-auto mt-3 max-w-xl font-mulish text-sm text-inkSoft">
            The pieces our customers return for, again and again.
          </p>
        </div>
        {bestsellers.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {bestsellers.map((product: (typeof bestsellers)[number]) => (
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
          <p className="text-center font-mulish text-sm text-inkSoft">
            Bestsellers will appear here once the catalog is seeded.
          </p>
        )}
      </section>

      {/* Why Choose Us */}
      <section className="bg-maroonDeep py-20 text-ivory">
        <div className="container-page">
          <div className="mb-10 text-center">
            <h2 className="font-marcellus text-3xl text-gold">Why Choose Ratan Mandir</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-card border border-ivory/15 p-6">
              <h3 className="font-marcellus text-lg text-ivory">Verified at the Source</h3>
              <p className="mt-2 font-mulish text-sm leading-relaxed text-ivory/70">
                We work directly with growers and cutters in Nepal, Indonesia and Ceylon,
                skipping unreliable middle chains.
              </p>
            </div>
            <div className="rounded-card border border-ivory/15 p-6">
              <h3 className="font-marcellus text-lg text-ivory">Certified, Not Just Claimed</h3>
              <p className="mt-2 font-mulish text-sm leading-relaxed text-ivory/70">
                Every product ships with an independent lab authenticity certificate, so
                you can verify what you receive.
              </p>
            </div>
            <div className="rounded-card border border-ivory/15 p-6">
              <h3 className="font-marcellus text-lg text-ivory">Guided by Tradition</h3>
              <p className="mt-2 font-mulish text-sm leading-relaxed text-ivory/70">
                From energisation rituals to astrological guidance, we honour the practices
                these pieces were made for.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate / Authenticity band */}
      <section className="container-page py-20">
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
      </section>

      {/* Brand story */}
      <section id="brand-story" className="bg-ivoryDeep py-20">
        <div className="container-page grid items-center gap-10 md:grid-cols-2">
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
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="container-page py-20">
          <div className="mb-10 text-center">
            <h2 className="font-marcellus text-3xl text-maroonDeep">What Customers Say</h2>
            {/* Sample/seed testimonials shown below — replace with real, verified
                customer reviews as they come in. See prisma/seed.ts. */}
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((review: (typeof testimonials)[number]) => (
              <TestimonialCard key={review.id} review={review} />
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="bg-ivoryDeep py-20">
        <div className="container-page">
          <div className="mb-10 text-center">
            <h2 className="font-marcellus text-3xl text-maroonDeep">
              Frequently Asked Questions
            </h2>
          </div>
          <FaqAccordion />
        </div>
      </section>

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
