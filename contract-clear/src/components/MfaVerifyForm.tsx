"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { verifyMfaCode } from "@/lib/mfa";

const inputClass =
  "w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white text-sm text-center tracking-[0.3em] focus:outline-none focus:ring-2 focus:ring-blue-500";

type Props = {
  /** Where to send the user after a successful code. */
  redirectTo?: string;
  onCancel?: () => void;
};

export function MfaVerifyForm({ redirectTo = "/dashboard", onCancel }: Props) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);

    const { error: verifyError } = await verifyMfaCode(code);
    setLoading(false);

    if (verifyError) {
      setError(verifyError);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  };

  return (
    <div className="space-y-4">
      <p className="text-slate-400 text-sm">
        Enter the 6-digit code from your authenticator app.
      </p>
      <input
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        placeholder="000000"
        maxLength={6}
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
        onKeyDown={(e) => e.key === "Enter" && code.length === 6 && handleSubmit()}
        className={inputClass}
      />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button
        onClick={handleSubmit}
        disabled={loading || code.length !== 6}
        className="w-full bg-blue-500 hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium text-sm transition-colors"
      >
        {loading ? "Verifying…" : "Verify"}
      </button>
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="w-full text-slate-500 hover:text-slate-300 text-sm"
        >
          Cancel
        </button>
      )}
    </div>
  );
}
