"use client";

import Link from "next/link";
import { appPath } from "@/lib/app-url";

const severityStyles = {
  high: "border-pinnacle-danger/40 text-pinnacle-danger bg-pinnacle-danger/10",
  medium: "border-pinnacle-amber/40 text-pinnacle-amber bg-pinnacle-amber/10",
  low: "text-pinnacle-muted border-pinnacle-elevated bg-pinnacle-bg/50",
};

export function SampleReportPreview() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-24">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">
        Here&apos;s what your report looks like
      </h2>
      <p className="text-pinnacle-muted text-center text-sm mb-10 max-w-xl mx-auto">
        Plain English. Severity ratings. Specific things to push back on.
      </p>

      <div className="relative rounded-2xl border border-pinnacle-elevated bg-pinnacle-elevated overflow-hidden">
        <div className="p-6 sm:p-8 space-y-6 max-h-[520px] overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-medium uppercase tracking-wide bg-pinnacle-blue/20 text-pinnacle-blue-bright border border-pinnacle-blue/30 px-3 py-1 rounded-full">
              Freelance Agreement
            </span>
            <span className="text-sm font-medium text-pinnacle-amber border border-pinnacle-amber/40 bg-pinnacle-amber/10 px-3 py-1 rounded-full">
              Medium risk — 3 issues found
            </span>
          </div>

          <div>
            <p className="text-xs text-pinnacle-muted mb-2">Risk score</p>
            <div className="h-2 rounded-full bg-pinnacle-bg overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-pinnacle-blue via-pinnacle-amber to-pinnacle-danger"
                style={{ width: "58%" }}
              />
            </div>
            <p className="text-xs text-pinnacle-muted mt-1">58 / 100 — review before signing</p>
          </div>

          <div>
            <p className="text-sm font-semibold mb-3">Red flags</p>
            <div className="space-y-2">
              {[
                { label: "Unlimited revisions without extra pay", severity: "high" as const },
                { label: "Broad indemnification — you cover their legal fees", severity: "medium" as const },
                { label: "Net-60 payment terms", severity: "low" as const },
              ].map((flag) => (
                <div
                  key={flag.label}
                  className={`text-sm px-3 py-2 rounded-lg border ${severityStyles[flag.severity]}`}
                >
                  {flag.label}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold mb-2">Missing protections</p>
            <ul className="text-sm text-pinnacle-muted space-y-1 list-disc pl-5">
              <li>Limitation of liability cap</li>
              <li>Clear scope change / change-order process</li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold mb-2">Negotiation tip</p>
            <p className="text-sm text-pinnacle-muted">
              Ask to cap revisions at two rounds per milestone, with hourly billing for anything beyond agreed scope.
            </p>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-40 sm:h-48 bg-gradient-to-t from-pinnacle-bg via-pinnacle-bg/90 to-transparent flex items-end justify-center pb-6 sm:pb-8 px-4">
          <Link
            href={appPath("/signup")}
            className="w-full sm:w-auto text-center bg-pinnacle-blue hover:bg-pinnacle-blue-bright text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors shadow-lg"
          >
            See your full report — analyze free →
          </Link>
        </div>
      </div>
    </section>
  );
}
