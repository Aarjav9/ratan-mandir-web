import Razorpay from "razorpay";
import crypto from "crypto";

/**
 * Razorpay integration helpers.
 *
 * This project ships without real Razorpay API keys, so every function
 * below is written to work in two modes:
 *
 *  1. STUB MODE (default): when RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET are not
 *     set in the environment, we return a clearly-fake mock response so the
 *     rest of the checkout flow (order creation, UI, redirects) can be built
 *     and demoed end-to-end without a live Razorpay account.
 *  2. LIVE MODE: once real TEST or LIVE keys are added to .env, the actual
 *     Razorpay SDK is used to create real orders / verify real signatures.
 *
 * Before going live, replace the TEST keys with LIVE keys in the deployment
 * environment (see README) — no code changes are required to do that.
 */

export interface CreateRazorpayOrderInput {
  /** Amount in the smallest currency unit — paise for INR (e.g. ₹100 = 10000). */
  amountInPaise: number;
  receipt: string;
  notes?: Record<string, string>;
}

export interface CreateRazorpayOrderResult {
  id: string;
  amount: number;
  currency: string;
  status: string;
  isMock: boolean;
}

function getRazorpayClient(): Razorpay | null {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return null;
  }

  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

/**
 * Creates a Razorpay order. Falls back to a mock order when no API keys are
 * configured, so local development and demos work without a Razorpay
 * account.
 */
export async function createRazorpayOrder(
  input: CreateRazorpayOrderInput
): Promise<CreateRazorpayOrderResult> {
  const client = getRazorpayClient();

  if (!client) {
    // ---- STUB: no live Razorpay keys configured ---------------------------
    // Returns a deterministic-looking mock order so the checkout UI has
    // something real to work with. Replace by setting RAZORPAY_KEY_ID and
    // RAZORPAY_KEY_SECRET in .env to exercise the real SDK call below.
    const mockId = `order_MOCK${Math.random().toString(36).slice(2, 12)}`;
    return {
      id: mockId,
      amount: input.amountInPaise,
      currency: "INR",
      status: "created",
      isMock: true,
    };
  }

  // ---- LIVE: real Razorpay SDK call ---------------------------------------
  const order = await client.orders.create({
    amount: input.amountInPaise,
    currency: "INR",
    receipt: input.receipt,
    notes: input.notes,
  });

  return {
    id: order.id,
    amount: Number(order.amount),
    currency: order.currency,
    status: order.status,
    isMock: false,
  };
}

/**
 * Verifies the signature Razorpay sends back after a successful checkout
 * (razorpay_order_id + razorpay_payment_id + razorpay_signature), per
 * https://razorpay.com/docs/payments/server-integration/nodejs/payment-gateway/build-integration/#3-verify-payment-signature
 *
 * In stub mode (no key secret configured) this always returns true so the
 * demo flow can proceed — DO NOT ship this behavior to production. Once
 * RAZORPAY_KEY_SECRET is set, real HMAC verification is performed.
 */
export function verifyPaymentSignature(params: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keySecret) {
    // STUB MODE — see function comment above.
    return true;
  }

  const expected = crypto
    .createHmac("sha256", keySecret)
    .update(`${params.orderId}|${params.paymentId}`)
    .digest("hex");

  return expected === params.signature;
}

/**
 * Verifies the signature on an incoming Razorpay webhook request body, using
 * the separate webhook secret configured in the Razorpay dashboard.
 * https://razorpay.com/docs/webhooks/validate-test/
 *
 * In stub mode (no webhook secret configured) this always returns true.
 */
export function verifyWebhookSignature(rawBody: string, signature: string): boolean {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (!webhookSecret) {
    // STUB MODE — see function comment above.
    return true;
  }

  const expected = crypto.createHmac("sha256", webhookSecret).update(rawBody).digest("hex");

  return expected === signature;
}
