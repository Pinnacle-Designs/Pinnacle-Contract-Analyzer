import { createAdminSupabaseClient } from "@/lib/supabase/server";
import { normalizeEmail } from "@/lib/freeAnalysis";

export type UserProfile = {
  email: string | null;
  plan: string;
  credits: number;
  stripe_customer_id: string | null;
  created_at: string;
};

export async function ensureUserProfile(user: {
  id: string;
  email?: string | null;
}): Promise<UserProfile> {
  const admin = createAdminSupabaseClient();

  const { data: existing } = await admin
    .from("profiles")
    .select("email, plan, credits, stripe_customer_id, created_at")
    .eq("id", user.id)
    .maybeSingle();

  if (existing) {
    return existing as UserProfile;
  }

  const emailNorm = user.email ? normalizeEmail(user.email) : null;
  let credits = 1;
  if (emailNorm) {
    const { data: claim } = await admin
      .from("free_analysis_claims")
      .select("user_id")
      .eq("email", emailNorm)
      .maybeSingle();
    if (claim) credits = 0;
  }

  const { data: created, error } = await admin
    .from("profiles")
    .insert({
      id: user.id,
      email: user.email ?? null,
      credits,
    })
    .select("email, plan, credits, stripe_customer_id, created_at")
    .single();

  if (error || !created) {
    throw new Error(error?.message ?? "Could not create profile.");
  }

  return created as UserProfile;
}
