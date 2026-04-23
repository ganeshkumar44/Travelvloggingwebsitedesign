import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../Button";
import { DashboardTextField } from "../DashboardFormField";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../ui/alert-dialog";
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
  const [confirmOpen, setConfirmOpen] = useState(false);

  const loading = deleteStatus === "loading";
  const hasPassword = currentPassword.trim().length > 0;

  const performFullSignOut = () => {
    clearAllSessionAndLocalStorage();
    dispatch(logout());
    dispatch(resetUpdateState());
    dispatch(resetChangePasswordState());
    dispatch(resetDeleteAccountState());
  };

  const handleRequestDelete = () => {
    setFieldError(null);
    dispatch(clearDeleteAccountError());
    setConfirmOpen(true);
  };

  const handleCancelConfirm = () => {
    setConfirmOpen(false);
    setCurrentPassword("");
    setFieldError(null);
  };

  const handleConfirmDelete = async () => {
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

    const result = await dispatch(
      deleteAccount({
        accessToken,
        body: { email, password: currentPassword },
      }),
    );

    if (deleteAccount.fulfilled.match(result)) {
      setConfirmOpen(false);
      setCurrentPassword("");
      setSuccessVisible(true);
      window.setTimeout(() => {
        performFullSignOut();
        navigate("/", { replace: true });
      }, DELETE_REDIRECT_MS);
    }
  };

  const handleConfirmOpenChange = (open: boolean) => {
    if (!open && loading) {
      return;
    }
    setConfirmOpen(open);
    if (!open) {
      setCurrentPassword("");
      setFieldError(null);
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
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-red-600">
          Deleting your account will permanently remove all your information,
          stories, images, and account data. This action cannot be undone.
        </p>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-[var(--shadow-sm)]">
        <div className="grid max-w-full gap-6">
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
            onClick={handleRequestDelete}
            disabled={!hasPassword || loading || successVisible}
            className="border-2 border-red-600 text-red-600 hover:bg-red-600 dark:hover:bg-red-950/30"
            variant="outline"
          >
            Delete Account
          </Button>
        </div>
      </div>

      <AlertDialog open={confirmOpen} onOpenChange={handleConfirmOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete account</AlertDialogTitle>
            <AlertDialogDescription className="text-left">
              Are you sure you want to delete your account? This action cannot be
              undone.
            </AlertDialogDescription>
            {successVisible ? (
              <p
                className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-900/40 dark:bg-green-950/40 dark:text-green-200"
                role="status"
              >
                Your account has been deleted successfully. Redirecting to home…
              </p>
            ) : null}

            {deleteError && !successVisible ? (
              <p className="text-sm text-red-600" role="alert">
                {deleteError}
              </p>
            ) : null}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelConfirm}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={handleConfirmDelete}
              disabled={loading}
            >
              {loading ? "Deleting…" : "Continue"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
