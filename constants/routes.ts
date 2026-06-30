export const ROUTES = {
  home: "/",

  // Shop
  shop: "/shop",
  product: (slug: string) => `/shop/product/${slug}`,
  category: (slug: string) => `/shop/category/${slug}`,
  collection: (slug: string) => `/shop/collection/${slug}`,
  search: "/shop/search",
  cart: "/shop/cart",
  checkout: "/shop/checkout",
  checkoutSuccess: (orderId: string) => `/shop/checkout/success/${orderId}`,
  checkoutConfirmed: "/shop/checkout/confirmed",
  checkoutFailed: "/shop/checkout/failed",

  // Account
  account: "/account",
  orders: "/account/orders",
  orderDetail: (id: string) => `/account/orders/${id}`,
  wishlist: "/account/wishlist",
  profile: "/account/profile",
  addresses: "/account/addresses",

  // Auth
  login: "/auth/login",
  register: "/auth/register",

  // Marketing
  blog: "/blog",
  blogPost: (slug: string) => `/blog/${slug}`,
  about: "/about",
  contact: "/contact",
  goldPrice: "/gold-price",
} as const;
