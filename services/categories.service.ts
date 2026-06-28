import { mockCategories, type CategoryMeta } from "@/data/mock/categories.mock";

export const categoriesService = {
  async getAll(): Promise<CategoryMeta[]> {
    return mockCategories;
  },

  async getBySlug(slug: string): Promise<CategoryMeta | null> {
    return mockCategories.find((c) => c.slug === slug) ?? null;
  },
};

export type { CategoryMeta };
