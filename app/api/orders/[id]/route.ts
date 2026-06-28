import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: Params) {
  const session = await auth();
  const { id } = await params;

  const order = await db.order.findUnique({
    where: { id },
    include: { items: true, payment: true },
  });

  if (!order) {
    return NextResponse.json({ error: "سفارش یافت نشد" }, { status: 404 });
  }

  // Authenticated user must own the order; guest orders are accessible by orderId
  if (order.userId && order.userId !== session?.user?.id) {
    return NextResponse.json({ error: "دسترسی مجاز نیست" }, { status: 403 });
  }

  return NextResponse.json({ order });
}
