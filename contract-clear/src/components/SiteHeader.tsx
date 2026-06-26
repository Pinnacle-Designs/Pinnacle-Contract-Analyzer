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
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-3 sm:py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
        <div className="flex justify-center lg:justify-start w-full lg:w-auto lg:flex-1 lg:min-w-0 shrink-0">
          <Logo variant="nav" />
        </div>

        {variant === "minimal" ? (
          <Link
            href="/"
            className="text-pinnacle-muted hover:text-white text-sm whitespace-nowrap shrink-0 self-center lg:self-auto"
          >
            ← Home
          </Link>
        ) : (
          <nav
            className="flex flex-wrap items-center justify-center lg:justify-end gap-x-2 gap-y-2 sm:gap-3 text-sm shrink-0 w-full lg:w-auto"
            aria-label="Main"
          >
            <Link
              href="/#how-it-works"
              className="text-pinnacle-muted hover:text-white px-2 py-1.5 hidden md:inline"
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
              className="bg-pinnacle-blue hover:bg-pinnacle-blue-bright text-white px-3 sm:px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors text-center"
            >
              <span className="sm:hidden">Try free</span>
              <span className="hidden sm:inline">Try free — it&apos;s $0</span>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
