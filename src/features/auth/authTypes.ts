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
  username?: string | null;
  email?: string;
  phone?: string | null;
  gender?: string | null;
  role?: string;
  about_author?: string | null;
  profession?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
  instagram?: string | null;
  youtube?: string | null;
}

export type ProfileFetchStatus =
  | "idle"
  | "loading"
  | "succeeded"
  | "failed";

export interface AuthState {
  accessToken: string | null;
  tokenType: string | null;
  userEmail: string | null;
  firstname: string | null;
  lastname: string | null;
  fullName: string | null;
  role: string | null;
  /** Last successful GET /profile payload for consumers (e.g. Profile Details) */
  serverProfile: ProfileResponse | null;
  profileFetchStatus: ProfileFetchStatus;
  profileFetchError: string | null;
  status: AuthAsyncStatus;
  error: string | null;
}
