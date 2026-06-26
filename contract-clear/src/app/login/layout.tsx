import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Log In",
  description: "Log in to your Pinnacle Contract Analyzer account.",
  path: "/login",
  index: false,
});

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
