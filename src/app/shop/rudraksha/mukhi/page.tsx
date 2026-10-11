import Link from "next/link";
import type { Metadata } from "next";
import prisma from "@/lib/prisma";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const MAX_MUKHI = 18;

export const metadata: Metadata = {
  title: "Shop by Mukhi (1–18) — Ratan Mandir",
  description: "Browse authentic, lab-certified Rudraksha by mukhi, from 1 to 18.",
  alternates: { canonical: `${SITE_URL}/shop/rudraksha/mukhi` },
};

export default async function MukhiPickerPage() {
  const [mukhiInfos, stockedMukhiRows] = await Promise.all([
    prisma.mukhiInfo.findMany({ orderBy: { mukhiNumber: "asc" } }),
    prisma.product.findMany({
      where: { categoryType: "RUDRAKSHA", mukhiNumber: { not: null } },
      distinct: ["mukhiNumber"],
      select: { mukhiNumber: true },
    }),
  ]);

  const infoByMukhi = new Map(mukhiInfos.map((m) => [m.mukhiNumber, m]));
  const stocked = new Set(stockedMukhiRows.map((r) => r.mukhiNumber).filter((n): n is number => n !== null));

  return (
    <div className="container-page py-12">
      <nav className="mb-6 font-mulish text-xs text-inkSoft" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-maroon">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/shop/rudraksha" className="hover:text-maroon">
          Rudraksha
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">Shop by Mukhi</span>
      </nav>

      <div className="mb-10 max-w-2xl">
        <h1 className="font-marcellus text-3xl text-maroonDeep">1–18 Mukhi Rudraksha (Nepali)</h1>
        <p className="mt-2 font-mulish text-sm leading-relaxed text-inkSoft">
          Each mukhi carries its own deity and significance in tradition. Pick a number below to
          browse everything we have in that mukhi — malas, bracelets and single beads alike.
        </p>
      </div>

      {/* A bead-like circular grid rather than a plain filter list — each
          mukhi gets its own "bead", strung together the way a real mala
          reads, with real deity/significance copy from MukhiInfo where we
          have it and a quiet "Coming Soon" tag where we don't have stock
          yet (15–18 today). */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {Array.from({ length: MAX_MUKHI }, (_, i) => i + 1).map((mukhiNumber) => {
          const info = infoByMukhi.get(mukhiNumber);
          const hasStock = stocked.has(mukhiNumber);

          return (
            <Link
              key={mukhiNumber}
              href={`/shop/${mukhiNumber}`}
              className="group flex flex-col items-center gap-3 rounded-card border border-line bg-card p-5 text-center shadow-soft transition-colors hover:border-gold"
            >
              <span
                className={`flex h-16 w-16 items-center justify-center rounded-full border-2 font-marcellus text-2xl transition-colors ${
                  hasStock
                    ? "border-gold bg-ivoryDeep text-maroon group-hover:bg-maroon group-hover:text-ivory"
                    : "border-line bg-ivory text-inkSoft"
                }`}
              >
                {mukhiNumber}
              </span>
              <span className="font-mulish text-sm font-bold text-ink">{mukhiNumber} Mukhi</span>
              {info ? (
                <span className="font-mulish text-xs text-inkSoft">{info.deity}</span>
              ) : (
                <span className="rounded-full bg-saffron/20 px-2.5 py-0.5 font-mulish text-[10px] font-bold uppercase tracking-wide text-saffronDeep">
                  Coming Soon
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
