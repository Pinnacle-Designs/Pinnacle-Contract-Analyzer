import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Preview",
  index: false,
});

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return children;
}
