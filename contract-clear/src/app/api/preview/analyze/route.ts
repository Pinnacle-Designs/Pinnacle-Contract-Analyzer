import { NextRequest, NextResponse } from "next/server";
import { analyzeContract } from "@/lib/analyzeContract";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available." }, { status: 404 });
  }

  try {
    const { contractText } = await req.json();
    if (!contractText || contractText.trim().length < 100) {
      return NextResponse.json({ error: "Contract text is too short." }, { status: 400 });
    }

    const result = await analyzeContract(contractText);
    return NextResponse.json({ result });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Analysis failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
