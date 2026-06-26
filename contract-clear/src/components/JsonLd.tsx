import { FAQ_ITEMS } from "@/lib/faq";
import { absoluteUrl, ogImageUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";

export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${absoluteUrl("/")}#organization`,
        name: SITE_NAME,
        url: absoluteUrl("/"),
        logo: ogImageUrl("/logo.png"),
      },
      {
        "@type": "WebSite",
        "@id": `${absoluteUrl("/")}#website`,
        name: SITE_NAME,
        url: absoluteUrl("/"),
        description: SITE_DESCRIPTION,
        publisher: { "@id": `${absoluteUrl("/")}#organization` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${absoluteUrl("/")}#app`,
        name: SITE_NAME,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: absoluteUrl("/"),
        description: SITE_DESCRIPTION,
        offers: [
          {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            description: "One free contract analysis",
          },
          {
            "@type": "Offer",
            price: "7",
            priceCurrency: "USD",
            description: "Single contract analysis",
          },
          {
            "@type": "Offer",
            price: "19",
            priceCurrency: "USD",
            description: "Pro monthly subscription",
          },
        ],
        featureList: [
          "AI contract analysis",
          "Visual risk score",
          "Red flag detection",
          "Missing clause review",
          "Negotiation scripts",
          "PDF upload support",
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${absoluteUrl("/")}#faq`,
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
