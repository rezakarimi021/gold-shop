"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { ProductCategory, GoldKarat } from "@/types/product";

const CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: "ring", label: "انگشتر" },
  { value: "necklace", label: "گردنبند" },
  { value: "bracelet", label: "دستبند" },
  { value: "earring", label: "گوشواره" },
  { value: "pendant", label: "آویز" },
];

const KARATS: { value: GoldKarat; label: string }[] = [
  { value: 18, label: "۱۸ عیار" },
  { value: 21, label: "۲۱ عیار" },
  { value: 24, label: "۲۴ عیار" },
];

interface ProductFiltersProps {
  className?: string;
}

export const ProductFilters = ({ className }: ProductFiltersProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategories = searchParams.getAll("category") as ProductCategory[];
  const activeKarats = searchParams.getAll("karat").map(Number) as GoldKarat[];
  const hasActiveFilters = activeCategories.length > 0 || activeKarats.length > 0;

  const updateParam = useCallback(
    (key: string, value: string, checked: boolean) => {
      const params = new URLSearchParams(searchParams.toString());
      const existing = params.getAll(key);
      params.delete(key);

      if (checked) {
        [...existing, value].forEach((v) => params.append(key, v));
      } else {
        existing.filter((v) => v !== value).forEach((v) => params.append(key, v));
      }
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    params.delete("karat");
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <aside className={cn("w-full shrink-0 lg:w-64", className)} aria-label="فیلترهای محصول">
      {/* Filter header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-muted-foreground" />
          <h2 className="text-sm font-medium text-foreground">فیلترها</h2>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className={cn(
              "flex items-center gap-1.5 text-xs text-muted-foreground",
              "transition-colors hover:text-destructive",
            )}
          >
            <X className="size-3" />
            حذف همه
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Category filter */}
        <div>
          <h3 className="type-overline mb-4 text-foreground">دسته‌بندی</h3>
          <div className="space-y-3">
            {CATEGORIES.map(({ value, label }) => (
              <div key={value} className="flex items-center gap-3">
                <Checkbox
                  id={`cat-${value}`}
                  checked={activeCategories.includes(value)}
                  onCheckedChange={(checked) => updateParam("category", value, Boolean(checked))}
                />
                <Label
                  htmlFor={`cat-${value}`}
                  className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-border/60" />

        {/* Karat filter */}
        <div>
          <h3 className="type-overline mb-4 text-foreground">عیار طلا</h3>
          <div className="space-y-3">
            {KARATS.map(({ value, label }) => (
              <div key={value} className="flex items-center gap-3">
                <Checkbox
                  id={`karat-${value}`}
                  checked={activeKarats.includes(value)}
                  onCheckedChange={(checked) =>
                    updateParam("karat", String(value), Boolean(checked))
                  }
                />
                <Label
                  htmlFor={`karat-${value}`}
                  className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-border/60" />

        {/* Active filters summary */}
        {hasActiveFilters && (
          <div>
            <h3 className="type-overline mb-3 text-foreground">فیلترهای فعال</h3>
            <div className="flex flex-wrap gap-2">
              {activeCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => updateParam("category", cat, false)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full",
                    "border border-gold/30 bg-gold-muted px-3 py-1",
                    "text-xs text-gold-dark transition-colors hover:bg-gold/20",
                  )}
                >
                  {CATEGORIES.find((c) => c.value === cat)?.label}
                  <X className="size-3" />
                </button>
              ))}
              {activeKarats.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => updateParam("karat", String(k), false)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full",
                    "border border-gold/30 bg-gold-muted px-3 py-1",
                    "text-xs text-gold-dark transition-colors hover:bg-gold/20",
                  )}
                >
                  {k}K
                  <X className="size-3" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
