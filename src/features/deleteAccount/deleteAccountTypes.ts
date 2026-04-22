import type { AuthAsyncStatus } from "../auth/authTypes";

export interface DeleteAccountRequestBody {
  email: string;
  password: string;
}

export interface DeleteAccountResponse {
  detail?: string;
  message?: string;
}

export interface DeleteAccountState {
  status: AuthAsyncStatus;
  error: string | null;
}
