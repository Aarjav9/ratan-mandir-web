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
};

export function getRudrakshaVariety(slug: string): RudrakshaVariety | undefined {
  return RUDRAKSHA_VARIETIES[slug];
}
