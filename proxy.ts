import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/adminToken";

// Marathi is the default and lives at the root (/x is served by app/[lang] as /mr/x).
// English lives under /en. A literal /mr prefix redirects to the clean URL.
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const authed = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
    // Protect all /admin routes except /admin/login
    if (pathname !== "/admin/login" && !authed) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    // Already logged in: skip the login page
    if (pathname === "/admin/login" && authed) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) return NextResponse.next();

  if (pathname === "/mr" || pathname.startsWith("/mr/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/mr${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
