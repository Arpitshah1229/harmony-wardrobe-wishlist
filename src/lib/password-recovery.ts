export function validateNewPassword(password: string, confirmation: string): string | null {
  if (password.length < 6) return "Create a password with at least 6 characters.";
  if (password !== confirmation) return "Passwords do not match.";
  return null;
}

export function isRecoveryLink(hash: string): boolean {
  return new URLSearchParams(hash.replace(/^#/, "")).get("type") === "recovery";
}