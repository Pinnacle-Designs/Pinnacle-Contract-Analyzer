import { absoluteUrl, SITE_NAME } from "@/lib/seo";

type Crumb = { name: string; path: string };

export function BreadcrumbJsonLd({ crumbs }: { crumbs: Crumb[] }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function legalBreadcrumbs(pageName: string, path: string) {
  return (
    <BreadcrumbJsonLd
      crumbs={[
        { name: SITE_NAME, path: "/" },
        { name: pageName, path },
      ]}
    />
  );
}
