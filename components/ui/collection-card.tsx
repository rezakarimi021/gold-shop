import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import type { ProductCollection } from "@/types/product";

interface CollectionCardProps {
  collection: ProductCollection;
  variant?: "portrait" | "landscape";
  priority?: boolean;
  className?: string;
}

const CollectionCard = ({
  collection,
  variant = "landscape",
  priority = false,
  className,
}: CollectionCardProps) => (
  <Link
    href={ROUTES.collection(collection.slug)}
    className={cn(
      "group relative block overflow-hidden rounded-2xl",
      "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background",
      variant === "landscape" ? "aspect-collection" : "aspect-[3/4]",
      "bg-muted shadow-luxury-sm",
      "transition-[box-shadow] duration-[320ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
      "hover:shadow-luxury-xl",
      className,
    )}
    aria-label={`مشاهده کلکسیون ${collection.name}`}
  >
    {/* ── Background image ───────────────────────────────────────────────── */}
    <Image
      src={collection.coverImage.url}
      alt={collection.coverImage.alt}
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      className={cn(
        "object-cover",
        "transition-transform duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
        "group-hover:scale-[1.03]",
      )}
      priority={priority}
    />

    {/* ── Gradient overlay — editorial dark-to-transparent from bottom ───── */}
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0",
        "bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent",
      )}
    />

    {/* ── Content ────────────────────────────────────────────────────────── */}
    <div className="absolute start-0 end-0 bottom-0 p-6">
      {/* Overline */}
      <p className="type-overline mb-2 text-gold-light">کلکسیون</p>

      {/* Title */}
      <h3 className="mb-1 text-xl leading-snug font-light tracking-tight text-card">
        {collection.name}
      </h3>

      {/* Description */}
      <p className="mb-4 line-clamp-2 max-w-xs text-sm leading-relaxed text-card/70">
        {collection.description}
      </p>

      {/* CTA */}
      <span
        className={cn(
          "inline-flex items-center gap-2",
          "text-sm font-medium text-gold-light",
          "border-b border-gold-light/40",
          "pb-0.5",
          "transition-[border-color,color] duration-[220ms]",
          "group-hover:border-gold group-hover:text-gold",
        )}
      >
        مشاهده کلکسیون
        <ArrowLeft
          className={cn(
            "size-3.5 rtl:rotate-180",
            "transition-transform duration-[220ms]",
            "group-hover:-translate-x-1 rtl:group-hover:translate-x-1",
          )}
        />
      </span>
    </div>
  </Link>
);

export { CollectionCard };
export type { CollectionCardProps };
