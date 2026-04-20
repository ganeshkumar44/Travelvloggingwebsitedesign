export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export type AuthAsyncStatus = "idle" | "loading" | "succeeded" | "failed";

export interface ProfileResponse {
  message?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  gender?: string;
  role?: string;
}

export interface AuthState {
  accessToken: string | null;
  tokenType: string | null;
  userEmail: string | null;
  firstname: string | null;
  lastname: string | null;
  fullName: string | null;
  role: string | null;
  status: AuthAsyncStatus;
  error: string | null;
}
