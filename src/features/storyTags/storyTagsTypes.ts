export type StoryTagsFetchStatus = "idle" | "loading" | "succeeded" | "failed";

export interface StoryTagsState {
  status: StoryTagsFetchStatus;
  error: string | null;
  /** Normalized tag names from GET /v1/storytags */
  items: string[];
}
