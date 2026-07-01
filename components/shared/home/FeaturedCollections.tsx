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
        {/* Section header — editorial two-column: headline start, description/CTA end */}
        <ScrollReveal className="mb-14 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
          <h2 className="type-display-md text-foreground">داستان‌هایی در طلا</h2>

          <div className="flex flex-col items-start gap-4 sm:items-end">
            <p className="max-w-[28ch] text-sm leading-relaxed text-muted-foreground sm:text-end">
              هر کلکسیون یک روایت است — ساخته‌شده از طلا، الهام گرفته از فصل‌ها و لحظه‌های زندگی.
            </p>
            <Link
              href={ROUTES.shop}
              className={cn(
                "group inline-flex items-center gap-2",
                "text-sm font-medium text-muted-foreground",
                "transition-colors duration-[150ms] hover:text-gold",
              )}
            >
              مشاهده همه کلکسیون‌ها
              <ArrowLeft
                className={cn(
                  "size-3.5 rtl:rotate-180",
                  "transition-transform duration-[220ms]",
                  "group-hover:-translate-x-1 rtl:group-hover:translate-x-1",
                )}
              />
            </Link>
          </div>
        </ScrollReveal>

        {/* Collection cards grid */}
        <ScrollReveal delay={0.12}>
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
      </div>
    </section>
  );
};
