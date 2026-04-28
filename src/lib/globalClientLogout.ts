import { toast } from "sonner";
import { store } from "../store";
import { logout } from "../features/auth/authSlice";
import { clearAllSessionAndLocalStorage } from "../features/auth/authSession";
import { resetUpdateState } from "../features/profile/profileSlice";
import { resetChangePasswordState } from "../features/changePassword/changePasswordSlice";
import { resetDeleteAccountState } from "../features/deleteAccount/deleteAccountSlice";

let clientLogoutInProgress = false;

/**
 * Clears all auth-related storage and resets Redux auth-related slices.
 * No redirect. Used after account delete and shared by the full sign-out path.
 */
export function clearClientAuthState(): void {
  clearAllSessionAndLocalStorage();
  store.dispatch(logout());
  store.dispatch(resetUpdateState());
  store.dispatch(resetChangePasswordState());
  store.dispatch(resetDeleteAccountState());
}

export type GlobalLogoutSource = "manual" | "inactivity" | "session_expired";

type PerformGlobalClientLogoutOptions = {
  source: GlobalLogoutSource;
  /** e.g. broadcast to other tabs before storage clear (inactivity idle path) */
  onBeforeStorageClear?: () => void;
};

/**
 * Single sign-out: clear storage, reset Redux, optional toast, redirect to Sign In.
 * Concurrency guard prevents double execution (e.g. many parallel 401s).
 */
export function performGlobalClientLogout(
  options: PerformGlobalClientLogoutOptions,
): void {
  if (clientLogoutInProgress) return;
  clientLogoutInProgress = true;
  try {
    options.onBeforeStorageClear?.();
    clearClientAuthState();
    if (options.source === "inactivity") {
      toast.info("You have been logged out due to inactivity.");
    } else if (options.source === "session_expired") {
      toast.info("Session expired. Please sign in again.");
    }
    window.location.replace("/sign-in");
  } catch {
    clientLogoutInProgress = false;
  }
}
