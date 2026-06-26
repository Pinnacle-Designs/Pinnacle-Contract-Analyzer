import { NextResponse } from "next/server";
import { toAnalysisHistoryItem } from "@/lib/analyses";
import { createServerSupabaseClient, createAdminSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const admin = createAdminSupabaseClient();
    const { data: rows, error } = await admin
      .from("analyses")
      .select("id, created_at, contract_text, result")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("analyses list:", error.message);
      return NextResponse.json({ error: "Failed to load history." }, { status: 500 });
    }

    return NextResponse.json({
      analyses: (rows ?? []).map(toAnalysisHistoryItem),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to load history.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
