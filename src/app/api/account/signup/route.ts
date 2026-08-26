import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { signCustomerSession } from "@/lib/session";
import { CUSTOMER_COOKIE } from "@/lib/customerAuth";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid signup details", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { name, email, phone, password } = parsed.data;

  const existing = await prisma.customer.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "An account with this email already exists. Please log in instead." },
      { status: 409 }
    );
  }

  const passwordHash = await hashPassword(password);
  const customer = await prisma.customer.create({
    data: { name, email, phone, passwordHash },
  });

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
