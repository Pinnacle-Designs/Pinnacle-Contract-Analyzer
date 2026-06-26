import type { ContractAnalysis } from "@/types/analysis";

export type AccountProfile = {
  email: string;
  plan: string;
  credits: number;
  isPro: boolean;
  memberSince: string;
  hasStripeCustomer: boolean;
};

export type AnalysisHistoryItem = {
  id: string;
  createdAt: string;
  contractPreview: string;
  contractType: string;
  overallRiskScore: ContractAnalysis["overallRiskScore"];
  summary: string;
};

export type PaymentHistoryItem = {
  id: string;
  date: string;
  amount: number;
  currency: string;
  description: string;
  status: string;
};

export type AccountData = {
  profile: AccountProfile;
  analyses: AnalysisHistoryItem[];
  payments: PaymentHistoryItem[];
};
