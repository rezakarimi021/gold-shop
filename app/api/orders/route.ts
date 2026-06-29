import { NextResponse } from "next/server";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(
    { error: "Authentication required — this endpoint is not available on static deployments." },
    { status: 401 },
  );
}

export function POST() {
  return NextResponse.json(
    { error: "Authentication required — this endpoint is not available on static deployments." },
    { status: 401 },
  );
}
