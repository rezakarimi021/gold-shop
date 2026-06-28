import type { Metadata } from "next";
import type { Product } from "@/types/product";
import { siteConfig } from "@/lib/config";
import { formatPrice } from "@/utils/formatPrice";

// ─── Category labels & SEO copy ─────────────────────────────────────────────

export const CATEGORY_META: Record<
  string,
  { name: string; title: string; description: string; keywords: string[] }
> = {
  ring: {
    name: "انگشتر",
    title: "خرید انگشتر طلا | انگشتر طلا ۱۸ عیار اصل",
    description:
      "بهترین انگشترهای طلای ۱۸، ۲۱ و ۲۴ عیار با ضمانت اصالت. انگشتر حلقه، نامزدی، ست و مجلسی از طلافروشی گُلد.",
    keywords: [
      "انگشتر طلا",
      "انگشتر طلا ۱۸ عیار",
      "انگشتر نامزدی",
      "حلقه طلا",
      "خرید انگشتر طلا",
      "انگشتر ست",
      "انگشتر زنانه طلا",
    ],
  },
  necklace: {
    name: "گردنبند",
    title: "خرید گردنبند طلا | گردنبند طلا ۱۸ عیار",
    description:
      "گردنبندهای طلای ظریف و لوکس با طراحی منحصر به فرد. زنجیر طلا، گردنبند آویز و ست طلا با ضمانت اصالت.",
    keywords: [
      "گردنبند طلا",
      "زنجیر طلا",
      "گردنبند آویز طلا",
      "خرید گردنبند طلا",
      "گردنبند طلا ۱۸ عیار",
    ],
  },
  bracelet: {
    name: "دستبند",
    title: "خرید دستبند طلا | دستبند طلا اصل",
    description:
      "دستبندهای طلا با طراحی‌های مدرن و کلاسیک. دستبند چرمی، زنجیری و ست طلا با بهترین عیار.",
    keywords: ["دستبند طلا", "دستبند زنانه طلا", "خرید دستبند طلا", "دستبند طلا ۱۸ عیار"],
  },
  earring: {
    name: "گوشواره",
    title: "خرید گوشواره طلا | گوشواره طلا ۱۸ عیار",
    description:
      "گوشواره‌های طلا با طراحی شیک و مدرن. گوشواره آویز، میخ، حلقه و ست از طلافروشی گُلد.",
    keywords: ["گوشواره طلا", "گوشواره آویز طلا", "خرید گوشواره طلا", "گوشواره طلا ۱۸ عیار"],
  },
  pendant: {
    name: "آویز",
    title: "خرید آویز طلا | پلاک طلا اصل",
    description: "آویزها و پلاک‌های طلا با طراحی‌های زیبا و ظریف.",
    keywords: ["آویز طلا", "پلاک طلا", "خرید آویز طلا"],
  },
  bangle: {
    name: "النگو",
    title: "خرید النگو طلا | النگو اصل",
    description: "النگوهای طلا با طراحی‌های سنتی و مدرن.",
    keywords: ["النگو طلا", "خرید النگو طلا", "النگو ۱۸ عیار"],
  },
  chain: {
    name: "زنجیر",
    title: "خرید زنجیر طلا | زنجیر طلا اصل",
    description: "زنجیرهای طلا با بافت‌های مختلف.",
    keywords: ["زنجیر طلا", "خرید زنجیر طلا"],
  },
  set: {
    name: "ست",
    title: "خرید ست طلا | ست جواهرات طلا",
    description: "ست‌های کامل طلا شامل انگشتر، گردنبند، دستبند و گوشواره.",
    keywords: ["ست طلا", "ست جواهرات", "خرید ست طلا"],
  },
};

// ─── Product metadata ────────────────────────────────────────────────────────

export function generateProductMetadata(product: Product): Metadata {
  const category = CATEGORY_META[product.category];
  const minPrice = Math.min(...product.variants.map((v) => v.price));
  const karats = [...new Set(product.variants.map((v) => v.karat))].join("، ");
  const weight = product.variants[0]?.weight ?? 0;

  const title = `${product.name} | ${category?.name ?? ""} طلا ${karats} عیار`;
  const description = [
    `خرید اینترنتی ${product.name}`,
    `${category?.name ?? ""} طلا ${karats} عیار`,
    `وزن ${weight} گرم`,
    `قیمت از ${formatPrice(minPrice)}`,
    `با ضمانت اصالت | طلافروشی گُلد`,
  ].join(" • ");

  const primaryImage = product.images.find((i) => i.isPrimary) ?? product.images[0];

  return {
    title,
    description,
    keywords: [
      product.name,
      `${category?.name ?? ""} طلا`,
      `${category?.name ?? ""} طلا ${karats} عیار`,
      `خرید ${category?.name ?? ""} طلا`,
      `قیمت ${category?.name ?? ""} طلا`,
      ...(category?.keywords ?? []),
      ...(product.tags ?? []),
    ],
    openGraph: {
      title,
      description,
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      images: primaryImage
        ? [
            {
              url: primaryImage.url,
              width: primaryImage.width,
              height: primaryImage.height,
              alt: primaryImage.alt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: primaryImage ? [primaryImage.url] : undefined,
    },
    alternates: {
      canonical: `/shop/product/${product.slug}`,
    },
  };
}

// ─── Category metadata ───────────────────────────────────────────────────────

export function generateCategoryMetadata(category: string): Metadata {
  const meta = CATEGORY_META[category];
  if (!meta) return {};

  return {
    title: meta.title,
    description: meta.description,
    keywords: [...meta.keywords, "طلافروشی گُلد", "خرید آنلاین طلا", "طلا اصل"],
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
    },
    alternates: {
      canonical: `/shop?category=${category}`,
    },
  };
}

// ─── Product JSON-LD ─────────────────────────────────────────────────────────

export function buildProductSchema(product: Product, url: string) {
  const primaryImage = product.images.find((i) => i.isPrimary) ?? product.images[0];
  const minPrice = Math.min(...product.variants.map((v) => v.price));
  const maxPrice = Math.max(...product.variants.map((v) => v.price));
  const hasStock = product.variants.some((v) => v.stock > 0);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    url,
    image: product.images.map((i) => i.url),
    sku: product.variants[0]?.sku ?? product.id,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "IRR",
      lowPrice: minPrice,
      highPrice: maxPrice,
      offerCount: product.variants.length,
      availability: hasStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    },
    ...(primaryImage && {
      image: primaryImage.url,
    }),
  };
}

// ─── Breadcrumb JSON-LD ──────────────────────────────────────────────────────

export function buildBreadcrumbSchema(items: { name: string; url: string }[], siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}
