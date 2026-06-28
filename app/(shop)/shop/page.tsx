import { Suspense } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { productsService } from "@/services/products.service";
import { ProductCard } from "@/components/ui/product-card";
import { ProductFilters } from "@/components/shared/plp/ProductFilters";
import { SkeletonProductGrid } from "@/components/ui/skeleton";
import { ROUTES } from "@/constants/routes";
import { generateCategoryMetadata, CATEGORY_META } from "@/lib/seo";
import type { Metadata } from "next";
import type { ProductCategory, GoldKarat, ProductSortOption } from "@/types/product";

interface ShopPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ searchParams }: ShopPageProps): Promise<Metadata> {
  const params = await searchParams;
  const category = Array.isArray(params["category"]) ? params["category"][0] : params["category"];

  if (category && CATEGORY_META[category]) {
    return generateCategoryMetadata(category);
  }

  return {
    title: "فروشگاه طلا و جواهر | خرید آنلاین طلا",
    description:
      "خرید آنلاین طلا و جواهرات اصل. انگشتر، گردنبند، دستبند، گوشواره و ست طلا با ضمانت اصالت و ارسال رایگان.",
    keywords: [
      "خرید طلا",
      "طلافروشی آنلاین",
      "جواهرات طلا",
      "طلا اصل",
      "انگشتر طلا",
      "گردنبند طلا",
    ],
  };
}

const SORT_OPTIONS: { value: ProductSortOption; label: string }[] = [
  { value: "newest", label: "جدیدترین" },
  { value: "price_asc", label: "ارزان‌ترین" },
  { value: "price_desc", label: "گران‌ترین" },
  { value: "popular", label: "پرفروش‌ترین" },
];

const ShopPage = async ({ searchParams }: ShopPageProps) => {
  const params = await searchParams;

  const categoryRaw = params["category"];
  const karatRaw = params["karat"];
  const sort = (params["sort"] as ProductSortOption | undefined) ?? "newest";
  const page = Number(params["page"] ?? 1);

  const categories = categoryRaw
    ? ((Array.isArray(categoryRaw) ? categoryRaw : [categoryRaw]) as ProductCategory[])
    : undefined;

  const karats = karatRaw
    ? ((Array.isArray(karatRaw) ? karatRaw : [karatRaw]).map(Number) as GoldKarat[])
    : undefined;

  const { data: products, pagination } = await productsService.getAll({
    filters: { category: categories, karat: karats },
    sort,
    page,
    perPage: 12,
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container-luxury py-10 lg:py-14">
        {/* Breadcrumb */}
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

        {/* Page header */}
        <div className="mb-10">
          <h1 className="type-display-sm mb-2 text-foreground">زیورآلات طلا</h1>
          <p className="text-sm text-muted-foreground">{pagination.total} محصول</p>
        </div>

        {/* Layout: filters sidebar + product grid */}
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">
          {/* Filters — hidden on mobile (accessed via drawer) */}
          <Suspense fallback={null}>
            <div className="hidden lg:block">
              <ProductFilters />
            </div>
          </Suspense>

          {/* Main content */}
          <div className="min-w-0 flex-1">
            {/* Sort bar */}
            <div className="mb-7 flex items-center justify-between border-b border-border pb-5">
              <p className="text-sm text-muted-foreground">
                نمایش {products.length} از {pagination.total} محصول
              </p>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">مرتب‌سازی:</span>
                <div className="flex gap-1">
                  {SORT_OPTIONS.map((option) => {
                    const isActive = sort === option.value;
                    const href = buildSortUrl(params, option.value);
                    return (
                      <Link
                        key={option.value}
                        href={href}
                        className={cn(
                          "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                          isActive
                            ? "bg-secondary text-secondary-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground",
                        )}
                      >
                        {option.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Product grid */}
            {products.length > 0 ? (
              <>
                <Suspense fallback={<SkeletonProductGrid count={12} />}>
                  <div className="product-grid">
                    {products.map((product, i) => (
                      <ProductCard key={product.id} product={product} priority={i < 4} />
                    ))}
                  </div>
                </Suspense>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <PaginationRow pagination={pagination} params={params} />
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
};

const buildSortUrl = (
  params: Record<string, string | string[] | undefined>,
  sort: ProductSortOption,
) => {
  const p = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (key === "sort" || key === "page") continue;
    if (Array.isArray(value)) value.forEach((v) => p.append(key, v));
    else if (value) p.set(key, value);
  }
  p.set("sort", sort);
  return `${ROUTES.shop}?${p.toString()}`;
};

interface PaginationRowProps {
  pagination: {
    page: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  params: Record<string, string | string[] | undefined>;
}

const PaginationRow = ({ pagination, params }: PaginationRowProps) => {
  const buildPageUrl = (page: number) => {
    const p = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (key === "page") continue;
      if (Array.isArray(value)) value.forEach((v) => p.append(key, v));
      else if (value) p.set(key, value);
    }
    p.set("page", String(page));
    return `${ROUTES.shop}?${p.toString()}`;
  };

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      {pagination.hasPrevPage && (
        <Link
          href={buildPageUrl(pagination.page - 1)}
          className={cn(
            "flex h-10 min-w-10 items-center justify-center rounded-lg px-4",
            "border border-border text-sm text-muted-foreground",
            "transition-colors hover:border-foreground hover:text-foreground",
          )}
        >
          قبلی
        </Link>
      )}

      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
        <Link
          key={p}
          href={buildPageUrl(p)}
          aria-current={p === pagination.page ? "page" : undefined}
          className={cn(
            "flex size-10 items-center justify-center rounded-lg text-sm",
            "transition-colors",
            p === pagination.page
              ? "bg-secondary text-secondary-foreground"
              : "border border-border text-muted-foreground hover:border-foreground hover:text-foreground",
          )}
        >
          {p}
        </Link>
      ))}

      {pagination.hasNextPage && (
        <Link
          href={buildPageUrl(pagination.page + 1)}
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
  );
};

export default ShopPage;
