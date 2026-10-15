import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/adminToken";

// Returns a 401 response when the caller is not a logged-in admin, otherwise null.
export async function requireAdmin(request: Request) {
  const cookies = request.headers.get("cookie") ?? "";
  const token = cookies
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${SESSION_COOKIE}=`))
    ?.slice(SESSION_COOKIE.length + 1);
  if (await verifySessionToken(token)) return null;
  return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
}
