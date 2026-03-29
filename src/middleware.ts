import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/login", "/api/"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Allow static files
  if (pathname.startsWith("/_next") || pathname.startsWith("/favicon")) {
    return NextResponse.next();
  }

  // Check if password protection is enabled
  const dashboardPassword = process.env.DASHBOARD_PASSWORD;
  if (!dashboardPassword || dashboardPassword === "" || dashboardPassword === "changeme") {
    // No password set — allow access
    return NextResponse.next();
  }

  // Check auth cookie
  const authCookie = request.cookies.get("dashboard_auth");
  if (authCookie?.value === hashSimple(dashboardPassword)) {
    return NextResponse.next();
  }

  // Redirect to login
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("redirect", pathname);
  return NextResponse.redirect(loginUrl);
}

function hashSimple(input: string): string {
  // Simple hash for cookie verification (not cryptographic — adequate for a password gate)
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const chr = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return `dh_${Math.abs(hash).toString(36)}`;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
