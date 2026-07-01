/** Paths where display ads are allowed (marketing content only — not app/auth). */
export const ADSENSE_MARKETING_PATHS = [
  "/",
  "/pricing",
  "/contact",
  "/terms",
  "/privacy",
  "/disclaimer",
  "/cookies",
] as const;

export const COOKIE_CONSENT_KEY = "pinnacle-cookie-consent";

/** Public AdSense client ID for the marketing site (also set via env at build time). */
export const ADSENSE_CLIENT_ID = "ca-pub-1014488780102797";

export function getAdsenseClientId(): string | undefined {
  const id =
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim() ||
    (process.env.GITHUB_PAGES === "true" ? ADSENSE_CLIENT_ID : undefined);
  return id && id.startsWith("ca-pub-") ? id : undefined;
}

/** Static GitHub Pages marketing build — AdSense script must be in HTML for Google verification. */
export function isMarketingAdSenseBuild(): boolean {
  return process.env.GITHUB_PAGES === "true" && Boolean(getAdsenseClientId());
}

/** ads.txt publisher ID (pub-XXXXXXXXXXXXXXXX). Derived from ca-pub- client id if omitted. */
export function getAdsensePublisherId(): string | undefined {
  const explicit = process.env.ADSENSE_PUBLISHER_ID?.trim();
  if (explicit?.startsWith("pub-")) return explicit;

  const client = getAdsenseClientId();
  if (!client) return undefined;
  return client.replace(/^ca-/, "");
}

export function isAdsenseConfigured(): boolean {
  return Boolean(getAdsenseClientId());
}

export function isMarketingPath(pathname: string): boolean {
  const normalized =
    pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  return (ADSENSE_MARKETING_PATHS as readonly string[]).includes(normalized);
}

export function hasStoredAdConsent(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(COOKIE_CONSENT_KEY) === "accepted";
}
