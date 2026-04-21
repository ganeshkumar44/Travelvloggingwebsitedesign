export interface ResetPasswordRequest {
  email: string;
  new_password: string;
  confirm_password: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export type ResetPasswordAsyncStatus =
  | "idle"
  | "loading"
  | "succeeded"
  | "failed";

export interface ResetPasswordState {
  status: ResetPasswordAsyncStatus;
  apiError: string | null;
  successMessage: string | null;
}
