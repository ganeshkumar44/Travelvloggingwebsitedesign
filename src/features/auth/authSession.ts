import type { LoginResponse } from "./authTypes";

export const AUTH_STORAGE_KEYS = {
  accessToken: "access_token",
  tokenType: "token_type",
  userEmail: "user_email",
  userFirstname: "user_firstname",
  userLastname: "user_lastname",
  userFullName: "user_full_name",
  userRole: "user_role",
} as const;

export function readAuthFromSession(): {
  accessToken: string | null;
  tokenType: string | null;
  userEmail: string | null;
  firstname: string | null;
  lastname: string | null;
  fullName: string | null;
  role: string | null;
} {
  if (typeof window === "undefined") {
    return {
      accessToken: null,
      tokenType: null,
      userEmail: null,
      firstname: null,
      lastname: null,
      fullName: null,
      role: null,
    };
  }
  return {
    accessToken: sessionStorage.getItem(AUTH_STORAGE_KEYS.accessToken),
    tokenType: sessionStorage.getItem(AUTH_STORAGE_KEYS.tokenType),
    userEmail: sessionStorage.getItem(AUTH_STORAGE_KEYS.userEmail),
    firstname: sessionStorage.getItem(AUTH_STORAGE_KEYS.userFirstname),
    lastname: sessionStorage.getItem(AUTH_STORAGE_KEYS.userLastname),
    fullName: sessionStorage.getItem(AUTH_STORAGE_KEYS.userFullName),
    role: sessionStorage.getItem(AUTH_STORAGE_KEYS.userRole),
  };
}

export function writeAuthToSession(
  payload: LoginResponse,
  email: string,
): void {
  sessionStorage.setItem(AUTH_STORAGE_KEYS.accessToken, payload.access_token);
  sessionStorage.setItem(AUTH_STORAGE_KEYS.tokenType, payload.token_type);
  sessionStorage.setItem(AUTH_STORAGE_KEYS.userEmail, email);
}

export function writeProfileToSession(payload: {
  firstname: string | null;
  lastname: string | null;
  fullName: string;
  email: string;
  role: string | null;
}): void {
  sessionStorage.setItem(AUTH_STORAGE_KEYS.userEmail, payload.email);
  if (payload.firstname) {
    sessionStorage.setItem(AUTH_STORAGE_KEYS.userFirstname, payload.firstname);
  } else {
    sessionStorage.removeItem(AUTH_STORAGE_KEYS.userFirstname);
  }
  if (payload.lastname) {
    sessionStorage.setItem(AUTH_STORAGE_KEYS.userLastname, payload.lastname);
  } else {
    sessionStorage.removeItem(AUTH_STORAGE_KEYS.userLastname);
  }
  sessionStorage.setItem(AUTH_STORAGE_KEYS.userFullName, payload.fullName);
  if (payload.role) {
    sessionStorage.setItem(AUTH_STORAGE_KEYS.userRole, payload.role);
  } else {
    sessionStorage.removeItem(AUTH_STORAGE_KEYS.userRole);
  }
}

export function clearAuthSession(): void {
  sessionStorage.removeItem(AUTH_STORAGE_KEYS.accessToken);
  sessionStorage.removeItem(AUTH_STORAGE_KEYS.tokenType);
  sessionStorage.removeItem(AUTH_STORAGE_KEYS.userEmail);
  sessionStorage.removeItem(AUTH_STORAGE_KEYS.userFirstname);
  sessionStorage.removeItem(AUTH_STORAGE_KEYS.userLastname);
  sessionStorage.removeItem(AUTH_STORAGE_KEYS.userFullName);
  sessionStorage.removeItem(AUTH_STORAGE_KEYS.userRole);
}
