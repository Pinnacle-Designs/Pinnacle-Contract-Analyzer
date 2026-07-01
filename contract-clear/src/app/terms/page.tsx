import { LegalLayout } from "@/components/LegalLayout";
import { CONTACT_EMAIL, legalIntro } from "@/lib/legal";
import { pageMetadata } from "@/lib/seo-pages";

export const metadata = pageMetadata("terms");

const sections = [
  {
    title: "1. Acceptance of terms",
    paragraphs: [
      legalIntro,
      "By accessing or using the Service, creating an account, or purchasing a subscription or analysis credit, you agree to these Terms of Service and our Privacy Policy. If you do not agree, do not use the Service.",
    ],
  },
  {
    title: "2. The service",
    paragraphs: [
      "Pinnacle Contract Analyzer uses artificial intelligence to summarize contracts, highlight potential issues, and suggest talking points. The Service is an informational tool only and does not provide legal advice, attorney-client relationships, or guaranteed accuracy.",
      "We may update, suspend, or discontinue features at any time. We strive for high availability but do not guarantee uninterrupted access.",
    ],
  },
  {
    title: "3. Eligibility and accounts",
    paragraphs: [
      "You must be at least 18 years old and able to form a binding contract to use the Service. You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account.",
      "You agree to provide accurate registration information and to notify us promptly of unauthorized use at " + CONTACT_EMAIL + ".",
    ],
  },
  {
    title: "4. Acceptable use",
    paragraphs: ["You agree not to:"],
    list: [
      "Upload unlawful, infringing, or confidential documents you do not have permission to analyze.",
      "Use the Service to provide legal advice to third parties or misrepresent outputs as professional legal counsel.",
      "Reverse engineer, scrape, overload, or attempt to bypass usage limits or security controls.",
      "Share account access or resell analyses without our written consent.",
      "Use the Service in violation of applicable law or third-party rights.",
    ],
  },
  {
    title: "5. Your content",
    paragraphs: [
      "You retain ownership of contract text and documents you submit. You grant us a limited license to process that content solely to provide the Service, including transmission to our AI and infrastructure providers under appropriate confidentiality and security terms.",
      "You represent that you have the right to upload the content you submit and that doing so does not violate any agreement or law.",
    ],
  },
  {
    title: "6. Payments and subscriptions",
    paragraphs: [
      "Paid plans and one-time analysis credits are billed through Stripe. Prices are shown at checkout and may change for future purchases with notice on the pricing page.",
      "Pro subscriptions renew automatically each billing period until canceled. You may cancel through your account billing portal or by contacting us. Cancellation stops future charges; access continues through the end of the paid period unless otherwise stated.",
      "Except where required by law, fees are non-refundable once a billing period has started or a one-time analysis credit has been delivered. Chargebacks or payment disputes may result in account suspension.",
    ],
  },
  {
    title: "7. Free tier and usage limits",
    paragraphs: [
      "Free accounts may receive a limited number of analyses or features. We may modify free-tier limits at any time. Attempts to circumvent limits may result in termination.",
    ],
  },
  {
    title: "8. Intellectual property",
    paragraphs: [
      "We own the Service, software, branding, and underlying technology. Analysis reports generated for you are licensed for your personal or internal business use. You may not republish our reports as a competing service or remove proprietary notices.",
    ],
  },
  {
    title: "9. Disclaimers",
    paragraphs: [
      "THE SERVICE IS PROVIDED \"AS IS\" AND \"AS AVAILABLE\" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.",
      "AI-generated outputs may contain errors or omissions. Always consult a qualified attorney before signing or relying on any contract. See our Disclaimer for additional details.",
    ],
  },
  {
    title: "10. Limitation of liability",
    paragraphs: [
      "TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE AND OUR SUPPLIERS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR FOR LOST PROFITS, DATA, OR BUSINESS OPPORTUNITIES, ARISING FROM YOUR USE OF THE SERVICE.",
      "OUR TOTAL LIABILITY FOR ANY CLAIM RELATING TO THE SERVICE IS LIMITED TO THE GREATER OF (A) AMOUNTS YOU PAID US IN THE TWELVE MONTHS BEFORE THE CLAIM OR (B) USD $100.",
    ],
  },
  {
    title: "11. Indemnification",
    paragraphs: [
      "You agree to indemnify and hold us harmless from claims arising out of your content, misuse of the Service, or violation of these Terms.",
    ],
  },
  {
    title: "12. Termination",
    paragraphs: [
      "You may stop using the Service at any time. We may suspend or terminate access for violations of these Terms, non-payment, fraud, or risk to the Service or other users. Upon termination, provisions that by nature should survive will remain in effect.",
    ],
  },
  {
    title: "13. Governing law",
    paragraphs: [
      "These Terms are governed by the laws of the State of Delaware, USA, without regard to conflict-of-law rules. Disputes will be resolved in the state or federal courts located in Delaware, unless applicable law requires otherwise.",
    ],
  },
  {
    title: "14. Changes",
    paragraphs: [
      "We may update these Terms by posting a revised version and updating the \"Last updated\" date. Material changes may also be communicated by email or in-app notice. Continued use after changes become effective constitutes acceptance.",
    ],
  },
  {
    title: "15. Contact",
    paragraphs: [
      `Questions about these Terms: ${CONTACT_EMAIL}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      path="/terms"
      description="These terms govern your access to and use of Pinnacle Contract Analyzer, including free and paid plans."
      sections={sections}
    />
  );
}
