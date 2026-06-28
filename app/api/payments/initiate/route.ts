export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { zarinpal } from "@/lib/zarinpal";

const schema = z.object({ orderId: z.string().min(1) });

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "شناسه سفارش نامعتبر" }, { status: 400 });
  }

  const order = await db.order.findUnique({ where: { id: parsed.data.orderId } });

  if (!order) {
    return NextResponse.json({ error: "سفارش یافت نشد" }, { status: 404 });
  }

  if (order.status === "PAID") {
    return NextResponse.json({ error: "این سفارش قبلاً پرداخت شده است" }, { status: 409 });
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  try {
    const payment = await zarinpal.requestPayment({
      amount: order.total,
      description: `سفارش ${order.orderNumber} — طلافروشی گُلد`,
      callback_url: `${baseUrl}/api/payments/verify`,
      mobile: order.customerPhone,
      email: order.customerEmail ?? undefined,
    });

    await db.payment.upsert({
      where: { orderId: order.id },
      create: {
        orderId: order.id,
        gateway: "zarinpal",
        authority: payment.authority,
        amount: order.total,
        status: "INITIATED",
      },
      update: {
        authority: payment.authority,
        status: "INITIATED",
        completedAt: null,
      },
    });

    return NextResponse.json({ paymentUrl: payment.paymentUrl });
  } catch (err) {
    console.error("[payments/initiate]", err);
    return NextResponse.json({ error: "خطا در اتصال به درگاه پرداخت" }, { status: 502 });
  }
}
