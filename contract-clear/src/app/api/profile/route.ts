import { NextResponse } from "next/server";
import { ensureUserProfile } from "@/lib/profile";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await ensureUserProfile(user);

    return NextResponse.json({
      plan: profile.plan,
      credits: profile.credits,
      isPro: profile.plan === "pro",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Profile error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
