import { ContractAnalysis } from "@/types/analysis";

export const sampleAnalysis: ContractAnalysis = {
  contractType: "Freelance Services Agreement",
  partiesInvolved: ["Acme Corp", "You (Contractor)"],
  summary:
    "This is a standard freelance contract where you provide design services to Acme Corp for $5,000 over 3 months. You retain some IP rights, but Acme gets broad usage rights. Payment is net-30 after milestone delivery. Either party can terminate with 14 days notice, but Acme can withhold payment for disputed work.",
  keyTerms: [
    { term: "Payment", value: "$5,000 total, net-30 per milestone" },
    { term: "Duration", value: "3 months, renewable" },
    { term: "Termination", value: "14 days written notice" },
    { term: "IP ownership", value: "You own pre-existing work; Acme owns deliverables" },
    { term: "Governing law", value: "Delaware" },
  ],
  redFlags: [
    {
      clause: "Unlimited revision clause (Section 3.1)",
      severity: "high",
      explanation:
        "Acme can request unlimited revisions without additional pay, which can trap you in endless work.",
      suggestion: "Cap revisions at 2 rounds per milestone, with hourly rate for extras.",
      negotiationScript:
        "Hi — I'm excited to move forward. Before signing, could we cap revisions at two rounds per milestone, with additional changes billed at my standard hourly rate? That keeps scope clear for both of us.",
    },
    {
      clause: "Broad indemnification (Section 8)",
      severity: "medium",
      explanation:
        "You must cover Acme's legal costs if a third party sues over your work — unusually broad for a freelancer.",
      suggestion: "Limit indemnity to your negligence and cap liability at the contract value.",
      negotiationScript:
        "I'd like to narrow the indemnification to claims arising from my negligence or willful misconduct, and cap total liability at the fees paid under this agreement. Happy to discuss wording that works for both sides.",
    },
  ],
  missingClauses: [
    {
      name: "Limitation of Liability",
      why: "Without this, you could be liable for damages far exceeding the $5,000 fee.",
      example: "Total liability shall not exceed fees paid under this agreement.",
    },
  ],
  negotiationTips: [
    {
      topic: "Payment terms",
      tip: "Ask for 50% upfront and net-15 instead of net-30 to reduce cash-flow risk.",
    },
    {
      topic: "Revision limits",
      tip: "Define exactly what counts as a 'revision' vs. new scope requiring a change order.",
    },
  ],
  overallRiskScore: "medium",
  riskScore: 58,
  riskRationale:
    "Several clauses favor the client, but nothing catastrophic. Negotiate revision limits and indemnification before signing.",
};
