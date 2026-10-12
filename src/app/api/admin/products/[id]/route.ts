import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { CategoryType } from "@prisma/client";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { images: { orderBy: { position: "asc" } }, variants: true },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ product });
}

const updateSchema = z.object({
  name: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  categoryType: z.nativeEnum(CategoryType).optional(),
  basePrice: z.number().positive().optional(),
  mrp: z.number().positive().nullable().optional(),
  origin: z.string().nullable().optional(),
  badge: z.string().nullable().optional(),
  isBestseller: z.boolean().optional(),
  isActive: z.boolean().optional(),
  // Full replace — simplest consistent behavior, safe because
  // ProductImage has no other FK pointing at it.
  images: z.array(z.object({ url: z.string().min(1), altText: z.string().min(1) })).min(1).optional(),
  // Append-only. Existing variants are edited in place via
  // /api/admin/variants/[id] (price/stock), not deleted here — a variant
  // may already be referenced by past OrderItems, so removing it wholesale
  // isn't safe to do generically from this endpoint.
  newVariants: z
    .array(
      z.object({
        label: z.string().min(1),
        priceOverride: z.number().positive().nullable().optional(),
        stock: z.number().int().min(0),
      })
    )
    .optional(),
});

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = updateSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid product details", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const existing = await prisma.product.findUnique({ where: { id: params.id } });
  if (!existing) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const { images, newVariants, ...fields } = parsed.data;

  const product = await prisma.$transaction(async (tx) => {
    if (images) {
      await tx.productImage.deleteMany({ where: { productId: params.id } });
    }

    return tx.product.update({
      where: { id: params.id },
      data: {
        ...fields,
        ...(images && { images: { create: images.map((img, i) => ({ ...img, position: i })) } }),
        ...(newVariants &&
          newVariants.length > 0 && { variants: { create: newVariants } }),
      },
      include: { images: { orderBy: { position: "asc" } }, variants: true },
    });
  });

  return NextResponse.json({ product });
}
