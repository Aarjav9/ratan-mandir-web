import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { signCustomerSession } from "@/lib/session";
import { CUSTOMER_COOKIE } from "@/lib/customerAuth";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const INVALID = { error: "Invalid email or password" } as const;

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(INVALID, { status: 401 });
  }

  const { email, password } = parsed.data;
  const customer = await prisma.customer.findUnique({ where: { email } });

  // Generic failure for unknown email, no password set yet, or a wrong
  // password — never leak which case it was.
  if (!customer?.passwordHash || !(await verifyPassword(password, customer.passwordHash))) {
    return NextResponse.json(INVALID, { status: 401 });
  }

  const token = await signCustomerSession({ customerId: customer.id, email: customer.email });
  const response = NextResponse.json({ customer: { id: customer.id, name: customer.name, email: customer.email } });
  response.cookies.set(CUSTOMER_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
