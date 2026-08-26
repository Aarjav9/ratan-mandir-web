import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentCustomer } from "@/lib/customerAuth";

export async function GET() {
  const session = await getCurrentCustomer();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await prisma.order.findMany({
    where: { customerId: session.customerId },
    include: {
      items: { include: { product: true, variant: true } },
      shippingAddress: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ orders });
}
