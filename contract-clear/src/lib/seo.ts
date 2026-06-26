import type { Metadata } from "next";

export const SITE_NAME = "Pinnacle Contract Analyzer";
export const SITE_SHORT_NAME = "Pinnacle";
export const PRODUCTION_SITE_URL = "https://pinnaclecontractanalyzer.com";
export const DEFAULT_TITLE = `${SITE_NAME} — Understand Any Contract in 60 Seconds`;
export const SITE_DESCRIPTION =
  "Understand any contract in 60 seconds. AI-powered review for NDAs, freelance agreements, SaaS terms, and leases — plain-English red flags, missing clauses, and negotiation tips. Not legal advice.";
export const SITE_KEYWORDS = [
  "contract analyzer",
  "AI contract review",
  "contract red flags",
  "NDA review",
  "freelance contract review",
  "lease agreement review",
  "contract negotiation tips",
  "plain English contract summary",
  "legal document analyzer",
  "SaaS agreement review",
  "contract risk score",
  "free contract analysis",
];

/** True when building the static GitHub Pages marketing export. */
export function usesTrailingSlash(): boolean {
  return process.env.GITHUB_PAGES === "true";
}

/**
 * Canonical public marketing origin for SEO metadata, sitemap, and JSON-LD.
 * Never uses localhost or Vercel preview/app URLs.
 */
export function getMarketingSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";

  if (raw && !/localhost|127\.0\.0\.1|vercel\.app/i.test(raw)) {
    return raw;
  }

  return PRODUCTION_SITE_URL;
}

/** @deprecated Prefer getMarketingSiteUrl for public SEO URLs. */
export function getSiteUrl(): string {
  return getMarketingSiteUrl();
}

/** Absolute URL for Open Graph / Twitter images (always production marketing domain). */
export function ogImageUrl(path = "/opengraph-image"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${PRODUCTION_SITE_URL}${normalized}`;
}

/** Canonical URL for a path, matching trailing-slash rules on GitHub Pages. */
export function canonicalUrl(path: string): string {
  const base = getMarketingSiteUrl();
  if (path === "/") return `${base}/`;

  const normalized = path.startsWith("/") ? path : `/${path}`;
  const clean = normalized.replace(/\/$/, "");

  // Files like sitemap.xml, robots.txt, opengraph-image.png — no trailing slash
  if (/\.[a-z0-9]+$/i.test(clean)) {
    return `${base}${clean}`;
  }

  return usesTrailingSlash() ? `${base}${clean}/` : `${base}${clean}`;
}

export function absoluteUrl(path: string): string {
  return canonicalUrl(path);
}

/** Sitemap entry URLs (trailing slash on GitHub Pages static export). */
export function sitemapUrl(path: string): string {
  return canonicalUrl(path);
}

type PageMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  /** When false, adds noindex (login, dashboard, previews). */
  index?: boolean;
  /** Override default OG/Twitter image path. */
  ogImage?: string;
};

export function createPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
  index = true,
  ogImage,
}: PageMetadataOptions = {}): Metadata {
  const canonical = canonicalUrl(path);
  const pageTitle = title ?? DEFAULT_TITLE;
  const imageUrl = ogImageUrl(ogImage);

  return {
    title: title ? { absolute: pageTitle } : undefined,
    description,
    keywords: SITE_KEYWORDS,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: getMarketingSiteUrl() }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    metadataBase: new URL(getMarketingSiteUrl()),
    alternates: {
      canonical,
      languages: { "en-US": canonical },
    },
    robots: index
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        }
      : { index: false, follow: false, nocache: true },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonical,
      siteName: SITE_NAME,
      title: pageTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — AI contract review in plain English`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [imageUrl],
    },
    icons: {
      icon: "/logo.png",
      apple: "/logo.png",
    },
    category: "technology",
  };
}

/** Public marketing pages included in sitemap.xml */
export const SITEMAP_ROUTES: {
  path: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/pricing", changeFrequency: "weekly", priority: 0.9 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.4 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.4 },
  { path: "/disclaimer", changeFrequency: "yearly", priority: 0.4 },
  { path: "/cookies", changeFrequency: "yearly", priority: 0.3 },
];
