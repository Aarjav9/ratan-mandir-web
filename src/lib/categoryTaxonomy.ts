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

// Structured to mirror the category breadth of established spiritual
// e-commerce sites (Rudraksha / Energy Stones / Spiritual Jewellery /
// Karungali / Vastu / Zodiac / Gift Hampers), while every href, product,
// image and description below is our own — nothing is copied. All 7
// categories now have real (sample/placeholder) inventory behind them.
export const CATEGORY_TAXONOMY: CategoryTaxonomyItem[] = [
  {
    slug: "rudraksha",
    label: "Rudraksha",
    shortCopy: "Lab-certified beads, malas and bracelets across every mukhi.",
    live: true,
    href: "/shop/5",
    subItems: [
      { label: "Rudraksha Bracelets", href: "/shop/rudraksha/bracelets" },
      { label: "Rudraksha Malas", href: "/shop/rudraksha/malas" },
      { label: "Nepali Rudraksha", href: "/shop/rudraksha/nepali-rudraksha" },
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
    ],
  },
  {
    slug: "karungali",
    label: "Karungali",
    shortCopy: "Protective black ebony wood malas, bracelets and combos.",
    live: true,
    href: "/shop/karungali/karungali-mala",
    subItems: [
      { label: "Karungali Mala", href: "/shop/karungali/karungali-mala" },
      { label: "Karungali Bracelet", href: "/shop/karungali/karungali-bracelet" },
    ],
  },
  {
    slug: "vastu",
    label: "Vastu",
    shortCopy: "Divine symbols and energy pieces for home and office.",
    live: true,
    href: "/shop/vastu/home-energy",
    subItems: [
      { label: "Home Energy", href: "/shop/vastu/home-energy" },
      { label: "Office Energy", href: "/shop/vastu/office-energy" },
    ],
  },
  {
    slug: "zodiac",
    label: "Zodiac",
    shortCopy: "Gemstone and Rudraksha guidance by birth sign.",
    live: true,
    href: "/shop/zodiac/aries-cancer",
    subItems: [
      { label: "Aries – Cancer", href: "/shop/zodiac/aries-cancer" },
      { label: "Leo – Libra", href: "/shop/zodiac/leo-libra" },
      { label: "Scorpio – Pisces", href: "/shop/zodiac/scorpio-pisces" },
    ],
  },
  {
    slug: "gifting",
    label: "Gift Hampers",
    shortCopy: "Curated spiritual gifts for every celebration.",
    live: true,
    href: "/shop/gifting/diwali-celebration-hampers",
    subItems: [
      { label: "Diwali Celebration Hampers", href: "/shop/gifting/diwali-celebration-hampers" },
      { label: "Rakhi Celebration Hampers", href: "/shop/gifting/rakhi-celebration-hampers" },
    ],
  },
];

export function getCategoryBySlug(slug: string): CategoryTaxonomyItem | undefined {
  return CATEGORY_TAXONOMY.find((category) => category.slug === slug);
}
