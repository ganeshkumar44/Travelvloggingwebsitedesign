import type { LoginUserResult } from "./authTypes";

export const AUTH_STORAGE_KEYS = {
  accessToken: "access_token",
  tokenType: "token_type",
  userEmail: "user_email",
  userFirstname: "user_firstname",
  userLastname: "user_lastname",
  userFullName: "user_full_name",
} as const;

export function readAuthFromSession(): {
  accessToken: string | null;
  tokenType: string | null;
  userEmail: string | null;
  firstname: string | null;
  lastname: string | null;
  fullName: string | null;
} {
  if (typeof window === "undefined") {
    return {
      accessToken: null,
      tokenType: null,
      userEmail: null,
      firstname: null,
      lastname: null,
      fullName: null,
    };
  }
  return {
    accessToken: sessionStorage.getItem(AUTH_STORAGE_KEYS.accessToken),
    tokenType: sessionStorage.getItem(AUTH_STORAGE_KEYS.tokenType),
    userEmail: sessionStorage.getItem(AUTH_STORAGE_KEYS.userEmail),
    firstname: sessionStorage.getItem(AUTH_STORAGE_KEYS.userFirstname),
    lastname: sessionStorage.getItem(AUTH_STORAGE_KEYS.userLastname),
    fullName: sessionStorage.getItem(AUTH_STORAGE_KEYS.userFullName),
  };
}

export function writeAuthToSession(
  payload: LoginUserResult,
  email: string,
): void {
  sessionStorage.setItem(AUTH_STORAGE_KEYS.accessToken, payload.access_token);
  sessionStorage.setItem(AUTH_STORAGE_KEYS.tokenType, payload.token_type);
  sessionStorage.setItem(AUTH_STORAGE_KEYS.userEmail, email);
  if (payload.firstname != null) {
    sessionStorage.setItem(AUTH_STORAGE_KEYS.userFirstname, payload.firstname);
  } else {
    sessionStorage.removeItem(AUTH_STORAGE_KEYS.userFirstname);
  }
  if (payload.lastname != null) {
    sessionStorage.setItem(AUTH_STORAGE_KEYS.userLastname, payload.lastname);
  } else {
    sessionStorage.removeItem(AUTH_STORAGE_KEYS.userLastname);
  }
  sessionStorage.setItem(AUTH_STORAGE_KEYS.userFullName, payload.fullName);
}

export function clearAuthSession(): void {
  sessionStorage.removeItem(AUTH_STORAGE_KEYS.accessToken);
  sessionStorage.removeItem(AUTH_STORAGE_KEYS.tokenType);
  sessionStorage.removeItem(AUTH_STORAGE_KEYS.userEmail);
  sessionStorage.removeItem(AUTH_STORAGE_KEYS.userFirstname);
  sessionStorage.removeItem(AUTH_STORAGE_KEYS.userLastname);
  sessionStorage.removeItem(AUTH_STORAGE_KEYS.userFullName);
}
