import { parseApiErrorMessage } from "../auth/authApi";
import type { AllStoriesResponse } from "./allStoriesTypes";

const ALL_STORIES_URL = "http://127.0.0.1:8000/v1/all-stories";

export async function fetchAllStoriesApi(): Promise<AllStoriesResponse> {
  const response = await fetch(ALL_STORIES_URL, {
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
      parseApiErrorMessage(data, response.status, "Fetch stories failed"),
    );
  }

  return Array.isArray(data) ? (data as AllStoriesResponse) : [];
}
