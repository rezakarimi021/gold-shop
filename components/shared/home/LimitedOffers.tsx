import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { formatPrice } from "@/utils/formatPrice";
import type { ProductSummary } from "@/types/product";

interface LimitedOffersProps {
  product: ProductSummary | undefined;
}

export const LimitedOffers = ({ product }: LimitedOffersProps) => {
  if (!product) return null;

  return (
    <section
      className="section-spacing overflow-hidden bg-secondary text-secondary-foreground"
      aria-label="پیشنهاد ویژه محدود"
    >
      <div className="container-luxury">
        <div className={cn("grid items-center gap-12", "lg:grid-cols-[1fr_auto]")}>
          {/* Content — start side (right in RTL) */}
          <div className="max-w-lg">
            {/* Offer badge */}
            <div className="mb-6 flex items-center gap-3">
              <Badge variant="limited">پیشنهاد ویژه</Badge>
              <div className="flex items-center gap-1.5 text-xs text-secondary-foreground/60">
                <Clock className="size-3.5" />
                <span>موجودی محدود</span>
              </div>
            </div>

            <p className="type-overline mb-4 text-gold-light">انتخاب سردبیر</p>

            <h2 className="type-display-md mb-4 text-secondary-foreground">{product.name}</h2>

            {/* Gold divider */}
            <div aria-hidden="true" className="mb-6 h-px w-12 bg-gold/50" />

            <p className="mb-8 text-lg leading-relaxed font-light text-secondary-foreground/70">
              قطعه‌ای کمیاب از مجموعه منتخب ما. دست‌ساز با طلای {product.baseKarat} عیار، برای کسانی
              که در پی چیزی خاص‌تر از معمول هستند.
            </p>

            {/* Price + CTA row */}
            <div className="flex flex-wrap items-center gap-6">
              <div>
                <p className="type-overline mb-1 text-secondary-foreground/50">قیمت ویژه</p>
                <p className="text-2xl font-light tracking-wide text-secondary-foreground">
                  {formatPrice(product.basePrice)}
                </p>
              </div>

              <Link
                href={ROUTES.product(product.slug)}
                className={cn(buttonVariants({ variant: "gold", size: "lg" }))}
              >
                مشاهده محصول
              </Link>

              <Link
                href={ROUTES.shop}
                className={cn(
                  "group inline-flex items-center gap-2",
                  "text-sm font-medium text-secondary-foreground/60",
                  "transition-colors hover:text-secondary-foreground",
                )}
              >
                سایر پیشنهادها
                <ArrowLeft
                  className={cn(
                    "size-3.5 transition-transform duration-[220ms]",
                    "rtl:rotate-180 group-hover:rtl:-translate-x-1",
                  )}
                />
              </Link>
            </div>

            {/* Low stock indicator */}
            {product.stockStatus === "low_stock" && (
              <div className="mt-8 flex items-center gap-2">
                <div className="size-2 animate-pulse rounded-full bg-warning" />
                <span className="text-xs text-secondary-foreground/60">
                  موجودی کم — فقط چند عدد باقی مانده
                </span>
              </div>
            )}
          </div>

          {/* Product image — end side (left in RTL) */}
          <div
            className={cn(
              "relative mx-auto w-full max-w-xs",
              "aspect-[3/4] overflow-hidden rounded-2xl",
              "shadow-luxury-xl",
              "image-hover-luxury",
            )}
          >
            <Image
              src={product.primaryImage.url}
              alt={product.primaryImage.alt}
              fill
              sizes="(max-width: 1024px) 80vw, 320px"
              className="object-cover"
              data-luxury-image
            />

            {/* Karat badge overlay */}
            <div className="absolute start-4 top-4">
              <Badge variant="karat">{product.baseKarat}K</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
