export interface CategorySubItem {
  label: string;
  href: string;
}

export interface CategoryTaxonomyItem {
  slug: string;
  label: string;
  shortCopy: string;
  live: boolean;
  href: string;
  subItems: CategorySubItem[];
}

// This is the client-approved final category/subcategory structure. Order
// and every sub-item label below come directly from that list. Several
// sub-items (e.g. "Pyrite Wealth Band", "Karungali combos") don't have real
// inventory behind them yet — by design, per the client: these are
// navigation/filter entries now, wired to the real catalog via
// categoryVarieties.ts / rudrakshaVarieties.ts, and render a graceful
// "check back soon" empty state (see CategoryVarietyPage) rather than being
// invented as fake products. Slugs are kept stable/independent of display
// label wording so URLs and SEO don't churn if labels are tweaked again.
export const CATEGORY_TAXONOMY: CategoryTaxonomyItem[] = [
  {
    slug: "rudraksha",
    label: "Rudraksha",
    shortCopy: "Lab-certified beads, malas and bracelets across every mukhi.",
    live: true,
    href: "/shop/rudraksha",
    subItems: [
      { label: "Rudraksha Bracelets", href: "/shop/rudraksha/bracelets" },
      { label: "Rudraksha Malas", href: "/shop/rudraksha/malas" },
      { label: "Nepali Rudraksha", href: "/shop/rudraksha/nepali-rudraksha" },
      // Not a variety filter — a dedicated 1–18 mukhi picker page.
      { label: "1–18 Mukhi Rudraksha (Nepali)", href: "/shop/rudraksha/mukhi" },
      { label: "1–14 Mukhi Siddha Rudraksha Mala", href: "/shop/rudraksha/siddha-mala" },
      { label: "Brown Rudraksha Mala – 108+1 Beads", href: "/shop/rudraksha/brown-mala-108-1-beads" },
      { label: "Sphatik and Rudraksha Mala – 108+1 Beads", href: "/shop/rudraksha/sphatik-rudraksha-mala-108-1-beads" },
    ],
  },
  {
    slug: "energy-stones",
    label: "Energy Stones",
    shortCopy: "Crystal wearables for grounding, calm and everyday balance.",
    live: true,
    href: "/shop/energy-stones/pyrite-wearables",
    subItems: [
      { label: "Pyrite Wearables", href: "/shop/energy-stones/pyrite-wearables" },
      { label: "Rose Quartz Wearables", href: "/shop/energy-stones/rose-quartz-wearables" },
      { label: "Tiger Eye Wearables", href: "/shop/energy-stones/tiger-eye-wearables" },
      { label: "Amethyst Wearables", href: "/shop/energy-stones/amethyst-wearables" },
      { label: "Hematite Wearables", href: "/shop/energy-stones/hematite-wearables" },
      { label: "Crystal / Energy Stone Products", href: "/shop/energy-stones/crystal-energy-stone-products" },
      { label: "Money Magnet Fusion Band", href: "/shop/energy-stones/money-magnet-fusion-band" },
      { label: "Pyrite Stone Splash Bracelet", href: "/shop/energy-stones/pyrite-stone-splash-bracelet" },
      { label: "Pyrite x Seven Chakra Band", href: "/shop/energy-stones/pyrite-x-seven-chakra-band" },
      { label: "Pyrite Wealth Band", href: "/shop/energy-stones/pyrite-wealth-band" },
      { label: "Rose Quartz Om Band", href: "/shop/energy-stones/rose-quartz-om-band" },
      { label: "Tiger Eye x Seven Chakra Band", href: "/shop/energy-stones/tiger-eye-x-seven-chakra-band" },
      { label: "Bold Spirit Tiger Eye Band", href: "/shop/energy-stones/bold-spirit-tiger-eye-band" },
      { label: "Amethyst x Seven Chakra Buddha Band", href: "/shop/energy-stones/amethyst-x-seven-chakra-buddha-band" },
    ],
  },
  {
    slug: "karungali",
    label: "Karungali",
    shortCopy: "Protective black ebony wood malas, bracelets and combos.",
    live: true,
    href: "/shop/karungali/karungali-bracelets",
    subItems: [
      { label: "Karungali Bracelets", href: "/shop/karungali/karungali-bracelets" },
      { label: "Karungali Malas", href: "/shop/karungali/karungali-malas" },
      { label: "Karungali Necklaces", href: "/shop/karungali/karungali-necklaces" },
      { label: "Karungali combos", href: "/shop/karungali/karungali-combos" },
    ],
  },
  {
    slug: "vastu",
    label: "Vaastu",
    shortCopy: "Divine symbols and energy pieces for home and office.",
    live: true,
    href: "/shop/vastu/vastu-decor",
    subItems: [
      { label: "Pyrite Frames", href: "/shop/vastu/pyrite-frames" },
      { label: "Money Magnet Pyramids", href: "/shop/vastu/money-magnet-pyramids" },
      { label: "Lakshmi/Kuber products", href: "/shop/vastu/lakshmi-kuber-products" },
      { label: "Vaastu décor", href: "/shop/vastu/vastu-decor" },
    ],
  },
  {
    slug: "zodiac",
    label: "Rashi / Zodiac",
    shortCopy: "Gemstone and Rudraksha guidance by birth sign.",
    live: true,
    href: "/shop/zodiac/zodiac-bracelets",
    subItems: [
      { label: "Zodiac Bands", href: "/shop/zodiac/zodiac-bands" },
      { label: "Zodiac Bracelets", href: "/shop/zodiac/zodiac-bracelets" },
      { label: "Zodiac energy-stone products", href: "/shop/zodiac/zodiac-energy-stone-products" },
    ],
  },
  {
    slug: "spiritual-jewellery",
    label: "Spiritual Jewellery",
    shortCopy: "Everyday bracelets and necklaces rooted in tradition.",
    live: true,
    href: "/shop/spiritual-jewellery/spiritual-bracelets",
    subItems: [
      { label: "Spiritual Bracelets", href: "/shop/spiritual-jewellery/spiritual-bracelets" },
      { label: "Spiritual Necklaces", href: "/shop/spiritual-jewellery/spiritual-necklaces" },
      { label: "Rudraksha jewellery", href: "/shop/spiritual-jewellery/rudraksha-jewellery" },
      { label: "Religious pendants/necklaces", href: "/shop/spiritual-jewellery/religious-pendants-necklaces" },
    ],
  },
];

export function getCategoryBySlug(slug: string): CategoryTaxonomyItem | undefined {
  return CATEGORY_TAXONOMY.find((category) => category.slug === slug);
}
