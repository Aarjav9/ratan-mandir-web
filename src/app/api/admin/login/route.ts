import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { signAdminSession } from "@/lib/session";
import { ADMIN_COOKIE } from "@/lib/adminAuth";

const schema = z.object({ password: z.string().min(1) });

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Password is required" }, { status: 400 });
  }

  if (!process.env.ADMIN_PASSWORD || parsed.data.password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = await signAdminSession();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
