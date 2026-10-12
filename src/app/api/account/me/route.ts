import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentCustomer } from "@/lib/customerAuth";

export async function GET() {
  try {
    const session = await getCurrentCustomer();
    if (!session) {
      return NextResponse.json({ customer: null });
    }

    const customer = await prisma.customer.findUnique({
      where: { id: session.customerId },
      select: { id: true, name: true, email: true },
    });

    return NextResponse.json({ customer });
  } catch (error) {
    console.error("GET /api/account/me error", error);
    return NextResponse.json({ error: "Could not load account." }, { status: 500 });
  }
}
