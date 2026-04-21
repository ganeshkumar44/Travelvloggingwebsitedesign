export interface VerifyForgotPasswordOtpRequest {
  email: string;
  otp: string;
}

export interface VerifyForgotPasswordOtpResponse {
  message: string;
}

export type VerifyForgotPasswordOtpAsyncStatus =
  | "idle"
  | "loading"
  | "succeeded"
  | "failed";

export interface VerifyForgotPasswordOtpState {
  status: VerifyForgotPasswordOtpAsyncStatus;
  apiError: string | null;
  otpFieldError: string | null;
  otpVerified: boolean;
}
