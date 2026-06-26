import { createClient } from "@/lib/supabase/client";

/** True when the user signed in but still needs a TOTP code. */
export async function needsMfaVerification(): Promise<boolean> {
  const supabase = createClient();
  const { data, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (error || !data) return false;
  return data.nextLevel === "aal2" && data.currentLevel !== "aal2";
}

export async function getVerifiedTotpFactorId(): Promise<string | null> {
  const supabase = createClient();
  const { data, error } = await supabase.auth.mfa.listFactors();
  if (error || !data) return null;
  const factor = data.totp.find((f) => f.status === "verified");
  return factor?.id ?? null;
}

export async function verifyMfaCode(code: string): Promise<{ error: string | null }> {
  const supabase = createClient();
  const factorId = await getVerifiedTotpFactorId();
  if (!factorId) {
    return { error: "No authenticator found on this account." };
  }

  const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({
    factorId,
  });
  if (challengeError || !challenge) {
    return { error: challengeError?.message ?? "Could not start verification." };
  }

  const { error: verifyError } = await supabase.auth.mfa.verify({
    factorId,
    challengeId: challenge.id,
    code: code.replace(/\s/g, ""),
  });

  return { error: verifyError?.message ?? null };
}
