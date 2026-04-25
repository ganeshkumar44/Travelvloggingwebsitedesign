export type AllStoriesStatus = "idle" | "loading" | "succeeded" | "failed";

export interface AllStoriesAuthor {
  firstname: string;
  lastname: string;
  facebook: string | null;
  twitter: string | null;
  linkedin: string | null;
  instagram: string | null;
  youtube: string | null;
  about_author: string | null;
  profession: string | null;
}

export interface AllStoriesItem {
  id: number;
  user_id: number;
  image: string;
  title: string;
  description: string;
  location: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
  user: AllStoriesAuthor;
  total_likes: number;
  total_dislikes: number;
}

export type AllStoriesResponse = AllStoriesItem[];

export interface AllStoriesState {
  status: AllStoriesStatus;
  error: string | null;
  data: AllStoriesItem[];
}
