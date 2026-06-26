"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AppNav } from "@/components/AppNav";
import { AnalysisReport } from "@/components/AnalysisReport";
import type { ContractAnalysis } from "@/types/analysis";

type AnalysisDetail = {
  id: string;
  createdAt: string;
  contractText: string;
  result: ContractAnalysis;
};

export default function AnalysisDetailPage() {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<AnalysisDetail | null>(null);
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showContract, setShowContract] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`/api/analyses/${params.id}`),
      fetch("/api/profile"),
    ])
      .then(async ([analysisRes, profileRes]) => {
        if (analysisRes.status === 401) {
          window.location.href = "/login";
          return;
        }
        if (!analysisRes.ok) throw new Error("Analysis not found.");
        const analysis = (await analysisRes.json()) as AnalysisDetail;
        const profile = profileRes.ok ? await profileRes.json() : null;
        setData(analysis);
        setIsPro(Boolean(profile?.isPro));
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [params.id]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <AppNav />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <Link
          href="/account"
          className="text-slate-400 hover:text-white text-sm mb-6 inline-flex items-center gap-2"
        >
          ← Back to account
        </Link>

        {loading && <p className="text-slate-400 text-sm">Loading report…</p>}
        {error && (
          <div className="bg-red-950 border border-red-800 rounded-xl p-4">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {data && (
          <div className="space-y-6">
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">Scanned</p>
              <p className="text-slate-300 text-sm">
                {new Date(data.createdAt).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>

            <button
              onClick={() => setShowContract((v) => !v)}
              className="text-sm text-blue-400 hover:underline"
            >
              {showContract ? "Hide original contract" : "View original contract text"}
            </button>

            {showContract && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 max-h-64 overflow-y-auto">
                <pre className="text-xs text-slate-400 whitespace-pre-wrap font-sans">
                  {data.contractText}
                </pre>
              </div>
            )}

            <AnalysisReport analysis={data.result} isPro={isPro} />
          </div>
        )}
      </div>
    </main>
  );
}
