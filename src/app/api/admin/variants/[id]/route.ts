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
