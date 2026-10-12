import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const coupon = await prisma.coupon.findUnique({ where: { id: params.id } });
  if (!coupon) {
    return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
  }

  return NextResponse.json({ coupon });
}

const updateSchema = z.object({
  // Code is intentionally not editable — changing it after the coupon has
  // been shared/printed would silently break it for anyone already holding
  // the old code.
  description: z.string().nullable().optional(),
  discountPercent: z.number().int().min(1).max(100).optional(),
  minOrderValue: z.number().positive().nullable().optional(),
  isActive: z.boolean().optional(),
  expiresAt: z.string().datetime().nullable().optional(),
});

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = updateSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid coupon details", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const existing = await prisma.coupon.findUnique({ where: { id: params.id } });
  if (!existing) {
    return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
  }

  const { expiresAt, ...rest } = parsed.data;
  const coupon = await prisma.coupon.update({
    where: { id: params.id },
    data: {
      ...rest,
      ...(expiresAt !== undefined && { expiresAt: expiresAt ? new Date(expiresAt) : null }),
    },
  });

  return NextResponse.json({ coupon });
}

// Coupons are never deleted once created — past Order rows may reference
// one via couponId, same no-delete principle as ProductVariant. Deactivate
// instead (PATCH isActive: false).
