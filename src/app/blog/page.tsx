import type { Metadata } from "next";
import Script from "next/script";
import BlogSection from "../../components/sections/blog";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { blogPageStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "IoT & AI Blog - Expert Insights & Case Studies | Entraiot",
  description: "Expert IoT & AI insights from industry leaders. Real case studies, proven strategies, and actionable trends. Trusted by businesses worldwide.",
  keywords: ["IoT blog", "AI insights", "smart automation", "technology trends", "IoT case studies", "industry news"],
  alternates: {
    canonical: "https://entraiot.com/blog",
  },
  openGraph: {
    title: "IoT & AI Blog - Expert Insights & Case Studies | Entraiot",
    description: "Expert IoT & AI insights from industry leaders. Real case studies, proven strategies, and actionable trends. Trusted by businesses worldwide.",
    url: "https://entraiot.com/blog",
  },
};

export default function BlogPage() {
  return (
    <>
      <Script
        id="blog-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPageStructuredData),
        }}
      />
      <h1 className="sr-only">Entraiot Blog</h1>
      
      <div className="min-h-screen gradient-accent">
        <BlogSection breadcrumbs={
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} className="mb-0 [&_ol]:text-black [&_span]:text-black" />
        } />
      </div>
    </>
  );
}
