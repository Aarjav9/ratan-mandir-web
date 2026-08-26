import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyWebhookSignature } from "@/lib/razorpay";

/**
 * Razorpay webhook handler.
 *
 * Configure this URL (https://yourdomain.com/api/webhook/razorpay) in the
 * Razorpay Dashboard under Settings → Webhooks, subscribed to at least the
 * "payment.captured" event, and set RAZORPAY_WEBHOOK_SECRET in your
 * deployment environment to the secret shown there.
 *
 * Docs: https://razorpay.com/docs/webhooks/
 *
 * In stub mode (no RAZORPAY_WEBHOOK_SECRET configured) signature
 * verification is skipped — see verifyWebhookSignature() in
 * src/lib/razorpay.ts — which is fine for local development but must never
 * be relied on in production.
 */
export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature") ?? "";

  const isValid = verifyWebhookSignature(rawBody, signature);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
  }

  let payload: {
    event?: string;
    payload?: {
      payment?: {
        entity?: {
          id?: string;
          order_id?: string;
        };
      };
    };
  };

  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const event = payload.event;
  const paymentEntity = payload.payload?.payment?.entity;

  if (event === "payment.captured" && paymentEntity?.order_id) {
    const order = await prisma.order.findFirst({
      where: { razorpayOrderId: paymentEntity.order_id },
    });

    if (order) {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: "PAID",
          razorpayPaymentId: paymentEntity.id ?? order.razorpayPaymentId,
        },
      });
    }
  }

  // Razorpay expects a 2xx response to acknowledge receipt of the webhook.
  return NextResponse.json({ received: true });
}
