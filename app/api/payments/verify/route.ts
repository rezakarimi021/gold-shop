import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { zarinpal } from "@/lib/zarinpal";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const authority = searchParams.get("Authority");
  const status = searchParams.get("Status");

  const baseUrl =
    process.env.NEXT_PUBLIC_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  // User cancelled payment on ZarinPal side
  if (!authority || status !== "OK") {
    if (authority) {
      const payment = await db.payment.findFirst({ where: { authority } });
      if (payment) {
        await db.payment.update({
          where: { id: payment.id },
          data: { status: "CANCELLED" },
        });
        return NextResponse.redirect(
          new URL(`/shop/checkout/failed?orderId=${payment.orderId}`, baseUrl),
        );
      }
    }
    return NextResponse.redirect(new URL("/shop/checkout/failed", baseUrl));
  }

  const payment = await db.payment.findFirst({ where: { authority } });
  if (!payment) {
    return NextResponse.redirect(new URL("/shop/checkout/failed", baseUrl));
  }

  try {
    const result = await zarinpal.verifyPayment(authority, payment.amount);

    if (result.success) {
      await db.$transaction([
        db.payment.update({
          where: { id: payment.id },
          data: {
            status: "SUCCESS",
            gatewayRef: result.refId,
            completedAt: new Date(),
            gatewayResponse: { code: result.code, refId: result.refId },
          },
        }),
        db.order.update({
          where: { id: payment.orderId },
          data: { status: "PAID" },
        }),
      ]);

      return NextResponse.redirect(
        new URL(`/shop/checkout/confirmed?orderId=${payment.orderId}`, baseUrl),
      );
    }

    await db.payment.update({
      where: { id: payment.id },
      data: {
        status: "FAILED",
        gatewayResponse: { code: result.code },
      },
    });

    return NextResponse.redirect(
      new URL(`/shop/checkout/failed?orderId=${payment.orderId}`, baseUrl),
    );
  } catch (err) {
    console.error("[payments/verify]", err);
    return NextResponse.redirect(
      new URL(`/shop/checkout/failed?orderId=${payment.orderId}`, baseUrl),
    );
  }
}
