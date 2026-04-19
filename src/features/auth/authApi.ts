import type { LoginRequest, LoginResponse } from "./authTypes";

const LOGIN_URL = "http://127.0.0.1:8000/login";

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
