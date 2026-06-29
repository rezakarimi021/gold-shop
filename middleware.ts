import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Auth guard is server-only and cannot run on static hosts.
// The account pages show a login prompt when no session is detected client-side.
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*"],
};
