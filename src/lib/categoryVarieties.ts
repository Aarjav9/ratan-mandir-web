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
    },
  },
  karungali: {
    categoryType: "KARUNGALI",
    varieties: {
      "karungali-mala": {
        slug: "karungali-mala",
        label: "Karungali Mala",
        description: "Traditional Karungali (black ebony wood) malas, worn for protection.",
        where: { categoryType: "KARUNGALI", name: { contains: "Mala", mode: "insensitive" } },
      },
      "karungali-bracelet": {
        slug: "karungali-bracelet",
        label: "Karungali Bracelet",
        description: "Compact Karungali bracelets for everyday protective wear.",
        where: { categoryType: "KARUNGALI", name: { contains: "Bracelet", mode: "insensitive" } },
      },
    },
  },
  vastu: {
    categoryType: "VASTU",
    varieties: {
      "home-energy": {
        slug: "home-energy",
        label: "Home Energy",
        description: "Vastu pieces designed to balance energy at home.",
        where: { categoryType: "VASTU", name: { contains: "Home Energy", mode: "insensitive" } },
      },
      "office-energy": {
        slug: "office-energy",
        label: "Office Energy",
        description: "Vastu pieces designed for focus and positive energy at the workplace.",
        where: { categoryType: "VASTU", name: { contains: "Office Energy", mode: "insensitive" } },
      },
    },
  },
  zodiac: {
    categoryType: "ZODIAC",
    varieties: {
      "aries-cancer": {
        slug: "aries-cancer",
        label: "Aries – Cancer",
        description: "Zodiac-aligned pieces for Aries, Taurus, Gemini and Cancer.",
        where: {
          categoryType: "ZODIAC",
          OR: [
            { name: { contains: "Aries", mode: "insensitive" } },
            { name: { contains: "Taurus", mode: "insensitive" } },
            { name: { contains: "Gemini", mode: "insensitive" } },
            { name: { contains: "Cancer", mode: "insensitive" } },
          ],
        },
      },
      "leo-libra": {
        slug: "leo-libra",
        label: "Leo – Libra",
        description: "Zodiac-aligned pieces for Leo, Virgo and Libra.",
        where: {
          categoryType: "ZODIAC",
          OR: [
            { name: { contains: "Leo", mode: "insensitive" } },
            { name: { contains: "Virgo", mode: "insensitive" } },
            { name: { contains: "Libra", mode: "insensitive" } },
          ],
        },
      },
      "scorpio-pisces": {
        slug: "scorpio-pisces",
        label: "Scorpio – Pisces",
        description: "Zodiac-aligned pieces for Scorpio, Sagittarius, Capricorn, Aquarius and Pisces.",
        where: {
          categoryType: "ZODIAC",
          OR: [
            { name: { contains: "Scorpio", mode: "insensitive" } },
            { name: { contains: "Sagittarius", mode: "insensitive" } },
            { name: { contains: "Capricorn", mode: "insensitive" } },
            { name: { contains: "Aquarius", mode: "insensitive" } },
            { name: { contains: "Pisces", mode: "insensitive" } },
          ],
        },
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
