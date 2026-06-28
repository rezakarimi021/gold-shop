"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart.store";
import { formatPrice, formatWeight } from "@/utils/formatPrice";
import { ROUTES } from "@/constants/routes";
import type { CartItem as CartItemType } from "@/types/cart";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const { product, variant, quantity } = item;
  const lineTotal = variant.price * quantity;

  return (
    <article className={cn("flex gap-4 py-6 sm:gap-6", "border-b border-border last:border-0")}>
      {/* Product image */}
      <Link
        href={ROUTES.product(product.slug)}
        className={cn(
          "relative size-20 shrink-0 overflow-hidden rounded-xl sm:size-24",
          "bg-muted shadow-luxury-xs",
          "transition-[box-shadow] duration-[220ms] hover:shadow-luxury-md",
        )}
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={product.primaryImage.url}
          alt={product.primaryImage.alt}
          fill
          sizes="96px"
          className="object-cover"
        />
      </Link>

      {/* Info + controls */}
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          {/* Name + badges */}
          <div className="min-w-0">
            <Link
              href={ROUTES.product(product.slug)}
              className="line-clamp-2 text-sm font-medium text-foreground transition-colors hover:text-gold"
            >
              {product.name}
            </Link>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <Badge variant="karat" className="text-[0.6rem]">
                {variant.karat}K
              </Badge>
              <span className="text-xs text-muted-foreground">{formatWeight(variant.weight)}</span>
            </div>
          </div>

          {/* Remove button */}
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            aria-label={`حذف ${product.name} از سبد خرید`}
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-lg",
              "text-muted-foreground transition-colors",
              "hover:bg-destructive/5 hover:text-destructive",
            )}
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Quantity + price row */}
        <div className="flex items-center justify-between">
          {/* Quantity stepper */}
          <div
            className="flex items-center rounded-lg border border-border bg-card"
            role="group"
            aria-label="تعداد"
          >
            <button
              type="button"
              aria-label="کم کردن"
              onClick={() => updateQuantity(item.id, quantity - 1)}
              disabled={quantity <= 1}
              className={cn(
                "flex size-8 items-center justify-center rounded-s-lg",
                "text-muted-foreground transition-colors",
                "hover:bg-accent hover:text-foreground",
                "disabled:pointer-events-none disabled:opacity-30",
              )}
            >
              <Minus className="size-3" />
            </button>
            <span className="min-w-8 px-1 text-center text-sm tabular-nums" aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              aria-label="افزودن"
              onClick={() => updateQuantity(item.id, quantity + 1)}
              className={cn(
                "flex size-8 items-center justify-center rounded-e-lg",
                "text-muted-foreground transition-colors",
                "hover:bg-accent hover:text-foreground",
              )}
            >
              <Plus className="size-3" />
            </button>
          </div>

          {/* Line total */}
          <p className="type-price text-foreground">{formatPrice(lineTotal)}</p>
        </div>
      </div>
    </article>
  );
};
