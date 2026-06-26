"use client";
import { useState } from "react";
import { RiskScoreGauge, resolveRiskScore } from "@/components/RiskScoreGauge";
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

function CopyScriptButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="text-xs text-pinnacle-blue-bright hover:underline mt-2"
    >
      {copied ? "Copied to clipboard" : "Copy negotiation email →"}
    </button>
  );
}

export function AnalysisReport({
  analysis,
  isPro = false,
}: {
  analysis: ContractAnalysis;
  isPro?: boolean;
}) {
  const score = resolveRiskScore(analysis);

  return (
    <div className="space-y-8">
      <div className="bg-pinnacle-surface border border-pinnacle-elevated rounded-2xl p-6">
        <div className="flex flex-wrap justify-between items-start gap-6 mb-4">
          <div className="flex-1 min-w-[200px]">
            <p className="text-xs text-pinnacle-muted uppercase tracking-wide mb-1">Contract type</p>
            <p className="text-xl font-bold">{analysis.contractType}</p>
          </div>
          <RiskScoreGauge score={score} />
          <div className={`px-3 py-1 rounded-full border text-sm font-medium h-fit ${riskColors[analysis.overallRiskScore]}`}>
            {analysis.overallRiskScore.charAt(0).toUpperCase() + analysis.overallRiskScore.slice(1)} risk
          </div>
        </div>

        {analysis.partiesInvolved.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-pinnacle-muted uppercase tracking-wide mb-1">Parties</p>
            <p className="text-sm text-pinnacle-muted">{analysis.partiesInvolved.join(" · ")}</p>
          </div>
        )}

        <p className="text-pinnacle-muted text-sm leading-relaxed">{analysis.summary}</p>
        <p className="text-pinnacle-muted/70 text-xs mt-3 italic">{analysis.riskRationale}</p>
      </div>

      {analysis.keyTerms.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3">Key terms</h2>
          <div className="grid grid-cols-2 gap-3">
            {analysis.keyTerms.map((kv) => (
              <div key={kv.term} className="bg-pinnacle-surface border border-pinnacle-elevated rounded-xl p-4">
                <p className="text-xs text-pinnacle-muted mb-1">{kv.term}</p>
                <p className="text-sm font-medium">{kv.value}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {analysis.redFlags.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3">
            Red flags
            <span className="ml-2 text-sm font-normal text-pinnacle-muted">({analysis.redFlags.length})</span>
          </h2>
          <div className="space-y-3">
            {analysis.redFlags.map((flag, i) => (
              <div key={i} className="bg-pinnacle-surface border border-pinnacle-elevated rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${severityDot[flag.severity]}`} />
                  <p className="text-sm font-medium flex-1">{flag.clause}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full border flex-shrink-0 ${riskColors[flag.severity]}`}>
                    {flag.severity}
                  </span>
                </div>
                <p className="text-pinnacle-muted text-sm mb-3">{flag.explanation}</p>
                <p className="text-pinnacle-blue-bright text-xs">💡 {flag.suggestion}</p>
                {flag.negotiationScript && (
                  <div className="mt-4 pt-4 border-t border-pinnacle-elevated">
                    <p className="text-xs text-pinnacle-muted uppercase tracking-wide mb-2">Negotiation script</p>
                    <p className="text-sm text-pinnacle-muted font-mono leading-relaxed bg-pinnacle-bg/50 rounded-lg p-3">
                      {flag.negotiationScript}
                    </p>
                    <CopyScriptButton text={flag.negotiationScript} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {analysis.missingClauses.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3">Missing protections</h2>
          <div className="space-y-3">
            {analysis.missingClauses.map((clause, i) => (
              <div key={i} className="bg-pinnacle-surface border border-pinnacle-elevated rounded-xl p-5">
                <p className="text-sm font-medium mb-1">{clause.name}</p>
                <p className="text-pinnacle-muted text-sm mb-2">{clause.why}</p>
                <p className="text-pinnacle-muted/70 text-xs italic font-mono">
                  Example: &quot;{clause.example}&quot;
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {analysis.negotiationTips.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3">Negotiation tips</h2>
          <div className="space-y-3">
            {analysis.negotiationTips.map((tip, i) => (
              <div key={i} className="bg-pinnacle-surface border border-pinnacle-elevated rounded-xl p-5">
                <p className="text-sm font-medium mb-1">{tip.topic}</p>
                <p className="text-pinnacle-muted text-sm">{tip.tip}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {!isPro && (
        <div className="bg-pinnacle-blue/10 border border-pinnacle-blue/30 rounded-2xl p-6 text-center">
          <p className="font-semibold mb-1">Need unlimited analyses?</p>
          <p className="text-pinnacle-muted text-sm mb-4">Get the Pro plan for $19/month.</p>
          <a
            href="/pricing"
            className="inline-block bg-pinnacle-blue hover:bg-pinnacle-blue-bright text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Upgrade to Pro
          </a>
        </div>
      )}
    </div>
  );
}
