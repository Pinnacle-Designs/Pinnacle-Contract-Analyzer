export type RedFlag = {
  clause: string;
  severity: "high" | "medium" | "low";
  explanation: string;
  suggestion: string;
  /** 2–3 sentence email the user can send to request a change. */
  negotiationScript?: string;
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
  /** 0–100 numeric risk score for gauge display. */
  riskScore?: number;
  riskRationale: string;
};
