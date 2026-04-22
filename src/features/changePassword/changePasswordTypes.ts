import type { AuthAsyncStatus } from "../auth/authTypes";

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
  confirm_new_password: string;
}

export interface ChangePasswordResponse {
  message: string;
}

export interface ChangePasswordState {
  status: AuthAsyncStatus;
  error: string | null;
}
