export type FaqItem = { question: string; answer: string };

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is this legal advice?",
    answer:
      "No. Pinnacle Contract Analyzer is an AI-powered informational tool, not a law firm. It helps you spot issues and ask better questions before you sign — but you should always consult a licensed attorney for binding decisions, especially on high-value or complex agreements.",
  },
  {
    question: "What contract types can I analyze?",
    answer:
      "NDAs, freelance and consulting agreements, SaaS terms, leases, employment offers, partnership agreements, service contracts, and most standard commercial agreements. Paste text or upload a PDF.",
  },
  {
    question: "Is my contract data private and secure?",
    answer:
      "Your contract text is processed to generate your report and stored in your account history if you're signed in. We use encrypted connections and trusted infrastructure providers. Do not upload privileged or highly confidential documents unless you accept cloud processing risks.",
  },
  {
    question: "How is this different from just asking ChatGPT?",
    answer:
      "General chat tools aren't built for contracts. Pinnacle reads every clause in context, flags severity, checks for missing protections, and outputs a structured report — red flags, missing clauses, key terms, and negotiation tips — in a consistent format every time.",
  },
  {
    question: "How accurate is the AI analysis?",
    answer:
      "The AI is strong at spotting one-sided language and common gaps, but it can miss context or jurisdiction-specific rules. Treat the report as a starting point, not a final legal opinion. Always verify important terms against the original document.",
  },
  {
    question: 'What does "missing clause" mean?',
    answer:
      "It means a protection that's commonly expected in this type of contract isn't present — for example, a limitation of liability cap or a clear termination notice period. Missing doesn't always mean fatal, but it's worth asking about before you sign.",
  },
  {
    question: "Can I cancel my Pro subscription anytime?",
    answer:
      "Yes. Cancel from your account billing portal. You keep access through the end of your paid period. No long-term lock-in.",
  },
  {
    question: "What file formats do you support?",
    answer:
      "Plain text paste and PDF upload. For scanned PDFs, quality depends on text extraction — if the PDF is image-only, paste the text manually for best results.",
  },
];
