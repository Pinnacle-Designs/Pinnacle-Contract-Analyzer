import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Account",
  path: "/account",
  index: false,
});

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
