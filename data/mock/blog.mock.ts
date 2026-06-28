import type { BlogPost } from "@/types/blog";

export const mockBlogPosts: BlogPost[] = [
  {
    id: "blog-001",
    slug: "rahnamaye-kharid-tala",
    title: "راهنمای خرید طلا: عیار، وزن و قیمت",
    excerpt:
      "قبل از خرید طلا باید با مفاهیم اساسی آن آشنا باشید. در این راهنما همه چیز را یاد می‌گیرید.",
    content: `طلا یکی از گران‌بهاترین فلزات دنیاست که از دیرباز نماد ثروت و زیبایی بوده است...`,
    coverImage: "https://images.unsplash.com/photo-1610375461369-d613b564f4c4?w=800&q=80",
    author: { id: "auth-001", name: "تیم تحریریه طلافروشی" },
    category: "راهنمای خرید",
    tags: ["عیار", "قیمت طلا", "راهنما"],
    readingTimeMinutes: 7,
    publishedAt: "2026-05-20T00:00:00Z",
    updatedAt: "2026-05-20T00:00:00Z",
  },
  {
    id: "blog-002",
    slug: "negahdari-az-zevar-tala",
    title: "چگونه از جواهرات طلا نگهداری کنیم؟",
    excerpt:
      "نگهداری درست از طلا عمر آن را طولانی‌تر می‌کند. نکاتی کاربردی برای حفظ درخشش زیور طلا.",
    content: `برای نگهداری از جواهرات طلا باید نکات مهمی را رعایت کنید...`,
    coverImage: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80",
    author: { id: "auth-001", name: "تیم تحریریه طلافروشی" },
    category: "مراقبت و نگهداری",
    tags: ["نگهداری", "تمیز کردن", "درخشش"],
    readingTimeMinutes: 5,
    publishedAt: "2026-06-05T00:00:00Z",
    updatedAt: "2026-06-05T00:00:00Z",
  },
  {
    id: "blog-003",
    slug: "tarikhe-talasazi-irani",
    title: "تاریخچه طلاسازی در ایران",
    excerpt: "هنر طلاسازی در ایران قدمتی چند هزار ساله دارد. سفری به دل تاریخ درخشان این هنر.",
    content: `هنر طلاسازی ایرانی یکی از باستانی‌ترین هنرهای این سرزمین است...`,
    coverImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
    author: { id: "auth-002", name: "دکتر مریم رضایی" },
    category: "تاریخ و فرهنگ",
    tags: ["تاریخ", "هنر ایرانی", "فرهنگ"],
    readingTimeMinutes: 10,
    publishedAt: "2026-06-20T00:00:00Z",
    updatedAt: "2026-06-20T00:00:00Z",
  },
];
