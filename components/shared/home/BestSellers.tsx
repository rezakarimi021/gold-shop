"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { ProductCard } from "@/components/ui/product-card";
import { ScrollReveal } from "@/components/shared/motion/ScrollReveal";
import type { ProductSummary } from "@/types/product";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.52, ease: EASE } },
};

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
          <h2 className="type-display-md text-foreground">پرفروش‌ترین‌ها</h2>

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
                "size-3.5 rtl:rotate-180",
                "transition-transform duration-[220ms]",
                "group-hover:-translate-x-1 rtl:group-hover:translate-x-1",
              )}
            />
          </Link>
        </ScrollReveal>

        {/* Staggered product grid */}
        <motion.div
          className="product-grid"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
        >
          {products.slice(0, 4).map((product, i) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} priority={i < 2} />
            </motion.div>
          ))}
        </motion.div>

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
