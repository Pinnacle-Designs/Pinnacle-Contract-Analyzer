import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Pricing — Simple Contract Analysis Plans",
  description:
    "Review contracts for $7 per analysis or $19/month for unlimited Pro access. Cheaper than one hour of a lawyer's time.",
  path: "/pricing",
});

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
