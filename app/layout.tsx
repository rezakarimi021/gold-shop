import type { Metadata, Viewport } from "next";
import { geist, vazirmatn } from "@/lib/fonts";
import { defaultMetadata } from "@/constants/metadata";
import { Providers } from "./_providers";
import { JsonLd } from "@/components/shared/seo/JsonLd";
import { GoogleAnalytics } from "@/components/shared/analytics/GoogleAnalytics";
import { siteConfig } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f6f2" },
    { media: "(prefers-color-scheme: dark)", color: "#1e1a17" },
  ],
  width: "device-width",
  initialScale: 1,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/og-image.jpg`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: siteConfig.contactPhone,
    contactType: "customer service",
    availableLanguage: "Persian",
  },
  sameAs: [siteConfig.socialLinks.instagram, siteConfig.socialLinks.telegram],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteConfig.url}/shop?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const GA_ID = process.env["NEXT_PUBLIC_GA_ID"];

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="fa" dir="rtl" suppressHydrationWarning>
    <body className={`${vazirmatn.variable} ${geist.variable} antialiased`}>
      <JsonLd schema={[organizationSchema, websiteSchema]} />
      {GA_ID && <GoogleAnalytics measurementId={GA_ID} />}
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
