"use client";

import { useState, useRef } from "react";
import { AnalysisReport } from "@/components/AnalysisReport";
import { ContractAnalysis } from "@/types/analysis";
import { sampleContractText } from "@/lib/sampleContract";

export function ContractAnalyzer({
  analyzeEndpoint,
  isPro = false,
  showDevBanner = false,
}: {
  analyzeEndpoint: string;
  isPro?: boolean;
  showDevBanner?: boolean;
}) {
  const [contractText, setContractText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ContractAnalysis | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      const res = await fetch(analyzeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contractText }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Analysis failed. Please try again.");
        return;
      }

      setResult(data.result);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showDevBanner && (
        <p className="text-amber-400/90 text-xs mb-6 bg-amber-950/50 border border-amber-900/50 rounded-lg px-3 py-2">
          Test mode — no login or credits required. Uses your Anthropic API key. Analysis takes 15–30 seconds.
        </p>
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

            <button
              type="button"
              onClick={() => setContractText(sampleContractText)}
              className="border border-slate-700 hover:border-slate-500 text-slate-300 px-4 py-3 rounded-xl text-sm transition-colors"
            >
              Load sample contract
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

          {error && (
            <div className="bg-red-950 border border-red-800 rounded-xl p-4">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}
        </div>
      )}

      {result && (
        <div>
          <button
            onClick={() => { setResult(null); }}
            className="text-slate-400 hover:text-white text-sm mb-6 flex items-center gap-2"
          >
            ← Analyze another contract
          </button>
          <AnalysisReport analysis={result} isPro={isPro} />
        </div>
      )}
    </>
  );
}
