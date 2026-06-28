import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Clock, ChevronLeft } from "lucide-react";
import { blogPosts } from "@/data/blog/posts";
import { siteConfig } from "@/lib/config";
import { JsonLd } from "@/components/shared/seo/JsonLd";

export const metadata: Metadata = {
  title: "مجله طلا | راهنمای خرید، آموزش و اخبار جواهرات",
  description:
    "مقالات تخصصی در حوزه طلا و جواهرات: راهنمای خرید، تشخیص اصالت، مراقبت از زیورآلات و آخرین اخبار بازار طلا.",
  keywords: ["مجله طلا", "راهنمای خرید طلا", "آموزش طلا", "بلاگ جواهرات", "اخبار طلا"],
  openGraph: {
    title: "مجله طلافروشی گُلد",
    description: "مقالات تخصصی طلا و جواهرات",
    type: "website",
    locale: siteConfig.locale,
  },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "مجله طلافروشی گُلد",
  description: "مقالات تخصصی طلا و جواهرات",
  url: `${siteConfig.url}/blog`,
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
};

const BlogPage = () => (
  <>
    <JsonLd schema={blogSchema} />

    <div className="min-h-screen bg-background pt-16 md:pt-20">
      <div className="container-luxury py-14">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="type-overline mb-3 text-gold">محتوا</p>
          <h1 className="type-display-md text-foreground">مجله طلافروشی</h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            راهنمای خرید هوشمند، آموزش تخصصی و همه چیز درباره دنیای طلا و جواهرات.
          </p>
        </div>

        {/* Posts grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-luxury-xs transition-[border-color,shadow] duration-[280ms] hover:border-gold/30 hover:shadow-luxury-sm"
            >
              {/* Cover image */}
              <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                <Image
                  src={post.coverImage}
                  alt={post.coverImageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[400ms] group-hover:scale-[1.03]"
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-md border border-gold/30 bg-gold-muted px-2 py-0.5 text-xs text-gold-dark">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="size-3" aria-hidden />
                    {post.readTime} دقیقه
                  </span>
                </div>

                <h2 className="mb-2 line-clamp-2 text-base leading-snug font-medium text-foreground transition-colors group-hover:text-gold">
                  {post.title}
                </h2>

                <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">
                  {post.description}
                </p>

                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-gold">
                  ادامه مطلب
                  <ChevronLeft className="size-3.5 rtl:rotate-180" aria-hidden />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </>
);

export default BlogPage;
