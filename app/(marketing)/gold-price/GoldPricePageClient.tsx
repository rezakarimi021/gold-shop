"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp, TrendingDown, RefreshCw, AlertCircle, Wifi } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useGoldPrice } from "@/hooks/useGoldPrice";
import { useGoldPriceStore } from "@/store/gold-price.store";
import { GoldPriceSummaryCard } from "@/features/gold-price/GoldPriceSummaryCard";
import { goldPriceService } from "@/services/gold-price/service";
import { formatPrice } from "@/utils/formatPrice";
import type { GoldPriceRange, GoldPriceHistoryPoint } from "@/types/gold-price";

const GoldPriceChart = dynamic(
  () => import("@/features/gold-price/GoldPriceChart").then((m) => m.GoldPriceChart),
  { ssr: false, loading: () => <ChartSkeleton /> },
);

const ChartSkeleton = () => (
  <div className="h-[360px] w-full animate-pulse rounded-2xl bg-muted/30" />
);

const FORMATTER = new Intl.NumberFormat("fa-IR");

export const GoldPricePageClient = () => {
  useGoldPrice();
  const price = useGoldPriceStore((s) => s.price);
  const status = useGoldPriceStore((s) => s.status);

  const [range, setRange] = useState<GoldPriceRange>("1m");

  const {
    data: historyPoints,
    isLoading: isLoadingHistory,
    isError: isHistoryError,
    refetch: refetchHistory,
  } = useQuery<GoldPriceHistoryPoint[]>({
    queryKey: ["gold-price", "history", range],
    queryFn: () => goldPriceService.getHistory(range),
    staleTime: 5 * 60_000,
    gcTime: 30 * 60_000,
    retry: 2,
  });

  const isUp = (price?.priceChangePercent24h ?? 0) >= 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container-luxury py-10 lg:py-14">
        {/* Page header */}
        <div className="mb-10">
          <p className="type-overline mb-2 text-gold">نرخ بازار</p>
          <h1 className="type-display-md mb-3 text-foreground">نمودار قیمت طلا</h1>
          <p className="text-muted-foreground">
            قیمت لحظه‌ای طلا در بازار ایران — بروزرسانی خودکار هر ۱۵ ثانیه
          </p>
        </div>

        {/* Connection status banner */}
        {(status === "stale" || status === "error") && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "mb-6 flex items-center gap-3 rounded-xl border px-4 py-3",
              status === "error"
                ? "border-destructive/30 bg-destructive/5 text-destructive"
                : "border-warning/30 bg-warning/5 text-warning",
            )}
          >
            <AlertCircle className="size-4 shrink-0" />
            <p className="text-sm">
              {status === "error"
                ? "اتصال به سرور قیمت طلا قطع است. در حال تلاش مجدد..."
                : "داده‌های نمایش‌داده‌شده ممکن است کمی قدیمی باشند. در حال بروزرسانی..."}
            </p>
          </motion.div>
        )}

        {/* Main grid */}
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Chart column */}
          <div className="flex flex-col gap-6">
            {/* Hero price */}
            <div className="flex flex-wrap items-end gap-4">
              <div>
                <p className="type-overline mb-1 text-muted-foreground">طلای ۱۸ عیار — هر گرم</p>
                <motion.div
                  key={price?.pricePerGram18k}
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 1 }}
                  className="flex items-baseline gap-2"
                >
                  {price ? (
                    <>
                      <span className="type-display-md font-light text-foreground tabular-nums">
                        {FORMATTER.format(price.pricePerGram18k)}
                      </span>
                      <span className="type-overline text-muted-foreground">تومان</span>
                    </>
                  ) : (
                    <div className="h-10 w-48 animate-pulse rounded-xl bg-muted" />
                  )}
                </motion.div>
              </div>

              {price && (
                <div
                  className={cn(
                    "mb-1 flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm",
                    isUp ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive",
                  )}
                >
                  {isUp ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
                  <span className="font-medium tabular-nums">
                    {Math.abs(price.priceChangePercent24h).toFixed(2)}٪
                  </span>
                  <span className="opacity-70">
                    ({formatPrice(Math.abs(price.priceChangeToman24h))})
                  </span>
                </div>
              )}

              {/* Live indicator */}
              <div className="ms-auto flex items-center gap-2">
                {status === "live" ? (
                  <div className="flex items-center gap-1.5 text-xs text-success">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-70" />
                      <span className="relative inline-flex size-2 rounded-full bg-success" />
                    </span>
                    زنده
                  </div>
                ) : status === "connecting" ? (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <RefreshCw className="size-3 animate-spin" />
                    در حال اتصال...
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-warning">
                    <Wifi className="size-3" />
                    داده کش‌شده
                  </div>
                )}
              </div>
            </div>

            {/* Chart */}
            {isHistoryError ? (
              <div className="flex h-[360px] flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card">
                <AlertCircle className="size-8 text-muted-foreground/40" />
                <p className="text-sm text-muted-foreground">خطا در دریافت داده‌های نمودار</p>
                <button
                  type="button"
                  onClick={() => refetchHistory()}
                  className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-foreground hover:bg-accent"
                >
                  <RefreshCw className="size-3.5" />
                  تلاش مجدد
                </button>
              </div>
            ) : (
              <GoldPriceChart
                data={historyPoints ?? []}
                range={range}
                onRangeChange={setRange}
                isLoading={isLoadingHistory}
              />
            )}

            {/* Last updated */}
            {price?.timestamp && (
              <p className="text-center text-xs text-muted-foreground/60">
                آخرین دریافت: {new Date(price.timestamp).toLocaleString("fa-IR")} — منبع:{" "}
                {price.source}
              </p>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            <GoldPriceSummaryCard />

            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="type-overline mb-4 text-muted-foreground">نکات بازار</p>
              <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                <p className="leading-relaxed">
                  قیمت‌های نمایش‌داده‌شده بر اساس نرخ بازار آزاد طلای ایران محاسبه می‌شوند.
                </p>
                <p className="leading-relaxed">
                  قیمت محصولات شامل اجرت ساخت، سود صنف و مالیات بر ارزش افزوده (۹٪) است.
                </p>
                <p className="leading-relaxed">
                  نرخ طلای ۲۱ و ۲۴ عیار بر اساس نسبت عیار نسبت به ۱۸ عیار محاسبه می‌شود.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
