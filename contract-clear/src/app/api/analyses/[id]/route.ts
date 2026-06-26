import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient, createAdminSupabaseClient } from "@/lib/supabase/server";
import type { ContractAnalysis } from "@/types/analysis";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminSupabaseClient();
  const { data: row } = await admin
    .from("analyses")
    .select("id, created_at, contract_text, result")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!row) {
    return NextResponse.json({ error: "Analysis not found." }, { status: 404 });
  }

  return NextResponse.json({
    id: row.id,
    createdAt: row.created_at,
    contractText: row.contract_text,
    result: row.result as ContractAnalysis,
  });
}
