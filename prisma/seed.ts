/**
 * Ratan Mandir — database seed script.
 *
 * IMPORTANT: All prices below (basePrice, mrp, priceOverride) are
 * ILLUSTRATIVE SAMPLE PRICES in INR, chosen only so the schema and UI have
 * realistic-looking numbers to render. They are NOT real Ratan Mandir
 * pricing. The client must replace every price with real, current pricing
 * before launch.
 *
 * Similarly, all reviews below are SAMPLE/SEED content (not real customer
 * reviews) — that is exactly why they are seeded with isVerified: false.
 *
 * Run with: npx prisma db seed
 */

import { PrismaClient, CategoryType } from "@prisma/client";

const prisma = new PrismaClient();

const MUKHI_INFO: { mukhiNumber: number; deity: string; significance: string }[] = [
  { mukhiNumber: 1, deity: "Lord Shiva", significance: "Ultimate consciousness & clarity" },
  { mukhiNumber: 2, deity: "Ardhanareeshwara", significance: "Unity of energies" },
  { mukhiNumber: 3, deity: "Agni Deva", significance: "Courage & willpower" },
  { mukhiNumber: 4, deity: "Lord Brahma", significance: "Wisdom & creativity" },
  { mukhiNumber: 5, deity: "Rudra", significance: "Health & inner balance" },
  { mukhiNumber: 6, deity: "Kartikeya", significance: "Confidence & focus" },
  { mukhiNumber: 7, deity: "Goddess Lakshmi", significance: "Prosperity & abundance" },
  { mukhiNumber: 8, deity: "Lord Ganesha", significance: "Removes obstacles" },
  { mukhiNumber: 9, deity: "Goddess Durga", significance: "Strength & protection" },
  { mukhiNumber: 10, deity: "Lord Vishnu", significance: "Harmony & stability" },
  { mukhiNumber: 11, deity: "Lord Hanuman", significance: "Courage & devotion" },
  { mukhiNumber: 12, deity: "Surya Deva", significance: "Vitality & leadership" },
  { mukhiNumber: 13, deity: "Kamadeva", significance: "Charm & fulfillment" },
  { mukhiNumber: 14, deity: "Shiva's Third Eye", significance: "Intuition & foresight" },
];

const GEMSTONE_INFO: { name: string; sanskritName: string; planet: string; colorHex: string }[] = [
  { name: "Ruby", sanskritName: "Manik", planet: "Sun", colorHex: "#B3223A" },
  { name: "Pearl", sanskritName: "Moti", planet: "Moon", colorHex: "#EDE6D6" },
  { name: "Red Coral", sanskritName: "Moonga", planet: "Mars", colorHex: "#D9502C" },
  { name: "Emerald", sanskritName: "Panna", planet: "Mercury", colorHex: "#2E7D4F" },
  { name: "Yellow Sapphire", sanskritName: "Pukhraj", planet: "Jupiter", colorHex: "#E0A82E" },
  { name: "Diamond", sanskritName: "Heera", planet: "Venus", colorHex: "#CFE0E8" },
  { name: "Blue Sapphire", sanskritName: "Neelam", planet: "Saturn", colorHex: "#2E4E9E" },
  { name: "Hessonite", sanskritName: "Gomed", planet: "Rahu", colorHex: "#B06A2C" },
  { name: "Cat's Eye", sanskritName: "Lehsunia", planet: "Ketu", colorHex: "#8FA85E" },
];

