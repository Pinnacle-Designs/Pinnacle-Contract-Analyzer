import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createServerSupabaseClient, createAdminSupabaseClient } from "@/lib/supabase/server";
import type { AccountData, AnalysisHistoryItem, PaymentHistoryItem } from "@/types/account";
import type { ContractAnalysis } from "@/types/analysis";

export const dynamic = "force-dynamic";

function previewText(text: string, max = 140): string {
  const trimmed = text.replace(/\s+/g, " ").trim();
  return trimmed.length <= max ? trimmed : `${trimmed.slice(0, max)}…`;
}

async function getPaymentHistory(customerId: string): Promise<PaymentHistoryItem[]> {
  const stripe = getStripe();
  const payments: PaymentHistoryItem[] = [];

  const [sessions, invoices] = await Promise.all([
    stripe.checkout.sessions.list({ customer: customerId, limit: 20 }),
    stripe.invoices.list({ customer: customerId, limit: 20 }),
  ]);

  for (const session of sessions.data) {
    if (session.mode === "subscription") continue;
    if (session.payment_status !== "paid" || !session.amount_total) continue;
    payments.push({
      id: session.id,
      date: new Date((session.created ?? 0) * 1000).toISOString(),
      amount: session.amount_total,
      currency: session.currency ?? "usd",
      description: "Single contract analysis",
      status: session.payment_status,
    });
  }

  for (const invoice of invoices.data) {
    if (!invoice.amount_paid) continue;
    payments.push({
      id: invoice.id,
      date: new Date((invoice.created ?? 0) * 1000).toISOString(),
      amount: invoice.amount_paid,
      currency: invoice.currency ?? "usd",
      description: invoice.lines.data[0]?.description ?? "Pro subscription invoice",
      status: invoice.status ?? "paid",
    });
  }

  return payments
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 20);
}

export async function GET() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminSupabaseClient();

  const { data: profile } = await admin
    .from("profiles")
    .select("email, plan, credits, stripe_customer_id, created_at")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return NextResponse.json({ error: "Profile not found." }, { status: 404 });
  }

  const { data: analysesRows } = await admin
    .from("analyses")
    .select("id, created_at, contract_text, result")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50);

  const analyses: AnalysisHistoryItem[] = (analysesRows ?? []).map((row) => {
    const result = row.result as ContractAnalysis;
    return {
      id: row.id,
      createdAt: row.created_at,
      contractPreview: previewText(row.contract_text),
      contractType: result?.contractType ?? "Unknown",
      overallRiskScore: result?.overallRiskScore ?? "medium",
      summary: result?.summary ?? "",
    };
  });

  let payments: PaymentHistoryItem[] = [];
  if (profile.stripe_customer_id) {
    try {
      payments = await getPaymentHistory(profile.stripe_customer_id);
    } catch {
      payments = [];
    }
  }

  const payload: AccountData = {
    profile: {
      email: profile.email ?? user.email ?? "",
      plan: profile.plan ?? "free",
      credits: profile.credits ?? 0,
      isPro: profile.plan === "pro",
      memberSince: profile.created_at,
      hasStripeCustomer: Boolean(profile.stripe_customer_id),
    },
    analyses,
    payments,
  };

  return NextResponse.json(payload);
}
