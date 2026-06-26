import type { MetadataRoute } from "next";
import { canonicalUrl, getMarketingSiteUrl } from "@/lib/seo";

export const dynamic = "force-static";

const PRIVATE_PREFIXES = [
  "/api/",
  "/dashboard",
  "/account",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/preview/",
  "/_next/",
];

/** Disallow paths with and without trailing slash for static hosting compatibility. */
function disallowPaths(): string[] {
  const paths = new Set<string>();
  for (const prefix of PRIVATE_PREFIXES) {
    paths.add(prefix);
    if (!prefix.endsWith("/")) {
      paths.add(`${prefix}/`);
    }
  }
  return [...paths];
}

export default function robots(): MetadataRoute.Robots {
  const site = getMarketingSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowPaths(),
      },
    ],
    sitemap: canonicalUrl("/sitemap.xml"),
    host: site,
  };
}
