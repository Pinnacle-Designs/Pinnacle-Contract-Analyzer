import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { PricingJsonLd } from "@/components/PricingJsonLd";
import { SITE_NAME } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo-pages";

export const metadata: Metadata = pageMetadata("pricing");

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PricingJsonLd />
      <BreadcrumbJsonLd
        crumbs={[
          { name: SITE_NAME, path: "/" },
          { name: "Pricing", path: "/pricing" },
        ]}
      />
      {children}
    </>
  );
}
