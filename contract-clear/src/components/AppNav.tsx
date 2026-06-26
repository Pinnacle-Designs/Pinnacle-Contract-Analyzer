"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { createClient } from "@/lib/supabase/client";

const links = [
  { href: "/dashboard", label: "Analyze" },
  { href: "/account", label: "Account" },
];

export function AppNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center gap-4">
        <Logo className="h-10 w-auto" />
        <div className="flex items-center gap-1 sm:gap-2">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                pathname === href || pathname.startsWith(`${href}/`)
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
}
