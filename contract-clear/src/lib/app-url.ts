/** Asset path prefix for GitHub Pages (empty when using a custom domain). */
export function assetPath(path: string): string {
  const base =
    process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ??
    process.env.GITHUB_PAGES_BASE_PATH?.replace(/\/$/, "") ??
    "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return base ? `${base}${normalized}` : normalized;
}

export function getAppUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "";
}

/** Link to a path on the full app, or same-origin when running on Vercel. */
export function appPath(path: string): string {
  const base = getAppUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return base ? `${base}${normalized}` : normalized;
}

export function isStaticMarketingSite(): boolean {
  return Boolean(getAppUrl());
}

/** Origin for server-side redirects (Stripe, billing portal). Prefers the Vercel app URL. */
export function getServerAppOrigin(): string {
  const app = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
  if (app) return app;

  const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (site) return site;

  const vercel = process.env.VERCEL_URL?.replace(/\/$/, "");
  if (vercel) return vercel.startsWith("http") ? vercel : `https://${vercel}`;

  return "http://localhost:3000";
}

export function serverAppPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getServerAppOrigin()}${normalized}`;
}
