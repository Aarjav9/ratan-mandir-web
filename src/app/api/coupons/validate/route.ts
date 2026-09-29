import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { validateCoupon } from "@/lib/coupons";

const schema = z.object({
  code: z.string().min(1),
  subtotal: z.number().nonnegative(),
});

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ valid: false, message: "Invalid request." }, { status: 400 });
  }

  const result = await validateCoupon(parsed.data.code, parsed.data.subtotal);
  return NextResponse.json(result, { status: result.valid ? 200 : 400 });
}
