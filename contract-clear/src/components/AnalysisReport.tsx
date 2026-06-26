"use client";
import { ContractAnalysis } from "@/types/analysis";

const riskColors = {
  high: "text-red-400 bg-red-950 border-red-800",
  medium: "text-yellow-400 bg-yellow-950 border-yellow-800",
  low: "text-green-400 bg-green-950 border-green-800",
};

const severityDot = {
  high: "bg-red-500",
  medium: "bg-yellow-500",
  low: "bg-green-500",
};

export function AnalysisReport({
  analysis,
  isPro = false,
}: {
  analysis: ContractAnalysis;
  isPro?: boolean;
}) {
  return (
    <div className="space-y-8">

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Contract type</p>
            <p className="text-xl font-bold">{analysis.contractType}</p>
          </div>
          <div className={`px-3 py-1 rounded-full border text-sm font-medium ${riskColors[analysis.overallRiskScore]}`}>
            {analysis.overallRiskScore.charAt(0).toUpperCase() + analysis.overallRiskScore.slice(1)} risk
          </div>
        </div>

        {analysis.partiesInvolved.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Parties</p>
            <p className="text-sm text-slate-300">{analysis.partiesInvolved.join(" · ")}</p>
          </div>
        )}

        <p className="text-slate-300 text-sm leading-relaxed">{analysis.summary}</p>
        <p className="text-slate-500 text-xs mt-3 italic">{analysis.riskRationale}</p>
      </div>

      {analysis.keyTerms.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3">Key Terms</h2>
          <div className="grid grid-cols-2 gap-3">
            {analysis.keyTerms.map((kv) => (
              <div key={kv.term} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <p className="text-xs text-slate-500 mb-1">{kv.term}</p>
                <p className="text-sm font-medium">{kv.value}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {analysis.redFlags.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3">
            Red Flags
            <span className="ml-2 text-sm font-normal text-slate-500">({analysis.redFlags.length})</span>
          </h2>
          <div className="space-y-3">
            {analysis.redFlags.map((flag, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${severityDot[flag.severity]}`} />
                  <p className="text-sm font-medium flex-1">{flag.clause}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full border flex-shrink-0 ${riskColors[flag.severity]}`}>
                    {flag.severity}
                  </span>
                </div>
                <p className="text-slate-300 text-sm mb-3">{flag.explanation}</p>
                <p className="text-blue-400 text-xs">💡 {flag.suggestion}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {analysis.missingClauses.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3">Missing Protections</h2>
          <div className="space-y-3">
            {analysis.missingClauses.map((clause, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <p className="text-sm font-medium mb-1">{clause.name}</p>
                <p className="text-slate-400 text-sm mb-2">{clause.why}</p>
                <p className="text-slate-500 text-xs italic">Example: &quot;{clause.example}&quot;</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {analysis.negotiationTips.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3">Negotiation Tips</h2>
          <div className="space-y-3">
            {analysis.negotiationTips.map((tip, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <p className="text-sm font-medium mb-1">{tip.topic}</p>
                <p className="text-slate-300 text-sm">{tip.tip}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {!isPro && (
        <div className="bg-blue-950 border border-blue-800 rounded-2xl p-6 text-center">
          <p className="font-semibold mb-1">Need unlimited analyses?</p>
          <p className="text-slate-400 text-sm mb-4">Get the Pro plan for $19/month.</p>
          <a
            href="/pricing"
            className="inline-block bg-blue-500 hover:bg-blue-400 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Upgrade to Pro
          </a>
        </div>
      )}

    </div>
  );
}