async function main() {
  console.log("Seeding MukhiInfo (1–14)...");
  for (const info of MUKHI_INFO) {
    await prisma.mukhiInfo.upsert({
      where: { mukhiNumber: info.mukhiNumber },
      update: info,
      create: info,
    });
  }

  console.log("Seeding GemstoneInfo (Navratna)...");
  // GemstoneInfo has no unique key defined besides id, so clear and re-insert
  // on repeat seeds to keep this idempotent-ish for a starter project.
  await prisma.gemstoneInfo.deleteMany({});
  await prisma.gemstoneInfo.createMany({ data: GEMSTONE_INFO });

  console.log("Clearing existing catalog data...");
  await prisma.review.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.productVariant.deleteMany({});
  await prisma.productImage.deleteMany({});
  await prisma.product.deleteMany({});

  console.log("Seeding Rudraksha products...");

  // ---- 1 Mukhi ----------------------------------------------------------
  await prisma.product.create({
    data: {
      slug: "1-mukhi-rudraksha-bead-nepal",
      name: "1 Mukhi Rudraksha Bead (Nepal)",
      description:
        "A rare single-line 1 Mukhi Rudraksha sourced from the high-altitude forests of Nepal, revered as the bead of Lord Shiva himself. Worn for clarity of mind and a steady inward focus during sadhana.",
      basePrice: 11999.0,
      mrp: 14999.0,
      categoryType: CategoryType.RUDRAKSHA,
      mukhiNumber: 1,
      origin: "Nepal",
      isCertified: true,
      isBestseller: true,
      badge: "Rare Find",
      images: {
        create: [
          { url: "/images/placeholder/rudraksha-1-mukhi.jpg", altText: "1 Mukhi Rudraksha bead", position: 0 },
        ],
      },
      variants: {
        create: [
          { label: "Single Bead", priceOverride: 11999.0, stock: 6 },
          { label: "Single Bead in Silver Cap", priceOverride: 13999.0, stock: 4 },
        ],
      },
      reviews: {
        create: [
          { customerName: "Arvind K.", rating: 5, comment: "Beautifully packed with a clear lab certificate. Very satisfied with the authenticity.", isVerified: false },
          { customerName: "Priya S.", rating: 5, comment: "Felt a genuine sense of calm within days of wearing it during meditation.", isVerified: false },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      slug: "1-mukhi-rudraksha-pendant",
      name: "1 Mukhi Rudraksha Pendant",
      description:
        "A 1 Mukhi Rudraksha bead set in a sterling silver pendant cap, designed for daily wear. Comes with an adjustable cord and authenticity certificate.",
      basePrice: 4499.0,
      mrp: 5499.0,
      categoryType: CategoryType.RUDRAKSHA,
      mukhiNumber: 1,
      origin: "Nepal",
      isCertified: true,
      isBestseller: false,
      images: {
        create: [
          { url: "/images/placeholder/rudraksha-1-mukhi-pendant.jpg", altText: "1 Mukhi Rudraksha pendant", position: 0 },
        ],
      },
      variants: {
        create: [
          { label: "Silver Cap Pendant", priceOverride: 4499.0, stock: 12 },
        ],
      },
      reviews: {
        create: [
          { customerName: "Neha T.", rating: 4, comment: "Elegant pendant, exactly as pictured. Shipping took a few extra days.", isVerified: false },
        ],
      },
    },
  });

  // ---- 5 Mukhi ------------------------------------------------------------
  await prisma.product.create({
    data: {
      slug: "5-mukhi-rudraksha-mala-108-beads",
      name: "5 Mukhi Rudraksha Mala – 108 Beads",
      description:
        "A traditional 108-bead mala of 5 Mukhi Rudraksha, the most common and versatile bead, associated with Lord Rudra. Ideal for daily japa and general wellbeing.",
      basePrice: 1499.0,
      mrp: 1999.0,
      categoryType: CategoryType.RUDRAKSHA,
      mukhiNumber: 5,
      origin: "Indonesia",
      isCertified: true,
      isBestseller: true,
      badge: "Bestseller",
      images: {
        create: [
          { url: "/images/placeholder/rudraksha-5-mukhi-mala.jpg", altText: "5 Mukhi Rudraksha 108-bead mala", position: 0 },
        ],
      },
      variants: {
        create: [
          { label: "6mm Beads", priceOverride: 1499.0, stock: 40 },
          { label: "8mm Beads", priceOverride: 1799.0, stock: 25 },
          { label: "10mm Beads", priceOverride: 2199.0, stock: 15 },
        ],
      },
      reviews: {
        create: [
          { customerName: "Rohit M.", rating: 5, comment: "Great quality for the price, and the certificate gave me peace of mind.", isVerified: false },
          { customerName: "Sunita P.", rating: 4, comment: "Good mala, slightly smaller beads than I expected but happy overall.", isVerified: false },
          { customerName: "Devendra R.", rating: 5, comment: "Bought this for my father, he wears it daily now.", isVerified: false },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      slug: "5-mukhi-rudraksha-bracelet",
      name: "5 Mukhi Rudraksha Bracelet",
      description:
        "An everyday-wear 5 Mukhi Rudraksha bracelet, elasticated for comfort, suitable for both men and women who want a subtle daily reminder of balance and calm.",
      basePrice: 899.0,
      mrp: 1199.0,
      categoryType: CategoryType.RUDRAKSHA,
      mukhiNumber: 5,
      origin: "Indonesia",
      isCertified: true,
      isBestseller: false,
      images: {
        create: [
          { url: "/images/placeholder/rudraksha-5-mukhi-bracelet.jpg", altText: "5 Mukhi Rudraksha bracelet", position: 0 },
        ],
      },
      variants: {
        create: [
          { label: "Standard (fits most wrists)", priceOverride: 899.0, stock: 50 },
        ],
      },
      reviews: {
        create: [
          { customerName: "Kavya J.", rating: 5, comment: "Comfortable to wear all day and looks understated.", isVerified: false },
          { customerName: "Manoj D.", rating: 4, comment: "Nice bracelet, elastic feels a little snug for larger wrists.", isVerified: false },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      slug: "5-mukhi-rudraksha-single-bead-pendant",
      name: "5 Mukhi Rudraksha Single Bead Pendant",
      description:
        "A single 5 Mukhi Rudraksha bead capped in silver, strung on a black thread — a minimal, everyday piece for those new to wearing Rudraksha.",
      basePrice: 699.0,
      mrp: null,
      categoryType: CategoryType.RUDRAKSHA,
      mukhiNumber: 5,
      origin: "Indonesia",
      isCertified: true,
      isBestseller: false,
      images: {
        create: [
          { url: "/images/placeholder/rudraksha-5-mukhi-pendant.jpg", altText: "5 Mukhi Rudraksha single bead pendant", position: 0 },
        ],
      },
      variants: {
        create: [
          { label: "Black Thread", priceOverride: 699.0, stock: 30 },
          { label: "Silver Chain", priceOverride: 1099.0, stock: 18 },
        ],
      },
      reviews: {
        create: [
          { customerName: "Anjali V.", rating: 5, comment: "Perfect starter piece, simple and well made.", isVerified: false },
        ],
      },
    },
  });

  // ---- 7 Mukhi ------------------------------------------------------------
  await prisma.product.create({
    data: {
      slug: "7-mukhi-rudraksha-mala",
      name: "7 Mukhi Rudraksha Mala",
      description:
        "A 108-bead mala of 7 Mukhi Rudraksha, associated with Goddess Lakshmi and traditionally worn by those seeking prosperity and financial stability.",
      basePrice: 2999.0,
      mrp: 3799.0,
      categoryType: CategoryType.RUDRAKSHA,
      mukhiNumber: 7,
      origin: "Nepal",
      isCertified: true,
      isBestseller: true,
      badge: "Popular",
      images: {
        create: [
          { url: "/images/placeholder/rudraksha-7-mukhi-mala.jpg", altText: "7 Mukhi Rudraksha mala", position: 0 },
        ],
      },
      variants: {
        create: [
          { label: "7mm Beads", priceOverride: 2999.0, stock: 20 },
          { label: "9mm Beads", priceOverride: 3599.0, stock: 12 },
        ],
      },
      reviews: {
        create: [
          { customerName: "Farhan A.", rating: 5, comment: "Good density and even bead sizing throughout the mala.", isVerified: false },
          { customerName: "Ritu B.", rating: 5, comment: "Ordered as a gift, packaging was thoughtful and premium.", isVerified: false },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      slug: "7-mukhi-rudraksha-bracelet",
      name: "7 Mukhi Rudraksha Bracelet",
      description:
        "A 7 Mukhi Rudraksha bracelet for everyday wear, offering the same traditional significance as the mala in a more compact, office-friendly form.",
      basePrice: 999.0,
      mrp: 1299.0,
      categoryType: CategoryType.RUDRAKSHA,
      mukhiNumber: 7,
      origin: "Nepal",
      isCertified: true,
      isBestseller: false,
      images: {
        create: [
          { url: "/images/placeholder/rudraksha-7-mukhi-bracelet.jpg", altText: "7 Mukhi Rudraksha bracelet", position: 0 },
        ],
      },
      variants: {
        create: [
          { label: "Standard (fits most wrists)", priceOverride: 999.0, stock: 35 },
        ],
      },
      reviews: {
        create: [
          { customerName: "Simran K.", rating: 4, comment: "Well made, though I'd love more size options.", isVerified: false },
        ],
      },
    },
  });

  // ---- 9 Mukhi ------------------------------------------------------------
  await prisma.product.create({
    data: {
      slug: "9-mukhi-rudraksha-mala-navdurga",
      name: "9 Mukhi Rudraksha Mala – Navdurga",
      description:
        "A powerful 108-bead 9 Mukhi Rudraksha mala representing the nine forms of Goddess Durga, traditionally worn for strength, courage and protection.",
      basePrice: 3499.0,
      mrp: 4299.0,
      categoryType: CategoryType.RUDRAKSHA,
      mukhiNumber: 9,
      origin: "Nepal",
      isCertified: true,
      isBestseller: true,
      badge: "Bestseller",
      images: {
        create: [
          { url: "/images/placeholder/rudraksha-9-mukhi-mala.jpg", altText: "9 Mukhi Rudraksha Navdurga mala", position: 0 },
        ],
      },
      variants: {
        create: [
          { label: "7mm Beads", priceOverride: 3499.0, stock: 18 },
          { label: "9mm Beads", priceOverride: 4199.0, stock: 10 },
        ],
      },
      reviews: {
        create: [
          { customerName: "Deepika N.", rating: 5, comment: "Strong, well-formed beads. Certificate matched the bead details exactly.", isVerified: false },
          { customerName: "Gaurav S.", rating: 5, comment: "Exactly what I was looking for after researching for weeks.", isVerified: false },
          { customerName: "Meera L.", rating: 4, comment: "Lovely mala, arrived a bit later than the estimated date.", isVerified: false },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      slug: "9-mukhi-rudraksha-pendant",
      name: "9 Mukhi Rudraksha Pendant",
      description:
        "A single 9 Mukhi Rudraksha bead in a silver pendant cap, offering the protective significance of Navdurga in a compact daily-wear piece.",
      basePrice: 1299.0,
      mrp: 1599.0,
      categoryType: CategoryType.RUDRAKSHA,
      mukhiNumber: 9,
      origin: "Nepal",
      isCertified: true,
      isBestseller: false,
      images: {
        create: [
          { url: "/images/placeholder/rudraksha-9-mukhi-pendant.jpg", altText: "9 Mukhi Rudraksha pendant", position: 0 },
        ],
      },
      variants: {
        create: [
          { label: "Silver Cap Pendant", priceOverride: 1299.0, stock: 22 },
        ],
      },
      reviews: {
        create: [
          { customerName: "Ishaan P.", rating: 5, comment: "Compact, elegant, and the cord quality is better than expected.", isVerified: false },
        ],
      },
    },
  });

  console.log("Seeding Gemstone products...");

  await prisma.product.create({
    data: {
      slug: "natural-yellow-sapphire-pukhraj",
      name: "Natural Yellow Sapphire (Pukhraj)",
      description:
        "An unheated, natural Yellow Sapphire (Pukhraj) associated with Jupiter (Guru), traditionally recommended for wisdom, prosperity and favourable marital timing. Comes with a gemological lab certificate.",
      basePrice: 15999.0,
      mrp: 19999.0,
      categoryType: CategoryType.GEMSTONE,
      gemstoneName: "Yellow Sapphire",
      origin: "Ceylon",
      isCertified: true,
      isBestseller: true,
      badge: "Certified",
      images: {
        create: [
          { url: "/images/placeholder/gemstone-yellow-sapphire.jpg", altText: "Natural Yellow Sapphire (Pukhraj)", position: 0 },
        ],
      },
      variants: {
        create: [
          { label: "3 Carat, Silver Ring", priceOverride: 15999.0, stock: 5 },
          { label: "5 Carat, Gold Ring", priceOverride: 26999.0, stock: 3 },
        ],
      },
      reviews: {
        create: [
          { customerName: "Vikram T.", rating: 5, comment: "Certificate was thorough and the stone's clarity matched the description.", isVerified: false },
          { customerName: "Anushka G.", rating: 5, comment: "Consulted an astrologer first, they confirmed the stone quality was genuine.", isVerified: false },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      slug: "natural-blue-sapphire-neelam",
      name: "Natural Blue Sapphire (Neelam)",
      description:
        "A natural, untreated Blue Sapphire (Neelam) linked to Saturn (Shani), known for its fast and powerful effects — recommended to be worn only after trial or astrological consultation.",
      basePrice: 18999.0,
      mrp: 23999.0,
      categoryType: CategoryType.GEMSTONE,
      gemstoneName: "Blue Sapphire",
      origin: "Ceylon",
      isCertified: true,
      isBestseller: false,
      images: {
        create: [
          { url: "/images/placeholder/gemstone-blue-sapphire.jpg", altText: "Natural Blue Sapphire (Neelam)", position: 0 },
        ],
      },
      variants: {
        create: [
          { label: "3 Carat, Silver Ring", priceOverride: 18999.0, stock: 4 },
        ],
      },
      reviews: {
        create: [
          { customerName: "Ramesh V.", rating: 4, comment: "Stone looks premium, took the recommended trial period before wearing full time.", isVerified: false },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      slug: "natural-red-coral-moonga",
      name: "Natural Red Coral (Moonga)",
      description:
        "A natural, deep-red Red Coral (Moonga) associated with Mars (Mangal), traditionally worn to boost courage, vitality and decisiveness.",
      basePrice: 4999.0,
      mrp: 6499.0,
      categoryType: CategoryType.GEMSTONE,
      gemstoneName: "Red Coral",
      origin: "Italy",
      isCertified: true,
      isBestseller: false,
      images: {
        create: [
          { url: "/images/placeholder/gemstone-red-coral.jpg", altText: "Natural Red Coral (Moonga)", position: 0 },
        ],
      },
      variants: {
        create: [
          { label: "6 Carat, Copper Ring", priceOverride: 4999.0, stock: 9 },
          { label: "8 Carat, Copper Ring", priceOverride: 6499.0, stock: 6 },
        ],
      },
      reviews: {
        create: [
          { customerName: "Aarti M.", rating: 5, comment: "Rich, even colour throughout the stone. Very happy with the purchase.", isVerified: false },
          { customerName: "Suresh B.", rating: 4, comment: "Good quality, ring sizing took an extra week to arrange.", isVerified: false },
        ],
      },
    },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
