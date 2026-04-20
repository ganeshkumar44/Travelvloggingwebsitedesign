export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export type AuthAsyncStatus = "idle" | "loading" | "succeeded" | "failed";

export interface UserListItem {
  id: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  gender?: string;
  role?: string;
  is_verified?: boolean;
}

export interface AuthState {
  accessToken: string | null;
  tokenType: string | null;
  userEmail: string | null;
  firstname: string | null;
  lastname: string | null;
  fullName: string | null;
  status: AuthAsyncStatus;
  error: string | null;
}

/** Login API response plus resolved display profile after `/users` lookup */
export interface LoginUserResult extends LoginResponse {
  firstname: string | null;
  lastname: string | null;
  fullName: string;
}
