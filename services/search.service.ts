import type { ProductSummary } from "@/types/product";
import { productsService } from "./products.service";

export interface SearchResults {
  products: ProductSummary[];
  totalCount: number;
}

export const searchService = {
  async search(query: string): Promise<SearchResults> {
    if (!query.trim()) return { products: [], totalCount: 0 };

    const products = await productsService.search(query);
    return {
      products,
      totalCount: products.length,
    };
  },
};
