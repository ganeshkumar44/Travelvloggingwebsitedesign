import type { DashboardNavId, DashboardNavNode } from "./types";

export const DASHBOARD_NAV_STRUCTURE: DashboardNavNode[] = [
  { type: "item", id: "dashboard", label: "Dashboard" },
  { type: "item", id: "stories", label: "Stories" },
  {
    type: "group",
    label: "Accounts Setting",
    children: [
      { id: "profile", label: "Profile Details" },
      { id: "accounts", label: "Change Password" },
      { id: "closeAccount", label: "Close Account" },
    ],
  },
  { type: "item", id: "users", label: "Users", adminOnly: true },
];

export function getVisibleNavStructure(isAdmin: boolean): DashboardNavNode[] {
  return DASHBOARD_NAV_STRUCTURE.map((node) => {
    if (node.type === "item") {
      if (node.adminOnly && !isAdmin) return null;
      return node;
    }
    const children = node.children.filter((c) => !c.adminOnly || isAdmin);
    if (children.length === 0) return null;
    return { ...node, children };
  }).filter((n): n is DashboardNavNode => n !== null);
}

const TAB_PARAM_IDS: readonly DashboardNavId[] = [
  "dashboard",
  "stories",
  "profile",
  "accounts",
  "closeAccount",
  "users",
];

export function isDashboardTabValue(value: string): value is DashboardNavId {
  return (TAB_PARAM_IDS as readonly string[]).includes(value);
}
