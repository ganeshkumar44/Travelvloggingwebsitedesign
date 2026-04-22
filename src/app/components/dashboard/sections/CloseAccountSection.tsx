import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../Button";
import { DashboardTextField } from "../DashboardFormField";
import { cn } from "../../ui/utils";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { logout } from "../../../../features/auth/authSlice";
import { clearAllSessionAndLocalStorage } from "../../../../features/auth/authSession";
import { resetUpdateState } from "../../../../features/profile/profileSlice";
import { resetChangePasswordState } from "../../../../features/changePassword/changePasswordSlice";
import {
  clearDeleteAccountError,
  deleteAccount,
  resetDeleteAccountState,
} from "../../../../features/deleteAccount/deleteAccountSlice";

const DELETE_REDIRECT_MS = 1200;

export function CloseAccountSection() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const accessToken = useAppSelector((s) => s.auth.accessToken);
  const userEmail = useAppSelector((s) => s.auth.userEmail);
  const profileEmail = useAppSelector((s) => s.auth.serverProfile?.email);
  const deleteStatus = useAppSelector((s) => s.deleteAccount.status);
  const deleteError = useAppSelector((s) => s.deleteAccount.error);

  const email = (userEmail ?? profileEmail ?? "").trim();
  const [currentPassword, setCurrentPassword] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [successVisible, setSuccessVisible] = useState(false);

  const loading = deleteStatus === "loading";

  const performFullSignOut = () => {
    clearAllSessionAndLocalStorage();
    dispatch(logout());
    dispatch(resetUpdateState());
    dispatch(resetChangePasswordState());
    dispatch(resetDeleteAccountState());
  };

  const handleDeleteClick = async () => {
    setFieldError(null);
    dispatch(clearDeleteAccountError());

    if (!currentPassword.trim()) {
      setFieldError("Current password is required");
      return;
    }
    if (!email) {
      setFieldError("Unable to resolve your email. Please sign in again.");
      return;
    }
    if (!accessToken) {
      setFieldError("You are not signed in.");
      return;
    }

    const ok = window.confirm(
      "Are you sure you want to permanently delete your account?",
    );
    if (!ok) return;

    const result = await dispatch(
      deleteAccount({
        accessToken,
        body: { email, password: currentPassword },
      }),
    );

    if (deleteAccount.fulfilled.match(result)) {
      setCurrentPassword("");
      setSuccessVisible(true);
      window.setTimeout(() => {
        performFullSignOut();
        navigate("/login", { replace: true });
      }, DELETE_REDIRECT_MS);
    }
  };

  const onPasswordChange = (value: string) => {
    setCurrentPassword(value);
    if (fieldError) setFieldError(null);
    dispatch(clearDeleteAccountError());
  };

  if (!accessToken) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
          Delete Account
        </h2>
        <p className="text-sm text-[var(--muted-foreground)]">
          You are not signed in.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
          Delete Account
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted-foreground)]">
          Deleting your account will permanently remove all your information,
          stories, images, and account data. This action cannot be undone.
        </p>
      </div>

      {successVisible ? (
        <p
          className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-900/40 dark:bg-green-950/40 dark:text-green-200"
          role="status"
        >
          Your account has been deleted successfully. Redirecting to sign in…
        </p>
      ) : null}

      {deleteError && !successVisible ? (
        <p className="text-sm text-red-600" role="alert">
          {deleteError}
        </p>
      ) : null}

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-[var(--shadow-sm)]">
        <div className="grid max-w-full gap-6 sm:max-w-md">
          <div className="w-full space-y-2">
            <DashboardTextField
              id="dash-close-account-password"
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => onPasswordChange(e.target.value)}
              autoComplete="current-password"
              disabled={loading || successVisible}
              className={cn(
                fieldError &&
                  "border-red-500 focus:border-red-500 focus:ring-red-500/25",
              )}
              aria-invalid={!!fieldError}
            />
            {fieldError ? (
              <p className="text-sm text-red-600" role="alert">
                {fieldError}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-8">
          <Button
            type="button"
            onClick={handleDeleteClick}
            disabled={loading || successVisible}
            className="border-2 border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
            variant="outline"
          >
            {loading ? "Deleting…" : "Delete Account"}
          </Button>
        </div>
      </div>
    </div>
  );
}
