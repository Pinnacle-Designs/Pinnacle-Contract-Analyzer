"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { appPath } from "@/lib/app-url";

type SiteHeaderProps = {
  variant?: "marketing" | "minimal";
};

export function SiteHeader({ variant = "marketing" }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`w-full sticky top-0 z-20 backdrop-blur-md transition-[border-color,background-color] duration-200 ${
        scrolled
          ? "border-b border-pinnacle-elevated/80 bg-pinnacle-bg/95"
          : "border-b border-transparent bg-pinnacle-bg/80"
      }`}
    >
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
        <div className="flex justify-center sm:justify-start w-full sm:w-auto shrink-0">
          <Logo variant="nav" />
        </div>

        {variant === "minimal" ? (
          <Link
            href="/"
            className="text-pinnacle-muted hover:text-white text-sm whitespace-nowrap shrink-0 self-center sm:self-auto"
          >
            ← Home
          </Link>
        ) : (
          <nav className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-3 text-sm shrink-0 w-full sm:w-auto">
            <Link
              href="/#how-it-works"
              className="text-pinnacle-muted hover:text-white px-2 py-1.5 hidden sm:inline"
            >
              How it works
            </Link>
            <Link href="/pricing" className="text-pinnacle-muted hover:text-white px-2 py-1.5">
              Pricing
            </Link>
            <Link href={appPath("/login")} className="text-pinnacle-muted hover:text-white px-2 py-1.5">
              Log in
            </Link>
            <Link
              href={appPath("/signup")}
              className="bg-pinnacle-blue hover:bg-pinnacle-blue-bright text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium whitespace-nowrap transition-colors"
            >
              Try free — it&apos;s $0
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
