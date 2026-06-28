export const dynamic = "force-dynamic";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Copy } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { formatPrice } from "@/utils/formatPrice";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PageProps {
  searchParams: Promise<{ orderId?: string; method?: string }>;
}

const CARD_NUMBER = process.env.CARD_TO_CARD_NUMBER ?? "6037-9975-XXXX-XXXX";
const CARD_HOLDER = process.env.CARD_TO_CARD_HOLDER ?? "طلافروشی گُلد";

const CheckoutConfirmedPage = async ({ searchParams }: PageProps) => {
  const { orderId, method } = await searchParams;

  if (!orderId) redirect(ROUTES.shop);

  const order = await db.order.findUnique({
    where: { id: orderId },
    include: { payment: true, items: true },
  });

  if (!order) redirect(ROUTES.shop);

  const isCard = method === "card" || order.paymentMethod === "card";

  return (
    <div className="min-h-[calc(100vh-80px)] bg-background pt-16 md:pt-20">
      <div className="container-luxury py-16 text-center">
        {/* Animated icon — rendered with CSS since this is a server component */}
        <div
          className={cn(
            "mx-auto mb-8 flex size-20 items-center justify-center rounded-full",
            "border border-success/20 bg-success/10",
          )}
          aria-hidden="true"
        >
          <ShieldCheck className="size-8 text-success" />
        </div>

        <h1 className="type-display-sm mb-3 text-foreground">
          {isCard ? "سفارش شما ثبت شد" : "پرداخت موفق"}
        </h1>

        <p className="mx-auto mb-3 max-w-md text-muted-foreground">
          {isCard
            ? "لطفاً مبلغ را به شماره کارت زیر واریز کنید و تصویر فیش را برای ما ارسال نمایید."
            : "پرداخت شما با موفقیت انجام شد. سفارش در اسرع وقت پردازش خواهد شد."}
        </p>

        {/* Order number */}
        <div className="mb-8 inline-flex items-center gap-2">
          <span className="text-xs text-muted-foreground">شماره سفارش:</span>
          <span className="rounded-md border border-gold/30 bg-gold-muted px-2.5 py-0.5 text-xs font-medium tracking-wide text-gold-dark">
            {order.orderNumber}
          </span>
        </div>

        {/* Card transfer details */}
        {isCard && (
          <div className="mx-auto mb-10 max-w-sm rounded-2xl border border-gold/30 bg-gold-muted p-6 text-right">
            <p className="mb-4 text-sm font-medium text-foreground">اطلاعات واریز</p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">شماره کارت</span>
                <div className="flex items-center gap-2">
                  <span
                    dir="ltr"
                    className="font-mono text-sm font-medium tracking-wider text-foreground"
                  >
                    {CARD_NUMBER}
                  </span>
                  <button
                    type="button"
                    aria-label="کپی شماره کارت"
                    className="text-gold transition-colors hover:text-gold-dark"
                  >
                    <Copy className="size-3.5" aria-hidden />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">به نام</span>
                <span className="text-foreground">{CARD_HOLDER}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">مبلغ</span>
                <span className="font-medium text-foreground">{formatPrice(order.total)}</span>
              </div>
            </div>
            <p className="mt-4 rounded-lg bg-gold/10 p-2.5 text-xs text-gold-dark">
              پس از واریز، تصویر فیش را از طریق واتس‌اپ یا تلگرام برای ما ارسال کنید.
            </p>
          </div>
        )}

        {!isCard && order.payment?.gatewayRef && (
          <div className="mx-auto mb-10 max-w-sm rounded-2xl border border-border bg-card p-5 text-right">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">کد پیگیری</span>
              <span dir="ltr" className="font-mono font-medium text-foreground">
                {order.payment.gatewayRef}
              </span>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={ROUTES.orders}
            className={cn(buttonVariants({ variant: "gold", size: "lg" }))}
          >
            مشاهده سفارش‌ها
          </Link>
          <Link
            href={ROUTES.shop}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            ادامه خرید
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutConfirmedPage;
