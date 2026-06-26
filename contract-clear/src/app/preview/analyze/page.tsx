import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ContractAnalyzer } from "@/components/ContractAnalyzer";
import { notFound } from "next/navigation";

export default function AnalyzePreviewPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center border-b border-slate-800/60">
        <Logo variant="compact" />
        <div className="flex gap-4 items-center text-sm">
          <span className="text-xs bg-amber-950 border border-amber-800 text-amber-300 px-3 py-1 rounded-full">
            Test mode
          </span>
          <Link href="/" className="text-slate-400 hover:text-white">Home</Link>
          <Link href="/signup" className="bg-white text-slate-950 px-4 py-2 rounded-lg font-medium hover:bg-slate-100">
            Sign up
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-2">Contract Analyzer</h1>
        <p className="text-slate-400 text-sm mb-6">
          Paste a contract, load the sample, or upload a file — then hit Analyze.
        </p>

        <ContractAnalyzer
          analyzeEndpoint="/api/preview/analyze"
          isPro
          showDevBanner
        />
      </div>
    </main>
  );
}
