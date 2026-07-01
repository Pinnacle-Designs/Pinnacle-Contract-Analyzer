import { LegalLayout } from "@/components/LegalLayout";
import { CONTACT_EMAIL, legalIntro } from "@/lib/legal";
import { pageMetadata } from "@/lib/seo-pages";

export const metadata = pageMetadata("cookies");

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
      "Advertising: Google AdSense may use cookies to serve and measure ads on our marketing pages (with your consent where required).",
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
      "Advertising cookies — Google AdSense may set cookies to show relevant ads and limit repeat impressions (marketing pages only).",
      "Third-party cookies — set by Stripe, Supabase auth, Google, or hosting providers when you use related features.",
    ],
  },
  {
    title: "4. Google AdSense",
    paragraphs: [
      "Our public marketing pages may show ads served by Google AdSense. Google and its partners may use cookies and similar identifiers to serve ads based on your prior visits to this site or other sites.",
      "You can manage ad personalization at https://adssettings.google.com. To opt out of third-party vendor cookies for advertising, visit https://www.aboutads.info/choices (US) or https://www.youronlinechoices.eu (EU).",
      "We do not show third-party display ads on logged-in app areas such as the contract analyzer dashboard or account pages.",
    ],
  },
  {
    title: "5. Managing cookies",
    paragraphs: [
      "Most browsers let you block or delete cookies through settings. Blocking essential cookies may prevent login or checkout from working correctly.",
      "For Stripe cookie information, see Stripe's privacy documentation. You can opt out of some analytics through your browser or device settings where available.",
    ],
  },
  {
    title: "6. Do Not Track",
    paragraphs: [
      "Some browsers send \"Do Not Track\" signals. There is no industry standard for responding to DNT; we currently do not alter practices based on DNT signals alone.",
    ],
  },
  {
    title: "7. Updates and contact",
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
      path="/cookies"
      description="This policy explains how we use cookies and related technologies on our website and application."
      sections={sections}
    />
  );
}
