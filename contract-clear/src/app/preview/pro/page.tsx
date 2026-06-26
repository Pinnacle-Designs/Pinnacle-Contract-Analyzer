import Link from "next/link";
import { Logo } from "@/components/Logo";
import { AnalysisReport } from "@/components/AnalysisReport";
import { sampleAnalysis } from "@/lib/sampleAnalysis";
import { notFound } from "next/navigation";

export default function ProPreviewPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center border-b border-slate-800/60">
        <Logo variant="nav" />
        <div className="flex gap-4 items-center text-sm">
          <span className="text-xs bg-blue-950 border border-blue-700 text-blue-300 px-3 py-1 rounded-full font-medium">
            Pro · Unlimited
          </span>
          <Link href="/pricing" className="text-slate-400 hover:text-white">Pricing</Link>
          <Link href="/dashboard" className="text-slate-400 hover:text-white">Dashboard</Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold mb-1">Analyze a Contract</h1>
            <p className="text-slate-400 text-sm">
              Pro subscriber — unlimited analyses, no credit limits.
            </p>
          </div>
          <div className="bg-blue-950 border border-blue-800 rounded-xl px-4 py-3 text-sm">
            <p className="text-blue-300 font-medium">Pro plan active</p>
            <p className="text-slate-400 text-xs mt-0.5">$19/month · renews automatically</p>
          </div>
        </div>

        <p className="text-amber-400/90 text-xs mb-6 bg-amber-950/50 border border-amber-900/50 rounded-lg px-3 py-2">
          Preview mode — sample report below. Real subscribers see this after analyzing a contract.
        </p>

        <AnalysisReport analysis={sampleAnalysis} isPro />
      </div>
    </main>
  );
}
