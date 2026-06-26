/** Normalize email for deduplication (one free analysis per address). */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export const FREE_ANALYSIS_ALREADY_CLAIMED = "FREE_ANALYSIS_ALREADY_CLAIMED";
export const EMAIL_NOT_CONFIRMED = "EMAIL_NOT_CONFIRMED";
