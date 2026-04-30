import { parseApiErrorMessage } from "../auth/authApi";
import { apiFetch } from "../../lib/apiFetch";
import type { StoryUploadResponse } from "./storyUploadTypes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const STORIES_UPLOAD_URL = `${API_BASE_URL}/v1/stories/upload`;

export async function uploadStoryApi(
  accessToken: string,
  formData: FormData,
): Promise<StoryUploadResponse> {
  const response = await apiFetch(STORIES_UPLOAD_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  let data: unknown = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(
      parseApiErrorMessage(data, response.status, "Upload failed"),
    );
  }

  return data as StoryUploadResponse;
}
