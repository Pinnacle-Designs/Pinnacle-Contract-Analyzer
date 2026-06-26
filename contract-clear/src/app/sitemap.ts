import type { MetadataRoute } from "next";
import { SITEMAP_ROUTES, sitemapUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return SITEMAP_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: sitemapUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }));
}
