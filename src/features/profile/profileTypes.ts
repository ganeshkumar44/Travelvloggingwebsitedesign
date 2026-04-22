import type { AuthAsyncStatus } from "../auth/authTypes";

export interface UpdateProfileRequest {
  firstname: string;
  lastname: string;
  phone: string;
  gender: string;
  about_author: string;
  profession: string;
  username: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  youtube: string;
  instagram: string;
}

export interface ProfileUpdateState {
  status: AuthAsyncStatus;
  error: string | null;
}
