export const REGISTER_SESSION_KEYS = {
  pendingOtpEmail: "register_otp_email",
} as const;

export function setRegisterPendingOtpEmail(email: string): void {
  sessionStorage.setItem(REGISTER_SESSION_KEYS.pendingOtpEmail, email);
}

export function clearRegisterPendingOtpEmail(): void {
  sessionStorage.removeItem(REGISTER_SESSION_KEYS.pendingOtpEmail);
}
