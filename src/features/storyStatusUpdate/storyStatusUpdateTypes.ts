export type StoryStatusUpdateApiStatus = "approved" | "rejected" | "deleted";

export type StoryStatusUpdateRequestStatus = StoryStatusUpdateApiStatus;

export interface StoryStatusUpdateRequestBody {
  story_id: number;
  status: StoryStatusUpdateRequestStatus;
}

export interface StoryStatusUpdateArgs {
  accessToken: string;
  storyId: number;
  status: StoryStatusUpdateRequestStatus;
}

export interface StoryStatusUpdateResponse {
  message?: string;
}

export type StoryStatusUpdateSliceStatus =
  | "idle"
  | "loading"
  | "succeeded"
  | "failed";

export interface StoryStatusUpdateState {
  status: StoryStatusUpdateSliceStatus;
  error: string | null;
  /** Last success message from API (optional consumer e.g. toast) */
  message: string | null;
  /** Which row is submitting, for per-row loading */
  pendingStoryId: number | null;
}
