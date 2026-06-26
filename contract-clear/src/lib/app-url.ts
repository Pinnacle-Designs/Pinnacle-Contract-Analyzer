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
