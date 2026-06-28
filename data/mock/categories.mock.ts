import type { ProductCategory } from "@/types/product";

export interface CategoryMeta {
  id: string;
  slug: string;
  name: string;
  nameEn: ProductCategory;
  description: string;
  coverImage: string;
  sortOrder: number;
}

export const mockCategories: CategoryMeta[] = [
  {
    id: "cat-ring",
    slug: "rings",
    name: "انگشتر",
    nameEn: "ring",
    description: "مجموعه‌ای از انگشترهای طلا برای هر سلیقه‌ای",
    coverImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
    sortOrder: 1,
  },
  {
    id: "cat-necklace",
    slug: "necklaces",
    name: "گردنبند",
    nameEn: "necklace",
    description: "گردنبندهای زنجیری و آویزدار با طرح‌های متنوع",
    coverImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
    sortOrder: 2,
  },
  {
    id: "cat-bracelet",
    slug: "bracelets",
    name: "دستبند",
    nameEn: "bracelet",
    description: "دستبندهای بافته و زنجیری برای هر مناسبتی",
    coverImage: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
    sortOrder: 3,
  },
  {
    id: "cat-earring",
    slug: "earrings",
    name: "گوشواره",
    nameEn: "earring",
    description: "گوشواره‌های ظریف و مجلسی برای بانوان",
    coverImage: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=600&q=80",
    sortOrder: 4,
  },
  {
    id: "cat-pendant",
    slug: "pendants",
    name: "آویز",
    nameEn: "pendant",
    description: "آویزهای هنری با طرح‌های الهام‌گرفته از فرهنگ ایرانی",
    coverImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
    sortOrder: 5,
  },
];
