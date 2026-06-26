/** Full app URL on Vercel (set for GitHub Pages static builds). */
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
