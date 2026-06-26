import type { AnalysisHistoryItem } from "@/types/account";
import type { ContractAnalysis } from "@/types/analysis";

export function previewText(text: string, max = 140): string {
  const trimmed = text.replace(/\s+/g, " ").trim();
  return trimmed.length <= max ? trimmed : `${trimmed.slice(0, max)}…`;
}

export function toAnalysisHistoryItem(row: {
  id: string;
  created_at: string;
  contract_text: string;
  result: unknown;
}): AnalysisHistoryItem {
  const result = row.result as ContractAnalysis;
  return {
    id: row.id,
    createdAt: row.created_at,
    contractPreview: previewText(row.contract_text),
    contractType: result?.contractType ?? "Unknown",
    overallRiskScore: result?.overallRiskScore ?? "medium",
    summary: result?.summary ?? "",
  };
}
