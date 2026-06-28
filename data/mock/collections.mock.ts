import type { ProductCollection } from "@/types/product";
import { mockProducts } from "./products.mock";

const toSummary = (id: string) => {
  const p = mockProducts.find((pr) => pr.id === id);
  if (!p) throw new Error(`Mock product ${id} not found`);
  const primary = p.images.find((i) => i.isPrimary) ?? p.images[0]!;
  const cheapest = p.variants.reduce((min, v) => (v.price < min.price ? v : min), p.variants[0]!);
  const totalStock = p.variants.reduce((sum, v) => sum + v.stock, 0);
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    gender: p.gender,
    isNew: p.isNew,
    isFeatured: p.isFeatured,
    tags: p.tags,
    primaryImage: primary,
    basePrice: cheapest.price,
    baseKarat: cheapest.karat,
    stockStatus: (totalStock === 0
      ? "out_of_stock"
      : totalStock <= 3
        ? "low_stock"
        : "in_stock") as "in_stock" | "low_stock" | "out_of_stock",
  };
};

export const mockCollections: ProductCollection[] = [
  {
    id: "col-bahar",
    slug: "bahar-1405",
    name: "کلکسیون بهار ۱۴۰۵",
    description: "الهام‌گرفته از طبیعت بهاری ایران. طرح‌هایی ظریف و پر از زندگی.",
    coverImage: {
      id: "col-img-bahar",
      url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=90",
      alt: "کلکسیون بهار ۱۴۰۵",
      isPrimary: true,
      width: 1200,
      height: 800,
    },
    products: ["prod-001", "prod-004", "prod-006"].map(toSummary),
  },
  {
    id: "col-classic",
    slug: "klassik-irani",
    name: "کلاسیک ایرانی",
    description: "طرح‌هایی برگرفته از هنر ایران باستان. جاودانه و بی‌نظیر.",
    coverImage: {
      id: "col-img-classic",
      url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=90",
      alt: "کلکسیون کلاسیک ایرانی",
      isPrimary: true,
      width: 1200,
      height: 800,
    },
    products: ["prod-002", "prod-003", "prod-005"].map(toSummary),
  },
];
