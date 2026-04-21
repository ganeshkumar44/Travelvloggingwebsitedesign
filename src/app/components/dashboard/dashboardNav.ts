import type { DashboardNavItemConfig } from "./types";

export const DASHBOARD_NAV_ITEMS: DashboardNavItemConfig[] = [
  { id: "profile", label: "Profile Details" },
  { id: "accounts", label: "Accounts" },
  { id: "stories", label: "Stories" },
  { id: "users", label: "Users", adminOnly: true },
];
