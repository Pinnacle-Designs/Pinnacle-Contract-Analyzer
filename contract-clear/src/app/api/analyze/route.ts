import { NextRequest, NextResponse } from "next/server";
import { analyzeContract } from "@/lib/analyzeContract";
import { ensureUserProfile } from "@/lib/profile";
import { createServerSupabaseClient, createAdminSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { contractText } = await req.json();
    if (!contractText || contractText.trim().length < 100) {
      return NextResponse.json({ error: "Contract text is too short." }, { status: 400 });
    }

    const admin = createAdminSupabaseClient();
    const profile = await ensureUserProfile(user);

    const isPro = profile.plan === "pro";
    const hasCredits = profile.credits > 0;

    if (!isPro && !hasCredits) {
      return NextResponse.json({ error: "NO_CREDITS" }, { status: 402 });
    }

    if (!isPro) {
      await admin
        .from("profiles")
        .update({ credits: profile.credits - 1 })
        .eq("id", user.id);
    }

    let result;
    try {
      result = await analyzeContract(contractText);
    } catch (analysisError) {
      if (!isPro) {
        await admin
          .from("profiles")
          .update({ credits: profile.credits })
          .eq("id", user.id);
      }
      throw analysisError;
    }

    await admin.from("analyses").insert({
      user_id: user.id,
      contract_text: contractText,
      result,
    });

    return NextResponse.json({ result });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Analysis failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
