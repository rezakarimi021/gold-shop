export const PAGINATION = {
  defaultPage: 1,
  defaultPerPage: 24,
  maxPerPage: 48,
} as const;

export const GOLD_PRICE_PER_GRAM = {
  18: 4_200_000,
  21: 4_900_000,
  24: 5_600_000,
} as const;

export const SHIPPING = {
  freeThreshold: 5_000_000,
  flatRate: 150_000,
} as const;

export const QUERY_KEYS = {
  products: "products",
  product: "product",
  categories: "categories",
  collections: "collections",
  cart: "cart",
  wishlist: "wishlist",
  orders: "orders",
  order: "order",
  user: "user",
  blog: "blog",
  blogPost: "blogPost",
} as const;

export const STALE_TIMES = {
  products: 5 * 60 * 1000,
  categories: 30 * 60 * 1000,
  user: 10 * 60 * 1000,
} as const;
