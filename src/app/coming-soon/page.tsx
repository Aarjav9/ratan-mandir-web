import Link from "next/link";
import type { Metadata } from "next";
import MandalaMotif from "@/components/MandalaMotif";

export const metadata: Metadata = {
  title: "Coming Soon — Ratan Mandir",
  robots: { index: false, follow: false },
};

export default function ComingSoonPage({
  searchParams,
}: {
  searchParams: { label?: string };
}) {
  const label = searchParams.label?.trim() || "This Collection";

  return (
    <div className="diya-glow relative overflow-hidden">
      <MandalaMotif className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] opacity-50" />
      <div className="container-page relative flex flex-col items-center gap-5 py-28 text-center">
        <span className="font-yatra text-lg text-saffronDeep">रतन मंदिर</span>
        <h1 className="max-w-xl font-marcellus text-3xl text-maroonDeep md:text-4xl">
          {label} Is Coming Soon
        </h1>
        <p className="max-w-md font-mulish text-sm leading-relaxed text-inkSoft">
          We&apos;re carefully sourcing and certifying this collection. In the meantime,
          explore our authentic Rudraksha and Navratna gemstones — available and lab-certified
          today.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/shop/5"
            className="rounded-card bg-maroon px-7 py-3 font-mulish text-sm font-bold text-ivory shadow-soft transition-colors hover:bg-maroonDeep"
          >
            Shop Rudraksha
          </Link>
          <Link
            href="/#navratna"
            className="rounded-card border border-gold px-7 py-3 font-mulish text-sm font-bold text-maroon transition-colors hover:bg-card"
          >
            Explore Navratna Gemstones
          </Link>
        </div>
      </div>
    </div>
  );
}
