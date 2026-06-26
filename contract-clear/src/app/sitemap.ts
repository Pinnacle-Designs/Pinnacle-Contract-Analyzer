import type { MetadataRoute } from "next";
import { SITEMAP_ROUTES, sitemapUrl } from "@/lib/seo";

export const dynamic = "force-static";

/** Stable build timestamp for sitemap lastmod (set in CI, else build time). */
const LAST_MODIFIED = process.env.SITEMAP_LAST_MODIFIED
  ? new Date(process.env.SITEMAP_LAST_MODIFIED)
  : new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return SITEMAP_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: sitemapUrl(path),
    lastModified: LAST_MODIFIED,
    changeFrequency,
    priority,
  }));
}
