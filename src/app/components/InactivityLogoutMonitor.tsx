import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../features/auth/authSlice";
import {
  AUTH_STORAGE_KEYS,
  clearAllSessionAndLocalStorage,
} from "../../features/auth/authSession";
import { resetUpdateState } from "../../features/profile/profileSlice";
import { resetChangePasswordState } from "../../features/changePassword/changePasswordSlice";
import { resetDeleteAccountState } from "../../features/deleteAccount/deleteAccountSlice";

const _timeoutEnv = import.meta.env.VITE_INACTIVITY_TIMEOUT_MS;
const INACTIVITY_MS = (() => {
  const n = _timeoutEnv != null && _timeoutEnv !== "" ? Number(_timeoutEnv) : NaN;
  return Number.isFinite(n) && n > 0 ? n : 15 * 60 * 1000;
})();

/** Throttle only for `mousemove`; other events reset the timer on every event. */
const MOUSEMOVE_THROTTLE_MS = 1_000;

const ACTIVITY_SYNC_KEY = "inactivity_last_activity_at";
const REMOTE_LOGOUT_BROADCAST = "inactivity_logout_broadcast";

function syncActivityToOtherTabs(): void {
  try {
    localStorage.setItem(ACTIVITY_SYNC_KEY, String(Date.now()));
  } catch {
    /* ignore quota / private mode */
  }
}

function broadcastInactivityLogoutToOtherTabs(): void {
  try {
    localStorage.setItem(REMOTE_LOGOUT_BROADCAST, String(Date.now()));
  } catch {
    /* ignore */
  }
}

/**
 * Global auto-logout when the user is idle while authenticated. Mount once under the router.
 */
export function InactivityLogoutMonitor() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const accessToken = useAppSelector((s) => s.auth.accessToken);
  const isAuthenticated = Boolean(accessToken);

  const inactivityTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const isLoggingOutRef = useRef(false);
  const lastMousemoveAtRef = useRef(0);

  const runFullClientLogout = useCallback(() => {
    clearAllSessionAndLocalStorage();
    dispatch(logout());
    dispatch(resetUpdateState());
    dispatch(resetChangePasswordState());
    dispatch(resetDeleteAccountState());
  }, [dispatch]);

  const performInactivityLogout = useCallback(
    (source: "idle" | "remote_tab" = "idle") => {
      if (isLoggingOutRef.current) return;
      const hasToken = Boolean(
        accessToken || sessionStorage.getItem(AUTH_STORAGE_KEYS.accessToken),
      );
      if (!hasToken) return;

      isLoggingOutRef.current = true;
      toast.info("You have been logged out due to inactivity.");

      const finish = () => {
        runFullClientLogout();
        navigate("/sign-in", { replace: true });
      };

      if (source === "idle") {
        broadcastInactivityLogoutToOtherTabs();
        // Defer clearing storage so other tabs can receive the storage event.
        window.setTimeout(finish, 0);
      } else {
        finish();
      }
    },
    [accessToken, navigate, runFullClientLogout],
  );

  const clearInactivityTimeout = useCallback(() => {
    if (inactivityTimeoutRef.current !== null) {
      clearTimeout(inactivityTimeoutRef.current);
      inactivityTimeoutRef.current = null;
    }
  }, []);

  const startInactivityTimeout = useCallback(() => {
    clearInactivityTimeout();
    inactivityTimeoutRef.current = window.setTimeout(() => {
      inactivityTimeoutRef.current = null;
      if (sessionStorage.getItem(AUTH_STORAGE_KEYS.accessToken)) {
        performInactivityLogout("idle");
      }
    }, INACTIVITY_MS);
  }, [clearInactivityTimeout, performInactivityLogout]);

  const onActivity = useCallback(
    (eventType: "mousemove" | "other") => {
      if (!isAuthenticated) return;
      if (eventType === "mousemove") {
        const t = Date.now();
        if (t - lastMousemoveAtRef.current < MOUSEMOVE_THROTTLE_MS) {
          return;
        }
        lastMousemoveAtRef.current = t;
      }
      syncActivityToOtherTabs();
      startInactivityTimeout();
    },
    [isAuthenticated, startInactivityTimeout],
  );

  // Authenticated: reset timer + events + storage sync from other tabs
  useEffect(() => {
    if (!isAuthenticated) {
      clearInactivityTimeout();
      isLoggingOutRef.current = false;
      return;
    }

    startInactivityTimeout();

    const onMousemove = () => onActivity("mousemove");
    const onOther = () => onActivity("other");

    window.addEventListener("mousemove", onMousemove, { passive: true });
    window.addEventListener("keydown", onOther, true);
    const scrollOptions = { passive: true, capture: true } as const;
    window.addEventListener("scroll", onOther, scrollOptions);
    document.addEventListener("click", onOther, { capture: true });

    const onStorage = (e: StorageEvent) => {
      if (e.key === ACTIVITY_SYNC_KEY && e.newValue != null) {
        onOther();
        return;
      }
      if (e.key === REMOTE_LOGOUT_BROADCAST && e.newValue != null) {
        if (!sessionStorage.getItem(AUTH_STORAGE_KEYS.accessToken)) {
          return;
        }
        performInactivityLogout("remote_tab");
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      clearInactivityTimeout();
      window.removeEventListener("mousemove", onMousemove);
      window.removeEventListener("keydown", onOther, true);
      window.removeEventListener("scroll", onOther, scrollOptions);
      document.removeEventListener("click", onOther, { capture: true });
      window.removeEventListener("storage", onStorage);
    };
  }, [
    isAuthenticated,
    clearInactivityTimeout,
    startInactivityTimeout,
    onActivity,
    performInactivityLogout,
  ]);

  return null;
}
