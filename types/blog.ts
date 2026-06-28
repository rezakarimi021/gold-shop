export interface BlogAuthor {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: BlogAuthor;
  category: string;
  tags: string[];
  readingTimeMinutes: number;
  publishedAt: string;
  updatedAt: string;
}

export type BlogPostSummary = Pick<
  BlogPost,
  | "id"
  | "slug"
  | "title"
  | "excerpt"
  | "coverImage"
  | "author"
  | "category"
  | "publishedAt"
  | "readingTimeMinutes"
>;
