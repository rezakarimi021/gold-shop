import type { BlogPost, BlogPostSummary } from "@/types/blog";
import { mockBlogPosts } from "@/data/mock/blog.mock";

export const blogService = {
  async getAll(): Promise<BlogPostSummary[]> {
    return mockBlogPosts.map(toSummary);
  },

  async getBySlug(slug: string): Promise<BlogPost | null> {
    return mockBlogPosts.find((p) => p.slug === slug) ?? null;
  },

  async getRecent(limit = 3): Promise<BlogPostSummary[]> {
    return mockBlogPosts
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit)
      .map(toSummary);
  },
};

const toSummary = (post: BlogPost): BlogPostSummary => ({
  id: post.id,
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  coverImage: post.coverImage,
  author: post.author,
  category: post.category,
  publishedAt: post.publishedAt,
  readingTimeMinutes: post.readingTimeMinutes,
});
