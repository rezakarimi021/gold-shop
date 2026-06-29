import { NextResponse } from "next/server";

export const dynamic = "force-static";

// Provide a placeholder segment so Next.js static export can enumerate this catch-all.
// Auth endpoints require a server and are not functional on static hosting.
export function generateStaticParams() {
  return [{ nextauth: ["_"] }];
}

export function GET() {
  return NextResponse.json(
    { error: "Auth endpoints are not available on static deployments." },
    { status: 503 },
  );
}

export function POST() {
  return NextResponse.json(
    { error: "Auth endpoints are not available on static deployments." },
    { status: 503 },
  );
}
