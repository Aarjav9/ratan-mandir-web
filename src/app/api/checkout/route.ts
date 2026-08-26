import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { createRazorpayOrder } from "@/lib/razorpay";

const checkoutSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        variantId: z.string().nullable(),
        quantity: z.number().int().positive(),
        // Client-sent price is used only as a display fallback — the
        // authoritative price is always re-read from the database below so
        // a tampered client request cannot change what gets charged.
        price: z.number().nonnegative(),
      })
    )
    .min(1, "Cart cannot be empty"),
  shippingAddress: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(6),
    line1: z.string().min(1),
    line2: z.string().optional().default(""),
    city: z.string().min(1),
    state: z.string().min(1),
    pincode: z.string().min(4),
  }),
});

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const parsed = checkoutSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid checkout payload", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { items, shippingAddress } = parsed.data;

    // Re-fetch authoritative prices from the database rather than trusting
    // the client-supplied price on each cart line.
    const productIds = Array.from(new Set(items.map((item) => item.productId)));
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      include: { variants: true },
    });
    type ProductWithVariants = (typeof products)[number];
    type VariantRow = ProductWithVariants["variants"][number];

    let totalAmount = 0;
    const orderItemsData: {
      productId: string;
      variantId: string | null;
      quantity: number;
      priceAtPurchase: number;
    }[] = [];

    for (const item of items) {
      const product = products.find((p: ProductWithVariants) => p.id === item.productId);
      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.productId} not found` },
          { status: 400 }
        );
      }

      let unitPrice = Number(product.basePrice);
      if (item.variantId) {
        const variant = product.variants.find((v: VariantRow) => v.id === item.variantId);
        if (!variant) {
          return NextResponse.json(
            { error: `Variant ${item.variantId} not found for product ${item.productId}` },
            { status: 400 }
          );
        }
        unitPrice = variant.priceOverride ? Number(variant.priceOverride) : unitPrice;
      }

      totalAmount += unitPrice * item.quantity;
      orderItemsData.push({
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
        priceAtPurchase: unitPrice,
      });
    }

    // Guest-friendly customer record: find-or-create by email so repeat
    // shoppers accumulate order history, without requiring a real login.
    // Real authentication (passwords, OTP, sessions) is a follow-up item.
    const customer = await prisma.customer.upsert({
      where: { email: shippingAddress.email },
      update: { name: shippingAddress.name, phone: shippingAddress.phone },
      create: {
        name: shippingAddress.name,
        email: shippingAddress.email,
        phone: shippingAddress.phone,
      },
    });

    const address = await prisma.address.create({
      data: {
        customerId: customer.id,
        line1: shippingAddress.line1,
        line2: shippingAddress.line2 || null,
        city: shippingAddress.city,
        state: shippingAddress.state,
        pincode: shippingAddress.pincode,
        phone: shippingAddress.phone,
      },
    });

    const order = await prisma.order.create({
      data: {
        customerId: customer.id,
        shippingAddressId: address.id,
        status: "PENDING",
        totalAmount,
        items: { create: orderItemsData },
      },
    });

    // amountInPaise: Razorpay expects amounts in the smallest currency unit.
    const razorpayOrder = await createRazorpayOrder({
      amountInPaise: Math.round(totalAmount * 100),
      receipt: order.id,
      notes: { orderId: order.id, customerEmail: shippingAddress.email },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { razorpayOrderId: razorpayOrder.id },
    });

    return NextResponse.json({
      dbOrderId: order.id,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      isMock: razorpayOrder.isMock,
    });
  } catch (error) {
    console.error("Checkout error", error);
    return NextResponse.json({ error: "Checkout failed. Please try again." }, { status: 500 });
  }
}
