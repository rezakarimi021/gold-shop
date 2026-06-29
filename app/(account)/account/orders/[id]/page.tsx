import Link from "next/link";
import { LogIn } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Dynamic [id] segments: we can't pre-enumerate real order IDs statically,
// so we export an empty list and let Next.js generate a single shared shell.
export function generateStaticParams() {
  return [{ id: "_" }];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

const OrderDetailPage = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div className="container-luxury py-12 lg:py-16">
      <div className="mb-8">
        <p className="type-overline mb-2 text-gold">جزئیات سفارش</p>
        <h1 className="type-display-sm text-foreground">سفارش #{id}</h1>
      </div>

      <div className="flex flex-col items-center py-20 text-center">
        <p className="mb-2 text-lg font-light text-foreground">ابتدا وارد حساب خود شوید</p>
        <p className="mb-8 max-w-sm text-sm text-muted-foreground">
          برای مشاهده جزئیات سفارش باید وارد حساب کاربری خود شوید.
        </p>
        <Link href={ROUTES.login} className={cn(buttonVariants({ variant: "gold", size: "lg" }))}>
          <LogIn className="ms-2 size-4" aria-hidden />
          ورود به حساب
        </Link>
      </div>
    </div>
  );
};

export default OrderDetailPage;
