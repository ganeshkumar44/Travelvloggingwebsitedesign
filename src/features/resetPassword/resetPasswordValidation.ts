/** Client-side rules for “new password” on forgot-password reset step */
export function validateResetPasswordStrength(value: string): string | null {
  const v = value;
  if (!v.trim()) return "Password is required";
  if (v.length < 8) return "Password must be at least 8 characters.";
  if (!/[A-Z]/.test(v)) {
    return "Password must include at least one uppercase letter.";
  }
  if (!/[a-z]/.test(v)) {
    return "Password must include at least one lowercase letter.";
  }
  if (!/[0-9]/.test(v)) return "Password must include at least one number.";
  if (!/[^A-Za-z0-9]/.test(v)) {
    return "Password must include at least one special character.";
  }
  return null;
}

export function validateConfirmPassword(
  newPassword: string,
  confirm: string,
): string | null {
  if (!confirm.trim()) return "Confirm password is required";
  if (confirm !== newPassword) return "Passwords do not match.";
  return null;
}

export function isValidEmailFormat(email: string): boolean {
  const trimmed = email.trim();
  if (!trimmed) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}
