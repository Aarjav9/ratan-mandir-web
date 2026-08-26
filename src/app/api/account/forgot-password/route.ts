import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { signCustomerSession } from "@/lib/session";
import { CUSTOMER_COOKIE } from "@/lib/customerAuth";

const schema = z
  .object({
    email: z.string().email(),
    phone: z.string().min(6),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// No email provider is configured, so identity is verified with the email +
// phone number captured at checkout instead of an emailed reset link. This
// is a deliberately lighter-weight verification than email confirmation.
const normalizePhone = (phone: string) => phone.replace(/\D/g, "");

const GENERIC_ERROR = { error: "No account found with that email and phone number." } as const;

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { email, phone, newPassword } = parsed.data;
  const customer = await prisma.customer.findUnique({ where: { email } });

  if (!customer?.phone || normalizePhone(customer.phone) !== normalizePhone(phone)) {
    return NextResponse.json(GENERIC_ERROR, { status: 401 });
  }

  const passwordHash = await hashPassword(newPassword);
  const updated = await prisma.customer.update({
    where: { id: customer.id },
    data: { passwordHash },
  });

  const token = await signCustomerSession({ customerId: updated.id, email: updated.email });
  const response = NextResponse.json({ customer: { id: updated.id, name: updated.name, email: updated.email } });
  response.cookies.set(CUSTOMER_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
