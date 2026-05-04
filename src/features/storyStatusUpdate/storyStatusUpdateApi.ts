import { parseApiErrorMessage } from "../auth/authApi";
import { apiFetch } from "../../lib/apiFetch";
import type {
  StoryStatusUpdateRequestBody,
  StoryStatusUpdateResponse,
} from "./storyStatusUpdateTypes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const STORY_STATUS_URL = `${API_BASE_URL}/v1/stories/status`;

export async function patchStoryStatusApi(
  accessToken: string,
  body: StoryStatusUpdateRequestBody,
): Promise<StoryStatusUpdateResponse> {
  const response = await apiFetch(STORY_STATUS_URL, {
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

  const o = data as Record<string, unknown>;
  const message =
    typeof o.message === "string" && o.message.trim()
      ? o.message.trim()
      : undefined;

  return { message };
}
