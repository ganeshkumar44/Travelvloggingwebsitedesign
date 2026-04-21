/** Whether the profile role should see admin-only dashboard items */
export function isAdminRole(role: string | null | undefined): boolean {
  if (!role) return false;
  return role.trim().toLowerCase() === "admin";
}
