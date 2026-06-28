import * as React from "react";
import { cn } from "@/lib/utils";

const Skeleton = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    data-slot="skeleton"
    aria-hidden="true"
    className={cn("shimmer rounded-lg", className)}
    {...props}
  />
);

/* ── Composite skeleton shapes for the jewelry catalog ──────────────────── */

const SkeletonProductCard = ({ className }: { className?: string }) => (
  <div className={cn("flex flex-col gap-3", className)} aria-hidden="true">
    {/* Product image */}
    <Skeleton className="aspect-product w-full rounded-xl" />
    {/* Karat badge area */}
    <div className="flex items-center justify-between px-0.5">
      <Skeleton className="h-3 w-1/3 rounded-full" />
      <Skeleton className="h-3 w-10 rounded-full" />
    </div>
    {/* Product name */}
    <Skeleton className="h-4 w-3/4" />
    {/* Price */}
    <Skeleton className="h-4 w-1/2" />
  </div>
);

const SkeletonProductGrid = ({ count = 8, className }: { count?: number; className?: string }) => (
  <div className={cn("product-grid", className)} aria-label="در حال بارگذاری محصولات">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonProductCard key={i} />
    ))}
  </div>
);

const SkeletonText = ({ lines = 3, className }: { lines?: number; className?: string }) => (
  <div className={cn("flex flex-col gap-2", className)} aria-hidden="true">
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton key={i} className="h-4" style={{ width: i === lines - 1 ? "60%" : "100%" }} />
    ))}
  </div>
);

export { Skeleton, SkeletonProductCard, SkeletonProductGrid, SkeletonText };
