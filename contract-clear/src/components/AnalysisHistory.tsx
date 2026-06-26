"use client";

import { useEffect, useState } from "react";
import type { AnalysisHistoryItem } from "@/types/account";

const riskColors = {
  high: "text-red-400 bg-red-950/50 border-red-800",
  medium: "text-yellow-400 bg-yellow-950/50 border-yellow-800",
  low: "text-green-400 bg-green-950/50 border-green-800",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

type AnalysisHistoryProps = {
  refreshKey?: number;
  onSelect?: (id: string) => void;
  loadingId?: string | null;
};

export function AnalysisHistory({ refreshKey = 0, onSelect, loadingId = null }: AnalysisHistoryProps) {
  const [analyses, setAnalyses] = useState<AnalysisHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch("/api/analyses")
      .then(async (res) => {
        if (res.status === 401) return null;
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error ?? "Failed to load history.");
        }
        return res.json() as Promise<{ analyses: AnalysisHistoryItem[] }>;
      })
      .then((data) => {
        if (data) setAnalyses(data.analyses);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  if (loading) {
    return <p className="text-slate-500 text-sm">Loading history…</p>;
  }

  if (error) {
    return <p className="text-red-300 text-sm">{error}</p>;
  }

  if (analyses.length === 0) {
    return (
      <p className="text-slate-500 text-sm">
        Past analyses will appear here after you run your first scan.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {analyses.map((item) => {
        const isLoading = loadingId === item.id;
        const inner = (
          <>
            <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
              <div>
                <p className="font-medium text-white">{item.contractType}</p>
                <p className="text-slate-500 text-xs mt-0.5">{formatDate(item.createdAt)}</p>
              </div>
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full border capitalize ${
                  riskColors[item.overallRiskScore]
                }`}
              >
                {item.overallRiskScore} risk
              </span>
            </div>
            <p className="text-slate-400 text-sm line-clamp-2">{item.summary}</p>
            <p className="text-slate-600 text-xs mt-2 line-clamp-1">{item.contractPreview}</p>
            {isLoading && (
              <p className="text-slate-500 text-xs mt-2 animate-pulse">Opening report…</p>
            )}
          </>
        );

        return (
          <li key={item.id}>
            {onSelect ? (
              <button
                type="button"
                onClick={() => onSelect(item.id)}
                disabled={Boolean(loadingId)}
                className="w-full text-left bg-slate-950/60 border border-slate-800 hover:border-slate-600 rounded-xl p-4 transition-colors disabled:opacity-60"
              >
                {inner}
              </button>
            ) : (
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
