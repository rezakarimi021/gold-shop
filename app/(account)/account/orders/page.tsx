import Link from "next/link";
import { Package, LogIn } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const OrdersPage = () => (
  <div className="container-luxury py-12 lg:py-16">
    <div className="mb-10">
      <p className="type-overline mb-2 text-gold">حساب کاربری</p>
      <h1 className="type-display-sm text-foreground">سفارش‌های من</h1>
    </div>

    <div className="flex flex-col items-center py-24 text-center">
      <div className="mb-6 flex size-16 items-center justify-center rounded-full border border-border bg-muted/40">
        <Package className="size-7 text-muted-foreground" aria-hidden />
      </div>
      <p className="mb-2 text-lg font-light text-foreground">ابتدا وارد حساب خود شوید</p>
      <p className="mb-8 max-w-sm text-sm text-muted-foreground">
        برای مشاهده سفارش‌ها باید وارد حساب کاربری خود شوید.
      </p>
      <Link href={ROUTES.login} className={cn(buttonVariants({ variant: "gold", size: "lg" }))}>
        <LogIn className="ms-2 size-4" aria-hidden />
        ورود به حساب
      </Link>
    </div>
  </div>
);

export default OrdersPage;
