import { createAdminSupabaseClient } from "@/lib/supabase/server";

export type RateLimitEndpoint = "analyze" | "parse-pdf";

const LIMITS: Record<RateLimitEndpoint, { windowMs: number; maxFree: number; maxPro: number }> = {
  analyze: { windowMs: 60 * 60 * 1000, maxFree: 15, maxPro: 60 },
  "parse-pdf": { windowMs: 60 * 60 * 1000, maxFree: 30, maxPro: 120 },
};

export async function enforceRateLimit(
  userId: string,
  endpoint: RateLimitEndpoint,
  isPro: boolean
): Promise<{ ok: true } | { ok: false; retryAfterSec: number }> {
  const admin = createAdminSupabaseClient();
  const config = LIMITS[endpoint];
  const maxRequests = isPro ? config.maxPro : config.maxFree;
  const windowStart = new Date(Date.now() - config.windowMs).toISOString();

  const { count, error: countError } = await admin
    .from("api_rate_limits")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("endpoint", endpoint)
    .gte("created_at", windowStart);

  if (countError) {
    console.error("rate limit count:", countError.message);
    return { ok: true };
  }

  if ((count ?? 0) >= maxRequests) {
    return { ok: false, retryAfterSec: Math.ceil(config.windowMs / 1000) };
  }

  const { error: insertError } = await admin.from("api_rate_limits").insert({
    user_id: userId,
    endpoint,
  });

  if (insertError) {
    console.error("rate limit insert:", insertError.message);
  }

  return { ok: true };
}
