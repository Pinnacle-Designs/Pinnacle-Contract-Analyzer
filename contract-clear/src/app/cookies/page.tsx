import { LegalLayout } from "@/components/LegalLayout";
import { CONTACT_EMAIL, legalIntro } from "@/lib/legal";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Cookie Policy",
  description: "How Pinnacle Contract Analyzer uses cookies and similar technologies.",
  path: "/cookies",
});

const sections = [
  {
    title: "1. What are cookies?",
    paragraphs: [
      "Cookies are small text files stored on your device when you visit a website. Similar technologies include local storage, session storage, and pixels. We use these to operate the Service and understand usage.",
    ],
  },
  {
    title: "2. How we use cookies",
    paragraphs: [legalIntro, "We use cookies and similar technologies for:"],
    list: [
      "Essential operation: keeping you signed in, security, and load balancing.",
      "Preferences: remembering settings where applicable.",
      "Analytics: understanding how the Service is used so we can improve it.",
      "Payments: Stripe may set cookies during checkout to prevent fraud and complete transactions.",
    ],
  },
  {
    title: "3. Types of cookies",
    paragraphs: ["Cookies we or our partners may use include:"],
    list: [
      "Strictly necessary cookies — required for authentication and core functionality.",
      "Functional cookies — enhance experience (e.g., session persistence).",
      "Analytics cookies — aggregated usage statistics.",
      "Third-party cookies — set by Stripe, Supabase auth, or hosting providers when you use related features.",
    ],
  },
  {
    title: "4. Managing cookies",
    paragraphs: [
      "Most browsers let you block or delete cookies through settings. Blocking essential cookies may prevent login or checkout from working correctly.",
      "For Stripe cookie information, see Stripe's privacy documentation. You can opt out of some analytics through your browser or device settings where available.",
    ],
  },
  {
    title: "5. Do Not Track",
    paragraphs: [
      "Some browsers send \"Do Not Track\" signals. There is no industry standard for responding to DNT; we currently do not alter practices based on DNT signals alone.",
    ],
  },
  {
    title: "6. Updates and contact",
    paragraphs: [
      "We may update this Cookie Policy when our practices change. Continued use after updates constitutes acceptance.",
      `Questions: ${CONTACT_EMAIL}. See also our Privacy Policy.`,
    ],
  },
];

export default function CookiesPage() {
  return (
    <LegalLayout
      title="Cookie Policy"
      description="This policy explains how we use cookies and related technologies on our website and application."
      sections={sections}
    />
  );
}
