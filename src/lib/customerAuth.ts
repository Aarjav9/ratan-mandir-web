import { cookies } from "next/headers";
import { verifySession, CustomerSessionPayload } from "@/lib/session";

export const CUSTOMER_COOKIE = "customer_session";

export async function getCurrentCustomer(): Promise<
  Pick<CustomerSessionPayload, "customerId" | "email"> | null
> {
  const token = cookies().get(CUSTOMER_COOKIE)?.value;
  if (!token) return null;
  const session = await verifySession(token);
  if (!session || session.role !== "customer") return null;
  return { customerId: session.customerId, email: session.email };
}
