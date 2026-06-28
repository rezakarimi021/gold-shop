declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "js" | "set",
      targetId: string,
      params?: Record<string, unknown>,
    ) => void;
    dataLayer?: unknown[];
  }
}

const GA_ID = process.env["NEXT_PUBLIC_GA_ID"];

function gtag(...args: Parameters<NonNullable<Window["gtag"]>>) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag(...args);
}

// ─── Page tracking ───────────────────────────────────────────────────────────

export function trackPageView(url: string) {
  if (!GA_ID) return;
  gtag("config", GA_ID, { page_path: url });
}

// ─── E-commerce events ───────────────────────────────────────────────────────

export function trackViewItem(params: {
  id: string;
  name: string;
  category: string;
  price: number;
  currency?: string;
}) {
  gtag("event", "view_item", {
    currency: params.currency ?? "IRR",
    value: params.price,
    items: [
      {
        item_id: params.id,
        item_name: params.name,
        item_category: params.category,
        price: params.price,
        quantity: 1,
      },
    ],
  });
}

export function trackAddToCart(params: {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  currency?: string;
}) {
  gtag("event", "add_to_cart", {
    currency: params.currency ?? "IRR",
    value: params.price * params.quantity,
    items: [
      {
        item_id: params.id,
        item_name: params.name,
        item_category: params.category,
        price: params.price,
        quantity: params.quantity,
      },
    ],
  });
}

export function trackRemoveFromCart(params: {
  id: string;
  name: string;
  price: number;
  quantity: number;
}) {
  gtag("event", "remove_from_cart", {
    currency: "IRR",
    value: params.price * params.quantity,
    items: [
      {
        item_id: params.id,
        item_name: params.name,
        price: params.price,
        quantity: params.quantity,
      },
    ],
  });
}

export function trackBeginCheckout(params: { value: number; itemCount: number }) {
  gtag("event", "begin_checkout", {
    currency: "IRR",
    value: params.value,
    num_items: params.itemCount,
  });
}

export function trackPurchase(params: {
  transactionId: string;
  value: number;
  shipping: number;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
}) {
  gtag("event", "purchase", {
    transaction_id: params.transactionId,
    currency: "IRR",
    value: params.value,
    shipping: params.shipping,
    items: params.items.map((item) => ({
      item_id: item.id,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
  });
}

export function trackSearch(searchTerm: string) {
  gtag("event", "search", { search_term: searchTerm });
}

export function trackViewWishlist() {
  gtag("event", "view_wishlist");
}
