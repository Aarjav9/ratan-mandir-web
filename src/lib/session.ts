import { SignJWT, jwtVerify } from "jose";

// Hard-fail rather than falling back to a stub secret: unlike the Razorpay
// mock-mode convention, an insecure default here would silently make every
// admin/customer session forgeable.
if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET environment variable is not set.");
}

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

export type AdminSessionPayload = { role: "admin" };
export type CustomerSessionPayload = {
  role: "customer";
  customerId: string;
  email: string;
};
export type SessionPayload = AdminSessionPayload | CustomerSessionPayload;

export async function signAdminSession(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function signCustomerSession(
  payload: Omit<CustomerSessionPayload, "role">
): Promise<string> {
  return new SignJWT({ role: "customer", ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret);
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    if (payload.role === "admin") {
      return { role: "admin" };
    }
    if (payload.role === "customer" && typeof payload.customerId === "string" && typeof payload.email === "string") {
      return { role: "customer", customerId: payload.customerId, email: payload.email };
    }
    return null;
  } catch {
    return null;
  }
}
