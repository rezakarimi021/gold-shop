export const dynamic = "force-dynamic";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Package } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { formatPrice } from "@/utils/formatPrice";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "@prisma/client";

interface PageProps {
  params: Promise<{ id: string }>;
}

const STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: "در انتظار",
  PAYMENT_PENDING: "در انتظار پرداخت",
  PAID: "پرداخت شده",
  PROCESSING: "در حال پردازش",
  SHIPPED: "ارسال شده",
  DELIVERED: "تحویل داده شده",
  CANCELLED: "لغو شده",
  REFUNDED: "مسترد شده",
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  PENDING: "text-muted-foreground border-border bg-muted/40",
  PAYMENT_PENDING: "text-warning border-warning/30 bg-warning/5",
  PAID: "text-success border-success/30 bg-success/5",
  PROCESSING: "text-info border-info/30 bg-info/5",
  SHIPPED: "text-gold-dark border-gold/30 bg-gold-muted",
  DELIVERED: "text-success border-success/30 bg-success/10",
  CANCELLED: "text-muted-foreground border-border bg-muted/40",
  REFUNDED: "text-muted-foreground border-border bg-muted/40",
};

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

interface ItemSnapshot {
  name?: string;
  karat?: number;
  weight?: number;
  image?: string | null;
}

const OrderDetailPage = async ({ params }: PageProps) => {
  const session = await auth();
  if (!session?.user?.id) redirect(ROUTES.login);

  const { id } = await params;

  const order = await db.order.findUnique({
    where: { id },
    include: { items: true, payment: true },
  });

  if (!order) notFound();

  if (order.userId && order.userId !== session.user.id) {
    redirect(ROUTES.orders);
  }

  const address = order.shippingAddress as {
    province?: string;
    city?: string;
    address?: string;
    postalCode?: string;
  };

  return (
    <div className="container-luxury py-12 lg:py-16">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-xs text-muted-foreground">
        <Link href={ROUTES.orders} className="transition-colors hover:text-gold">
          سفارش‌های من
        </Link>
        <ChevronLeft className="size-3 rtl:rotate-180" aria-hidden />
        <span className="text-foreground">{order.orderNumber}</span>
      </nav>

      {/* Header */}
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="type-display-sm text-foreground">{order.orderNumber}</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
        </div>
        <span
          className={cn(
            "inline-flex items-center rounded-lg border px-3 py-1.5 text-sm font-medium",
            STATUS_COLORS[order.status],
          )}
        >
          {STATUS_LABELS[order.status]}
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* Items */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card shadow-luxury-xs">
            <div className="border-b border-border px-5 py-4">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Package className="size-4 text-gold" aria-hidden />
                کالاهای سفارش
              </div>
            </div>
            <div className="divide-y divide-border">
              {order.items.map((item) => {
                const snap = item.snapshot as ItemSnapshot;
                return (
                  <div key={item.id} className="flex items-center gap-4 px-5 py-4">
                    {snap.image && (
                      <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Image
                          src={snap.image}
                          alt={snap.name ?? "محصول"}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">{snap.name ?? "محصول"}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {snap.karat ? `${snap.karat} عیار` : ""}
                        {snap.weight ? ` · ${snap.weight} گرم` : ""}
                      </p>
                    </div>
                    <div className="text-end">
                      <p className="text-sm text-foreground">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </p>
                      <p className="text-xs text-muted-foreground">× {item.quantity}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Shipping address */}
          {address.province && (
            <div className="rounded-2xl border border-border bg-card p-5 shadow-luxury-xs">
              <p className="mb-3 text-sm font-medium text-foreground">آدرس تحویل</p>
              <address className="space-y-0.5 text-sm text-muted-foreground not-italic">
                <p>{order.customerName}</p>
                <p>{order.customerPhone}</p>
                <p>
                  {address.province}، {address.city}
                </p>
                <p>{address.address}</p>
                {address.postalCode && <p>کد پستی: {address.postalCode}</p>}
              </address>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-luxury-xs">
            <p className="mb-4 text-sm font-medium text-foreground">خلاصه مالی</p>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">جمع کالاها</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">هزینه ارسال</span>
                <span className={order.shippingCost === 0 ? "text-success" : ""}>
                  {order.shippingCost === 0 ? "رایگان" : formatPrice(order.shippingCost)}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-success">
                  <span>تخفیف</span>
                  <span>−{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="divider-gold my-1" />
              <div className="flex justify-between font-medium">
                <span className="text-foreground">مبلغ کل</span>
                <span className="text-lg font-light text-foreground">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment info */}
          {order.payment && (
            <div className="rounded-2xl border border-border bg-card p-5 shadow-luxury-xs">
              <p className="mb-3 text-sm font-medium text-foreground">اطلاعات پرداخت</p>
              <div className="space-y-1.5 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>درگاه</span>
                  <span className="text-foreground">
                    {order.payment.gateway === "zarinpal"
                      ? "زرین‌پال"
                      : order.payment.gateway === "card"
                        ? "کارت به کارت"
                        : order.payment.gateway}
                  </span>
                </div>
                {order.payment.gatewayRef && (
                  <div className="flex justify-between">
                    <span>کد پیگیری</span>
                    <span dir="ltr" className="font-mono text-xs text-foreground">
                      {order.payment.gatewayRef}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
