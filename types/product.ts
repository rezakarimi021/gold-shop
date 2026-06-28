export type GoldKarat = 18 | 21 | 24;

export type ProductCategory =
  | "ring"
  | "necklace"
  | "bracelet"
  | "earring"
  | "pendant"
  | "bangle"
  | "chain"
  | "set";

export type ProductGender = "women" | "men" | "unisex";

export type ProductStatus = "active" | "draft" | "archived";

export type ProductStock = "in_stock" | "low_stock" | "out_of_stock";

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  width: number;
  height: number;
}

export interface ProductVariant {
  id: string;
  karat: GoldKarat;
  weight: number;
  price: number;
  stock: number;
  sku: string;
}

export interface ProductDimensions {
  width?: number;
  height?: number;
  depth?: number;
  diameter?: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: ProductCategory;
  gender: ProductGender;
  status: ProductStatus;
  images: ProductImage[];
  variants: ProductVariant[];
  tags: string[];
  isNew: boolean;
  isFeatured: boolean;
  craftingDetails?: string;
  dimensions?: ProductDimensions;
  createdAt: string;
  updatedAt: string;
}

export interface ProductSummary extends Pick<
  Product,
  "id" | "slug" | "name" | "category" | "gender" | "isNew" | "isFeatured" | "tags"
> {
  primaryImage: ProductImage;
  basePrice: number;
  baseKarat: GoldKarat;
  stockStatus: ProductStock;
}

export interface ProductCollection {
  id: string;
  slug: string;
  name: string;
  description: string;
  coverImage: ProductImage;
  products: ProductSummary[];
}

export type ProductSortOption = "newest" | "price_asc" | "price_desc" | "popular";

export interface ProductFilters {
  category?: ProductCategory[];
  gender?: ProductGender[];
  karat?: GoldKarat[];
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  tags?: string[];
}
