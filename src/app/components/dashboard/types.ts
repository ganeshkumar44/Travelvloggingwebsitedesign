export type DashboardNavId = "profile" | "accounts" | "stories" | "users";

export interface DashboardNavItemConfig {
  id: DashboardNavId;
  label: string;
  /** When true, item is only shown to admin users */
  adminOnly?: boolean;
}
