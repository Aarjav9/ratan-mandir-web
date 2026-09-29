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

  console.log("Seeding Energy Stone products...");

  // Real, client-supplied product photography (public/images/RatanMandir_Bracelet_Set_2/)
  // for the flagship 6-stone gemstone bracelet.
  await prisma.product.create({
    data: {
      slug: "tiger-eye-pyrite-gemstone-bracelet-6-stone",
      name: "Tiger Eye & Pyrite Gemstone Bracelet — 6 Stone Blend",
      description:
        "A handcrafted natural gemstone bracelet blending six powerful stones — Aventurine, Tiger's Eye, Pyrite, Sphatik (Clear Quartz), Citrine and Jade — for balance, protection and prosperity. Each bracelet ships in premium packaging with a certificate of authenticity.",
      basePrice: 1299.0,
      mrp: 1699.0,
      categoryType: CategoryType.ENERGY_STONE,
      origin: "India",
      isCertified: true,
      isBestseller: true,
      badge: "Bestseller",
      images: {
        create: [
          { url: "/images/RatanMandir_Bracelet_Set_2/01_Hero_Product.jpg", altText: "Tiger Eye & Pyrite 6 stone gemstone bracelet", position: 0 },
          { url: "/images/RatanMandir_Bracelet_Set_2/06_Wrist_Lifestyle.jpg", altText: "6 stone gemstone bracelet worn on wrist", position: 1 },
          { url: "/images/RatanMandir_Bracelet_Set_2/02_Regular_Size_Dimension.jpg", altText: "Regular size dimensions — 8mm beads", position: 2 },
          { url: "/images/RatanMandir_Bracelet_Set_2/03_Small_Size_Dimension.jpg", altText: "Small size dimensions — 6mm beads", position: 3 },
          { url: "/images/RatanMandir_Bracelet_Set_2/04_Power_of_Natural_Stones.jpg", altText: "The six stones and their traditional meanings", position: 4 },
          { url: "/images/RatanMandir_Bracelet_Set_2/05_Certificate_of_Authenticity.jpg", altText: "Certificate of authenticity and packaging", position: 5 },
        ],
      },
      variants: {
        create: [
          { label: "Regular (8mm beads, fits most wrists)", priceOverride: 1299.0, stock: 40 },
          { label: "Small (6mm beads, for slim wrists)", priceOverride: 1199.0, stock: 25 },
        ],
      },
      reviews: {
        create: [
          { customerName: "Ishita M.", rating: 5, comment: "Gorgeous colour combination and the certificate box makes it feel premium.", isVerified: false },
          { customerName: "Rahul S.", rating: 5, comment: "Bought the small size for my wife, fits perfectly and looks elegant.", isVerified: false },
        ],
      },
    },
  });

  // Real, client-supplied product photography (public/images/RatanMandir_Bracelet_Images/)
  // for the 4-stone gemstone bracelet.
  await prisma.product.create({
    data: {
      slug: "tiger-eye-pyrite-gemstone-bracelet-4-stone",
      name: "Tiger Eye & Pyrite Gemstone Bracelet — 4 Stone Blend",
      description:
        "A natural gemstone bracelet blending four grounding stones — Aventurine, Tiger's Eye, Pyrite and Citrine — for confidence, protection and everyday positive energy. Ships in an elegant gift box with a certificate of authenticity.",
      basePrice: 999.0,
      mrp: 1299.0,
      categoryType: CategoryType.ENERGY_STONE,
      origin: "India",
      isCertified: true,
      isBestseller: true,
      badge: "Bestseller",
      images: {
        create: [
          { url: "/images/RatanMandir_Bracelet_Images/01_hero_product.jpg", altText: "Tiger Eye & Pyrite 4 stone gemstone bracelet", position: 0 },
          { url: "/images/RatanMandir_Bracelet_Images/04_wrist_lifestyle.jpg", altText: "4 stone gemstone bracelet worn on wrist", position: 1 },
          { url: "/images/RatanMandir_Bracelet_Images/02_regular_size_dimension.jpg", altText: "Regular size dimensions — 8mm beads", position: 2 },
          { url: "/images/RatanMandir_Bracelet_Images/03_small_size_dimension.jpg", altText: "Small size dimensions", position: 3 },
          { url: "/images/RatanMandir_Bracelet_Images/05_power_of_natural_stones.jpg", altText: "The four stones and their traditional meanings", position: 4 },
          { url: "/images/RatanMandir_Bracelet_Images/06_premium_packaging.jpg", altText: "Premium packaging and certificate", position: 5 },
        ],
      },
      variants: {
        create: [
          { label: "Regular (8mm beads, fits most wrists)", priceOverride: 999.0, stock: 40 },
          { label: "Small (for slim wrists)", priceOverride: 899.0, stock: 25 },
        ],
      },
      reviews: {
        create: [
          { customerName: "Varun K.", rating: 5, comment: "Great everyday bracelet, sturdy elastic and nice weight.", isVerified: false },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      slug: "pyrite-bracelet-abundance",
      name: "Pyrite Bracelet — Abundance",
      description:
        "A polished Pyrite bead bracelet, often called 'Fool's Gold', worn as a grounding stone associated with confidence, willpower and abundance.",
      basePrice: 799.0,
      mrp: 999.0,
      categoryType: CategoryType.ENERGY_STONE,
      origin: "Peru",
      isCertified: true,
      isBestseller: false,
      images: {
        create: [{ url: "/images/placeholder/energy-stone-pyrite-bracelet.jpg", altText: "Pyrite bracelet", position: 0 }],
      },
      variants: { create: [{ label: "Standard (fits most wrists)", priceOverride: 799.0, stock: 30 }] },
      reviews: {
        create: [
          { customerName: "Tanvi R.", rating: 5, comment: "Beautiful shine, exactly like the photos.", isVerified: false },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      slug: "rose-quartz-bracelet-self-love",
      name: "Rose Quartz Bracelet — Self Love",
      description:
        "A gentle pink Rose Quartz bead bracelet, known as the stone of unconditional love, worn for emotional calm and self-compassion.",
      basePrice: 749.0,
      mrp: 949.0,
      categoryType: CategoryType.ENERGY_STONE,
      origin: "Brazil",
      isCertified: true,
      isBestseller: false,
      images: {
        create: [{ url: "/images/placeholder/energy-stone-rose-quartz-bracelet.jpg", altText: "Rose Quartz bracelet", position: 0 }],
      },
      variants: { create: [{ label: "Standard (fits most wrists)", priceOverride: 749.0, stock: 30 }] },
      reviews: {
        create: [
          { customerName: "Pooja S.", rating: 5, comment: "Soft pink colour, very calming to wear.", isVerified: false },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      slug: "tiger-eye-bracelet-focus-protection",
      name: "Tiger Eye Bracelet — Focus & Protection",
      description:
        "A golden-brown Tiger Eye bead bracelet, traditionally worn for mental clarity, focus and protection from negative energy.",
      basePrice: 899.0,
      mrp: 1199.0,
      categoryType: CategoryType.ENERGY_STONE,
      origin: "South Africa",
      isCertified: true,
      isBestseller: false,
      images: {
        create: [{ url: "/images/placeholder/energy-stone-tiger-eye-bracelet.jpg", altText: "Tiger Eye bracelet", position: 0 }],
      },
      variants: { create: [{ label: "Standard (fits most wrists)", priceOverride: 899.0, stock: 25 }] },
      reviews: {
        create: [
          { customerName: "Karan V.", rating: 4, comment: "Good weight and colour, sturdy elastic.", isVerified: false },
        ],
      },
    },
  });

  // Real, client-supplied product photography for 5 more Energy Stone pieces.
  await prisma.product.create({
    data: {
      slug: "natural-pyrite-bracelet",
      name: "Natural Pyrite Bracelet",
      description:
        "A polished Natural Pyrite bead bracelet, worn for wealth, confidence, protection and success. Ships with a certificate of authenticity.",
      basePrice: 799.0,
      mrp: 999.0,
      categoryType: CategoryType.ENERGY_STONE,
      origin: "Peru",
      isCertified: true,
      isBestseller: true,
      badge: "New",
      images: {
        create: [
          { url: "/images/RatanMandir_Pyrite_6_Images/01_Natural_Pyrite_Bracelet.png", altText: "Natural Pyrite bracelet", position: 0 },
          { url: "/images/RatanMandir_Pyrite_6_Images/06_Carry_Positive_Energy_Everyday.png", altText: "Pyrite bracelet worn on wrist", position: 1 },
          { url: "/images/RatanMandir_Pyrite_6_Images/02_Size_and_Dimension.png", altText: "Pyrite bracelet size and dimensions", position: 2 },
          { url: "/images/RatanMandir_Pyrite_6_Images/03_About_Pyrite.png", altText: "About Pyrite", position: 3 },
          { url: "/images/RatanMandir_Pyrite_6_Images/04_Benefits_of_Pyrite.png", altText: "Benefits of Pyrite", position: 4 },
          { url: "/images/RatanMandir_Pyrite_6_Images/05_Certificate_of_Authenticity.png", altText: "Certificate of authenticity", position: 5 },
        ],
      },
      variants: { create: [{ label: "Standard (fits most wrists)", priceOverride: 799.0, stock: 30 }] },
      reviews: {
        create: [
          { customerName: "Manish T.", rating: 5, comment: "Great shine and weight, feels premium.", isVerified: false },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      slug: "natural-pyrite-anklet",
      name: "Natural Pyrite Anklet",
      description:
        "A faceted Natural Pyrite bead anklet with an adjustable chain, worn for wealth, confidence, protection and success.",
      basePrice: 699.0,
      mrp: 899.0,
      categoryType: CategoryType.ENERGY_STONE,
      origin: "Peru",
      isCertified: true,
      isBestseller: true,
      badge: "New",
      images: {
        create: [
          { url: "/images/RatanMandir_Pyrite_Anklet_HD_6_Images/Natural_Pyrite_Anklet.png", altText: "Natural Pyrite anklet", position: 0 },
          { url: "/images/RatanMandir_Pyrite_Anklet_HD_6_Images/Carry_Positive_Energy_Everyday.png", altText: "Pyrite anklet worn", position: 1 },
          { url: "/images/RatanMandir_Pyrite_Anklet_HD_6_Images/Size_and_Dimension.png", altText: "Pyrite anklet size and dimensions", position: 2 },
          { url: "/images/RatanMandir_Pyrite_Anklet_HD_6_Images/About_Pyrite.png", altText: "About Pyrite", position: 3 },
          { url: "/images/RatanMandir_Pyrite_Anklet_HD_6_Images/Benefits_of_Pyrite_Anklet.png", altText: "Benefits of Pyrite anklet", position: 4 },
          { url: "/images/RatanMandir_Pyrite_Anklet_HD_6_Images/Certificate_of_Authenticity.png", altText: "Certificate of authenticity", position: 5 },
        ],
      },
      variants: { create: [{ label: "Adjustable (one size)", priceOverride: 699.0, stock: 25 }] },
      reviews: {
        create: [
          { customerName: "Sneha R.", rating: 5, comment: "Adjustable chain fits perfectly, lovely sparkle.", isVerified: false },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      slug: "pyrite-seven-chakra-band",
      name: "Pyrite x Seven Chakra Band",
      description:
        "A Pyrite bracelet accented with the seven chakra stones, worn to balance energy, attract positivity and build inner strength.",
      basePrice: 899.0,
      mrp: 1199.0,
      categoryType: CategoryType.ENERGY_STONE,
      origin: "Peru",
      isCertified: true,
      isBestseller: true,
      badge: "New",
      images: {
        create: [
          { url: "/images/RatanMandir_Pyrite_Seven_Chakra_HD_6_Images/Pyrite_Seven_Chakra_Band.png", altText: "Pyrite x Seven Chakra band", position: 0 },
          { url: "/images/RatanMandir_Pyrite_Seven_Chakra_HD_6_Images/Wear_Positive_Energy_Everyday.png", altText: "Seven Chakra band worn on wrist", position: 1 },
          { url: "/images/RatanMandir_Pyrite_Seven_Chakra_HD_6_Images/Size_and_Dimension.png", altText: "Size and dimensions", position: 2 },
          { url: "/images/RatanMandir_Pyrite_Seven_Chakra_HD_6_Images/About_Pyrite_Seven_Chakra_Band.png", altText: "About this band", position: 3 },
          { url: "/images/RatanMandir_Pyrite_Seven_Chakra_HD_6_Images/Seven_Chakra_Stones.png", altText: "The seven chakra stones", position: 4 },
          { url: "/images/RatanMandir_Pyrite_Seven_Chakra_HD_6_Images/Certificate_of_Authenticity.png", altText: "Certificate of authenticity", position: 5 },
        ],
      },
      variants: { create: [{ label: "Standard (fits most wrists)", priceOverride: 899.0, stock: 25 }] },
      reviews: {
        create: [
          { customerName: "Divya K.", rating: 5, comment: "Beautiful colours, exactly as shown.", isVerified: false },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      slug: "tiger-eye-obsidian-hematite-bracelet",
      name: "Tiger Eye, Black Obsidian & Hematite Bracelet",
      description:
        "A grounding blend of Tiger Eye, Black Obsidian and Hematite beads, worn for protection, strength, balance and confidence.",
      basePrice: 899.0,
      mrp: 1199.0,
      categoryType: CategoryType.ENERGY_STONE,
      origin: "South Africa",
      isCertified: true,
      isBestseller: true,
      badge: "New",
      images: {
        create: [
          { url: "/images/RatanMandir_TigerEye_Obsidian_Hematite_HD_6_Images/Tiger_Eye_Black_Obsidian_Hematite_Bracelet.png", altText: "Tiger Eye, Black Obsidian and Hematite bracelet", position: 0 },
          { url: "/images/RatanMandir_TigerEye_Obsidian_Hematite_HD_6_Images/Wear_Positive_Energy_Everyday.png", altText: "Bracelet worn on wrist", position: 1 },
          { url: "/images/RatanMandir_TigerEye_Obsidian_Hematite_HD_6_Images/Size_and_Dimension.png", altText: "Size and dimensions", position: 2 },
          { url: "/images/RatanMandir_TigerEye_Obsidian_Hematite_HD_6_Images/About_This_Bracelet.png", altText: "About this bracelet", position: 3 },
          { url: "/images/RatanMandir_TigerEye_Obsidian_Hematite_HD_6_Images/Gemstone_Benefits.png", altText: "Gemstone benefits", position: 4 },
          { url: "/images/RatanMandir_TigerEye_Obsidian_Hematite_HD_6_Images/Certificate_of_Authenticity.png", altText: "Certificate of authenticity", position: 5 },
        ],
      },
      variants: { create: [{ label: "Standard (fits most wrists)", priceOverride: 899.0, stock: 25 }] },
      reviews: {
        create: [
          { customerName: "Rohan P.", rating: 5, comment: "Love the dark, masculine look of this one.", isVerified: false },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      slug: "tiger-eye-seven-chakra-bracelet",
      name: "Tiger Eye x Seven Chakra Bracelet",
      description:
        "A Tiger Eye bracelet accented with the seven chakra stones, worn to balance energy, attract positivity and build inner strength.",
      basePrice: 899.0,
      mrp: 1199.0,
      categoryType: CategoryType.ENERGY_STONE,
      origin: "South Africa",
      isCertified: true,
      isBestseller: true,
      badge: "New",
      images: {
        create: [
          { url: "/images/RatanMandir_TigerEye_Seven_Chakra_HD_6_Images/Tiger_Eye_Seven_Chakra_Bracelet.png", altText: "Tiger Eye x Seven Chakra bracelet", position: 0 },
          { url: "/images/RatanMandir_TigerEye_Seven_Chakra_HD_6_Images/Wear_Positive_Energy_Everyday.png", altText: "Bracelet worn on wrist", position: 1 },
          { url: "/images/RatanMandir_TigerEye_Seven_Chakra_HD_6_Images/Size_and_Dimension.png", altText: "Size and dimensions", position: 2 },
          { url: "/images/RatanMandir_TigerEye_Seven_Chakra_HD_6_Images/About_Tiger_Eye_Seven_Chakra_Bracelet.png", altText: "About this bracelet", position: 3 },
          { url: "/images/RatanMandir_TigerEye_Seven_Chakra_HD_6_Images/Seven_Chakra_Stones.png", altText: "The seven chakra stones", position: 4 },
          { url: "/images/RatanMandir_TigerEye_Seven_Chakra_HD_6_Images/Certificate_of_Authenticity.png", altText: "Certificate of authenticity", position: 5 },
        ],
      },
      variants: { create: [{ label: "Standard (fits most wrists)", priceOverride: 899.0, stock: 25 }] },
      reviews: {
        create: [
          { customerName: "Alok M.", rating: 4, comment: "Solid quality, colours are vibrant.", isVerified: false },
        ],
      },
    },
  });

  console.log("Seeding Spiritual Jewellery products...");

  await prisma.product.create({
    data: {
      slug: "om-spiritual-bracelet-silver",
      name: "Om Spiritual Bracelet — Silver",
      description:
        "A sterling silver bracelet featuring the sacred Om symbol, a versatile everyday piece for daily spiritual grounding.",
      basePrice: 1299.0,
      mrp: 1599.0,
      categoryType: CategoryType.SPIRITUAL_JEWELLERY,
      isCertified: true,
      isBestseller: false,
      images: {
        create: [{ url: "/images/placeholder/spiritual-jewellery-om-bracelet.jpg", altText: "Om spiritual bracelet", position: 0 }],
      },
      variants: { create: [{ label: "Adjustable", priceOverride: 1299.0, stock: 20 }] },
      reviews: {
        create: [
          { customerName: "Shreya D.", rating: 5, comment: "Elegant and simple, gets compliments often.", isVerified: false },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      slug: "ganesha-spiritual-necklace-brass",
      name: "Ganesha Spiritual Necklace — Brass",
      description:
        "A handcrafted brass pendant necklace featuring Lord Ganesha, worn as a symbol of new beginnings and removal of obstacles.",
      basePrice: 1899.0,
      mrp: 2399.0,
      categoryType: CategoryType.SPIRITUAL_JEWELLERY,
      isCertified: true,
      isBestseller: false,
      images: {
        create: [{ url: "/images/placeholder/spiritual-jewellery-ganesha-necklace.jpg", altText: "Ganesha spiritual necklace", position: 0 }],
      },
      variants: { create: [{ label: "18-inch Chain", priceOverride: 1899.0, stock: 15 }] },
      reviews: {
        create: [
          { customerName: "Ajay N.", rating: 5, comment: "Well detailed pendant, feels substantial.", isVerified: false },
        ],
      },
    },
  });

  console.log("Seeding Karungali products...");

  await prisma.product.create({
    data: {
      slug: "karungali-mala-108-beads",
      name: "Karungali Mala — 108 Beads",
      description:
        "A traditional 108-bead mala of Karungali (black ebony wood), revered in Tamil tradition for its protective, negativity-repelling properties.",
      basePrice: 1499.0,
      mrp: 1899.0,
      categoryType: CategoryType.KARUNGALI,
      origin: "Tamil Nadu",
      isCertified: true,
      isBestseller: false,
      images: {
        create: [{ url: "/images/placeholder/karungali-mala.jpg", altText: "Karungali 108-bead mala", position: 0 }],
      },
      variants: { create: [{ label: "8mm Beads", priceOverride: 1499.0, stock: 20 }] },
      reviews: {
        create: [
          { customerName: "Lakshmi P.", rating: 5, comment: "Authentic feel, my grandmother recognised it immediately.", isVerified: false },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      slug: "karungali-bracelet-protective",
      name: "Karungali Bracelet — Protective Black Ebony",
      description:
        "A compact Karungali (black ebony wood) bracelet for everyday wear, traditionally believed to guard against negative energy and the evil eye.",
      basePrice: 899.0,
      mrp: 1199.0,
      categoryType: CategoryType.KARUNGALI,
      origin: "Tamil Nadu",
      isCertified: true,
      isBestseller: false,
      images: {
        create: [{ url: "/images/placeholder/karungali-bracelet.jpg", altText: "Karungali bracelet", position: 0 }],
      },
      variants: { create: [{ label: "Standard (fits most wrists)", priceOverride: 899.0, stock: 25 }] },
      reviews: {
        create: [
          { customerName: "Ravi K.", rating: 4, comment: "Lightweight and comfortable for daily wear.", isVerified: false },
        ],
      },
    },
  });

  console.log("Seeding Vastu products...");

  await prisma.product.create({
    data: {
      slug: "vastu-home-energy-pyramid-set",
      name: "Vastu Home Energy Pyramid Set",
      description:
        "A set of copper Vastu pyramids designed to be placed at home to balance the five elements and support a harmonious living space.",
      basePrice: 1199.0,
      mrp: 1499.0,
      categoryType: CategoryType.VASTU,
      isCertified: true,
      isBestseller: false,
      images: {
        create: [{ url: "/images/placeholder/vastu-home-energy-pyramid-set.jpg", altText: "Vastu home energy pyramid set", position: 0 }],
      },
      variants: { create: [{ label: "Set of 9", priceOverride: 1199.0, stock: 15 }] },
      reviews: {
        create: [
          { customerName: "Sunil G.", rating: 5, comment: "Well made, easy to place around the house.", isVerified: false },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      slug: "vastu-office-energy-desk-set",
      name: "Vastu Office Energy Desk Set",
      description:
        "A compact Vastu desk set intended to support focus and positive energy at the workplace, placed on or near the work desk.",
      basePrice: 999.0,
      mrp: 1299.0,
      categoryType: CategoryType.VASTU,
      isCertified: true,
      isBestseller: false,
      images: {
        create: [{ url: "/images/placeholder/vastu-office-energy-desk-set.jpg", altText: "Vastu office energy desk set", position: 0 }],
      },
      variants: { create: [{ label: "Set of 5", priceOverride: 999.0, stock: 15 }] },
      reviews: {
        create: [
          { customerName: "Meenal J.", rating: 4, comment: "Nice desk addition, subtle and not bulky.", isVerified: false },
        ],
      },
    },
  });

  console.log("Seeding Zodiac products...");

  await prisma.product.create({
    data: {
      slug: "aries-zodiac-rudraksha-bracelet",
      name: "Aries Zodiac Rudraksha Bracelet",
      description:
        "A Rudraksha bracelet paired with red thread accents, traditionally recommended for Aries (Mesh Rashi) to support courage and drive.",
      basePrice: 999.0,
      mrp: 1299.0,
      categoryType: CategoryType.ZODIAC,
      isCertified: true,
      isBestseller: false,
      images: {
        create: [{ url: "/images/placeholder/zodiac-aries-bracelet.jpg", altText: "Aries zodiac Rudraksha bracelet", position: 0 }],
      },
      variants: { create: [{ label: "Standard (fits most wrists)", priceOverride: 999.0, stock: 18 }] },
      reviews: {
        create: [
          { customerName: "Aditya M.", rating: 5, comment: "Good match for my sign, well made bracelet.", isVerified: false },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      slug: "leo-zodiac-gemstone-pendant",
      name: "Leo Zodiac Gemstone Pendant",
      description:
        "A Sun-aligned gemstone pendant traditionally recommended for Leo (Simha Rashi), worn to support leadership and vitality.",
      basePrice: 2499.0,
      mrp: 2999.0,
      categoryType: CategoryType.ZODIAC,
      isCertified: true,
      isBestseller: false,
      images: {
        create: [{ url: "/images/placeholder/zodiac-leo-pendant.jpg", altText: "Leo zodiac gemstone pendant", position: 0 }],
      },
      variants: { create: [{ label: "Silver Cap Pendant", priceOverride: 2499.0, stock: 10 }] },
      reviews: {
        create: [
          { customerName: "Rhea C.", rating: 5, comment: "Beautiful pendant, arrived with a certificate.", isVerified: false },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      slug: "scorpio-zodiac-rudraksha-bracelet",
      name: "Scorpio Zodiac Rudraksha Bracelet",
      description:
        "A Rudraksha bracelet traditionally recommended for Scorpio (Vrishchik Rashi), worn to support intensity balanced with calm.",
      basePrice: 999.0,
      mrp: 1299.0,
      categoryType: CategoryType.ZODIAC,
      isCertified: true,
      isBestseller: false,
      images: {
        create: [{ url: "/images/placeholder/zodiac-scorpio-bracelet.jpg", altText: "Scorpio zodiac Rudraksha bracelet", position: 0 }],
      },
      variants: { create: [{ label: "Standard (fits most wrists)", priceOverride: 999.0, stock: 18 }] },
      reviews: {
        create: [
          { customerName: "Nikhil T.", rating: 4, comment: "Solid bracelet, comfortable fit.", isVerified: false },
        ],
      },
    },
  });

  console.log("Seeding Gift Hamper products...");

  await prisma.product.create({
    data: {
      slug: "diwali-celebration-hamper-rudraksha-diya",
      name: "Diwali Celebration Hamper — Rudraksha & Diya Set",
      description:
        "A curated Diwali gift hamper featuring a Rudraksha bracelet, a brass diya and festive packaging — ready to gift for the festival of lights.",
      basePrice: 2499.0,
      mrp: 2999.0,
      categoryType: CategoryType.GIFT_HAMPER,
      isCertified: true,
      isBestseller: false,
      images: {
        create: [{ url: "/images/placeholder/gift-hamper-diwali.jpg", altText: "Diwali celebration hamper", position: 0 }],
      },
      variants: { create: [{ label: "Standard Hamper", priceOverride: 2499.0, stock: 12 }] },
      reviews: {
        create: [
          { customerName: "Nisha A.", rating: 5, comment: "Lovely presentation, perfect for gifting family.", isVerified: false },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      slug: "rakhi-celebration-hamper-bracelet-sweets",
      name: "Rakhi Celebration Hamper — Bracelet & Sweets Box",
      description:
        "A festive Rakhi gift hamper with a spiritual bracelet and a box of sweets, thoughtfully packaged for Raksha Bandhan.",
      basePrice: 1799.0,
      mrp: 2199.0,
      categoryType: CategoryType.GIFT_HAMPER,
      isCertified: true,
      isBestseller: false,
      images: {
        create: [{ url: "/images/placeholder/gift-hamper-rakhi.jpg", altText: "Rakhi celebration hamper", position: 0 }],
      },
      variants: { create: [{ label: "Standard Hamper", priceOverride: 1799.0, stock: 12 }] },
      reviews: {
        create: [
          { customerName: "Komal S.", rating: 5, comment: "Sent this to my brother, he loved it.", isVerified: false },
        ],
      },
    },
  });

  console.log("Seeding sample coupons...");
  await prisma.coupon.deleteMany({});
  await prisma.coupon.createMany({
    data: [
      {
        code: "WELCOME10",
        description: "10% off your first order",
        discountPercent: 10,
        isActive: true,
      },
      {
        code: "FESTIVE20",
        description: "20% off orders above ₹999",
        discountPercent: 20,
        minOrderValue: 999.0,
        isActive: true,
      },
    ],
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
