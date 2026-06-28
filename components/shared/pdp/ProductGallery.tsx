"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types/product";

const LUXURY_EASE = [0.25, 0.46, 0.45, 0.94] as const;

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export const ProductGallery = ({ images, productName }: ProductGalleryProps) => {
  const primary = images.find((i) => i.isPrimary) ?? images[0]!;
  const [activeId, setActiveId] = useState(primary.id);
  const activeImage = images.find((i) => i.id === activeId) ?? primary;
  const touchStartX = useRef<number | null>(null);

  const navigate = (direction: "prev" | "next") => {
    const index = images.findIndex((i) => i.id === activeId);
    if (direction === "next") {
      const next = images[(index + 1) % images.length];
      if (next) setActiveId(next.id);
    } else {
      const prev = images[(index - 1 + images.length) % images.length];
      if (prev) setActiveId(prev.id);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || images.length < 2) return;
    const deltaX = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    if (Math.abs(deltaX) > 48) navigate(deltaX < 0 ? "next" : "prev");
    touchStartX.current = null;
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl",
          "aspect-[4/5]",
          "bg-muted shadow-luxury-md",
          "image-hover-luxury",
        )}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeImage.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.26, ease: LUXURY_EASE }}
            className="absolute inset-0"
          >
            <Image
              src={activeImage.url}
              alt={activeImage.alt || productName}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
              className="object-cover"
              data-luxury-image
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div
          role="tablist"
          aria-label="تصاویر محصول"
          className="scrollbar-hide flex gap-3 overflow-x-auto pb-1"
        >
          {images.map((image) => {
            const isActive = image.id === activeId;
            return (
              <button
                key={image.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={image.alt || productName}
                onClick={() => setActiveId(image.id)}
                className={cn(
                  "relative size-20 shrink-0 overflow-hidden rounded-xl",
                  "bg-muted transition-[box-shadow,opacity] duration-[220ms]",
                  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isActive
                    ? "shadow-glow-gold opacity-100 ring-1 ring-gold/60"
                    : "opacity-60 shadow-luxury-xs hover:opacity-90",
                )}
              >
                <Image
                  src={image.url}
                  alt={image.alt || productName}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
