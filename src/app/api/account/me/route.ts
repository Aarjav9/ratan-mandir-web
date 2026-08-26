import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentCustomer } from "@/lib/customerAuth";

export async function GET() {
  const session = await getCurrentCustomer();
  if (!session) {
    return NextResponse.json({ customer: null });
  }

  const customer = await prisma.customer.findUnique({
    where: { id: session.customerId },
    select: { id: true, name: true, email: true },
  });

  return NextResponse.json({ customer });
}
