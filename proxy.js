import { NextResponse } from "next/server";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";

const PROTECTED_PAGE_PREFIX = "/admin/dashboard";
const PROTECTED_API_PREFIXES = ["/api/projects", "/api/certifications", "/api/events", "/api/content", "/api/visitors/reset"];
const WRITE_METHODS = ["POST", "PUT", "PATCH", "DELETE"];

export async function proxy(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySession(token) : null;

  const isProtectedPage = pathname.startsWith(PROTECTED_PAGE_PREFIX);
  const isProtectedApi =
    PROTECTED_API_PREFIXES.some((p) => pathname.startsWith(p)) && WRITE_METHODS.includes(req.method);

  if (isProtectedPage && !session) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  if (isProtectedApi && !session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*", "/api/projects/:path*", "/api/certifications/:path*", "/api/events/:path*", "/api/content/:path*"],
};
