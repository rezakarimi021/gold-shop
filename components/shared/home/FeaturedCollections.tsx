import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { CollectionCard } from "@/components/ui/collection-card";
import { ScrollReveal } from "@/components/shared/motion/ScrollReveal";
import type { ProductCollection } from "@/types/product";

interface FeaturedCollectionsProps {
  collections: ProductCollection[];
}

export const FeaturedCollections = ({ collections }: FeaturedCollectionsProps) => {
  if (collections.length === 0) return null;

  return (
    <section className="section-spacing bg-background" aria-label="کلکسیون‌های برتر">
      <div className="container-luxury">
        {/* Section header */}
        <ScrollReveal className="mb-12 flex items-end justify-between">
          <div>
            <p className="type-overline mb-3 text-gold">کلکسیون‌ها</p>
            <h2 className="type-display-md text-foreground">داستان‌هایی در طلا</h2>
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

        {/* Collection cards grid */}
        <ScrollReveal delay={0.1}>
          <div className="grid gap-6 md:grid-cols-2">
            {collections.slice(0, 2).map((collection, i) => (
              <CollectionCard
                key={collection.id}
                collection={collection}
                variant="landscape"
                priority={i === 0}
              />
            ))}
          </div>
        </ScrollReveal>

        {/* Mobile CTA */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href={ROUTES.shop}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-gold"
          >
            مشاهده همه کلکسیون‌ها
          </Link>
        </div>
      </div>
    </section>
  );
};
