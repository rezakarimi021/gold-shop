import { notFound } from "next/navigation";
import Link from "next/link";
import { mockProducts } from "@/data/mock/products.mock";

export async function generateStaticParams() {
  return mockProducts.map((p) => ({ slug: p.slug }));
}

import { ChevronLeft } from "lucide-react";
import { productsService } from "@/services/products.service";
import { ProductGallery } from "@/components/shared/pdp/ProductGallery";
import { ProductActions } from "@/components/shared/pdp/ProductActions";
import { ProductDetails } from "@/components/shared/pdp/ProductDetails";
import { ProductCard } from "@/components/ui/product-card";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/constants/routes";
import { formatWeight } from "@/utils/formatPrice";
import { JsonLd } from "@/components/shared/seo/JsonLd";
import {
  generateProductMetadata,
  buildProductSchema,
  buildBreadcrumbSchema,
  CATEGORY_META,
} from "@/lib/seo";
import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const generateMetadata = async ({ params }: ProductPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const product = await productsService.getBySlug(slug);
  if (!product) return { title: "محصول یافت نشد" };
  return generateProductMetadata(product);
};

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug } = await params;
  const product = await productsService.getBySlug(slug);
  if (!product) notFound();

  const related = await productsService.getFeatured(4);
  const relatedFiltered = related.filter((p) => p.id !== product.id).slice(0, 4);

  const primaryVariant = product.variants[0]!;
  const categoryLabel = CATEGORY_META[product.category]?.name ?? product.category;

  const productSchema = buildProductSchema(
    product,
    `${siteConfig.url}/shop/product/${product.slug}`,
  );

  const breadcrumbSchema = buildBreadcrumbSchema(
    [
      { name: "خانه", url: "/" },
      { name: "فروشگاه", url: "/shop" },
      { name: categoryLabel, url: `/shop?category=${product.category}` },
      { name: product.name, url: `/shop/product/${product.slug}` },
    ],
    siteConfig.url,
  );

  return (
    <>
      <JsonLd schema={[productSchema, breadcrumbSchema]} />
      <div className="min-h-screen bg-background">
        <div className="container-luxury py-10 lg:py-14">
          {/* Breadcrumb */}
          <nav
            className="mb-10 flex items-center gap-2 text-xs text-muted-foreground"
            aria-label="مسیر"
          >
            <Link href={ROUTES.home} className="transition-colors hover:text-gold">
              خانه
            </Link>
            <ChevronLeft className="size-3 rtl:rotate-180" aria-hidden="true" />
            <Link href={ROUTES.shop} className="transition-colors hover:text-gold">
              فروشگاه
            </Link>
            <ChevronLeft className="size-3 rtl:rotate-180" aria-hidden="true" />
            <Link
              href={`/shop?category=${product.category}`}
              className="transition-colors hover:text-gold"
            >
              {categoryLabel}
            </Link>
            <ChevronLeft className="size-3 rtl:rotate-180" aria-hidden="true" />
            <span className="line-clamp-1 text-foreground">{product.name}</span>
          </nav>

          {/* Main product section */}
          <div className="grid gap-12 lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_520px]">
            {/* Gallery — start side in LTR, becomes end in RTL */}
            <div className="order-2 lg:order-1">
              <ProductGallery images={product.images} productName={product.name} />
            </div>

            {/* Product info — end side in LTR, becomes start in RTL */}
            <div className="order-1 flex flex-col gap-6 lg:order-2">
              {/* Status badges */}
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="karat">{primaryVariant.karat}K</Badge>
                {product.isNew && <Badge variant="new">جدید</Badge>}
                {product.isFeatured && <Badge variant="best-seller">پرفروش</Badge>}
              </div>

              {/* Product title */}
              <div>
                <h1 className="type-display-sm mb-2 text-foreground">{product.name}</h1>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>{categoryLabel}</span>
                  <div className="size-1 rounded-full bg-border" aria-hidden="true" />
                  <span>{formatWeight(primaryVariant.weight)}</span>
                </div>
              </div>

              {/* Gold divider */}
              <div className="divider-gold" aria-hidden="true" />

              {/* Interactive actions — client component */}
              <ProductActions product={product} />
            </div>
          </div>

          {/* Product details tabs */}
          <ProductDetails product={product} />

          {/* Related products */}
          {relatedFiltered.length > 0 && (
            <section className="mt-20" aria-label="محصولات مرتبط">
              <div className="mb-8">
                <h2 className="type-display-sm text-foreground">محصولات مشابه</h2>
              </div>
              <div className="product-grid">
                {relatedFiltered.map((p, i) => (
                  <ProductCard key={p.id} product={p} priority={i < 2} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
