export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { createOrderSchema } from "@/lib/validations/order";
import { SHIPPING } from "@/constants/config";

export async function POST(request: NextRequest) {
  const session = await auth();
  const body = await request.json().catch(() => null);

  const parsed = createOrderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "اطلاعات نامعتبر", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { customer, shipping, paymentMethod, items } = parsed.data;

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const shippingCost = subtotal >= SHIPPING.freeThreshold ? 0 : SHIPPING.flatRate;
  const total = subtotal + shippingCost;

  const order = await db.order.create({
    data: {
      orderNumber: `GLD-${Date.now().toString().slice(-8)}`,
      userId: session?.user?.id ?? null,
      customerName: `${customer.firstName} ${customer.lastName}`,
      customerPhone: customer.phone,
      customerEmail: customer.email || null,
      shippingAddress: {
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone,
        province: shipping.province,
        city: shipping.city,
        address: shipping.address,
        postalCode: shipping.postalCode,
      },
      status: "PAYMENT_PENDING",
      paymentMethod,
      subtotal,
      shippingCost,
      discount: 0,
      total,
      items: {
        create: items.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          snapshot: {
            name: item.productName,
            karat: item.karat,
            weight: item.weight,
            image: item.productImage ?? null,
          },
        })),
      },
    },
  });

  return NextResponse.json(
    {
      id: order.id,
      orderNumber: order.orderNumber,
      total: order.total,
      paymentMethod: order.paymentMethod,
    },
    { status: 201 },
  );
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "احراز هویت لازم است" }, { status: 401 });
  }

  const orders = await db.order.findMany({
    where: { userId: session.user.id },
    include: { items: true, payment: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ orders });
}
