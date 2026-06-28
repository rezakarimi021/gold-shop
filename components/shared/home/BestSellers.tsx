import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { ProductCard } from "@/components/ui/product-card";
import { ScrollReveal } from "@/components/shared/motion/ScrollReveal";
import type { ProductSummary } from "@/types/product";

interface BestSellersProps {
  products: ProductSummary[];
}

export const BestSellers = ({ products }: BestSellersProps) => {
  if (products.length === 0) return null;

  return (
    <section className="section-spacing bg-muted/30" aria-label="پرفروش‌ترین‌ها">
      <div className="container-luxury">
        {/* Section header */}
        <ScrollReveal className="mb-12 flex items-end justify-between">
          <div>
            <p className="type-overline mb-3 text-gold">انتخاب مشتریان</p>
            <h2 className="type-display-md text-foreground">پرفروش‌ترین‌ها</h2>
          </div>

          <Link
            href={ROUTES.shop}
            className={cn(
              "group hidden items-center gap-2 sm:flex",
              "text-sm font-medium text-muted-foreground",
              "transition-colors duration-[150ms] hover:text-gold",
            )}
          >
            مشاهده همه
            <ArrowLeft
              className={cn(
                "size-3.5 transition-transform duration-[220ms]",
                "rtl:rotate-180 group-hover:rtl:-translate-x-1",
              )}
            />
          </Link>
        </ScrollReveal>

        {/* Product grid */}
        <ScrollReveal delay={0.1}>
          <div className="product-grid">
            {products.slice(0, 4).map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 2} />
            ))}
          </div>
        </ScrollReveal>

        {/* Mobile CTA */}
        <div className="mt-10 text-center sm:hidden">
          <Link
            href={ROUTES.shop}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-gold"
          >
            مشاهده همه محصولات
          </Link>
        </div>
      </div>
    </section>
  );
};
