export type StoryUploadStatus = "idle" | "loading" | "succeeded" | "failed";

export interface StoryCreated {
  id: number;
  title: string;
  description: string;
  location: string;
  image: string;
  tags: string[];
}

export interface StoryUploadResponse {
  message: string;
  story: StoryCreated;
}

export interface StoryUploadState {
  status: StoryUploadStatus;
  error: string | null;
  data: StoryUploadResponse | null;
}

export interface StoryUploadArgs {
  accessToken: string;
  title: string;
  description: string;
  location: string;
  file: File | null;
  fileUrl: string;
  tags: string[];
}
