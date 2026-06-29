import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-static";
import { z } from "zod";
import { db } from "@/lib/db";
import { zarinpal } from "@/lib/zarinpal";

const schema = z.object({ orderId: z.string().min(1) });

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Ø´Ù†Ø§Ø³Ù‡ Ø³ÙØ§Ø±Ø´ Ù†Ø§Ù…Ø¹ØªØ¨Ø±" }, { status: 400 });
  }

  const order = await db.order.findUnique({ where: { id: parsed.data.orderId } });

  if (!order) {
    return NextResponse.json({ error: "Ø³ÙØ§Ø±Ø´ ÛŒØ§ÙØª Ù†Ø´Ø¯" }, { status: 404 });
  }

  if (order.status === "PAID") {
    return NextResponse.json(
      { error: "Ø§ÛŒÙ† Ø³ÙØ§Ø±Ø´ Ù‚Ø¨Ù„Ø§Ù‹ Ù¾Ø±Ø¯Ø§Ø®Øª Ø´Ø¯Ù‡ Ø§Ø³Øª" },
      { status: 409 },
    );
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  try {
    const payment = await zarinpal.requestPayment({
      amount: order.total,
      description: `Ø³ÙØ§Ø±Ø´ ${order.orderNumber} â€” Ø·Ù„Ø§ÙØ±ÙˆØ´ÛŒ Ú¯ÙÙ„Ø¯`,
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
    return NextResponse.json(
      { error: "Ø®Ø·Ø§ Ø¯Ø± Ø§ØªØµØ§Ù„ Ø¨Ù‡ Ø¯Ø±Ú¯Ø§Ù‡ Ù¾Ø±Ø¯Ø§Ø®Øª" },
      { status: 502 },
    );
  }
}
