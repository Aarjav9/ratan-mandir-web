import { cookies } from "next/headers";
import { verifySession, type AdminSessionPayload } from "@/lib/session";

export const ADMIN_COOKIE = "admin_session";

export async function getAdminSession(): Promise<AdminSessionPayload | null> {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  if (!token) return null;
  const session = await verifySession(token);
  return session?.role === "admin" ? session : null;
}

export async function requireAdmin(): Promise<boolean> {
  return (await getAdminSession()) !== null;
}
