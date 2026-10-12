import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";

const schema = z.object({
  stock: z.number().int().min(0).optional(),
  priceOverride: z.number().nonnegative().nullable().optional(),
});

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload", details: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const variant = await prisma.productVariant.update({
      where: { id: params.id },
      data: parsed.data,
    });
    return NextResponse.json({ variant });
  } catch {
    return NextResponse.json({ error: "Variant not found" }, { status: 404 });
  }
}

// Only deletable if no past order ever referenced it — otherwise that
// OrderItem.variantId would point at nothing, which would break the order
// history view. Set stock to 0 instead if it's been ordered before.
export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const variant = await prisma.productVariant.findUnique({ where: { id: params.id } });
  if (!variant) {
    return NextResponse.json({ error: "Variant not found" }, { status: 404 });
  }

  const orderItemCount = await prisma.orderItem.count({ where: { variantId: params.id } });
  if (orderItemCount > 0) {
    return NextResponse.json(
      { error: "This variant is part of a past order and can't be removed — set its stock to 0 instead." },
      { status: 409 }
    );
  }

  const siblingCount = await prisma.productVariant.count({ where: { productId: variant.productId } });
  if (siblingCount <= 1) {
    return NextResponse.json(
      { error: "A product needs at least one variant — add another before removing this one." },
      { status: 409 }
    );
  }

  try {
    await prisma.productVariant.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Variant not found" }, { status: 404 });
  }
}
