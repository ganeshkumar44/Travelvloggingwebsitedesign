import type { ResetPasswordRequest, ResetPasswordResponse } from "./resetPasswordTypes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const RESET_PASSWORD_URL = `${API_BASE_URL}/reset-password`;

function parseResetPasswordApiError(data: unknown, status: number): string {
  if (typeof data === "string" && data.trim()) return data;
  if (typeof data !== "object" || data === null) {
    return `Reset failed (${status})`;
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
    return joined || `Reset failed (${status})`;
  }

  if (typeof o.detail === "string") return o.detail;

  return `Reset failed (${status})`;
}

export async function resetPasswordApi(
  body: ResetPasswordRequest,
): Promise<ResetPasswordResponse> {
  const response = await fetch(RESET_PASSWORD_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
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
    throw new Error(parseResetPasswordApiError(data, response.status));
  }

  return data as ResetPasswordResponse;
}
