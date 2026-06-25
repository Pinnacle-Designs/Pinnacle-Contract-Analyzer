import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ContractClear — AI Contract Analyzer",
    template: "%s | ContractClear",
  },
  description:
    "Understand any contract in 60 seconds. Get plain-English red flags, missing clauses, and negotiation tips — no lawyer required.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 antialiased">{children}</body>
    </html>
  );
}
