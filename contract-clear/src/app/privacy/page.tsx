import { LegalLayout } from "@/components/LegalLayout";
import { CONTACT_EMAIL, legalIntro } from "@/lib/legal";
import { pageMetadata } from "@/lib/seo-pages";

export const metadata = pageMetadata("privacy");

const sections = [
  {
    title: "1. Overview",
    paragraphs: [
      legalIntro,
      "This Privacy Policy explains what information we collect, how we use it, and your choices. By using the Service, you consent to the practices described here.",
    ],
  },
  {
    title: "2. Information we collect",
    paragraphs: ["We collect the following categories of information:"],
    list: [
      "Account data: email address, password (stored hashed by our auth provider), and profile settings.",
      "Contract content: text and PDFs you upload for analysis, plus generated analysis reports stored in your account history.",
      "Payment data: billing status, subscription plan, and Stripe customer ID. Payment card details are processed by Stripe and not stored on our servers.",
      "Usage data: pages visited, features used, IP address, browser type, device information, and diagnostic logs.",
      "Communications: messages you send to support.",
    ],
  },
  {
    title: "3. How we use information",
    paragraphs: ["We use your information to:"],
    list: [
      "Provide, maintain, and improve the Service, including AI-powered contract analysis.",
      "Authenticate users, prevent fraud, and enforce our Terms.",
      "Process payments and manage subscriptions.",
      "Send transactional emails (confirmations, receipts, security alerts) and, with consent where required, product updates.",
      "Comply with legal obligations and respond to lawful requests.",
    ],
  },
  {
    title: "4. AI processing",
    paragraphs: [
      "Contract text you submit is sent to third-party AI providers (such as Anthropic) to generate analyses. We configure these services for processing only and do not use your contract content to train public models without your consent.",
      "Do not submit information you are legally required to keep confidential unless you understand and accept the risks of cloud processing.",
    ],
  },
  {
    title: "5. Service providers",
    paragraphs: [
      "We use trusted subprocessors to operate the Service, including hosting, authentication (Supabase), payments (Stripe), AI inference, and advertising (Google AdSense on public marketing pages). These providers process data on our behalf under contractual confidentiality and security obligations.",
    ],
  },
  {
    title: "6. Advertising",
    paragraphs: [
      "Our marketing website may display third-party advertisements through Google AdSense. Ad partners may use cookies and similar technologies to serve and measure ads, subject to your cookie choices and applicable law.",
      "We do not serve third-party display ads inside the logged-in contract analysis experience. Advertising does not affect how your contract text is analyzed.",
      "You can learn more in our Cookie Policy and manage Google ad settings at https://adssettings.google.com.",
    ],
  },
  {
    title: "7. Data retention",
    paragraphs: [
      "We retain account and analysis history while your account is active. You may request deletion of your account and associated analyses. We may retain limited records as required for billing, security, or legal compliance.",
      "Backup copies may persist for a reasonable period after deletion.",
    ],
  },
  {
    title: "8. Security",
    paragraphs: [
      "We use industry-standard measures including encryption in transit (HTTPS), access controls, and secure infrastructure. No method of transmission or storage is 100% secure; use strong passwords and protect your credentials.",
    ],
  },
  {
    title: "9. Your rights and choices",
    paragraphs: [
      "Depending on your location, you may have rights to access, correct, delete, or export personal data, and to object to or restrict certain processing.",
      "You can update account details in the Service or contact us at " + CONTACT_EMAIL + ". Marketing emails include an unsubscribe link where applicable.",
      "Residents of the EEA, UK, and California may have additional rights under GDPR or CCPA/CPRA. We will honor valid requests in accordance with applicable law.",
    ],
  },
  {
    title: "10. International transfers",
    paragraphs: [
      "We may process data in the United States and other countries where our providers operate. We use appropriate safeguards for cross-border transfers where required.",
    ],
  },
  {
    title: "11. Children",
    paragraphs: [
      "The Service is not directed to children under 18. We do not knowingly collect personal information from children. Contact us if you believe a child has provided data and we will delete it.",
    ],
  },
  {
    title: "12. Changes",
    paragraphs: [
      "We may update this Privacy Policy from time to time. We will post the revised policy with an updated date and, where appropriate, provide additional notice.",
    ],
  },
  {
    title: "13. Contact",
    paragraphs: [
      `Privacy inquiries: ${CONTACT_EMAIL}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      path="/privacy"
      description="We take your privacy seriously. This policy describes how we handle personal information and contract data you provide."
      sections={sections}
    />
  );
}
