import Anthropic from "@anthropic-ai/sdk";
import { ContractAnalysis } from "@/types/analysis";

function getAnthropicClient() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

export async function analyzeContract(contractText: string): Promise<ContractAnalysis> {
  const systemPrompt = `You are an expert contract attorney with 20 years of experience reviewing NDAs, freelance agreements, SaaS subscriptions, employment contracts, and commercial leases. Your job is to protect the person reviewing this contract.

Analyze the provided contract and return ONLY a valid JSON object — no preamble, no markdown fences, no explanation outside the JSON. The JSON must exactly match this TypeScript type:

{
  contractType: string,
  partiesInvolved: string[],
  summary: string,
  keyTerms: Array<{ term: string, value: string }>,
  redFlags: Array<{
    clause: string,
    severity: "high" | "medium" | "low",
    explanation: string,
    suggestion: string
  }>,
  missingClauses: Array<{
    name: string,
    why: string,
    example: string
  }>,
  negotiationTips: Array<{
    topic: string,
    tip: string
  }>,
  overallRiskScore: "low" | "medium" | "high",
  riskRationale: string
}

Rules:
- summary: 3–5 sentences in plain English a non-lawyer can understand. No jargon.
- keyTerms: extract up to 8 most important terms (payment, duration, termination notice, IP ownership, governing law, etc.)
- redFlags: flag clauses that are one-sided, unusual, or potentially harmful. Be direct about severity.
- missingClauses: note important protections absent from the contract (limitation of liability, indemnification, dispute resolution, etc.)
- negotiationTips: give 3–5 specific, actionable things they could ask to change.
- overallRiskScore: low = standard fair contract, medium = some concerning terms, high = significantly one-sided or dangerous.
- If the input does not appear to be a contract, return: { contractType: "Unknown", summary: "The provided text does not appear to be a legal contract. Please paste the full text of a contract.", redFlags: [], missingClauses: [], negotiationTips: [], keyTerms: [], partiesInvolved: [], overallRiskScore: "low", riskRationale: "N/A" }`;

  const response = await getAnthropicClient().messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4000,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: `Please analyze this contract:\n\n${contractText.slice(0, 50000)}`,
      },
    ],
  });

  const text = response.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("");

  const cleaned = text.replace(/```json\n?|```/g, "").trim();

  try {
    return JSON.parse(cleaned) as ContractAnalysis;
  } catch {
    throw new Error("Failed to parse analysis. Please try again.");
  }
}
