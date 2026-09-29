"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CATEGORY_TAXONOMY } from "@/lib/categoryTaxonomy";
import SearchBar from "@/components/header/SearchBar";
import type { MegaMenuPreview } from "@/lib/megaMenuPreview";

export default function MobileNav({
  open,
  onClose,
  menuPreview,
}: {
  open: boolean;
  onClose: () => void;
  menuPreview: MegaMenuPreview;
}) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <button
        type="button"
        aria-label="Close menu"
        className="absolute inset-0 bg-ink/40"
        onClick={onClose}
      />
      <div className="absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col overflow-y-auto bg-ivory shadow-soft">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <span className="font-marcellus text-lg text-maroon">Menu</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="font-mulish text-2xl leading-none text-inkSoft"
          >
            ×
          </button>
        </div>

        <div className="px-5 py-4">
          <SearchBar />
        </div>

        <div className="flex flex-col divide-y divide-line border-t border-line">
          {CATEGORY_TAXONOMY.map((category) => {
            const isOpen = openSlug === category.slug;
            return (
              <div key={category.slug}>
                <div className="flex items-center justify-between px-5 py-4">
                  <Link
                    href={category.href}
                    onClick={onClose}
                    className="font-mulish text-sm font-semibold text-ink"
                  >
                    {category.label}
                    {!category.live && (
                      <span className="ml-2 rounded-full bg-saffron/20 px-2 py-0.5 font-mulish text-[9px] font-bold uppercase tracking-wide text-saffronDeep">
                        Soon
                      </span>
                    )}
                  </Link>
                  <button
                    type="button"
                    onClick={() => setOpenSlug(isOpen ? null : category.slug)}
                    aria-expanded={isOpen}
                    aria-label={`Toggle ${category.label} subcategories`}
                    className="px-2 font-mulish text-xl text-maroon"
                  >
                    {isOpen ? "−" : "+"}
                  </button>
                </div>
                {isOpen && (
                  <div className="flex flex-col gap-3 bg-ivoryDeep px-5 pb-4">
                    {category.subItems.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={onClose}
                        className="font-mulish text-sm text-inkSoft"
                      >
                        {sub.label}
                      </Link>
                    ))}

                    {(menuPreview[category.slug]?.length ?? 0) > 0 && (
                      <div className="mt-1 grid grid-cols-3 gap-2">
                        {menuPreview[category.slug].map((product) => (
                          <Link key={product.slug} href={`/products/${product.slug}`} onClick={onClose}>
                            <div className="relative aspect-square w-full overflow-hidden rounded-card bg-card">
                              {product.image ? (
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  sizes="80px"
                                  className="object-cover"
                                />
                              ) : null}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 border-t border-line px-5 py-4">
          <Link href="/shop/gemstones" onClick={onClose} className="font-mulish text-sm text-ink">
            Gemstones
          </Link>
          <Link href="/#brand-story" onClick={onClose} className="font-mulish text-sm text-ink">
            Our Story
          </Link>
        </div>

        <div className="mt-auto flex flex-col gap-2 border-t border-line px-5 py-5">
          <Link href="/account/login" onClick={onClose} className="font-mulish text-sm font-semibold text-maroon">
            Account
          </Link>
          <Link href="/wishlist" onClick={onClose} className="font-mulish text-sm font-semibold text-maroon">
            Wishlist
          </Link>
        </div>
      </div>
    </div>
  );
}
