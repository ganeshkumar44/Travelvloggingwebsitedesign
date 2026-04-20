export interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
  gender: string;
}

export interface RegisterResponse {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  gender: string;
  role: string;
  is_verified: boolean;
}

export type RegisterAsyncStatus =
  | "idle"
  | "loading"
  | "succeeded"
  | "failed";

export type RegisterFieldKey =
  | "firstname"
  | "lastname"
  | "email"
  | "phone"
  | "gender"
  | "password"
  | "confirm_password";

export type RegisterFieldErrors = Partial<Record<RegisterFieldKey, string>>;

export interface RegisterState {
  status: RegisterAsyncStatus;
  apiError: string | null;
  fieldErrors: RegisterFieldErrors;
  registeredEmail: string | null;
}
