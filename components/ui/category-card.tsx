import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import type { CategoryMeta } from "@/data/mock/categories.mock";

interface CategoryCardProps {
  category: CategoryMeta;
  priority?: boolean;
  className?: string;
}

const CategoryCard = ({ category, priority = false, className }: CategoryCardProps) => (
  <Link
    href={ROUTES.category(category.slug)}
    className={cn(
      "group relative flex flex-col items-center gap-4 outline-none",
      "rounded-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background",
      className,
    )}
    aria-label={`مشاهده دسته ${category.name}`}
  >
    {/* ── Image ──────────────────────────────────────────────────────────── */}
    <div
      className={cn(
        "aspect-category relative w-full overflow-hidden rounded-xl",
        "bg-muted",
        "shadow-luxury-xs",
        "transition-[box-shadow] duration-[320ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
        "group-hover:shadow-luxury-lg",
      )}
    >
      <Image
        src={category.coverImage}
        alt={category.name}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className={cn(
          "object-cover",
          "transition-transform duration-[450ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
          "group-hover:scale-[1.05]",
        )}
        priority={priority}
      />

      {/* Gradient overlay for text legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-xl bg-gradient-to-t from-foreground/30 via-transparent to-transparent"
      />
    </div>

    {/* ── Name ───────────────────────────────────────────────────────────── */}
    <span
      className={cn(
        "text-sm font-medium tracking-wide text-foreground",
        "transition-colors duration-[150ms]",
        "group-hover:text-gold",
      )}
    >
      {category.name}
    </span>
  </Link>
);

export { CategoryCard };
export type { CategoryCardProps };
