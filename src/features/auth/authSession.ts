import type { LoginResponse } from "./authTypes";

export const AUTH_STORAGE_KEYS = {
  accessToken: "access_token",
  tokenType: "token_type",
  userEmail: "user_email",
} as const;

export function readAuthFromSession(): {
  accessToken: string | null;
  tokenType: string | null;
  userEmail: string | null;
} {
  if (typeof window === "undefined") {
    return { accessToken: null, tokenType: null, userEmail: null };
  }
  return {
    accessToken: sessionStorage.getItem(AUTH_STORAGE_KEYS.accessToken),
    tokenType: sessionStorage.getItem(AUTH_STORAGE_KEYS.tokenType),
    userEmail: sessionStorage.getItem(AUTH_STORAGE_KEYS.userEmail),
  };
}

export function writeAuthToSession(
  tokens: LoginResponse,
  email: string,
): void {
  sessionStorage.setItem(AUTH_STORAGE_KEYS.accessToken, tokens.access_token);
  sessionStorage.setItem(AUTH_STORAGE_KEYS.tokenType, tokens.token_type);
  sessionStorage.setItem(AUTH_STORAGE_KEYS.userEmail, email);
}

export function clearAuthSession(): void {
  sessionStorage.removeItem(AUTH_STORAGE_KEYS.accessToken);
  sessionStorage.removeItem(AUTH_STORAGE_KEYS.tokenType);
  sessionStorage.removeItem(AUTH_STORAGE_KEYS.userEmail);
}
