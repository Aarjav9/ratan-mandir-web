"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CATEGORY_TAXONOMY } from "@/lib/categoryTaxonomy";
import type { MegaMenuPreview } from "@/lib/megaMenuPreview";

// Plain links with no dropdown — these are original site sections
// (Navratna gemstones, brand story, astro consultation), not part of the
// taxonomy-driven mega menu.
const SIMPLE_LINKS = [
  { href: "/#navratna", label: "Gemstones" },
  { href: "/#brand-story", label: "Our Story" },
  { href: "/#astro-consultation", label: "Astro Consultation" },
];

export default function MegaMenu({ menuPreview }: { menuPreview: MegaMenuPreview }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const active = CATEGORY_TAXONOMY.find((category) => category.slug === activeSlug) ?? null;
  const previewProducts = active ? menuPreview[active.slug] ?? [] : [];

  return (
    <nav className="relative hidden items-center gap-7 md:flex" onMouseLeave={() => setActiveSlug(null)}>
      {CATEGORY_TAXONOMY.map((category) => (
        <div
          key={category.slug}
          onMouseEnter={() => setActiveSlug(category.slug)}
          onFocus={() => setActiveSlug(category.slug)}
        >
          <Link
            href={category.href}
            className="font-mulish text-sm font-semibold text-ink transition-colors hover:text-maroon"
          >
            {category.label}
          </Link>
        </div>
      ))}

      {SIMPLE_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onMouseEnter={() => setActiveSlug(null)}
          className="font-mulish text-sm font-semibold text-ink transition-colors hover:text-maroon"
        >
          {link.label}
        </Link>
      ))}

      {active && (
        <div
          className="absolute left-0 top-full z-40 w-[880px] rounded-card border border-line bg-card p-7 shadow-soft"
          onMouseEnter={() => setActiveSlug(active.slug)}
        >
          <div className="grid grid-cols-[220px_1fr] gap-8">
            {/* Left: subcategory list, japam-style */}
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-marcellus text-lg text-maroonDeep">{active.label}</h3>
                {!active.live && (
                  <span className="rounded-full bg-saffron/20 px-2.5 py-0.5 font-mulish text-[10px] font-bold uppercase tracking-wide text-saffronDeep">
                    Soon
                  </span>
                )}
              </div>
              <p className="mt-1 font-mulish text-xs text-inkSoft">{active.shortCopy}</p>
              <ul className="mt-4 flex flex-col gap-2.5 border-l border-line pl-4">
                {active.subItems.map((sub) => (
                  <li key={sub.href}>
                    <Link
                      href={sub.href}
                      className="font-mulish text-sm text-ink transition-colors hover:text-maroon"
                    >
                      {sub.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={active.href}
                className="mt-5 inline-block font-mulish text-sm font-bold text-maroon underline underline-offset-4 hover:text-maroonDeep"
              >
                Shop All {active.label}
              </Link>
            </div>

            {/* Right: real product thumbnails, when available */}
            <div>
              {previewProducts.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                  {previewProducts.map((product) => (
                    <Link
                      key={product.slug}
                      href={`/products/${product.slug}`}
                      className="group flex flex-col gap-2"
                    >
                      <div className="relative aspect-square w-full overflow-hidden rounded-card bg-ivoryDeep">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="220px"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center font-mulish text-xs text-inkSoft">
                            Image coming soon
                          </div>
                        )}
                      </div>
                      <span className="font-mulish text-sm leading-tight text-ink group-hover:text-maroon">
                        {product.name}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex h-full min-h-[140px] items-center justify-center rounded-card bg-ivoryDeep p-6 text-center">
                  <p className="font-mulish text-xs text-inkSoft">
                    We&apos;re sourcing and certifying {active.label.toLowerCase()} — check back soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
