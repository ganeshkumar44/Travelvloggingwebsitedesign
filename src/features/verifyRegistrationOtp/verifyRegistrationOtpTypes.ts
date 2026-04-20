export interface VerifyRegistrationOtpRequest {
  email: string;
  otp: string;
}

export interface VerifyRegistrationOtpResponse {
  message: string;
}

export type VerifyRegistrationOtpAsyncStatus =
  | "idle"
  | "loading"
  | "succeeded"
  | "failed";

export interface VerifyRegistrationOtpState {
  /** Email for OTP step; hydrated from sessionStorage on /register-otp */
  pendingEmail: string | null;
  status: VerifyRegistrationOtpAsyncStatus;
  apiError: string | null;
  otpFieldError: string | null;
}
