import { parseApiErrorMessage } from "../auth/authApi";
import { apiFetch } from "../../lib/apiFetch";
import type { AllStoriesResponse } from "./allStoriesTypes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ALL_STORIES_URL = `${API_BASE_URL}/v1/all-stories`;

export async function fetchAllStoriesApi(): Promise<AllStoriesResponse> {
  const response = await apiFetch(ALL_STORIES_URL, {
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
