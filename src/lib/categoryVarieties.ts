import type { Prisma, CategoryType } from "@prisma/client";

export interface CategoryVariety {
  slug: string;
  label: string;
  description: string;
  where: Prisma.ProductWhereInput;
}

export interface CategoryVarietyGroup {
  categoryType: CategoryType;
  varieties: Record<string, CategoryVariety>;
}

// Same "name contains keyword" filtering approach as src/lib/rudrakshaVarieties.ts
// — a known, accepted simplification rather than a dedicated schema column.
export const CATEGORY_VARIETIES: Record<string, CategoryVarietyGroup> = {
  "energy-stones": {
    categoryType: "ENERGY_STONE",
    varieties: {
      "pyrite-wearables": {
        slug: "pyrite-wearables",
        label: "Pyrite Wearables",
        description: "Pyrite bead bracelets and wearables, worn for grounding, confidence and abundance.",
        where: { categoryType: "ENERGY_STONE", name: { contains: "Pyrite", mode: "insensitive" } },
      },
      "rose-quartz-wearables": {
        slug: "rose-quartz-wearables",
        label: "Rose Quartz Wearables",
        description: "Rose Quartz bead bracelets and wearables, the stone of unconditional love and calm.",
        where: { categoryType: "ENERGY_STONE", name: { contains: "Rose Quartz", mode: "insensitive" } },
      },
      "tiger-eye-wearables": {
        slug: "tiger-eye-wearables",
        label: "Tiger Eye Wearables",
        description: "Tiger Eye bead bracelets and wearables, worn for focus and protection.",
        where: { categoryType: "ENERGY_STONE", name: { contains: "Tiger Eye", mode: "insensitive" } },
      },
      "amethyst-wearables": {
        slug: "amethyst-wearables",
        label: "Amethyst Wearables",
        description: "Amethyst bead bracelets and wearables, associated with calm and spiritual clarity.",
        where: { categoryType: "ENERGY_STONE", name: { contains: "Amethyst", mode: "insensitive" } },
      },
      "hematite-wearables": {
        slug: "hematite-wearables",
        label: "Hematite Wearables",
        description: "Hematite bead bracelets and wearables, worn for grounding and stability.",
        where: { categoryType: "ENERGY_STONE", name: { contains: "Hematite", mode: "insensitive" } },
      },
      "crystal-energy-stone-products": {
        slug: "crystal-energy-stone-products",
        label: "Crystal / Energy Stone Products",
        description: "The full range of crystal and energy stone wearables.",
        where: { categoryType: "ENERGY_STONE" },
      },
      "money-magnet-fusion-band": {
        slug: "money-magnet-fusion-band",
        label: "Money Magnet Fusion Band",
        description: "A multi-stone fusion band worn for abundance and prosperity.",
        where: { categoryType: "ENERGY_STONE", name: { contains: "Money Magnet", mode: "insensitive" } },
      },
      "pyrite-stone-splash-bracelet": {
        slug: "pyrite-stone-splash-bracelet",
        label: "Pyrite Stone Splash Bracelet",
        description: "A splash-cut Pyrite bracelet for grounding and confidence.",
        where: { categoryType: "ENERGY_STONE", name: { contains: "Splash", mode: "insensitive" } },
      },
      "pyrite-x-seven-chakra-band": {
        slug: "pyrite-x-seven-chakra-band",
        label: "Pyrite x Seven Chakra Band",
        description: "Pyrite paired with the seven chakra stones in one wearable band.",
        where: {
          categoryType: "ENERGY_STONE",
          AND: [
            { name: { contains: "Pyrite", mode: "insensitive" } },
            { name: { contains: "Seven Chakra", mode: "insensitive" } },
          ],
        },
      },
      "pyrite-wealth-band": {
        slug: "pyrite-wealth-band",
        label: "Pyrite Wealth Band",
        description: "A Pyrite band worn for wealth and abundance.",
        where: { categoryType: "ENERGY_STONE", name: { contains: "Wealth", mode: "insensitive" } },
      },
      "rose-quartz-om-band": {
        slug: "rose-quartz-om-band",
        label: "Rose Quartz Om Band",
        description: "Rose Quartz with an Om accent, worn for love and calm.",
        where: {
          categoryType: "ENERGY_STONE",
          AND: [
            { name: { contains: "Rose Quartz", mode: "insensitive" } },
            { name: { contains: "Om", mode: "insensitive" } },
          ],
        },
      },
      "tiger-eye-x-seven-chakra-band": {
        slug: "tiger-eye-x-seven-chakra-band",
        label: "Tiger Eye x Seven Chakra Band",
        description: "Tiger Eye paired with the seven chakra stones in one wearable band.",
        where: {
          categoryType: "ENERGY_STONE",
          AND: [
            { name: { contains: "Tiger Eye", mode: "insensitive" } },
            { name: { contains: "Seven Chakra", mode: "insensitive" } },
          ],
        },
      },
      "bold-spirit-tiger-eye-band": {
        slug: "bold-spirit-tiger-eye-band",
        label: "Bold Spirit Tiger Eye Band",
        description: "A bold Tiger Eye band worn for focus and protection.",
        where: { categoryType: "ENERGY_STONE", name: { contains: "Bold Spirit", mode: "insensitive" } },
      },
      "amethyst-x-seven-chakra-buddha-band": {
        slug: "amethyst-x-seven-chakra-buddha-band",
        label: "Amethyst x Seven Chakra Buddha Band",
        description: "Amethyst and seven chakra stones with a Buddha accent, worn for calm and clarity.",
        where: {
          categoryType: "ENERGY_STONE",
          AND: [
            { name: { contains: "Amethyst", mode: "insensitive" } },
            { name: { contains: "Seven Chakra", mode: "insensitive" } },
          ],
        },
      },
    },
  },
  "spiritual-jewellery": {
    categoryType: "SPIRITUAL_JEWELLERY",
    varieties: {
      "spiritual-bracelets": {
        slug: "spiritual-bracelets",
        label: "Spiritual Bracelets",
        description: "Everyday spiritual bracelets rooted in tradition.",
        where: { categoryType: "SPIRITUAL_JEWELLERY", name: { contains: "Bracelet", mode: "insensitive" } },
      },
      "spiritual-necklaces": {
        slug: "spiritual-necklaces",
        label: "Spiritual Necklaces",
        description: "Handcrafted spiritual necklaces and pendants.",
        where: { categoryType: "SPIRITUAL_JEWELLERY", name: { contains: "Necklace", mode: "insensitive" } },
      },
      "rudraksha-jewellery": {
        slug: "rudraksha-jewellery",
        label: "Rudraksha jewellery",
        description: "Spiritual jewellery pieces set with Rudraksha.",
        where: { categoryType: "SPIRITUAL_JEWELLERY", name: { contains: "Rudraksha", mode: "insensitive" } },
      },
      "religious-pendants-necklaces": {
        slug: "religious-pendants-necklaces",
        label: "Religious pendants/necklaces",
        description: "Religious pendants and necklaces for everyday devotion.",
        where: {
          categoryType: "SPIRITUAL_JEWELLERY",
          OR: [
            { name: { contains: "Pendant", mode: "insensitive" } },
            { name: { contains: "Necklace", mode: "insensitive" } },
          ],
        },
      },
    },
  },
  karungali: {
    categoryType: "KARUNGALI",
    varieties: {
      "karungali-bracelets": {
        slug: "karungali-bracelets",
        label: "Karungali Bracelets",
        description: "Compact Karungali bracelets for everyday protective wear.",
        where: { categoryType: "KARUNGALI", name: { contains: "Bracelet", mode: "insensitive" } },
      },
      "karungali-malas": {
        slug: "karungali-malas",
        label: "Karungali Malas",
        description: "Traditional Karungali (black ebony wood) malas, worn for protection.",
        where: { categoryType: "KARUNGALI", name: { contains: "Mala", mode: "insensitive" } },
      },
      "karungali-necklaces": {
        slug: "karungali-necklaces",
        label: "Karungali Necklaces",
        description: "Karungali necklaces for everyday protective wear.",
        where: { categoryType: "KARUNGALI", name: { contains: "Necklace", mode: "insensitive" } },
      },
      "karungali-combos": {
        slug: "karungali-combos",
        label: "Karungali combos",
        description: "Curated Karungali combo sets.",
        where: { categoryType: "KARUNGALI", name: { contains: "Combo", mode: "insensitive" } },
      },
    },
  },
  vastu: {
    categoryType: "VASTU",
    varieties: {
      "pyrite-frames": {
        slug: "pyrite-frames",
        label: "Pyrite Frames",
        description: "Pyrite frame pieces for the home or office.",
        where: { categoryType: "VASTU", name: { contains: "Frame", mode: "insensitive" } },
      },
      "money-magnet-pyramids": {
        slug: "money-magnet-pyramids",
        label: "Money Magnet Pyramids",
        description: "Pyramid sets placed to attract prosperity and positive energy.",
        where: { categoryType: "VASTU", name: { contains: "Pyramid", mode: "insensitive" } },
      },
      "lakshmi-kuber-products": {
        slug: "lakshmi-kuber-products",
        label: "Lakshmi/Kuber products",
        description: "Lakshmi and Kuber pieces for wealth and prosperity.",
        where: {
          categoryType: "VASTU",
          OR: [
            { name: { contains: "Lakshmi", mode: "insensitive" } },
            { name: { contains: "Kuber", mode: "insensitive" } },
          ],
        },
      },
      "vastu-decor": {
        slug: "vastu-decor",
        label: "Vaastu décor",
        description: "Vaastu pieces designed to balance energy at home and office.",
        where: { categoryType: "VASTU" },
      },
    },
  },
  zodiac: {
    categoryType: "ZODIAC",
    varieties: {
      "zodiac-bands": {
        slug: "zodiac-bands",
        label: "Zodiac Bands",
        description: "Zodiac-aligned bands worn by birth sign.",
        where: { categoryType: "ZODIAC", name: { contains: "Band", mode: "insensitive" } },
      },
      "zodiac-bracelets": {
        slug: "zodiac-bracelets",
        label: "Zodiac Bracelets",
        description: "Zodiac-aligned bracelets worn by birth sign.",
        where: { categoryType: "ZODIAC", name: { contains: "Bracelet", mode: "insensitive" } },
      },
      "zodiac-energy-stone-products": {
        slug: "zodiac-energy-stone-products",
        label: "Zodiac energy-stone products",
        description: "Gemstone pieces aligned to each zodiac sign.",
        where: { categoryType: "ZODIAC", name: { contains: "Gemstone", mode: "insensitive" } },
      },
    },
  },
  gifting: {
    categoryType: "GIFT_HAMPER",
    varieties: {
      "diwali-celebration-hampers": {
        slug: "diwali-celebration-hampers",
        label: "Diwali Celebration Hampers",
        description: "Curated Diwali gift hampers, ready to send.",
        where: { categoryType: "GIFT_HAMPER", name: { contains: "Diwali", mode: "insensitive" } },
      },
      "rakhi-celebration-hampers": {
        slug: "rakhi-celebration-hampers",
        label: "Rakhi Celebration Hampers",
        description: "Curated Rakhi gift hampers for Raksha Bandhan.",
        where: { categoryType: "GIFT_HAMPER", name: { contains: "Rakhi", mode: "insensitive" } },
      },
    },
  },
};

export function getCategoryVarietyGroup(categorySlug: string): CategoryVarietyGroup | undefined {
  return CATEGORY_VARIETIES[categorySlug];
}

export function getCategoryVariety(categorySlug: string, varietySlug: string): CategoryVariety | undefined {
  return CATEGORY_VARIETIES[categorySlug]?.varieties[varietySlug];
}
