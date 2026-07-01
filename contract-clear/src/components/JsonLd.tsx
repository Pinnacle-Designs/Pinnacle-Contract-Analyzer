import { FAQ_ITEMS } from "@/lib/faq";
import { CONTACT_EMAIL, LEGAL_ENTITY } from "@/lib/legal";
import { appPath } from "@/lib/app-url";
import { absoluteUrl, ogImageUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";

export function JsonLd() {
  const siteUrl = absoluteUrl("/");
  const organizationId = `${siteUrl}#organization`;
  const signupUrl = appPath("/signup") || absoluteUrl("/pricing");

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: LEGAL_ENTITY,
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: ogImageUrl("/logo.png"),
          width: 512,
          height: 512,
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: CONTACT_EMAIL,
          availableLanguage: "English",
          url: absoluteUrl("/contact"),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        name: SITE_NAME,
        url: siteUrl,
        description: SITE_DESCRIPTION,
        inLanguage: "en-US",
        publisher: { "@id": organizationId },
        potentialAction: {
          "@type": "RegisterAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: signupUrl,
            actionPlatform: [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/MobileWebPlatform",
            ],
          },
          name: "Create free account",
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}#app`,
        name: SITE_NAME,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Legal Tech",
        operatingSystem: "Web",
        url: siteUrl,
        description: SITE_DESCRIPTION,
        offers: [
          {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            description: "One free contract analysis",
            url: absoluteUrl("/pricing"),
          },
          {
            "@type": "Offer",
            price: "7",
            priceCurrency: "USD",
            description: "Single contract analysis",
            url: absoluteUrl("/pricing"),
          },
          {
            "@type": "Offer",
            price: "19",
            priceCurrency: "USD",
            description: "Pro monthly subscription — unlimited analyses",
            url: absoluteUrl("/pricing"),
          },
        ],
        featureList: [
          "AI contract analysis",
          "Visual risk score (0–100)",
          "Red flag detection with severity ratings",
          "Missing clause review",
          "Negotiation scripts",
          "PDF and text upload",
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}#faq`,
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
