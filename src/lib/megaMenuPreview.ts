import prisma from "@/lib/prisma";
import type { CategoryType } from "@prisma/client";

export interface MenuPreviewProduct {
  slug: string;
  name: string;
  image: string;
}

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

/**
 * A handful of real products per live category, shown as thumbnails inside
 * the mega menu / mobile nav panel alongside the subcategory list — keyed
 * by CategoryTaxonomyItem.slug. Categories with no real inventory are
 * simply absent from the map.
 */
export async function getMegaMenuPreview(): Promise<MegaMenuPreview> {
  const products = await prisma.product.findMany({
    include: { images: { orderBy: { position: "asc" }, take: 1 } },
    orderBy: [{ isBestseller: "desc" }, { createdAt: "desc" }],
  });

  const preview: MegaMenuPreview = {};

  for (const product of products) {
    const slug = CATEGORY_TYPE_TO_TAXONOMY_SLUG[product.categoryType];
    if (!slug) continue;

    const bucket = (preview[slug] ??= []);
    if (bucket.length >= PREVIEW_COUNT_PER_CATEGORY) continue;

    bucket.push({ slug: product.slug, name: product.name, image: product.images[0]?.url ?? "" });
  }

  return preview;
}
