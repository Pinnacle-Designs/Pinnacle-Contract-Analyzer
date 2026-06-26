import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Sign Up Free",
  description: "Create a free account and analyze your first contract in 60 seconds.",
  path: "/signup",
  index: false,
});

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
