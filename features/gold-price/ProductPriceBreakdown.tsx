"use client";

import { ChevronDown, ChevronUp, Zap } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useProductPrice } from "@/hooks/useProductPrice";
import { formatPrice } from "@/utils/formatPrice";
import type { GoldKarat } from "@/types/product";

interface ProductPriceBreakdownProps {
  weightGrams: number;
  karat: GoldKarat;
  fallbackPrice: number;
  className?: string;
}

interface BreakdownLineProps {
  label: string;
  value: number;
  dim?: boolean;
  bold?: boolean;
}

const BreakdownLine = ({ label, value, dim, bold }: BreakdownLineProps) => (
  <div className={cn("flex items-center justify-between gap-4 py-2", dim ? "opacity-60" : "")}>
    <span className={cn("text-xs", bold ? "font-medium text-foreground" : "text-muted-foreground")}>
      {label}
    </span>
    <span
      className={cn(
        "text-xs tabular-nums",
        bold ? "font-semibold text-foreground" : "text-muted-foreground",
      )}
    >
      {formatPrice(value)}
    </span>
  </div>
);

export const ProductPriceBreakdown = ({
  weightGrams,
  karat,
  fallbackPrice,
  className,
}: ProductPriceBreakdownProps) => {
  const [expanded, setExpanded] = useState(false);
  const { breakdown, isLive, isLoading } = useProductPrice({ weightGrams, karat, fallbackPrice });

  if (isLoading || !breakdown) {
    return <div className={cn("h-14 animate-pulse rounded-xl bg-muted/50", className)} />;
  }

  const displayPrice = breakdown.total;

  return (
    <div className={cn("rounded-xl border border-border", className)}>
      {/* Collapsed row — always visible */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className={cn(
          "flex w-full items-center justify-between gap-4 px-4 py-3",
          "rounded-xl text-start transition-colors hover:bg-accent/30",
        )}
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-2">
          {isLive && (
            <span className="flex items-center gap-1 rounded-md bg-success/10 px-1.5 py-0.5 text-[10px] font-medium text-success">
              <Zap className="size-2.5" />
              زنده
            </span>
          )}
          <span className="type-overline text-muted-foreground">قیمت فروش</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-base font-medium text-gold">{formatPrice(displayPrice)}</span>
          {expanded ? (
            <ChevronUp className="size-3.5 text-muted-foreground" />
          ) : (
            <ChevronDown className="size-3.5 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Expandable breakdown */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="divide-y divide-border/60 border-t border-border/60 px-4 pb-3">
              <BreakdownLine label="ارزش طلا" value={breakdown.goldValue} />
              <BreakdownLine label="اجرت ساخت" value={breakdown.manufacturingCost} />
              <BreakdownLine label="سود صنف" value={breakdown.retailerProfit} />
              <BreakdownLine label="مالیات (۹٪)" value={breakdown.vat} />
              <BreakdownLine label="قیمت نهایی" value={breakdown.total} bold />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
