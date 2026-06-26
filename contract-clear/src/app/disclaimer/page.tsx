import { LegalLayout } from "@/components/LegalLayout";
import { CONTACT_EMAIL, legalIntro } from "@/lib/legal";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Disclaimer",
  description: "Important limitations regarding AI contract analysis from Pinnacle Contract Analyzer.",
  path: "/disclaimer",
});

const sections = [
  {
    title: "Not legal advice",
    paragraphs: [
      legalIntro,
      "Pinnacle Contract Analyzer is an AI-powered informational tool. It is not a law firm, and we do not provide legal advice, legal representation, or attorney-client relationships.",
      "Reports, summaries, red-flag ratings, and negotiation suggestions are generated automatically and are for general educational purposes only. They may be incomplete, outdated, or incorrect for your jurisdiction or situation.",
    ],
  },
  {
    title: "Consult a qualified attorney",
    paragraphs: [
      "Always consult a licensed attorney before signing, modifying, or relying on any contract—especially for high-value, employment, real estate, regulatory, or cross-border agreements.",
      "Do not delay seeking professional advice because of something you read in an analysis report.",
    ],
  },
  {
    title: "No guarantee of accuracy",
    paragraphs: [
      "AI systems can misread context, miss critical clauses, or flag benign language. We do not warrant that analyses are accurate, complete, or suitable for any particular purpose.",
      "Risk scores and severity labels are automated estimates, not legal conclusions.",
    ],
  },
  {
    title: "Your responsibility",
    paragraphs: [
      "You are solely responsible for decisions you make based on Service outputs. Verify all important terms against the original document and applicable law.",
      "Only upload documents you are authorized to share. Sensitive or privileged material should not be submitted unless you accept the risks of electronic processing.",
    ],
  },
  {
    title: "No professional relationship",
    paragraphs: [
      "Use of the Service does not create a lawyer-client, fiduciary, or professional advisory relationship between you and Pinnacle Contract Analyzer or any of its employees or partners.",
    ],
  },
  {
    title: "Third-party content",
    paragraphs: [
      "The Service may reference general legal concepts or link to external resources. We do not endorse third-party content and are not responsible for it.",
    ],
  },
  {
    title: "Questions",
    paragraphs: [
      `For questions about this Disclaimer, contact ${CONTACT_EMAIL}.`,
    ],
  },
];

export default function DisclaimerPage() {
  return (
    <LegalLayout
      title="Disclaimer"
      description="Please read this carefully. Our AI analyses are helpful starting points—not substitutes for professional legal review."
      sections={sections}
    />
  );
}
