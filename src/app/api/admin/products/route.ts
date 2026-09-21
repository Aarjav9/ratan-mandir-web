import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { CategoryType } from "@prisma/client";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import { slugify } from "@/lib/format";

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const products = await prisma.product.findMany({
    include: { variants: true, images: { orderBy: { position: "asc" }, take: 1 } },
    orderBy: [{ categoryType: "asc" }, { name: "asc" }],
  });

  return NextResponse.json({ products });
}

const createSchema = z.object({
  name: z.string().min(3),
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/, "Slug may only contain lowercase letters, numbers and hyphens")
    .optional(),
  description: z.string().min(10),
  categoryType: z.nativeEnum(CategoryType),
  basePrice: z.number().positive(),
  mrp: z.number().positive().nullable().optional(),
  origin: z.string().optional(),
  badge: z.string().optional(),
  isBestseller: z.boolean().optional(),
  images: z
    .array(z.object({ url: z.string().min(1), altText: z.string().min(1) }))
    .min(1, "At least one image is required"),
  variants: z
    .array(
      z.object({
        label: z.string().min(1),
        priceOverride: z.number().positive().nullable().optional(),
        stock: z.number().int().min(0),
      })
    )
    .min(1, "At least one variant is required"),
});

export async function POST(request: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = createSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid product details", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { name, description, categoryType, basePrice, mrp, origin, badge, isBestseller, images, variants } =
    parsed.data;

  const baseSlug = parsed.data.slug ?? slugify(name);
  let slug = baseSlug;
  let suffix = 2;
  while (await prisma.product.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  const product = await prisma.product.create({
    data: {
      slug,
      name,
      description,
      categoryType,
      basePrice,
      mrp: mrp ?? null,
      origin,
      badge,
      isBestseller: isBestseller ?? false,
      images: { create: images.map((img, i) => ({ ...img, position: i })) },
      variants: { create: variants },
    },
    include: { images: true, variants: true },
  });

  return NextResponse.json({ product }, { status: 201 });
}
