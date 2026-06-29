"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/ui/product-card";
import { ProductFilters } from "@/components/shared/plp/ProductFilters";
import { ROUTES } from "@/constants/routes";
import type {
  ProductSummary,
  ProductCategory,
  GoldKarat,
  ProductSortOption,
} from "@/types/product";

const SORT_OPTIONS: { value: ProductSortOption; label: string }[] = [
  { value: "newest", label: "جدیدترین" },
  { value: "price_asc", label: "ارزان‌ترین" },
  { value: "price_desc", label: "گران‌ترین" },
  { value: "popular", label: "پرفروش‌ترین" },
];

const PER_PAGE = 12;

interface ShopPageClientProps {
  allProducts: ProductSummary[];
}

export function ShopPageClient({ allProducts }: ShopPageClientProps) {
  const searchParams = useSearchParams();

  const categories = useMemo(() => {
    const raw = searchParams.getAll("category");
    return raw.length > 0 ? (raw as ProductCategory[]) : undefined;
  }, [searchParams]);

  const karats = useMemo(() => {
    const raw = searchParams.getAll("karat");
    return raw.length > 0 ? (raw.map(Number) as GoldKarat[]) : undefined;
  }, [searchParams]);

  const sort = (searchParams.get("sort") as ProductSortOption | null) ?? "newest";
  const page = Number(searchParams.get("page") ?? 1);

  const filtered = useMemo(() => {
    let list = [...allProducts];

    if (categories && categories.length > 0) {
      list = list.filter((p) => categories.includes(p.category as ProductCategory));
    }
    if (karats && karats.length > 0) {
      list = list.filter((p) => karats.includes(p.baseKarat as GoldKarat));
    }

    switch (sort) {
      case "price_asc":
        list.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case "price_desc":
        list.sort((a, b) => b.basePrice - a.basePrice);
        break;
      default:
        break;
    }

    return list;
  }, [allProducts, categories, karats, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const products = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const buildUrl = (overrides: Record<string, string | null>) => {
    const p = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(overrides)) {
      if (value === null) p.delete(key);
      else p.set(key, value);
    }
    const qs = p.toString();
    return qs ? `${ROUTES.shop}?${qs}` : ROUTES.shop;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container-luxury py-10 lg:py-14">
        <nav
          className="mb-8 flex items-center gap-2 text-xs text-muted-foreground"
          aria-label="مسیر"
        >
          <Link href={ROUTES.home} className="transition-colors hover:text-gold">
            خانه
          </Link>
          <ChevronLeft className="size-3 rtl:rotate-180" />
          <span className="text-foreground">فروشگاه</span>
        </nav>

        <div className="mb-10">
          <h1 className="type-display-sm mb-2 text-foreground">زیورآلات طلا</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} محصول</p>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">
          <div className="hidden lg:block">
            <ProductFilters />
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-7 flex items-center justify-between border-b border-border pb-5">
              <p className="text-sm text-muted-foreground">
                نمایش {products.length} از {filtered.length} محصول
              </p>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">مرتب‌سازی:</span>
                <div className="flex gap-1">
                  {SORT_OPTIONS.map((option) => (
                    <Link
                      key={option.value}
                      href={buildUrl({ sort: option.value, page: null })}
                      className={cn(
                        "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                        sort === option.value
                          ? "bg-secondary text-secondary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground",
                      )}
                    >
                      {option.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {products.length > 0 ? (
              <>
                <div className="product-grid">
                  {products.map((product, i) => (
                    <ProductCard key={product.id} product={product} priority={i < 4} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-2">
                    {safePage > 1 && (
                      <Link
                        href={buildUrl({ page: String(safePage - 1) })}
                        className={cn(
                          "flex h-10 min-w-10 items-center justify-center rounded-lg px-4",
                          "border border-border text-sm text-muted-foreground",
                          "transition-colors hover:border-foreground hover:text-foreground",
                        )}
                      >
                        قبلی
                      </Link>
                    )}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <Link
                        key={p}
                        href={buildUrl({ page: String(p) })}
                        aria-current={p === safePage ? "page" : undefined}
                        className={cn(
                          "flex size-10 items-center justify-center rounded-lg text-sm transition-colors",
                          p === safePage
                            ? "bg-secondary text-secondary-foreground"
                            : "border border-border text-muted-foreground hover:border-foreground hover:text-foreground",
                        )}
                      >
                        {p}
                      </Link>
                    ))}
                    {safePage < totalPages && (
                      <Link
                        href={buildUrl({ page: String(safePage + 1) })}
                        className={cn(
                          "flex h-10 min-w-10 items-center justify-center rounded-lg px-4",
                          "border border-border text-sm text-muted-foreground",
                          "transition-colors hover:border-foreground hover:text-foreground",
                        )}
                      >
                        بعدی
                      </Link>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="py-20 text-center">
                <p className="type-display-sm mb-3 text-muted-foreground">محصولی یافت نشد</p>
                <p className="mb-6 text-sm text-muted-foreground">
                  فیلترهای انتخابی را تغییر دهید یا همه محصولات را مشاهده کنید.
                </p>
                <Link href={ROUTES.shop} className="text-sm font-medium text-gold hover:underline">
                  نمایش همه محصولات
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
