import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${absoluteUrl("/")}#organization`,
      name: SITE_NAME,
      url: absoluteUrl("/"),
      logo: absoluteUrl("/logo.png"),
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
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "One free contract analysis",
      },
      featureList: [
        "AI contract analysis",
        "Red flag detection",
        "Missing clause review",
        "Negotiation tips",
        "PDF upload support",
      ],
    },
  ],
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
