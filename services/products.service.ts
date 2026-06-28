import type { PaginationParams } from "@/types/api";
import type {
  Product,
  ProductCollection,
  ProductFilters,
  ProductSortOption,
  ProductSummary,
} from "@/types/product";
import { mockProducts } from "@/data/mock/products.mock";
import { mockCollections } from "@/data/mock/collections.mock";
import { PAGINATION } from "@/constants/config";

export interface GetProductsParams extends PaginationParams {
  filters?: ProductFilters;
  sort?: ProductSortOption;
}

const simulateDelay = (ms = 200): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const productsService = {
  async getAll(params: GetProductsParams = {}) {
    await simulateDelay();

    const {
      page = PAGINATION.defaultPage,
      perPage = PAGINATION.defaultPerPage,
      sort = "newest",
    } = params;
    let items = [...mockProducts];

    if (params.filters) {
      const { category, gender, karat, minPrice, maxPrice, inStock } = params.filters;
      if (category?.length) {
        items = items.filter((p) => category.includes(p.category));
      }
      if (gender?.length) {
        items = items.filter((p) => gender.includes(p.gender));
      }
      if (karat?.length) {
        items = items.filter((p) => p.variants.some((v) => karat.includes(v.karat)));
      }
      if (minPrice !== undefined) {
        items = items.filter((p) => p.variants.some((v) => v.price >= (minPrice ?? 0)));
      }
      if (maxPrice !== undefined) {
        items = items.filter((p) => p.variants.some((v) => v.price <= (maxPrice ?? Infinity)));
      }
      if (inStock) {
        items = items.filter((p) => p.variants.some((v) => v.stock > 0));
      }
    }

    if (sort === "price_asc") {
      items.sort((a, b) => {
        const aPrice = Math.min(...a.variants.map((v) => v.price));
        const bPrice = Math.min(...b.variants.map((v) => v.price));
        return aPrice - bPrice;
      });
    } else if (sort === "price_desc") {
      items.sort((a, b) => {
        const aPrice = Math.min(...a.variants.map((v) => v.price));
        const bPrice = Math.min(...b.variants.map((v) => v.price));
        return bPrice - aPrice;
      });
    } else {
      items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    const total = items.length;
    const totalPages = Math.ceil(total / perPage);
    const offset = (page - 1) * perPage;
    const data: ProductSummary[] = items.slice(offset, offset + perPage).map(toSummary);

    return {
      data,
      pagination: {
        page,
        perPage,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      success: true,
    };
  },

  async getBySlug(slug: string): Promise<Product | null> {
    await simulateDelay();
    return mockProducts.find((p) => p.slug === slug) ?? null;
  },

  async getFeatured(limit = 8): Promise<ProductSummary[]> {
    await simulateDelay(100);
    return mockProducts
      .filter((p) => p.isFeatured)
      .slice(0, limit)
      .map(toSummary);
  },

  async getNew(limit = 8): Promise<ProductSummary[]> {
    await simulateDelay(100);
    return mockProducts
      .filter((p) => p.isNew)
      .slice(0, limit)
      .map(toSummary);
  },

  async getCollections(limit = 10): Promise<ProductCollection[]> {
    await simulateDelay(100);
    return mockCollections.slice(0, limit);
  },

  async search(query: string, limit = 10): Promise<ProductSummary[]> {
    await simulateDelay(150);
    const q = query.toLowerCase();
    return mockProducts
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      )
      .slice(0, limit)
      .map(toSummary);
  },
};

const toSummary = (p: Product): ProductSummary => {
  const primary = p.images.find((i) => i.isPrimary) ?? p.images[0];
  const cheapest = p.variants.reduce((min, v) => (v.price < min.price ? v : min), p.variants[0]!);
  const totalStock = p.variants.reduce((sum, v) => sum + v.stock, 0);
  const stockStatus =
    totalStock === 0 ? "out_of_stock" : totalStock <= 3 ? "low_stock" : "in_stock";

  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    gender: p.gender,
    isNew: p.isNew,
    isFeatured: p.isFeatured,
    tags: p.tags,
    primaryImage: primary!,
    basePrice: cheapest!.price,
    baseKarat: cheapest!.karat,
    stockStatus,
  };
};
