import { NextRequest, NextResponse } from "next/server";
import { analyzeContract } from "@/lib/analyzeContract";
import {
  EMAIL_NOT_CONFIRMED,
  FREE_ANALYSIS_ALREADY_CLAIMED,
  normalizeEmail,
} from "@/lib/freeAnalysis";
import { ensureUserProfile } from "@/lib/profile";
import { createServerSupabaseClient, createAdminSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

type CreditResult = {
  is_pro: boolean;
  plan: string;
  credits_remaining: number;
};

function parseCreditResult(rows: unknown): CreditResult {
  const credit = Array.isArray(rows) ? rows[0] : rows;
  if (!credit || typeof credit !== "object") {
    throw new Error("CREDIT_DEBIT_FAILED");
  }

  const { is_pro, plan, credits_remaining } = credit as CreditResult;
  if (
    typeof is_pro !== "boolean" ||
    typeof plan !== "string" ||
    typeof credits_remaining !== "number"
  ) {
    throw new Error("CREDIT_DEBIT_FAILED");
  }

  return { is_pro, plan, credits_remaining };
}

async function restoreAnalysisCredit(
  admin: ReturnType<typeof createAdminSupabaseClient>,
  userId: string
): Promise<void> {
  const { error } = await admin.rpc("restore_analysis_credit", { p_user_id: userId });
  if (error) {
    console.error("restore_analysis_credit:", error.message);
    throw new Error(
      "Analysis failed and your credit could not be automatically restored. Please contact support."
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!user.email_confirmed_at) {
      return NextResponse.json(
        { error: EMAIL_NOT_CONFIRMED, message: "Confirm your email before analyzing." },
        { status: 403 }
      );
    }

    const { contractText } = await req.json();
    if (!contractText || contractText.trim().length < 100) {
      return NextResponse.json({ error: "Contract text is too short." }, { status: 400 });
    }

    const admin = createAdminSupabaseClient();
    const profile = await ensureUserProfile(user);
    const isPro = profile.plan === "pro";
    const usingFreeTierCredit = !isPro && profile.plan === "free";

    if (usingFreeTierCredit && user.email) {
      const email = normalizeEmail(user.email);
      const { data: claim } = await admin
        .from("free_analysis_claims")
        .select("user_id")
        .eq("email", email)
        .maybeSingle();

      if (claim && claim.user_id !== user.id) {
        return NextResponse.json(
          {
            error: FREE_ANALYSIS_ALREADY_CLAIMED,
            message: "This email has already used its free analysis.",
          },
          { status: 402 }
        );
      }
    }

    const { data: creditRows, error: creditError } = await admin.rpc("use_analysis_credit", {
      p_user_id: user.id,
    });

    if (creditError) {
      const code = creditError.message?.includes("NO_CREDITS") ? "NO_CREDITS" : creditError.message;
      if (code === "NO_CREDITS") {
        return NextResponse.json({ error: "NO_CREDITS" }, { status: 402 });
      }
      throw creditError;
    }

    const credit = parseCreditResult(creditRows);
    const chargedFreeTier = credit.plan === "free" && !credit.is_pro;

    let result;
    try {
      result = await analyzeContract(contractText);
    } catch (analysisError) {
      if (!credit.is_pro) {
        await restoreAnalysisCredit(admin, user.id);
      }
      throw analysisError;
    }

    await admin.from("analyses").insert({
      user_id: user.id,
      contract_text: contractText,
      result,
    });

    if (chargedFreeTier && user.email) {
      await admin.from("free_analysis_claims").upsert(
        {
          email: normalizeEmail(user.email),
          user_id: user.id,
        },
        { onConflict: "email", ignoreDuplicates: true }
      );
    }

    return NextResponse.json({ result });
  } catch (err: unknown) {
    const message =
      err instanceof Error && err.message === "CREDIT_DEBIT_FAILED"
        ? "Could not verify your account credits. Please try again."
        : err instanceof Error
        ? err.message
        : "Analysis failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
