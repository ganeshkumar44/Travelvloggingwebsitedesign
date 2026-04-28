import { performGlobalClientLogout } from "./globalClientLogout";

const INVALID_TOKEN_PHRASE = "invalid or expired token";

function requestSendsBearerToken(init?: RequestInit): boolean {
  if (!init?.headers) {
    return false;
  }
  const h = new Headers(init.headers);
  const auth = (h.get("Authorization") ?? "").trim();
  return /^Bearer\s+\S+/.test(auth);
}

function messageIndicatesExpiredTokenText(text: string): boolean {
  return text.toLowerCase().includes(INVALID_TOKEN_PHRASE);
}

/**
 * Global fetch wrapper: on 401 with bearer auth, or error body mentioning invalid token,
 * runs a single sign-out and redirect. Login/public calls use plain `fetch` to avoid
 * false positives when no token was sent.
 */
export async function apiFetch(
  input: RequestInfo,
  init?: RequestInit,
): Promise<Response> {
  const response = await fetch(input, init);
  await processResponseForSessionExpiry(response, init);
  return response;
}

async function processResponseForSessionExpiry(
  response: Response,
  init?: RequestInit,
): Promise<void> {
  if (response.ok) {
    return;
  }

  const withBearer = requestSendsBearerToken(init);

  if (withBearer) {
    if (response.status === 401) {
      performGlobalClientLogout({ source: "session_expired" });
      return;
    }
    const text = await response.clone().text();
    if (messageIndicatesExpiredTokenText(text)) {
      performGlobalClientLogout({ source: "session_expired" });
    }
  }
}
