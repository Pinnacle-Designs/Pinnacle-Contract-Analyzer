import { NextRequest, NextResponse } from "next/server";
import { requireApiUser } from "@/lib/apiAuth";
import { enforceRateLimit } from "@/lib/rateLimit";
import { ensureUserProfile } from "@/lib/profile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const user = await requireApiUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await ensureUserProfile(user);
    const rateLimit = await enforceRateLimit(user.id, "parse-pdf", profile.plan === "pro");
    if (!rateLimit.ok) {
      return NextResponse.json(
        { error: "Too many PDF uploads. Please try again later." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSec) } }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file || file.type !== "application/pdf") {
      return NextResponse.json({ error: "Please upload a valid PDF file." }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "PDF must be under 10MB." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
    pdfjsLib.GlobalWorkerOptions.workerSrc = "";

    const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;
    const textParts: string[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items
        .map((item) => ("str" in item ? item.str : "") ?? "")
        .join(" ");
      textParts.push(pageText);
    }

    const text = textParts.join("\n\n").trim();

    if (!text || text.length < 50) {
      return NextResponse.json(
        {
          error:
            "Could not extract text from this PDF. It may be a scanned image. Please paste the contract text manually.",
        },
        { status: 422 }
      );
    }

    return NextResponse.json({ text });
  } catch {
    return NextResponse.json(
      { error: "Failed to parse PDF. Please try pasting the text manually." },
      { status: 500 }
    );
  }
}
