export type ChangePasswordFieldErrors = {
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
};

const SPECIAL_RE = /[^A-Za-z0-9]/;

export function validateNewPasswordComplexity(newPassword: string): string | null {
  if (!newPassword.trim()) {
    return "New password is required";
  }
  if (newPassword.length < 8) {
    return "New password must be at least 8 characters";
  }
  if (!/[A-Z]/.test(newPassword)) {
    return "New password must include an uppercase letter";
  }
  if (!/[a-z]/.test(newPassword)) {
    return "New password must include a lowercase letter";
  }
  if (!/[0-9]/.test(newPassword)) {
    return "New password must include a number";
  }
  if (!SPECIAL_RE.test(newPassword)) {
    return "New password must include a special character";
  }
  return null;
}

export function validateChangePasswordForm(input: {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}): ChangePasswordFieldErrors {
  const errors: ChangePasswordFieldErrors = {};
  if (!input.currentPassword.trim()) {
    errors.currentPassword = "Current password is required";
  }
  if (!input.newPassword.trim()) {
    errors.newPassword = "New password is required";
  } else if (input.newPassword === input.currentPassword) {
    errors.newPassword =
      "New password must be different from your current password";
  } else {
    const complexity = validateNewPasswordComplexity(input.newPassword);
    if (complexity) {
      errors.newPassword = complexity;
    }
  }
  if (!input.confirmNewPassword.trim()) {
    errors.confirmNewPassword = "Confirm new password is required";
  } else if (
    input.newPassword &&
    input.confirmNewPassword !== input.newPassword
  ) {
    errors.confirmNewPassword = "Passwords do not match";
  }
  return errors;
}
