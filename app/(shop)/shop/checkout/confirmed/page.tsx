import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CheckoutConfirmedPage = () => (
  <div className="min-h-[calc(100vh-80px)] bg-background pt-16 md:pt-20">
    <div className="container-luxury py-16 text-center">
      <div
        className={cn(
          "mx-auto mb-8 flex size-20 items-center justify-center rounded-full",
          "border border-success/20 bg-success/10",
        )}
        aria-hidden="true"
      >
        <ShieldCheck className="size-8 text-success" />
      </div>

      <h1 className="type-display-sm mb-3 text-foreground">سفارش شما ثبت شد</h1>
      <p className="mx-auto mb-10 max-w-md text-muted-foreground">
        با تشکر از خرید شما. سفارش دریافت شد و در اسرع وقت پردازش خواهد شد.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Link href={ROUTES.orders} className={cn(buttonVariants({ variant: "gold", size: "lg" }))}>
          مشاهده سفارش‌ها
        </Link>
        <Link href={ROUTES.shop} className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
          ادامه خرید
        </Link>
      </div>
    </div>
  </div>
);

export default CheckoutConfirmedPage;
