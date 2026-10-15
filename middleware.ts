import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/adminToken";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authed = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login" && !authed) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Already logged in: skip the login page
  if (pathname === "/admin/login" && authed) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
