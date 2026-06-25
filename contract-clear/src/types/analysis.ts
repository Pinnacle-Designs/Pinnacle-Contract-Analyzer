export type RedFlag = {
  clause: string;
  severity: "high" | "medium" | "low";
  explanation: string;
  suggestion: string;
};

export type MissingClause = {
  name: string;
  why: string;
  example: string;
};

export type NegotiationTip = {
  topic: string;
  tip: string;
};

export type ContractAnalysis = {
  contractType: string;
  partiesInvolved: string[];
  summary: string;
  keyTerms: { term: string; value: string }[];
  redFlags: RedFlag[];
  missingClauses: MissingClause[];
  negotiationTips: NegotiationTip[];
  overallRiskScore: "low" | "medium" | "high";
  riskRationale: string;
};
