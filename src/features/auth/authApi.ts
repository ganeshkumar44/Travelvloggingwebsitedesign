import type {
  LoginRequest,
  LoginResponse,
  LoginUserResult,
  UserListItem,
} from "./authTypes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const LOGIN_URL = `${API_BASE_URL}/login`;
const USERS_URL = `${API_BASE_URL}/users`;

function capitalizeNamePart(value: string): string {
  const t = value.trim();
  if (!t) return "";
  return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}

function buildDisplayFullName(
  firstname: string | undefined,
  lastname: string | undefined,
  fallbackEmail: string,
): { firstname: string | null; lastname: string | null; fullName: string } {
  const first = capitalizeNamePart(firstname ?? "");
  const last = capitalizeNamePart(lastname ?? "");
  const combined = `${first} ${last}`.trim();
  if (!combined) {
    return { firstname: null, lastname: null, fullName: fallbackEmail };
  }
  return {
    firstname: first || null,
    lastname: last || null,
    fullName: combined,
  };
}

export async function fetchUsersList(accessToken: string): Promise<UserListItem[]> {
  const response = await fetch(USERS_URL, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  let data: unknown = [];
  try {
    data = await response.json();
  } catch {
    data = [];
  }

  if (!response.ok) {
    throw new Error(parseErrorMessage(data, response.status));
  }

  if (!Array.isArray(data)) {
    return [];
  }

  return data as UserListItem[];
}

export async function resolveProfileAfterLogin(
  tokens: LoginResponse,
  email: string,
): Promise<LoginUserResult> {
  try {
    const users = await fetchUsersList(tokens.access_token);
    const normalizedEmail = email.trim().toLowerCase();
    const matched = users.find(
      (u) => (u.email ?? "").trim().toLowerCase() === normalizedEmail,
    );
    if (!matched) {
      return {
        ...tokens,
        firstname: null,
        lastname: null,
        fullName: email,
      };
    }
    const { firstname, lastname, fullName } = buildDisplayFullName(
      matched.firstname,
      matched.lastname,
      email,
    );
    return {
      ...tokens,
      firstname,
      lastname,
      fullName,
    };
  } catch {
    return {
      ...tokens,
      firstname: null,
      lastname: null,
      fullName: email,
    };
  }
}

function parseErrorMessage(data: unknown, status: number): string {
  if (typeof data === "string" && data.trim()) return data;
  if (typeof data !== "object" || data === null) {
    return `Login failed (${status})`;
  }

  const o = data as Record<string, unknown>;

  if (typeof o.message === "string") return o.message;
  if (typeof o.error === "string") return o.error;

  if (Array.isArray(o.detail)) {
    const parts = o.detail.map((d) => {
      if (typeof d === "object" && d !== null && "msg" in d) {
        return String((d as { msg: unknown }).msg);
      }
      return String(d);
    });

    const joined = parts.filter(Boolean).join(", ");
    return joined || `Login failed (${status})`;
  }

  if (typeof o.detail === "string") return o.detail;

  return `Login failed (${status})`;
}

export async function loginApi(
  credentials: LoginRequest,
): Promise<LoginResponse> {
  const response = await fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(credentials),
  });

  let data: unknown = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(parseErrorMessage(data, response.status));
  }

  return data as LoginResponse;
}

export async function loginWithProfile(
  credentials: LoginRequest,
): Promise<LoginUserResult> {
  const tokens = await loginApi(credentials);
  return resolveProfileAfterLogin(tokens, credentials.email);
}
