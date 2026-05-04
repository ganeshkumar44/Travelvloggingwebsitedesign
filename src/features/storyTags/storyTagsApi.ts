import { parseApiErrorMessage } from "../auth/authApi";
import { apiFetch } from "../../lib/apiFetch";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const STORY_TAGS_URL = `${API_BASE_URL}/v1/storytags`;

function extractTagString(item: unknown): string {
  if (typeof item === "string") return item.trim();
  if (item && typeof item === "object") {
    const o = item as Record<string, unknown>;
    if (typeof o.name === "string") return o.name.trim();
    if (typeof o.tag === "string") return o.tag.trim();
    if (typeof o.label === "string") return o.label.trim();
  }
  return "";
}

/** Accepts common API shapes: string[], { tags }, { data }, { storytags }, etc. */
export function normalizeStoryTagsPayload(data: unknown): string[] {
  if (Array.isArray(data)) {
    const fromArr = data.map(extractTagString).filter(Boolean);
    return dedupePreserveOrder(fromArr);
  }
  if (data && typeof data === "object") {
    const o = data as Record<string, unknown>;
    const candidates = ["tags", "data", "storytags", "story_tags", "items"] as const;
    for (const key of candidates) {
      const v = o[key];
      if (Array.isArray(v)) {
        return normalizeStoryTagsPayload(v);
      }
    }
  }
  return [];
}

function dedupePreserveOrder(tags: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const t of tags) {
    const lower = t.toLowerCase();
    if (seen.has(lower)) continue;
    seen.add(lower);
    out.push(t);
  }
  return out;
}

export async function fetchStoryTagsApi(): Promise<string[]> {
  const response = await apiFetch(STORY_TAGS_URL, {
    method: "GET",
    headers: {
      accept: "application/json",
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
      parseApiErrorMessage(data, response.status, "Fetch tags failed"),
    );
  }

  return normalizeStoryTagsPayload(data);
}
