import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ coupons });
}

const createSchema = z.object({
  code: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[A-Za-z0-9-]+$/, "Code may only contain letters, numbers and hyphens"),
  description: z.string().optional(),
  discountPercent: z.number().int().min(1).max(100),
  minOrderValue: z.number().positive().nullable().optional(),
  isActive: z.boolean().optional(),
  expiresAt: z.string().datetime().nullable().optional(),
});

export async function POST(request: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = createSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid coupon details", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { code, description, discountPercent, minOrderValue, isActive, expiresAt } = parsed.data;
  const normalizedCode = code.trim().toUpperCase();

  const duplicate = await prisma.coupon.findUnique({ where: { code: normalizedCode } });
  if (duplicate) {
    return NextResponse.json({ error: "A coupon with this code already exists." }, { status: 409 });
  }

  const coupon = await prisma.coupon.create({
    data: {
      code: normalizedCode,
      description: description?.trim() || null,
      discountPercent,
      minOrderValue: minOrderValue ?? null,
      isActive: isActive ?? true,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    },
  });

  return NextResponse.json({ coupon }, { status: 201 });
}
