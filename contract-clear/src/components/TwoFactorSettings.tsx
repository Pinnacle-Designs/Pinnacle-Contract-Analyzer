"use client";

import { useCallback, useEffect, useState } from "react";
import { MfaVerifyForm } from "@/components/MfaVerifyForm";
import { createClient } from "@/lib/supabase/client";

type EnrollState = {
  factorId: string;
  qrCode: string;
  secret: string;
};

export function TwoFactorSettings() {
  const [loading, setLoading] = useState(true);
  const [enabled, setEnabled] = useState(false);
  const [factorId, setFactorId] = useState<string | null>(null);
  const [enroll, setEnroll] = useState<EnrollState | null>(null);
  const [enrollCode, setEnrollCode] = useState("");
  const [disabling, setDisabling] = useState(false);
  const [disableCode, setDisableCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const loadFactors = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error: listError } = await supabase.auth.mfa.listFactors();
    setLoading(false);

    if (listError) {
      setError(listError.message);
      return;
    }

    const verified = data.totp.find((f) => f.status === "verified");
    setEnabled(Boolean(verified));
    setFactorId(verified?.id ?? null);
  }, []);

  useEffect(() => {
    loadFactors();
  }, [loadFactors]);

  const startEnroll = async () => {
    setError(null);
    setMessage(null);

    const supabase = createClient();
    const { data, error: enrollError } = await supabase.auth.mfa.enroll({
      factorType: "totp",
      friendlyName: "Authenticator app",
    });

    if (enrollError || !data) {
      setError(enrollError?.message ?? "Could not start 2FA setup.");
      return;
    }

    setEnroll({
      factorId: data.id,
      qrCode: data.totp.qr_code,
      secret: data.totp.secret,
    });
  };

  const confirmEnroll = async () => {
    if (!enroll) return;
    setError(null);
    setMessage(null);

    const supabase = createClient();
    const { error: verifyError } = await supabase.auth.mfa.challengeAndVerify({
      factorId: enroll.factorId,
      code: enrollCode.replace(/\s/g, ""),
    });

    if (verifyError) {
      setError(verifyError.message);
      return;
    }

    setEnroll(null);
    setEnrollCode("");
    setMessage("Two-factor authentication is now enabled.");
    await loadFactors();
  };

  const cancelEnroll = async () => {
    if (enroll) {
      const supabase = createClient();
      await supabase.auth.mfa.unenroll({ factorId: enroll.factorId });
    }
    setEnroll(null);
    setEnrollCode("");
    setError(null);
  };

  const startDisable = () => {
    setError(null);
    setMessage(null);
    setDisabling(true);
    setDisableCode("");
  };

  const confirmDisable = async () => {
    if (!factorId) return;
    setError(null);

    const supabase = createClient();
    const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({
      factorId,
    });
    if (challengeError || !challenge) {
      setError(challengeError?.message ?? "Verification failed.");
      return;
    }

    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challenge.id,
      code: disableCode.replace(/\s/g, ""),
    });
    if (verifyError) {
      setError(verifyError.message);
      return;
    }

    const { error: unenrollError } = await supabase.auth.mfa.unenroll({ factorId });
    if (unenrollError) {
      setError(unenrollError.message);
      return;
    }

    setDisabling(false);
    setDisableCode("");
    setMessage("Two-factor authentication has been disabled.");
    await loadFactors();
  };

  const inputClass =
    "w-full max-w-xs bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <h2 className="text-lg font-semibold">Two-factor authentication</h2>
          <p className="text-slate-400 text-sm mt-1">
            Add an extra layer of security with an authenticator app (Google Authenticator, Authy, etc.).
          </p>
        </div>
        {!loading && (
          <span
            className={`text-xs font-medium uppercase tracking-wide px-3 py-1 rounded-full border ${
              enabled
                ? "text-green-300 bg-green-950 border-green-800"
                : "text-slate-400 bg-slate-950 border-slate-700"
            }`}
          >
            {enabled ? "Enabled" : "Off"}
          </span>
        )}
      </div>

      {loading && <p className="text-slate-500 text-sm">Loading security settings…</p>}
      {message && <p className="text-green-400 text-sm mb-4">{message}</p>}
      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      {!loading && !enroll && !disabling && !enabled && (
        <button
          onClick={startEnroll}
          className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Enable 2FA
        </button>
      )}

      {enroll && (
        <div className="space-y-4">
          <p className="text-slate-300 text-sm">
            Scan this QR code with your authenticator app, then enter the 6-digit code to confirm.
          </p>
          <div
            className="bg-white rounded-lg p-3 inline-block [&>svg]:block"
            dangerouslySetInnerHTML={{ __html: enroll.qrCode }}
          />
          <p className="text-slate-500 text-xs">
            Manual key: <span className="font-mono text-slate-400">{enroll.secret}</span>
          </p>
          <input
            type="text"
            inputMode="numeric"
            placeholder="6-digit code"
            maxLength={6}
            value={enrollCode}
            onChange={(e) => setEnrollCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            className={inputClass}
          />
          <div className="flex flex-wrap gap-3">
            <button
              onClick={confirmEnroll}
              disabled={enrollCode.length !== 6}
              className="bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              Confirm & enable
            </button>
            <button
              onClick={cancelEnroll}
              className="border border-slate-700 text-slate-300 px-4 py-2 rounded-lg text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {!loading && enabled && !disabling && (
        <button
          onClick={startDisable}
          className="border border-red-900 text-red-300 hover:bg-red-950/50 px-4 py-2 rounded-lg text-sm transition-colors"
        >
          Disable 2FA
        </button>
      )}

      {disabling && (
        <div className="space-y-4">
          <p className="text-slate-400 text-sm">
            Enter a code from your authenticator app to disable two-factor authentication.
          </p>
          <input
            type="text"
            inputMode="numeric"
            placeholder="6-digit code"
            maxLength={6}
            value={disableCode}
            onChange={(e) => setDisableCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            className={inputClass}
          />
          <div className="flex flex-wrap gap-3">
            <button
              onClick={confirmDisable}
              disabled={disableCode.length !== 6}
              className="bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              Disable 2FA
            </button>
            <button
              onClick={() => {
                setDisabling(false);
                setDisableCode("");
                setError(null);
              }}
              className="border border-slate-700 text-slate-300 px-4 py-2 rounded-lg text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
