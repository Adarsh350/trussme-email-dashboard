import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const dashboardPassword = process.env.DASHBOARD_PASSWORD;

    if (!dashboardPassword || dashboardPassword === "changeme") {
      // No password configured — allow access
      return NextResponse.json({ success: true });
    }

    if (password !== dashboardPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Set auth cookie
    const hashedValue = hashSimple(dashboardPassword);
    const response = NextResponse.json({ success: true });
    response.cookies.set("dashboard_auth", hashedValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

function hashSimple(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const chr = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return `dh_${Math.abs(hash).toString(36)}`;
}
