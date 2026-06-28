"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "./badge";
import type { ProductSummary } from "@/types/product";
import { ROUTES } from "@/constants/routes";
import { formatPrice } from "@/utils/formatPrice";

interface ProductCardProps {
  product: ProductSummary;
  isWishlisted?: boolean;
  onWishlistToggle?: (productId: string) => void;
  priority?: boolean;
  className?: string;
}

const ProductCard = ({
  product,
  isWishlisted = false,
  onWishlistToggle,
  priority = false,
  className,
}: ProductCardProps) => {
  const { slug, name, primaryImage, basePrice, baseKarat, stockStatus, isNew } = product;
  const isOutOfStock = stockStatus === "out_of_stock";
  const isLowStock = stockStatus === "low_stock";

  return (
    <article
      className={cn("group relative flex flex-col", isOutOfStock && "opacity-60", className)}
      aria-label={name}
    >
      {/* ── Product image ──────────────────────────────────────────────────── */}
      <Link
        href={ROUTES.product(slug)}
        className="block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        tabIndex={0}
        aria-label={`مشاهده ${name}`}
      >
        <div
          className={cn(
            "aspect-product relative w-full overflow-hidden rounded-xl",
            "bg-muted",
            "shadow-luxury-xs",
            "transition-[box-shadow] duration-[320ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
            "group-hover:shadow-luxury-md",
          )}
        >
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={cn(
              "object-cover",
              "transition-transform duration-[450ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
              "group-hover:scale-[1.04]",
            )}
            priority={priority}
          />

          {/* ── Image overlays ──────────────────────────────────────────────── */}

          {/* Karat badge — always visible, top-start */}
          <div className="absolute start-3 top-3">
            <Badge variant="karat">{baseKarat}K</Badge>
          </div>

          {/* New badge — top-end */}
          {isNew && (
            <div className="absolute end-3 top-3">
              <Badge variant="new">جدید</Badge>
            </div>
          )}

          {/* Out of stock overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-background/60 backdrop-blur-[2px]">
              <span className="type-overline text-muted-foreground">ناموجود</span>
            </div>
          )}

          {/* Wishlist button — appears on hover */}
          {onWishlistToggle && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onWishlistToggle(product.id);
              }}
              aria-label={isWishlisted ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
              aria-pressed={isWishlisted}
              className={cn(
                "absolute end-3 bottom-3",
                "flex size-8 items-center justify-center rounded-full",
                "bg-card/80 backdrop-blur-sm",
                "border border-border/50",
                "text-muted-foreground",
                "shadow-luxury-xs",
                /* Show on hover, hide by default */
                "opacity-0 group-hover:opacity-100",
                "translate-y-2 group-hover:translate-y-0",
                "transition-[opacity,transform] duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                "hover:bg-card hover:text-foreground",
                "outline-none focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-ring",
                isWishlisted && "translate-y-0 text-destructive opacity-100",
              )}
            >
              <Heart className={cn("size-4", isWishlisted && "fill-current")} />
            </button>
          )}
        </div>
      </Link>

      {/* ── Product info ────────────────────────────────────────────────────── */}
      <div className="mt-3 flex flex-col gap-1 px-0.5">
        {/* Product name */}
        <Link href={ROUTES.product(slug)} className="outline-none" tabIndex={-1} aria-hidden="true">
          <h3
            className={cn(
              "text-sm leading-snug font-medium text-foreground",
              "transition-colors duration-[150ms]",
              "group-hover:text-gold",
              "line-clamp-2",
            )}
          >
            {name}
          </h3>
        </Link>

        {/* Price row */}
        <div className="mt-0.5 flex items-center justify-between">
          <span className="type-price text-foreground">
            {isOutOfStock ? (
              <span className="type-overline text-muted-foreground">ناموجود</span>
            ) : (
              formatPrice(basePrice)
            )}
          </span>

          {/* Low stock indicator */}
          {isLowStock && !isOutOfStock && (
            <span className="type-overline text-warning">موجودی کم</span>
          )}
        </div>
      </div>
    </article>
  );
};

export { ProductCard };
export type { ProductCardProps };
