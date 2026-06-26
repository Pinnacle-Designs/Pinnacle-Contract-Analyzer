import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Dashboard",
  path: "/dashboard",
  index: false,
});

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
