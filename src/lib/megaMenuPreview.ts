import prisma from "@/lib/prisma";
import type { CategoryType, Prisma } from "@prisma/client";
import { RUDRAKSHA_VARIETIES } from "@/lib/rudrakshaVarieties";
import { CATEGORY_VARIETIES } from "@/lib/categoryVarieties";

export interface MenuPreviewProduct {
  slug: string;
  name: string;
  image: string;
}

// Keyed two ways: by CategoryTaxonomyItem.slug (the category-level default,
// shown before hovering any specific subitem) AND by each subItem's href
// (the variety-specific preview, shown while that subitem is hovered) —
// see MegaMenu.tsx / MobileNav.tsx.
export type MegaMenuPreview = Record<string, MenuPreviewProduct[]>;

// Maps each live CategoryType to its CategoryTaxonomyItem.slug — the enum
// member spelling doesn't match the taxonomy's kebab-case slugs.
const CATEGORY_TYPE_TO_TAXONOMY_SLUG: Record<CategoryType, string> = {
  RUDRAKSHA: "rudraksha",
  GEMSTONE: "gemstones", // no mega-menu entry today (Gemstones is a plain nav link), kept for completeness
  ENERGY_STONE: "energy-stones",
  SPIRITUAL_JEWELLERY: "spiritual-jewellery",
  KARUNGALI: "karungali",
  VASTU: "vastu",
  ZODIAC: "zodiac",
  GIFT_HAMPER: "gifting",
};

const PREVIEW_COUNT_PER_CATEGORY = 3;
const PREVIEW_COUNT_PER_VARIETY = 3;

async function buildVarietyPreview(where: Prisma.ProductWhereInput): Promise<MenuPreviewProduct[]> {
  const products = await prisma.product.findMany({
    where,
    include: { images: { orderBy: { position: "asc" }, take: 1 } },
    orderBy: [{ isBestseller: "desc" }, { createdAt: "desc" }],
    take: PREVIEW_COUNT_PER_VARIETY,
  });
  return products.map((p) => ({ slug: p.slug, name: p.name, image: p.images[0]?.url ?? "" }));
}

/**
 * Real products for the mega menu / mobile nav panel. Two layers:
 *  1. Category-level defaults (top few products per category, shown when a
 *     category is opened but no specific subitem is being hovered yet).
 *  2. Subitem-level previews, one per variety, reusing the exact same
 *     `where` filters as the real listing pages (rudrakshaVarieties.ts /
 *     categoryVarieties.ts) so hovering "Rose Quartz Wearables" shows the
 *     same products that page would show, keyed by that subitem's href.
 */
export async function getMegaMenuPreview(): Promise<MegaMenuPreview> {
  const preview: MegaMenuPreview = {};

  // Layer 1: category-level defaults.
  const products = await prisma.product.findMany({
    include: { images: { orderBy: { position: "asc" }, take: 1 } },
    orderBy: [{ isBestseller: "desc" }, { createdAt: "desc" }],
  });
  for (const product of products) {
    const slug = CATEGORY_TYPE_TO_TAXONOMY_SLUG[product.categoryType];
    if (!slug) continue;
    const bucket = (preview[slug] ??= []);
    if (bucket.length >= PREVIEW_COUNT_PER_CATEGORY) continue;
    bucket.push({ slug: product.slug, name: product.name, image: product.images[0]?.url ?? "" });
  }

  // Layer 2: per-subitem (variety) previews, keyed by href.
  const varietyEntries: { href: string; where: Prisma.ProductWhereInput }[] = [
    ...Object.values(RUDRAKSHA_VARIETIES).map((v) => ({
      href: `/shop/rudraksha/${v.slug}`,
      where: v.where,
    })),
    ...Object.entries(CATEGORY_VARIETIES).flatMap(([categorySlug, group]) =>
      Object.values(group.varieties).map((v) => ({
        href: `/shop/${categorySlug}/${v.slug}`,
        where: v.where,
      }))
    ),
  ];

  const varietyResults = await Promise.all(
    varietyEntries.map(async (entry) => ({ href: entry.href, items: await buildVarietyPreview(entry.where) }))
  );
  for (const { href, items } of varietyResults) {
    preview[href] = items;
  }

  return preview;
}
