import { parseApiErrorMessage } from "../auth/authApi";
import { readAuthFromSession } from "../auth/authSession";
import { apiFetch } from "../../lib/apiFetch";
import type { UserListItem, UsersListResponse } from "./usersTypes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const USERS_URL = `${API_BASE_URL}/users`;

function parseIsVerified(v: unknown): boolean {
  if (v === true) return true;
  if (v === false) return false;
  if (v === 1) return true;
  if (v === 0) return false;
  if (typeof v === "string") {
    const t = v.trim().toLowerCase();
    if (t === "true" || t === "1" || t === "yes") return true;
  }
  return false;
}

function toNullableString(v: unknown): string | null {
  if (v == null) return null;
  if (typeof v === "string") return v.trim() || null;
  return String(v);
}

function normalizeUserRow(raw: unknown, index: number): UserListItem {
  if (!raw || typeof raw !== "object") {
    return {
      firstname: null,
      lastname: null,
      email: `unknown-${index}`,
      role: null,
      is_verified: false,
      phone: null,
      gender: null,
    };
  }

  const o = raw as Record<string, unknown>;
  const idRaw = o.id;
  let id: number | undefined;
  if (typeof idRaw === "number" && Number.isFinite(idRaw)) {
    id = idRaw;
  } else if (typeof idRaw === "string" && /^\d+$/.test(idRaw.trim())) {
    const n = Number(idRaw);
    if (Number.isFinite(n)) id = n;
  }
  const email = toNullableString(o.email) ?? `unknown-${index}`;

  return {
    id,
    firstname: toNullableString(o.firstname),
    lastname: toNullableString(o.lastname),
    email,
    role: toNullableString(o.role),
    is_verified: parseIsVerified(o.is_verified),
    phone: toNullableString(o.phone),
    gender: toNullableString(o.gender),
  };
}

function extractUsersArray(data: unknown): unknown[] {
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object" && "data" in data) {
    const inner = (data as { data: unknown }).data;
    if (Array.isArray(inner)) return inner;
  }
  if (data && typeof data === "object" && "users" in data) {
    const inner = (data as { users: unknown }).users;
    if (Array.isArray(inner)) return inner;
  }
  return [];
}

/**
 * Fetches all users. Pagination is applied client-side in the dashboard.
 */
export async function fetchUsersApi(): Promise<UsersListResponse> {
  const { accessToken } = readAuthFromSession();
  if (!accessToken) {
    throw new Error("Not authenticated. Please sign in again.");
  }

  const response = await apiFetch(USERS_URL, {
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
      parseApiErrorMessage(
        data,
        response.status,
        "Failed to load users",
      ),
    );
  }

  const rows = extractUsersArray(data);
  return rows.map((row, index) => normalizeUserRow(row, index));
}
