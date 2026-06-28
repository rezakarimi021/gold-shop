import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { CategoryCard } from "@/components/ui/category-card";
import type { CategoryMeta } from "@/data/mock/categories.mock";

interface CategoryShowcaseProps {
  categories: CategoryMeta[];
}

export const CategoryShowcase = ({ categories }: CategoryShowcaseProps) => {
  if (categories.length === 0) return null;

  return (
    <section className="section-spacing bg-background" aria-label="دسته‌بندی‌ها">
      <div className="container-luxury">
        {/* Section header */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="type-overline mb-3 text-gold">مجموعه زیورآلات</p>
            <h2 className="type-display-md text-foreground">هر سلیقه‌ای، یک انتخاب</h2>
          </div>

          <Link
            href={ROUTES.shop}
            className={cn(
              "group hidden items-center gap-2 sm:flex",
              "text-sm font-medium text-muted-foreground",
              "transition-colors duration-[150ms] hover:text-gold",
            )}
          >
            همه دسته‌ها
            <ArrowLeft
              className={cn(
                "size-3.5 transition-transform duration-[220ms]",
                "rtl:rotate-180 group-hover:rtl:-translate-x-1",
              )}
            />
          </Link>
        </div>

        {/* Category grid — 2 cols mobile, 3 tablet, 5 desktop */}
        <div className={cn("grid gap-6", "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5")}>
          {categories.map((category, i) => (
            <CategoryCard key={category.id} category={category} priority={i < 3} />
          ))}
        </div>
      </div>
    </section>
  );
};
