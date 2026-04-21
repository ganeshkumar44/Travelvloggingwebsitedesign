export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export type ForgotPasswordAsyncStatus =
  | "idle"
  | "loading"
  | "succeeded"
  | "failed";

export interface ForgotPasswordState {
  /** Email locked after successful “Send OTP” so all steps use the same address */
  lockedEmail: string | null;
  status: ForgotPasswordAsyncStatus;
  apiError: string | null;
  successMessage: string | null;
}
