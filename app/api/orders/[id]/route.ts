import { NextResponse } from "next/server";

export const dynamic = "force-static";

// Provide a placeholder param so Next.js static export generates this route.
// The actual order detail API requires a server and is not functional on static hosting.
export function generateStaticParams() {
  return [{ id: "_" }];
}

export function GET() {
  return NextResponse.json({ error: "Not available on static deployment" }, { status: 503 });
}
