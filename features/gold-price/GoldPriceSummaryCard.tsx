"use client";

import { TrendingUp, TrendingDown, Clock, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useGoldPriceStore } from "@/store/gold-price.store";
import { formatPrice } from "@/utils/formatPrice";

const FORMATTER = new Intl.NumberFormat("fa-IR");

interface StatRowProps {
  label: string;
  value: string;
}

const StatRow = ({ label, value }: StatRowProps) => (
  <div className="flex items-center justify-between gap-4 py-2.5">
    <span className="type-overline text-muted-foreground">{label}</span>
    <span className="text-sm font-medium text-foreground tabular-nums">{value}</span>
  </div>
);

export const GoldPriceSummaryCard = ({ className }: { className?: string }) => {
  const price = useGoldPriceStore((s) => s.price);
  const status = useGoldPriceStore((s) => s.status);

  const isUp = (price?.priceChangePercent24h ?? 0) >= 0;
  const changeAbs = Math.abs(price?.priceChangePercent24h ?? 0).toFixed(2);

  const lastUpdated = price?.timestamp
    ? new Date(price.timestamp).toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : null;

  return (
    <div
      className={cn("rounded-2xl border border-border bg-card p-6", "shadow-luxury-sm", className)}
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="type-overline mb-1 text-muted-foreground">قیمت لحظه‌ای طلا</p>
          <p className="text-xs text-muted-foreground/70">هر گرم — ۱۸ عیار</p>
        </div>
        {status === "stale" && (
          <div className="flex items-center gap-1 rounded-lg border border-warning/30 bg-warning/5 px-2 py-1">
            <AlertCircle className="size-3 text-warning" />
            <span className="text-[10px] text-warning">قیمت کش</span>
          </div>
        )}
      </div>

      {price ? (
        <>
          {/* Main price */}
          <motion.div
            key={price.pricePerGram18k}
            initial={{ opacity: 0.7, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-1 flex items-baseline gap-2"
          >
            <span className="type-display-sm font-medium tracking-tight text-foreground">
              {FORMATTER.format(price.pricePerGram18k)}
            </span>
            <span className="type-overline text-muted-foreground">تومان</span>
          </motion.div>

          {/* Change indicator */}
          <div
            className={cn(
              "mb-6 flex items-center gap-1 text-sm",
              isUp ? "text-success" : "text-destructive",
            )}
          >
            {isUp ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
            <span className="tabular-nums">{changeAbs}٪</span>
            <span className="text-muted-foreground/60">نسبت به دیروز</span>
          </div>

          {/* Stats */}
          <div className="divide-y divide-border/60">
            <StatRow label="عیار ۲۱" value={`${FORMATTER.format(price.pricePerGram21k)} ت`} />
            <StatRow label="عیار ۲۴" value={`${FORMATTER.format(price.pricePerGram24k)} ت`} />
            <StatRow label="بیشترین امروز" value={formatPrice(price.dailyHigh)} />
            <StatRow label="کمترین امروز" value={formatPrice(price.dailyLow)} />
          </div>
        </>
      ) : (
        <div className="flex h-40 items-center justify-center">
          <div className="size-6 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        </div>
      )}

      {/* Footer */}
      {lastUpdated && (
        <div className="mt-4 flex items-center gap-1.5 border-t border-border/60 pt-4">
          <Clock className="size-3 text-muted-foreground/60" />
          <span className="text-[11px] text-muted-foreground/60">
            آخرین بروزرسانی: {lastUpdated}
          </span>
          {status === "live" && (
            <span className="ms-auto flex items-center gap-1 text-[10px] text-success">
              <span className="size-1.5 rounded-full bg-success" />
              زنده
            </span>
          )}
        </div>
      )}
    </div>
  );
};
