import { cookies } from "next/headers";
import { verifySession } from "@/lib/session";

export const ADMIN_COOKIE = "admin_session";

export async function requireAdmin(): Promise<boolean> {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  const session = await verifySession(token);
  return session?.role === "admin";
}
