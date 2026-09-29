"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CATEGORY_TAXONOMY } from "@/lib/categoryTaxonomy";
import type { MegaMenuPreview } from "@/lib/megaMenuPreview";

// Plain links with no dropdown — these are original site sections
// (Navratna gemstones, brand story), not part of the taxonomy-driven
// mega menu.
const SIMPLE_LINKS = [
  { href: "/shop/gemstones", label: "Gemstones" },
  { href: "/#brand-story", label: "Our Story" },
];

export default function MegaMenu({ menuPreview }: { menuPreview: MegaMenuPreview }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  // Which subcategory link is currently hovered, if any — the thumbnails
  // on the right track this, falling back to the category-level default
  // when nothing specific is hovered yet.
  const [activeSubHref, setActiveSubHref] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const active = CATEGORY_TAXONOMY.find((category) => category.slug === activeSlug) ?? null;
  const categoryDefaultProducts = active ? menuPreview[active.slug] ?? [] : [];
  const subVarietyProducts = activeSubHref ? menuPreview[activeSubHref] : undefined;
  const previewProducts =
    subVarietyProducts && subVarietyProducts.length > 0 ? subVarietyProducts : categoryDefaultProducts;

  const openCategory = (slug: string) => {
    setActiveSlug(slug);
    setActiveSubHref(null);
  };

  const closeMenu = () => {
    setActiveSlug(null);
    setActiveSubHref(null);
  };

  // Header/MegaMenu live in the root layout and never unmount between
  // page navigations. Clicking a Link inside the panel (a product
  // thumbnail, a subcategory, "Shop All") navigates client-side, but that
  // alone never resets `activeSlug` — the panel then stays visibly open,
  // overlaying whatever page you land on, until the mouse happens to
  // physically leave the nav's bounding box. Two fixes: close explicitly
  // on any click inside the panel (onClickCapture below), and close on
  // any click outside the whole nav as a general-purpose safety net.
  useEffect(() => {
    if (!activeSlug) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeSlug]);

  return (
    <nav
      ref={navRef}
      className="relative hidden items-center gap-7 md:flex"
      onMouseLeave={closeMenu}
    >
      {CATEGORY_TAXONOMY.map((category) => (
        <div
          key={category.slug}
          onMouseEnter={() => openCategory(category.slug)}
          onFocus={() => openCategory(category.slug)}
        >
          <Link
            href={category.href}
            onClick={closeMenu}
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
          onMouseEnter={closeMenu}
          onClick={closeMenu}
          className="font-mulish text-sm font-semibold text-ink transition-colors hover:text-maroon"
        >
          {link.label}
        </Link>
      ))}

      {active && (
        <div
          className="absolute left-0 top-full z-40 w-[880px] rounded-card border border-line bg-card p-7 shadow-soft"
          onMouseEnter={() => setActiveSlug(active.slug)}
          onClickCapture={closeMenu}
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
                      onMouseEnter={() => setActiveSubHref(sub.href)}
                      onFocus={() => setActiveSubHref(sub.href)}
                      className={`font-mulish text-sm transition-colors hover:text-maroon ${
                        activeSubHref === sub.href ? "font-bold text-maroon" : "text-ink"
                      }`}
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

            {/* Right: real product thumbnails, when available — swaps to
                the hovered subcategory's own products, so "Rose Quartz"
                shows Rose Quartz pieces and "Tiger Eye" shows Tiger Eye
                pieces, rather than one fixed set for the whole category. */}
            <div>
              <p className="mb-3 font-mulish text-xs font-semibold uppercase tracking-wide text-inkSoft">
                {subVarietyProducts && subVarietyProducts.length > 0
                  ? active.subItems.find((s) => s.href === activeSubHref)?.label
                  : `Popular in ${active.label}`}
              </p>
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
