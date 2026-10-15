import type { MetadataRoute } from "next";
import { CONTENT_LAST_UPDATED, INDUSTRIES, SITE } from "@/lib/seo";

// Keep in sync with the product / blog data used by the dynamic routes.
const PRODUCT_SLUGS = ["iot-deployment", "predictive-maintenance", "smart-dashboards"];
const BLOG_POSTS = [
  { slug: "rfid-iot-ai-enterprise-transformation", date: "2025-01-20" },
  { slug: "nfc-iot-ai-smart-connectivity", date: "2025-01-22" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(CONTENT_LAST_UPDATED);
  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
    date: Date = lastModified,
  ) => ({
    url: path === "/" ? SITE.url : `${SITE.url}${path}`,
    lastModified: date,
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1.0, "weekly"),
    entry("/solutions", 0.9),
    entry("/industries", 0.9),
    entry("/products", 0.9),
    entry("/about", 0.8),
    entry("/portfolio", 0.8),
    entry("/blog", 0.8, "weekly"),
    entry("/resources", 0.7, "weekly"),
    entry("/contact", 0.8),
    ...INDUSTRIES.map((i) => entry(`/industries/${i.slug}`, 0.8)),
    ...PRODUCT_SLUGS.map((s) => entry(`/products/${s}`, 0.8)),
    ...BLOG_POSTS.map((p) => entry(`/blog/${p.slug}`, 0.7, "monthly", new Date(p.date))),
    entry("/privacy-policy", 0.2, "yearly"),
    entry("/terms-of-service", 0.2, "yearly"),
  ];
}
