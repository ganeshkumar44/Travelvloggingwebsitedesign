export type DashboardNavId =
  | "dashboard"
  | "stories"
  | "profile"
  | "accounts"
  | "closeAccount"
  | "users";

export type DashboardNavLeaf = {
  type: "item";
  id: DashboardNavId;
  label: string;
  adminOnly?: boolean;
};

export type DashboardNavGroup = {
  type: "group";
  label: string;
  children: { id: DashboardNavId; label: string; adminOnly?: boolean }[];
};

export type DashboardNavNode = DashboardNavLeaf | DashboardNavGroup;

export function isDashboardNavGroup(
  node: DashboardNavNode,
): node is DashboardNavGroup {
  return node.type === "group";
}
