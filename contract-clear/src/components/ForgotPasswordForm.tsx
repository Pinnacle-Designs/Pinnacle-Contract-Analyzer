"use client";

import Link from "next/link";
import { useState } from "react";
import { getResetPasswordCallbackUrl } from "@/lib/auth";
import { createClient } from "@/lib/supabase/client";

const inputClass =
  "w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: getResetPasswordCallbackUrl(),
    });

    setLoading(false);

    if (resetError) {
      setError(resetError.message);
      return;
    }

    setSent(true);
  };

  return (
    <main className="min-h-screen bg-pinnacle-bg flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-sm bg-pinnacle-surface border border-pinnacle-elevated rounded-2xl p-6 sm:p-8">
        <h1 className="text-xl font-bold mb-2 text-white">Reset your password</h1>
        <p className="text-slate-400 text-sm mb-6">
          Enter your account email and we&apos;ll send a link to choose a new password.
        </p>

        {sent ? (
          <div className="space-y-4">
            <p className="text-green-400 text-sm">
              Check your inbox for a reset link. It may take a minute to arrive.
            </p>
            <Link
              href="/login"
              className="block text-center text-blue-400 hover:underline text-sm"
            >
              Back to log in
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className={inputClass}
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              onClick={handleSubmit}
              disabled={loading || !email}
              className="w-full bg-blue-500 hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium text-sm transition-colors"
            >
              {loading ? "Sending…" : "Send reset link"}
            </button>
            <p className="text-slate-500 text-xs text-center">
              <Link href="/login" className="text-blue-400 hover:underline">
                Back to log in
              </Link>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
