import Link from "next/link";
import { XCircle, RefreshCw } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PageProps {
  searchParams: Promise<{ orderId?: string }>;
}

const CheckoutFailedPage = async ({ searchParams }: PageProps) => {
  const { orderId } = await searchParams;

  return (
    <div className="min-h-[calc(100vh-80px)] bg-background pt-16 md:pt-20">
      <div className="container-luxury py-16 text-center">
        <div
          className={cn(
            "mx-auto mb-8 flex size-20 items-center justify-center rounded-full",
            "border border-destructive/20 bg-destructive/5",
          )}
          aria-hidden="true"
        >
          <XCircle className="size-8 text-destructive" />
        </div>

        <h1 className="type-display-sm mb-3 text-foreground">پرداخت ناموفق</h1>

        <p className="mx-auto mb-10 max-w-md text-muted-foreground">
          متأسفانه پرداخت شما انجام نشد. مبلغ از حساب شما کسر نشده است. می‌توانید دوباره تلاش کنید.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {orderId ? (
            <Link
              href={`/api/payments/initiate`}
              className={cn(buttonVariants({ variant: "gold", size: "lg" }))}
            >
              <RefreshCw className="ms-1 size-4" aria-hidden />
              تلاش مجدد
            </Link>
          ) : null}
          <Link
            href={ROUTES.cart}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            بازگشت به سبد خرید
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFailedPage;
