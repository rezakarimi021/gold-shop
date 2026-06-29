import { NextResponse } from "next/server";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.redirect(new URL("/shop/checkout/failed", "https://rezakarimi021.github.io"));
}
