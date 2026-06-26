import { absoluteUrl, SITE_NAME } from "@/lib/seo";

export function PricingJsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${SITE_NAME} — Contract Analysis`,
    description:
      "AI-powered contract review with plain-English red flags, risk scores, and negotiation tips.",
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    url: absoluteUrl("/pricing"),
    offers: [
      {
        "@type": "Offer",
        name: "Single Analysis",
        price: "7.00",
        priceCurrency: "USD",
        url: absoluteUrl("/pricing"),
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Pro — Unlimited",
        price: "19.00",
        priceCurrency: "USD",
        priceValidUntil: "2099-12-31",
        url: absoluteUrl("/pricing"),
        availability: "https://schema.org/InStock",
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
