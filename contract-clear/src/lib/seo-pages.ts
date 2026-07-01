import type { Metadata } from "next";
import { createPageMetadata, SITE_NAME } from "@/lib/seo";

type PageSeoConfig = {
  /** Relative title (uses root layout template) or omit for homepage default. */
  title?: string;
  /** Full title — bypasses `%s | Site` template (use for landing/pricing). */
  absoluteTitle?: string;
  description: string;
  path: string;
  keywords?: string[];
  index?: boolean;
};

export const PAGE_SEO = {
  home: {
    absoluteTitle: `${SITE_NAME} — Understand Any Contract in 60 Seconds`,
    description:
      "Understand any contract in 60 seconds. AI review for NDAs, freelance agreements, SaaS terms, and leases — plain-English red flags, missing clauses, and negotiation tips. Try 1 free analysis.",
    path: "/",
    keywords: [
      "free contract analyzer",
      "AI contract review",
      "contract red flags",
      "NDA review tool",
      "understand contract fast",
    ],
  },
  pricing: {
    absoluteTitle: `Pricing — $7 per Contract or $19/mo Pro | ${SITE_NAME}`,
    description:
      "Review any contract for $7, or unlimited analyses with Pro for $19/month. Risk scores, red flags, missing clauses, and negotiation scripts — cheaper than one hour of a lawyer.",
    path: "/pricing",
    keywords: [
      "contract analysis pricing",
      "affordable contract review",
      "lawyer alternative",
      "unlimited contract analyzer",
    ],
  },
  contact: {
    title: "Contact",
    description:
      "Contact Pinnacle Contract Analyzer for product support, billing help, account questions, or legal inquiries. We respond by email.",
    path: "/contact",
    keywords: ["contact contract analyzer", "Pinnacle support", "billing help"],
  },
  terms: {
    title: "Terms of Service",
    description:
      "Terms and conditions for using Pinnacle Contract Analyzer, including subscriptions, acceptable use, and limitations of the AI contract review service.",
    path: "/terms",
  },
  privacy: {
    title: "Privacy Policy",
    description:
      "How Pinnacle Contract Analyzer collects, uses, stores, and protects your account data and contract text when you use our AI review service.",
    path: "/privacy",
  },
  disclaimer: {
    title: "Disclaimer",
    description:
      "Important limitations of AI contract analysis from Pinnacle Contract Analyzer. Not legal advice — always consult a licensed attorney for binding decisions.",
    path: "/disclaimer",
  },
  cookies: {
    title: "Cookie Policy",
    description:
      "How Pinnacle Contract Analyzer uses cookies, analytics, and similar technologies on pinnaclecontractanalyzer.com and the web application.",
    path: "/cookies",
  },
} as const satisfies Record<string, PageSeoConfig>;

export function pageMetadata(key: keyof typeof PAGE_SEO): Metadata {
  const config = PAGE_SEO[key];
  const absolute = "absoluteTitle" in config ? config.absoluteTitle : undefined;
  const relative = "title" in config ? config.title : undefined;

  return createPageMetadata({
    title: absolute ?? relative,
    absoluteTitle: Boolean(absolute),
    description: config.description,
    path: config.path,
    keywords: "keywords" in config ? config.keywords : undefined,
  });
}
