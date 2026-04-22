import React, { useMemo, useState } from "react";
import { Button } from "../../Button";
import { DashboardTextField } from "../DashboardFormField";
import { cn } from "../../ui/utils";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  changePassword,
  clearChangePasswordError,
  resetChangePasswordState,
} from "../../../../features/changePassword/changePasswordSlice";
import { validateChangePasswordForm } from "../../../../features/changePassword/changePasswordValidation";
import type { ChangePasswordFieldErrors } from "../../../../features/changePassword/changePasswordValidation";

export function AccountsSection() {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((s) => s.auth.accessToken);
  const userEmail = useAppSelector((s) => s.auth.userEmail);
  const profileEmail = useAppSelector((s) => s.auth.serverProfile?.email);
  const changeStatus = useAppSelector((s) => s.changePassword.status);
  const changeError = useAppSelector((s) => s.changePassword.error);

  const emailDisplay = useMemo(
    () => (userEmail ?? profileEmail ?? "").trim(),
    [userEmail, profileEmail],
  );

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ChangePasswordFieldErrors>({});
  const [successMessage, setSuccessMessage] = useState(false);

  const loading = changeStatus === "loading";

  const clearClientError = (key: keyof ChangePasswordFieldErrors) => {
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleFieldChange = (
    setter: (v: string) => void,
    value: string,
    errorKey: keyof ChangePasswordFieldErrors,
  ) => {
    setter(value);
    if (successMessage) setSuccessMessage(false);
    dispatch(clearChangePasswordError());
    clearClientError(errorKey);
  };

  const handleSubmit = async () => {
    setSuccessMessage(false);
    dispatch(clearChangePasswordError());
    setFieldErrors({});

    const clientErrors = validateChangePasswordForm({
      currentPassword,
      newPassword,
      confirmNewPassword,
    });
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      return;
    }

    if (!accessToken) {
      return;
    }

    const result = await dispatch(
      changePassword({
        accessToken,
        body: {
          current_password: currentPassword,
          new_password: newPassword,
          confirm_new_password: confirmNewPassword,
        },
      }),
    );

    if (changePassword.fulfilled.match(result)) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setFieldErrors({});
      setSuccessMessage(true);
      dispatch(resetChangePasswordState());
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
          Change Password
        </h2>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Manage your sign-in email and password.
        </p>
      </div>

      {successMessage ? (
        <p
          className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-900/40 dark:bg-green-950/40 dark:text-green-200"
          role="status"
        >
          Your password has been updated successfully.
        </p>
      ) : null}

      {changeError ? (
        <p className="text-sm text-red-600" role="alert">
          {changeError}
        </p>
      ) : null}

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-[var(--shadow-sm)]">
        <div className="grid max-w-full gap-6">
          <div className="w-full space-y-2">
            <DashboardTextField
              id="dash-accounts-email"
              label="Email ID"
              type="email"
              value={emailDisplay}
              readOnly
              disabled
              autoComplete="email"
            />
          </div>
          <div className="w-full space-y-2">
            <DashboardTextField
              id="dash-accounts-current-password"
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) =>
                handleFieldChange(
                  setCurrentPassword,
                  e.target.value,
                  "currentPassword",
                )
              }
              autoComplete="current-password"
              className={cn(
                fieldErrors.currentPassword &&
                  "border-red-500 focus:border-red-500 focus:ring-red-500/25",
              )}
              aria-invalid={!!fieldErrors.currentPassword}
            />
            {fieldErrors.currentPassword ? (
              <p className="text-sm text-red-600" role="alert">
                {fieldErrors.currentPassword}
              </p>
            ) : null}
          </div>
          <div className="w-full space-y-2">
            <DashboardTextField
              id="dash-accounts-new-password"
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) =>
                handleFieldChange(
                  setNewPassword,
                  e.target.value,
                  "newPassword",
                )
              }
              autoComplete="new-password"
              className={cn(
                fieldErrors.newPassword &&
                  "border-red-500 focus:border-red-500 focus:ring-red-500/25",
              )}
              aria-invalid={!!fieldErrors.newPassword}
            />
            {fieldErrors.newPassword ? (
              <p className="text-sm text-red-600" role="alert">
                {fieldErrors.newPassword}
              </p>
            ) : null}
          </div>
          <div className="w-full space-y-2">
            <DashboardTextField
              id="dash-accounts-confirm-password"
              label="Confirm New Password"
              type="password"
              value={confirmNewPassword}
              onChange={(e) =>
                handleFieldChange(
                  setConfirmNewPassword,
                  e.target.value,
                  "confirmNewPassword",
                )
              }
              autoComplete="new-password"
              className={cn(
                fieldErrors.confirmNewPassword &&
                  "border-red-500 focus:border-red-500 focus:ring-red-500/25",
              )}
              aria-invalid={!!fieldErrors.confirmNewPassword}
            />
            {fieldErrors.confirmNewPassword ? (
              <p className="text-sm text-red-600" role="alert">
                {fieldErrors.confirmNewPassword}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-8">
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Updating…" : "Update"}
          </Button>
        </div>
      </div>
    </div>
  );
}
