import type { Prisma } from "@prisma/client";

export interface RudrakshaVariety {
  slug: string;
  label: string;
  description: string;
  where: Prisma.ProductWhereInput;
}

export const RUDRAKSHA_VARIETIES: Record<string, RudrakshaVariety> = {
  bracelets: {
    slug: "bracelets",
    label: "Rudraksha Bracelets",
    description:
      "Everyday-wear Rudraksha bracelets, elasticated for comfort — a subtle way to carry mukhi significance through the day.",
    where: { categoryType: "RUDRAKSHA", name: { contains: "Bracelet", mode: "insensitive" } },
  },
  malas: {
    slug: "malas",
    label: "Rudraksha Malas",
    description:
      "Traditional 108-bead Rudraksha malas for daily japa, meditation and general wellbeing.",
    where: { categoryType: "RUDRAKSHA", name: { contains: "Mala", mode: "insensitive" } },
  },
  "nepali-rudraksha": {
    slug: "nepali-rudraksha",
    label: "Nepali Rudraksha",
    description:
      "Rudraksha sourced from the high-altitude forests of Nepal, prized for bead size and traditional significance.",
    where: { categoryType: "RUDRAKSHA", origin: "Nepal" },
  },
  "siddha-mala": {
    slug: "siddha-mala",
    label: "1–14 Mukhi Siddha Rudraksha Mala",
    description: "Siddha malas spanning 1 to 14 mukhi, strung for dedicated sadhana and japa.",
    where: { categoryType: "RUDRAKSHA", name: { contains: "Siddha", mode: "insensitive" } },
  },
  "brown-mala-108-1-beads": {
    slug: "brown-mala-108-1-beads",
    label: "Brown Rudraksha Mala – 108+1 Beads",
    description: "Natural brown Rudraksha malas strung to the traditional 108+1 bead count.",
    where: { categoryType: "RUDRAKSHA", name: { contains: "Brown", mode: "insensitive" } },
  },
  "sphatik-rudraksha-mala-108-1-beads": {
    slug: "sphatik-rudraksha-mala-108-1-beads",
    label: "Sphatik and Rudraksha Mala – 108+1 Beads",
    description: "Sphatik (crystal quartz) paired with Rudraksha in a traditional 108+1 bead mala.",
    where: { categoryType: "RUDRAKSHA", name: { contains: "Sphatik", mode: "insensitive" } },
  },
};

export function getRudrakshaVariety(slug: string): RudrakshaVariety | undefined {
  return RUDRAKSHA_VARIETIES[slug];
}
