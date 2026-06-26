import Link from "next/link";
import { Logo } from "@/components/Logo";
import { appPath } from "@/lib/app-url";

type SiteHeaderProps = {
  /** Minimal bar for legal/docs pages — logo + back home only. */
  variant?: "marketing" | "minimal";
};

export function SiteHeader({ variant = "marketing" }: SiteHeaderProps) {
  return (
    <header className="w-full border-b border-slate-800/60 bg-slate-950/95 backdrop-blur-sm sticky top-0 z-20">
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-3 flex items-center justify-between gap-3 min-h-14">
        <Logo className="h-9 sm:h-10 w-auto max-h-10 object-contain object-left" />

        {variant === "minimal" ? (
          <Link
            href="/"
            className="text-slate-400 hover:text-white text-sm whitespace-nowrap shrink-0"
          >
            ← Home
          </Link>
        ) : (
          <nav className="flex items-center gap-2 sm:gap-4 text-sm shrink-0">
            <Link href="/pricing" className="text-slate-400 hover:text-white px-2 py-1.5">
              Pricing
            </Link>
            <Link href={appPath("/login")} className="text-slate-400 hover:text-white px-2 py-1.5">
              Log in
            </Link>
            <Link
              href={appPath("/signup")}
              className="bg-white text-slate-950 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium hover:bg-slate-100 whitespace-nowrap"
            >
              Try free
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
