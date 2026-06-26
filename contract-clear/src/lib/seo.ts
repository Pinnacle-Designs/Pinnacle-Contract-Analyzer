import type { Metadata } from "next";

export const SITE_NAME = "Pinnacle Contract Analyzer";
export const SITE_SHORT_NAME = "Pinnacle";
export const DEFAULT_TITLE = `${SITE_NAME} — AI Contract Analyzer`;
export const SITE_DESCRIPTION =
  "Understand any contract in 60 seconds. Paste NDAs, freelance agreements, SaaS terms, or leases and get plain-English red flags, missing clauses, and negotiation tips — no lawyer required.";
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
];

/** Canonical marketing domain (GitHub Pages). */
export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://pinnaclecontractanalyzer.com"
  );
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalized}`;
}

/** Sitemap URLs (trailing slash on GitHub Pages static export). */
export function sitemapUrl(path: string): string {
  const base = getSiteUrl();
  if (path === "/") return `${base}/`;
  const normalized = path.startsWith("/") ? path.replace(/\/$/, "") : `/${path}`;
  if (process.env.GITHUB_PAGES === "true") {
    return `${base}${normalized}/`;
  }
  return `${base}${normalized}`;
}

type PageMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  /** When false, adds noindex (login, dashboard, previews). */
  index?: boolean;
};

export function createPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
  index = true,
}: PageMetadataOptions = {}): Metadata {
  const canonical = absoluteUrl(path);
  const pageTitle = title ?? DEFAULT_TITLE;

  return {
    title: title ? { absolute: pageTitle } : undefined,
    description,
    keywords: SITE_KEYWORDS,
    metadataBase: new URL(getSiteUrl()),
    alternates: { canonical },
    robots: index
      ? { index: true, follow: true, googleBot: { index: true, follow: true } }
      : { index: false, follow: false },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonical,
      siteName: SITE_NAME,
      title: pageTitle,
      description,
      images: [
        {
          url: absoluteUrl("/logo.png"),
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [absoluteUrl("/logo.png")],
    },
    category: "technology",
  };
}

/** Public pages included in sitemap.xml */
export const SITEMAP_ROUTES: { path: string; changeFrequency: "weekly" | "monthly"; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.8 },
  { path: "/terms", changeFrequency: "monthly", priority: 0.5 },
  { path: "/privacy", changeFrequency: "monthly", priority: 0.5 },
  { path: "/disclaimer", changeFrequency: "monthly", priority: 0.5 },
  { path: "/cookies", changeFrequency: "monthly", priority: 0.4 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.4 },
];
