/** Where Supabase should send users after email confirmation (client-side). */
export function getAuthCallbackUrl(next = "/dashboard"): string {
  const nextParam = next === "/dashboard" ? "" : `?next=${encodeURIComponent(next)}`;

  if (typeof window !== "undefined") {
    return `${window.location.origin}/auth/callback${nextParam}`;
  }

  const origin =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000";

  return `${origin}/auth/callback${nextParam}`;
}

export function getResetPasswordCallbackUrl(): string {
  return getAuthCallbackUrl("/reset-password");
}
