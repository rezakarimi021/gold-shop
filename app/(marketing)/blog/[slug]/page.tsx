import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Clock, ChevronLeft, BookOpen } from "lucide-react";
import { blogPosts } from "@/data/blog/posts";
import { siteConfig } from "@/lib/config";
import { JsonLd } from "@/components/shared/seo/JsonLd";
import { cn } from "@/lib/utils";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "مقاله یافت نشد" };

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: siteConfig.name }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.coverImageAlt,
        },
      ],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.coverImage],
    },
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.coverImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
    keywords: post.keywords.join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "خانه", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "مجله",
        item: `${siteConfig.url}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${siteConfig.url}/blog/${post.slug}`,
      },
    ],
  };

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(iso));

  return (
    <>
      <JsonLd schema={[articleSchema, breadcrumbSchema]} />

      <div className="min-h-screen bg-background pt-16 md:pt-20">
        {/* Hero */}
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-muted">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="container-luxury absolute bottom-0 pb-10">
            <span className="mb-3 inline-block rounded-md border border-gold/50 bg-gold/20 px-2.5 py-0.5 text-xs text-gold backdrop-blur-sm">
              {post.category}
            </span>
            <h1 className="type-display-sm max-w-2xl text-white">{post.title}</h1>
          </div>
        </div>

        <div className="container-luxury py-10 lg:py-14">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-gold">
              خانه
            </Link>
            <ChevronLeft className="size-3 rtl:rotate-180" aria-hidden />
            <Link href="/blog" className="transition-colors hover:text-gold">
              مجله
            </Link>
            <ChevronLeft className="size-3 rtl:rotate-180" aria-hidden />
            <span className="line-clamp-1 text-foreground">{post.title}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1fr_280px] lg:items-start">
            {/* Article */}
            <article>
              {/* Meta */}
              <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Clock className="size-3.5" aria-hidden />
                  {post.readTime} دقیقه مطالعه
                </span>
                <span>
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="size-3.5" aria-hidden />
                  {siteConfig.name}
                </span>
              </div>

              {/* Description lead */}
              <p className="mb-8 border-r-2 border-gold pr-4 text-lg leading-relaxed text-muted-foreground">
                {post.description}
              </p>

              {/* Content */}
              <div className="prose-luxury space-y-5">
                {post.content.map((section, i) => {
                  if (section.type === "h2") {
                    return (
                      <h2 key={i} className="mt-10 text-xl font-medium text-foreground first:mt-0">
                        {section.text}
                      </h2>
                    );
                  }
                  if (section.type === "h3") {
                    return (
                      <h3 key={i} className="mt-6 text-lg font-medium text-foreground">
                        {section.text}
                      </h3>
                    );
                  }
                  if (section.type === "p") {
                    return (
                      <p key={i} className="leading-8 text-muted-foreground">
                        {section.text}
                      </p>
                    );
                  }
                  if (section.type === "ul" && section.items) {
                    return (
                      <ul key={i} className="space-y-2">
                        {section.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-muted-foreground">
                            <span
                              className="mt-2 size-1.5 shrink-0 rounded-full bg-gold"
                              aria-hidden
                            />
                            <span className="leading-7">{item}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  if (section.type === "tip") {
                    return (
                      <div
                        key={i}
                        className={cn(
                          "rounded-xl border border-gold/30 bg-gold-muted p-5",
                          "flex gap-3",
                        )}
                      >
                        <span className="mt-0.5 text-lg leading-none text-gold">💡</span>
                        <p className="text-sm leading-7 text-gold-dark">{section.text}</p>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>

              {/* CTA */}
              <div className="mt-12 rounded-2xl border border-gold/30 bg-gold-muted p-6 text-center">
                <p className="mb-1 font-medium text-foreground">آماده خرید طلا هستید؟</p>
                <p className="mb-4 text-sm text-muted-foreground">
                  مجموعه کامل ما را با ضمانت اصالت و ارسال رایگان کشف کنید.
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 rounded-xl bg-gold px-6 py-2.5 text-sm font-medium text-gold-foreground transition-opacity hover:opacity-90"
                >
                  مشاهده محصولات
                  <ChevronLeft className="size-3.5 rtl:rotate-180" aria-hidden />
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-24">
              {/* Related posts */}
              {related.length > 0 && (
                <div className="rounded-2xl border border-border bg-card p-5 shadow-luxury-xs">
                  <p className="mb-4 text-sm font-medium text-foreground">مقالات مرتبط</p>
                  <div className="space-y-4">
                    {related.map((rp) => (
                      <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group flex gap-3">
                        <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                          <Image
                            src={rp.coverImage}
                            alt={rp.coverImageAlt}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>
                        <p className="line-clamp-3 text-xs leading-5 text-muted-foreground transition-colors group-hover:text-gold">
                          {rp.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick links */}
              <div className="rounded-2xl border border-border bg-card p-5 shadow-luxury-xs">
                <p className="mb-4 text-sm font-medium text-foreground">دسته‌بندی محصولات</p>
                <div className="space-y-2">
                  {[
                    { label: "انگشتر طلا", href: "/shop?category=ring" },
                    { label: "گردنبند طلا", href: "/shop?category=necklace" },
                    { label: "دستبند طلا", href: "/shop?category=bracelet" },
                    { label: "گوشواره طلا", href: "/shop?category=earring" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {item.label}
                      <ChevronLeft className="size-3.5 rtl:rotate-180" aria-hidden />
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPostPage;
