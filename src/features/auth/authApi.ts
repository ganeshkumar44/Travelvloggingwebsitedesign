import type { ChangePasswordRequest, ChangePasswordResponse } from "../changePassword/changePasswordTypes";
import type { DeleteAccountRequestBody, DeleteAccountResponse } from "../deleteAccount/deleteAccountTypes";
import type { UpdateProfileRequest } from "../profile/profileTypes";
import { apiFetch } from "../../lib/apiFetch";
import type {
  LoginRequest,
  LoginResponse,
  ProfileResponse,
} from "./authTypes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const LOGIN_URL = `${API_BASE_URL}/login`;
const PROFILE_URL = `${API_BASE_URL}/profile`;
const CHANGE_PASSWORD_URL = `${API_BASE_URL}/profile/change-password`;

export function parseApiErrorMessage(
  data: unknown,
  status: number,
  fallbackPrefix: string,
): string {
  if (typeof data === "string" && data.trim()) return data;
  if (typeof data !== "object" || data === null) {
    return `${fallbackPrefix} (${status})`;
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
    return joined || `${fallbackPrefix} (${status})`;
  }

  if (typeof o.detail === "string") return o.detail;

  return `${fallbackPrefix} (${status})`;
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
    throw new Error(parseApiErrorMessage(data, response.status, "Login failed"));
  }

  return data as LoginResponse;
}

export async function fetchProfileApi(
  accessToken: string,
): Promise<ProfileResponse> {
  const response = await apiFetch(PROFILE_URL, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  let data: unknown = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(
      parseApiErrorMessage(data, response.status, "Request failed"),
    );
  }

  return data as ProfileResponse;
}

export async function updateProfileApi(
  accessToken: string,
  body: UpdateProfileRequest,
): Promise<ProfileResponse> {
  const response = await apiFetch(PROFILE_URL, {
    method: "PATCH",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  let data: unknown = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(
      parseApiErrorMessage(data, response.status, "Update failed"),
    );
  }

  return data as ProfileResponse;
}

export async function changePasswordApi(
  accessToken: string,
  body: ChangePasswordRequest,
): Promise<ChangePasswordResponse> {
  const response = await apiFetch(CHANGE_PASSWORD_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  let data: unknown = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(
      parseApiErrorMessage(data, response.status, "Request failed"),
    );
  }

  return data as ChangePasswordResponse;
}

export async function deleteAccountApi(
  accessToken: string,
  body: DeleteAccountRequestBody,
): Promise<DeleteAccountResponse> {
  const response = await apiFetch(PROFILE_URL, {
    method: "DELETE",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  let data: unknown = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(
      parseApiErrorMessage(data, response.status, "Request failed"),
    );
  }

  return data as DeleteAccountResponse;
}
