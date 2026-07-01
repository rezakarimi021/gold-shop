"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { CategoryCard } from "@/components/ui/category-card";
import { ScrollReveal } from "@/components/shared/motion/ScrollReveal";
import type { CategoryMeta } from "@/data/mock/categories.mock";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.48, ease: EASE } },
};

interface CategoryShowcaseProps {
  categories: CategoryMeta[];
}

export const CategoryShowcase = ({ categories }: CategoryShowcaseProps) => {
  if (categories.length === 0) return null;

  return (
    <section className="section-spacing bg-background" aria-label="دسته‌بندی‌ها">
      <div className="container-luxury">
        {/* Section header */}
        <ScrollReveal className="mb-12 flex items-end justify-between">
          <h2 className="type-display-md text-foreground">هر سلیقه‌ای، یک انتخاب</h2>

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
                "size-3.5 rtl:rotate-180",
                "transition-transform duration-[220ms]",
                "group-hover:-translate-x-1 rtl:group-hover:translate-x-1",
              )}
            />
          </Link>
        </ScrollReveal>

        {/* Category grid — 2 cols mobile, 3 tablet, 5 desktop — staggered scale-in */}
        <motion.div
          className={cn("grid gap-6", "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5")}
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {categories.map((category, i) => (
            <motion.div key={category.id} variants={itemVariants}>
              <CategoryCard category={category} priority={i < 3} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
