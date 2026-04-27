export type UsersFetchStatus = "idle" | "loading" | "succeeded" | "failed";

/** Normalized list row from `GET /users` (snake_case from API, typed for the UI). */
export interface UserListItem {
  id?: number;
  firstname: string | null;
  lastname: string | null;
  email: string;
  role: string | null;
  is_verified: boolean;
  phone: string | null;
  gender: string | null;
}

export type UsersListResponse = UserListItem[];

export interface UsersState {
  status: UsersFetchStatus;
  error: string | null;
  data: UserListItem[];
}
