"use client";
import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppNav } from "@/components/AppNav";
import { AnalysisHistory } from "@/components/AnalysisHistory";
import { ContractAnalysis } from "@/types/analysis";
import { AnalysisReport } from "@/components/AnalysisReport";

function DashboardContent() {
  const [contractText, setContractText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ContractAnalysis | null>(null);
  const [successBanner, setSuccessBanner] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [credits, setCredits] = useState<number | null>(null);
  const [historyRefresh, setHistoryRefresh] = useState(0);
  const [historyLoadingId, setHistoryLoadingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      setSuccessBanner(true);
      window.history.replaceState({}, "", "/dashboard");
      setTimeout(() => setSuccessBanner(false), 5000);
    }
  }, [searchParams]);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setIsPro(data.isPro);
          setCredits(data.credits);
        }
      })
      .catch(() => {});
  }, [successBanner]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    if (file.type === "application/pdf") {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/parse-pdf", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to read PDF.");
        return;
      }
      setContractText(data.text);
    } else {
      const text = await file.text();
      setContractText(text);
    }
  };

  const handleAnalyze = async () => {
    setError(null);
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contractText }),
      });

      const data = await res.json();

      if (res.status === 401) {
        router.push("/login");
        return;
      }

      if (res.status === 402 || data.error === "NO_CREDITS" || data.error === "FREE_ANALYSIS_ALREADY_CLAIMED") {
        if (data.message) setError(data.message);
        router.push("/pricing");
        return;
      }

      if (res.status === 403 && data.error === "EMAIL_NOT_CONFIRMED") {
        setError(data.message ?? "Confirm your email before analyzing. Check your inbox for the confirmation link.");
        return;
      }

      if (!res.ok) {
        setError(data.message ?? data.error ?? "Analysis failed. Please try again.");
        return;
      }

      setResult(data.result);
      setHistoryRefresh((n) => n + 1);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadHistoryItem = async (id: string) => {
    setError(null);
    setHistoryLoadingId(id);

    try {
      const res = await fetch(`/api/analyses/${id}`);
      const data = await res.json();

      if (res.status === 401) {
        router.push("/login");
        return;
      }

      if (!res.ok) {
        setError(data.error ?? "Could not load that analysis.");
        return;
      }

      setResult(data.result);
      setContractText("");
      requestAnimationFrame(() => {
        reportRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } catch {
      setError("Could not load that analysis.");
    } finally {
      setHistoryLoadingId(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">

      {successBanner && (
        <div className="mb-6 bg-green-950 border border-green-700 rounded-xl px-5 py-4">
          <p className="text-green-300 text-sm font-medium">
            ✓ Payment successful — your account has been updated.
          </p>
        </div>
      )}

      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold mb-2">Analyze a Contract</h1>
          <p className="text-slate-400 text-sm">
            {isPro
              ? "Pro subscriber — unlimited analyses."
              : "Paste the full contract text below, or upload a PDF or .txt file."}
          </p>
        </div>
        {isPro ? (
          <div className="bg-blue-950 border border-blue-800 rounded-xl px-4 py-3 text-sm shrink-0">
            <p className="text-blue-300 font-medium">Pro plan active</p>
            <p className="text-slate-400 text-xs mt-0.5">$19/month · unlimited</p>
          </div>
        ) : credits !== null ? (
          <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm shrink-0">
            <p className="text-slate-300 font-medium">{credits} credit{credits === 1 ? "" : "s"} left</p>
            <a href="/pricing" className="text-blue-400 text-xs hover:underline">Get more →</a>
          </div>
        ) : null}
      </div>

      {error && (
        <div className="mb-6 bg-red-950 border border-red-800 rounded-xl p-4">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      {!result && (
        <div className="space-y-4">
          <textarea
            className="w-full h-72 bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Paste your contract text here…"
            value={contractText}
            onChange={(e) => setContractText(e.target.value)}
          />

          <div className="flex gap-3 items-center flex-wrap">
            <button
              onClick={handleAnalyze}
              disabled={loading || contractText.trim().length < 100}
              className="bg-blue-500 hover:bg-blue-400 disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              {loading ? "Analyzing…" : "Analyze contract"}
            </button>

            <span className="text-slate-500 text-sm">or</span>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="border border-slate-700 hover:border-slate-500 text-slate-300 px-4 py-3 rounded-xl text-sm transition-colors"
            >
              Upload PDF / TXT
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.txt"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>

          {loading && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center">
              <p className="text-slate-400 text-sm animate-pulse">
                Reading your contract… this usually takes 15–30 seconds.
              </p>
            </div>
          )}
        </div>
      )}

      {result && (
        <div ref={reportRef}>
          <button
            onClick={() => { setResult(null); setContractText(""); }}
            className="text-slate-400 hover:text-white text-sm mb-6 flex items-center gap-2"
          >
            ← Analyze another contract
          </button>
          <AnalysisReport analysis={result} isPro={isPro} />
        </div>
      )}

      <section className="mt-12 pt-8 border-t border-slate-800">
        <h2 className="text-lg font-semibold mb-1">Scan history</h2>
        <p className="text-slate-500 text-sm mb-4">
          {isPro ? "Re-open any past report." : "Your saved analyses from this account."}
        </p>
        <AnalysisHistory
          refreshKey={historyRefresh}
          onSelect={loadHistoryItem}
          loadingId={historyLoadingId}
        />
      </section>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <AppNav />
      <Suspense fallback={
        <div className="max-w-3xl mx-auto px-4 py-12">
          <p className="text-slate-400 text-sm">Loading…</p>
        </div>
      }>
        <DashboardContent />
      </Suspense>
    </main>
  );
}
