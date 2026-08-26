import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/session";

export const config = {
  matcher: ["/admin/:path*", "/account/:path*", "/api/admin/:path*", "/api/account/:path*"],
};

const PUBLIC_ADMIN_PATHS = new Set(["/admin/login", "/api/admin/login"]);
const PUBLIC_ACCOUNT_PATHS = new Set([
  "/account/login",
  "/account/signup",
  "/account/forgot-password",
  "/api/account/login",
  "/api/account/signup",
  "/api/account/forgot-password",
]);

function unauthorized(req: NextRequest, isApi: boolean, loginPath: string) {
  if (isApi) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.redirect(new URL(loginPath, req.url));
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    if (PUBLIC_ADMIN_PATHS.has(pathname)) return NextResponse.next();

    const token = req.cookies.get("admin_session")?.value;
    const session = token ? await verifySession(token) : null;
    if (!session || session.role !== "admin") {
      return unauthorized(req, pathname.startsWith("/api/"), "/admin/login");
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/account") || pathname.startsWith("/api/account")) {
    if (PUBLIC_ACCOUNT_PATHS.has(pathname)) return NextResponse.next();

    const token = req.cookies.get("customer_session")?.value;
    const session = token ? await verifySession(token) : null;
    if (!session || session.role !== "customer") {
      return unauthorized(req, pathname.startsWith("/api/"), "/account/login");
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}
