"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import {
  createChart,
  AreaSeries,
  type IChartApi,
  type ISeriesApi,
  type UTCTimestamp,
} from "lightweight-charts";
import { cn } from "@/lib/utils";
import type { GoldPriceHistoryPoint, GoldPriceRange } from "@/types/gold-price";
import { GOLD_PRICE_RANGE_LABELS, GOLD_PRICE_RANGE_ORDER } from "@/constants/gold-price";
import { formatPrice } from "@/utils/formatPrice";

const GOLD_LINE = "#C9A84C";
const GOLD_FILL_TOP = "rgba(201, 168, 76, 0.18)";
const GOLD_FILL_BOTTOM = "rgba(201, 168, 76, 0)";
const TEXT_COLOR = "rgba(120, 110, 90, 0.9)";
const GRID_COLOR = "rgba(200, 180, 130, 0.08)";

interface GoldPriceChartProps {
  data: GoldPriceHistoryPoint[];
  range: GoldPriceRange;
  onRangeChange: (range: GoldPriceRange) => void;
  isLoading?: boolean;
  className?: string;
}

export const GoldPriceChart = ({
  data,
  range,
  onRangeChange,
  isLoading,
  className,
}: GoldPriceChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Area"> | null>(null);
  const [tooltip, setTooltip] = useState<{ price: number; time: string } | null>(null);

  const initChart = useCallback(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      layout: {
        background: { color: "transparent" },
        textColor: TEXT_COLOR,
        fontFamily: "var(--font-geist, ui-sans-serif, system-ui, -apple-system, sans-serif)",
        fontSize: 11,
      },
      grid: {
        vertLines: { color: GRID_COLOR, visible: true },
        horzLines: { color: GRID_COLOR, visible: true },
      },
      crosshair: {
        mode: 1,
        vertLine: { color: GOLD_LINE, width: 1, style: 3, labelBackgroundColor: GOLD_LINE },
        horzLine: { color: GOLD_LINE, width: 1, style: 3, labelBackgroundColor: GOLD_LINE },
      },
      rightPriceScale: {
        borderVisible: false,
        textColor: TEXT_COLOR,
        scaleMargins: { top: 0.1, bottom: 0.1 },
      },
      timeScale: {
        borderVisible: false,
        rightOffset: 4,
        fixLeftEdge: true,
        fixRightEdge: true,
        timeVisible: range === "1d",
        secondsVisible: false,
      },
      handleScale: { pinch: true, mouseWheel: true },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
        horzTouchDrag: true,
        vertTouchDrag: false,
      },
    });

    const series = chart.addSeries(AreaSeries, {
      lineColor: GOLD_LINE,
      topColor: GOLD_FILL_TOP,
      bottomColor: GOLD_FILL_BOTTOM,
      lineWidth: 2,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 5,
      crosshairMarkerBackgroundColor: GOLD_LINE,
      lastValueVisible: true,
      priceLineVisible: false,
      priceFormat: {
        type: "custom" as const,
        formatter: (price: number) => new Intl.NumberFormat("fa-IR").format(Math.round(price)),
        minMove: 1000,
      },
    });

    chart.subscribeCrosshairMove((param) => {
      if (!param.time) {
        setTooltip(null);
        return;
      }
      const value = param.seriesData.get(series);
      if (value && "value" in value) {
        const ts = typeof param.time === "number" ? param.time * 1000 : Date.now();
        setTooltip({
          price: value.value as number,
          time: new Date(ts).toLocaleString("fa-IR", {
            month: "short",
            day: "numeric",
            hour: range === "1d" ? "2-digit" : undefined,
            minute: range === "1d" ? "2-digit" : undefined,
          }),
        });
      }
    });

    chartRef.current = chart;
    seriesRef.current = series;

    const observer = new ResizeObserver(([entry]) => {
      if (entry) {
        chart.applyOptions({ width: entry.contentRect.width });
      }
    });
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, [range]);

  useEffect(() => {
    return initChart();
  }, [initChart]);

  useEffect(() => {
    if (!seriesRef.current || !chartRef.current || !data.length) return;

    const chartData = data
      .map((p) => ({
        time: Math.floor(new Date(p.timestamp).getTime() / 1000) as UTCTimestamp,
        value: p.price,
      }))
      .sort((a, b) => a.time - b.time)
      .filter((p, i, arr) => i === 0 || p.time !== arr[i - 1]!.time);

    seriesRef.current.setData(chartData);
    chartRef.current.timeScale().fitContent();
  }, [data]);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Range selector */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 rounded-xl border border-border bg-card p-1">
          {GOLD_PRICE_RANGE_ORDER.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => onRangeChange(r)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-[200ms]",
                r === range
                  ? "bg-gold text-gold-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {GOLD_PRICE_RANGE_LABELS[r]}
            </button>
          ))}
        </div>

        {tooltip && (
          <div className="text-start">
            <p className="text-xs text-muted-foreground">{tooltip.time}</p>
            <p className="text-sm font-medium text-gold">{formatPrice(tooltip.price)}</p>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-card/80 backdrop-blur-sm">
            <div className="size-6 animate-spin rounded-full border-2 border-gold border-t-transparent" />
          </div>
        )}
        <div
          ref={containerRef}
          className="h-[360px] w-full rounded-2xl"
          aria-label="نمودار قیمت طلا"
        />
      </div>
    </div>
  );
};
