export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export type AuthAsyncStatus = "idle" | "loading" | "succeeded" | "failed";

export interface AuthState {
  accessToken: string | null;
  tokenType: string | null;
  userEmail: string | null;
  status: AuthAsyncStatus;
  error: string | null;
}
