"use client";

import { useState, useRef, useEffect } from "react";
import { ShoppingBag, Heart, Minus, Plus } from "lucide-react";
import { motion, AnimatePresence, animate } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";
import { formatPrice, formatWeight } from "@/utils/formatPrice";
import { trackViewItem, trackAddToCart } from "@/lib/analytics";
import type { Product, ProductSummary, ProductVariant } from "@/types/product";

const LUXURY_EASE = [0.25, 0.46, 0.45, 0.94] as const;

interface ProductActionsProps {
  product: Product;
}

const toSummary = (p: Product, v: ProductVariant): ProductSummary => ({
  id: p.id,
  slug: p.slug,
  name: p.name,
  category: p.category,
  gender: p.gender,
  isNew: p.isNew,
  isFeatured: p.isFeatured,
  tags: p.tags,
  primaryImage: p.images.find((i) => i.isPrimary) ?? p.images[0]!,
  basePrice: v.price,
  baseKarat: v.karat,
  stockStatus: v.stock === 0 ? "out_of_stock" : v.stock <= 3 ? "low_stock" : "in_stock",
});

export const ProductActions = ({ product }: ProductActionsProps) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]!);
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  const cartBtnRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLSpanElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const addItem = useCartStore((s) => s.addItem);
  const toggleItem = useWishlistStore((s) => s.toggleItem);
  const isWishlisted = useWishlistStore((s) => s.isInWishlist(product.id));

  const isOutOfStock = selectedVariant.stock === 0;
  const isLowStock = selectedVariant.stock > 0 && selectedVariant.stock <= 3;

  // Fire view_item analytics event on mount
  useEffect(() => {
    trackViewItem({
      id: product.id,
      name: product.name,
      category: product.category,
      price: selectedVariant.price,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  useEffect(() => {
    const el = actionsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const scrolledPast = (entry?.boundingClientRect.top ?? 0) < 0;
        setShowSticky(!(entry?.isIntersecting ?? true) && scrolledPast);
      },
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    const summary = toSummary(product, selectedVariant);
    for (let i = 0; i < quantity; i++) {
      addItem(summary, selectedVariant);
    }
    trackAddToCart({
      id: product.id,
      name: product.name,
      category: product.category,
      price: selectedVariant.price,
      quantity,
    });
    if (cartBtnRef.current) {
      void animate(
        cartBtnRef.current,
        { scale: [1, 0.96, 1.02, 1] },
        { duration: 0.3, ease: LUXURY_EASE },
      );
    }
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2500);
  };

  const handleWishlistToggle = () => {
    toggleItem(toSummary(product, selectedVariant));
    if (heartRef.current) {
      void animate(
        heartRef.current,
        { scale: [1, 1.28, 0.9, 1] },
        { duration: 0.38, ease: LUXURY_EASE },
      );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Price */}
      <div>
        <p className="type-overline mb-1 text-muted-foreground">قیمت</p>
        <p className="text-3xl font-light tracking-tight text-foreground">
          {isOutOfStock ? (
            <span className="type-overline text-muted-foreground">ناموجود</span>
          ) : (
            formatPrice(selectedVariant.price)
          )}
        </p>
        {isLowStock && (
          <p className="mt-1 text-xs text-warning">
            موجودی کم — فقط {selectedVariant.stock} عدد باقی
          </p>
        )}
      </div>

      {/* Variant selector */}
      {product.variants.length > 1 && (
        <div>
          <p className="type-overline mb-3 text-foreground">عیار و وزن</p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant) => {
              const isSelected = variant.id === selectedVariant.id;
              const isDisabled = variant.stock === 0;
              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => {
                    setSelectedVariant(variant);
                    setQuantity(1);
                  }}
                  disabled={isDisabled}
                  aria-pressed={isSelected}
                  className={cn(
                    "rounded-xl border px-4 py-2.5 text-sm font-medium",
                    "transition-all duration-[220ms]",
                    "outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    "disabled:cursor-not-allowed disabled:opacity-40",
                    isSelected
                      ? "shadow-glow-gold border-gold bg-gold-muted text-gold-dark"
                      : "border-border bg-card text-foreground hover:border-muted-foreground",
                  )}
                >
                  <span className="type-karat me-1.5">{variant.karat}K</span>
                  {formatWeight(variant.weight)}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Single variant info */}
      {product.variants.length === 1 && (
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div>
            <span className="type-overline me-1.5">عیار:</span>
            <Badge variant="karat" className="text-xs">
              {selectedVariant.karat}K
            </Badge>
          </div>
          <div className="h-4 w-px bg-border" aria-hidden="true" />
          <div>
            <span className="type-overline me-1.5">وزن:</span>
            <span>{formatWeight(selectedVariant.weight)}</span>
          </div>
        </div>
      )}

      {/* Quantity + Add to Cart */}
      <div ref={actionsRef} className="flex flex-col gap-3 sm:flex-row">
        {/* Quantity stepper */}
        <div
          className={cn("flex items-center rounded-xl border border-border", "bg-card")}
          role="group"
          aria-label="تعداد"
        >
          <button
            type="button"
            aria-label="کم کردن تعداد"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            className={cn(
              "flex size-11 items-center justify-center rounded-s-xl",
              "text-muted-foreground transition-colors",
              "hover:bg-accent hover:text-foreground",
              "disabled:pointer-events-none disabled:opacity-30",
            )}
          >
            <Minus className="size-4" />
          </button>
          <span
            className="min-w-10 px-2 text-center text-sm font-medium tabular-nums"
            aria-live="polite"
            aria-atomic="true"
          >
            {quantity}
          </span>
          <button
            type="button"
            aria-label="افزودن به تعداد"
            onClick={() => setQuantity((q) => Math.min(selectedVariant.stock, q + 1))}
            disabled={quantity >= selectedVariant.stock}
            className={cn(
              "flex size-11 items-center justify-center rounded-e-xl",
              "text-muted-foreground transition-colors",
              "hover:bg-accent hover:text-foreground",
              "disabled:pointer-events-none disabled:opacity-30",
            )}
          >
            <Plus className="size-4" />
          </button>
        </div>

        {/* Add to Cart */}
        <div ref={cartBtnRef} className="flex-1">
          <Button
            variant={addedFeedback ? "outline" : "gold"}
            size="lg"
            className="w-full rounded-xl"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            <ShoppingBag className="size-4" />
            {addedFeedback ? "به سبد افزوده شد" : "افزودن به سبد"}
          </Button>
        </div>
      </div>

      {/* Wishlist */}
      <button
        type="button"
        onClick={handleWishlistToggle}
        className={cn(
          "flex w-full items-center justify-center gap-2 rounded-xl",
          "border border-border py-3 text-sm font-medium",
          "transition-[border-color,color,background-color] duration-[220ms]",
          isWishlisted
            ? "border-destructive/30 bg-destructive/5 text-destructive"
            : "text-muted-foreground hover:border-muted-foreground hover:text-foreground",
        )}
        aria-pressed={isWishlisted}
      >
        <span ref={heartRef} aria-hidden="true">
          <Heart className={cn("size-4", isWishlisted && "fill-current")} />
        </span>
        {isWishlisted ? "در علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
      </button>

      {/* Sticky mobile CTA — appears after main buttons scroll past */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.28, ease: LUXURY_EASE }}
            className="fixed inset-x-0 bottom-0 z-40 md:hidden"
          >
            <div
              className={cn(
                "border-t border-border bg-card/95 backdrop-blur-md",
                "px-4 py-3 shadow-luxury-xl",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{product.name}</p>
                  <p className="text-sm text-gold">{formatPrice(selectedVariant.price)}</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-xl",
                    "bg-gold text-gold-foreground",
                    "px-5 py-2.5 text-sm font-medium",
                    "transition-opacity duration-[150ms]",
                    "disabled:opacity-40",
                  )}
                >
                  <ShoppingBag className="size-4" />
                  افزودن به سبد
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
