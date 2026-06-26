export function ContractScanAnimation() {
  return (
    <div
      className="w-full max-w-md rounded-2xl border border-pinnacle-elevated bg-pinnacle-elevated p-5 shadow-xl shadow-black/30 will-change-transform"
      aria-hidden
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-pinnacle-muted uppercase tracking-wide">Scanning contract</span>
        <span className="text-xs text-pinnacle-blue-bright font-mono contract-scan-line">● live</span>
      </div>

      <div className="space-y-2 mb-5 font-mono text-[11px] leading-relaxed text-pinnacle-muted/80">
        <p>§ 4.2 Termination. Either party may terminate...</p>
        <p className="text-white/70">§ 7.1 Intellectual Property. Contractor assigns all work product...</p>
        <p>§ 9.3 Limitation of Liability. [not found]</p>
        <p>§ 12 Auto-Renewal. This agreement renews for successive one-year...</p>
      </div>

      <div className="space-y-2">
        <div className="contract-flag-1 flex items-start gap-2 rounded-lg bg-pinnacle-bg/60 border border-pinnacle-danger/30 px-3 py-2 text-xs">
          <span className="text-pinnacle-danger shrink-0">⚠</span>
          <span className="text-pinnacle-muted">One-sided termination clause</span>
        </div>
        <div className="contract-flag-2 flex items-start gap-2 rounded-lg bg-pinnacle-bg/60 border border-pinnacle-danger/40 px-3 py-2 text-xs">
          <span className="text-pinnacle-danger shrink-0">🔴</span>
          <span className="text-pinnacle-muted">Missing: limitation of liability</span>
        </div>
        <div className="contract-flag-3 flex items-start gap-2 rounded-lg bg-pinnacle-bg/60 border border-pinnacle-green/30 px-3 py-2 text-xs">
          <span className="text-pinnacle-green shrink-0">✓</span>
          <span className="text-pinnacle-muted">IP assignment — review carefully</span>
        </div>
      </div>
    </div>
  );
}
