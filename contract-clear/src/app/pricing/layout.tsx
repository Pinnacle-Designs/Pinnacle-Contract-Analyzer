import type { Metadata } from "next";
import { PricingJsonLd } from "@/components/PricingJsonLd";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Pricing — $7 per Contract or $19/mo Pro",
  description:
    "Review any contract for $7, or get unlimited analyses with Pro for $19/month. Plain-English red flags, risk scores, and negotiation scripts — cheaper than one hour of a lawyer.",
  path: "/pricing",
});

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PricingJsonLd />
      {children}
    </>
  );
}
