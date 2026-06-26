"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthCallbackUrl } from "@/lib/auth";
import { createClient } from "@/lib/supabase/client";

type Props = { mode: "login" | "signup" };

export function AuthForm({ mode }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);

    const supabase = createClient();

    const { error } =
      mode === "signup"
        ? await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: getAuthCallbackUrl() },
          })
        : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-8">
        <h1 className="text-xl font-bold mb-6 text-white">
          {mode === "signup" ? "Create your account" : "Welcome back"}
        </h1>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          {mode === "signup" && (
            <p className="text-slate-500 text-xs leading-relaxed">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="text-blue-400 hover:underline">Terms of Service</Link>
              {" "}and{" "}
              <Link href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>
              , and acknowledge our{" "}
              <Link href="/disclaimer" className="text-blue-400 hover:underline">Disclaimer</Link>.
            </p>
          )}
          <button
            onClick={handleSubmit}
            disabled={loading || !email || !password}
            className="w-full bg-blue-500 hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium text-sm transition-colors"
          >
            {loading
              ? "…"
              : mode === "signup"
              ? "Create account"
              : "Log in"}
          </button>
        </div>
        <p className="text-slate-500 text-xs text-center mt-6">
          {mode === "signup" ? (
            <>Already have an account?{" "}
              <a href="/login" className="text-blue-400 hover:underline">Log in</a>
            </>
          ) : (
            <>No account?{" "}
              <a href="/signup" className="text-blue-400 hover:underline">Sign up free</a>
            </>
          )}
        </p>
      </div>
    </main>
  );
}
