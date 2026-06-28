export const dynamic = "force-dynamic";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Package, ChevronLeft } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { formatPrice } from "@/utils/formatPrice";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "@prisma/client";

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
  }).format(date);

const OrdersPage = async () => {
  const session = await auth();
  if (!session?.user?.id) redirect(ROUTES.login);

  const orders = await db.order.findMany({
    where: { userId: session.user.id },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container-luxury py-12 lg:py-16">
      {/* Header */}
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="type-overline mb-2 text-gold">حساب کاربری</p>
          <h1 className="type-display-sm text-foreground">سفارش‌های من</h1>
        </div>
        <Link
          href={ROUTES.shop}
          className="hidden items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-gold sm:inline-flex"
        >
          ادامه خرید
          <ChevronLeft className="size-3.5 rtl:rotate-180" />
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center py-24 text-center">
          <div className="mb-6 flex size-16 items-center justify-center rounded-full border border-border bg-muted/40">
            <Package className="size-7 text-muted-foreground" aria-hidden />
          </div>
          <p className="mb-2 text-lg font-light text-foreground">هنوز سفارشی ثبت نکرده‌اید</p>
          <p className="mb-8 text-sm text-muted-foreground">
            پس از خرید، سفارش‌های شما اینجا نمایش داده می‌شوند.
          </p>
          <Link
            href={ROUTES.shop}
            className="inline-flex items-center gap-2 rounded-xl border border-gold bg-gold/5 px-6 py-3 text-sm font-medium text-gold transition-colors hover:bg-gold hover:text-gold-foreground"
          >
            مشاهده محصولات
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={ROUTES.orderDetail(order.id)}
              className={cn(
                "flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-luxury-xs",
                "transition-[border-color,shadow] duration-[220ms]",
                "hover:border-gold/40 hover:shadow-luxury-sm sm:flex-row sm:items-center sm:gap-6",
              )}
            >
              {/* Order number + date */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium text-foreground">{order.orderNumber}</p>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-md border px-2 py-0.5 text-xs",
                      STATUS_COLORS[order.status],
                    )}
                  >
                    {STATUS_LABELS[order.status]}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {formatDate(order.createdAt)} · {order.items.length} کالا
                </p>
              </div>

              {/* Total */}
              <div className="text-end">
                <p className="text-lg font-light text-foreground">{formatPrice(order.total)}</p>
                <p className="text-xs text-muted-foreground">مبلغ پرداختی</p>
              </div>

              <ChevronLeft
                className="hidden size-4 shrink-0 text-muted-foreground sm:block rtl:rotate-180"
                aria-hidden
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
