import React, { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FormTextField } from "../components/FormTextField";
import { Button } from "../components/Button";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  clearForgotPasswordError,
  resetForgotPasswordState,
  sendForgotPasswordOtp,
} from "../../features/forgotPassword/forgotPasswordSlice";
import {
  clearVerifyForgotPasswordOtpErrors,
  resetVerifyForgotPasswordOtpState,
  setVerifyForgotPasswordOtpFieldError,
  verifyForgotPasswordOtp,
} from "../../features/verifyForgotPasswordOtp/verifyForgotPasswordOtpSlice";
import {
  clearResetPasswordError,
  resetPassword,
  resetResetPasswordState,
} from "../../features/resetPassword/resetPasswordSlice";
import {
  isValidEmailFormat,
  validateConfirmPassword,
  validateResetPasswordStrength,
} from "../../features/resetPassword/resetPasswordValidation";

export default function ForgotPassword() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    lockedEmail,
    status: forgotStatus,
    apiError: forgotApiError,
    successMessage: forgotSuccessMessage,
  } = useAppSelector((s) => s.forgotPassword);

  const {
    status: verifyStatus,
    apiError: verifyApiError,
    otpFieldError,
    otpVerified,
  } = useAppSelector((s) => s.verifyForgotPasswordOtp);

  const {
    status: resetStatus,
    apiError: resetApiError,
    successMessage: resetSuccessMessage,
  } = useAppSelector((s) => s.resetPassword);

  const [emailInput, setEmailInput] = useState("");
  const [emailFieldError, setEmailFieldError] = useState<string | null>(null);

  const [otp, setOtp] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);

  const emailLocked = Boolean(lockedEmail);
  const displayEmail = lockedEmail ?? emailInput;

  const forgotLoading = forgotStatus === "loading";
  const verifyLoading = verifyStatus === "loading";
  const resetLoading = resetStatus === "loading";

  const showOtpSection = forgotStatus === "succeeded" && !otpVerified;
  const showResetSection = otpVerified;

  useEffect(() => {
    if (resetStatus !== "succeeded" || !resetSuccessMessage) return;
    const id = window.setTimeout(() => {
      dispatch(resetForgotPasswordState());
      dispatch(resetVerifyForgotPasswordOtpState());
      dispatch(resetResetPasswordState());
      navigate("/login", { replace: true });
    }, 2000);
    return () => window.clearTimeout(id);
  }, [resetStatus, resetSuccessMessage, dispatch, navigate]);

  const handleSendOtp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(clearForgotPasswordError());
    const trimmed = emailInput.trim();
    if (!trimmed) {
      setEmailFieldError("Email is required");
      return;
    }
    if (!isValidEmailFormat(trimmed)) {
      setEmailFieldError("Enter a valid email address");
      return;
    }
    setEmailFieldError(null);
    void dispatch(sendForgotPasswordOtp({ email: trimmed }));
  };

  const handleVerifyOtp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(clearVerifyForgotPasswordOtpErrors());
    const trimmedOtp = otp.trim();
    if (!trimmedOtp) {
      dispatch(setVerifyForgotPasswordOtpFieldError("OTP is required"));
      return;
    }
    const email = (lockedEmail ?? "").trim();
    if (!email) return;
    void dispatch(verifyForgotPasswordOtp({ email, otp: trimmedOtp }));
  };

  const handleResetPassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(clearResetPasswordError());
    const npErr = validateResetPasswordStrength(newPassword);
    const cpErr = validateConfirmPassword(newPassword, confirmPassword);
    setNewPasswordError(npErr);
    setConfirmPasswordError(cpErr);
    if (npErr || cpErr) return;
    const email = (lockedEmail ?? "").trim();
    if (!email) return;
    void dispatch(
      resetPassword({
        email,
        new_password: newPassword,
        confirm_password: confirmPassword,
      }),
    );
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[var(--gray-light)] via-white to-[var(--gray-light)]">
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 sm:p-10 shadow-[var(--shadow-xl)]">
          <h1 className="text-center text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
            Forgot Password
          </h1>

          {!emailLocked ? (
            <form
              onSubmit={handleSendOtp}
              className="mt-8 flex flex-col gap-6"
              noValidate
            >
              <FormTextField
                id="forgot-password-email"
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                value={displayEmail}
                onChange={(e) => {
                  setEmailInput(e.target.value);
                  setEmailFieldError(null);
                  dispatch(clearForgotPasswordError());
                }}
                disabled={forgotLoading}
                error={emailFieldError ?? undefined}
              />

              {forgotApiError ? (
                <p
                  className="text-sm font-medium text-[var(--destructive)]"
                  role="alert"
                >
                  {forgotApiError}
                </p>
              ) : null}

              <div className="pt-1">
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={forgotLoading}
                >
                  {forgotLoading ? "Sending…" : "Send OTP"}
                </Button>
              </div>
            </form>
          ) : (
            <div className="mt-8 flex flex-col gap-6">
              <FormTextField
                id="forgot-password-email"
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                value={displayEmail}
                onChange={() => {}}
                disabled
              />

              {forgotSuccessMessage ? (
                <p className="text-sm font-medium text-emerald-700" role="status">
                  {forgotSuccessMessage}
                </p>
              ) : null}
            </div>
          )}

          {showOtpSection ? (
            <form
              onSubmit={handleVerifyOtp}
              className="mt-8 flex flex-col gap-6 border-t border-[var(--border)] pt-8"
              noValidate
            >
              <FormTextField
                id="forgot-password-otp"
                name="otp"
                label="OTP"
                placeholder="Enter OTP"
                autoComplete="one-time-code"
                inputMode="numeric"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                  dispatch(clearVerifyForgotPasswordOtpErrors());
                }}
                disabled={verifyLoading}
                error={otpFieldError ?? undefined}
              />

              {verifyApiError ? (
                <p
                  className="text-sm font-medium text-[var(--destructive)]"
                  role="alert"
                >
                  {verifyApiError}
                </p>
              ) : null}

              <div className="pt-1">
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={verifyLoading}
                >
                  {verifyLoading ? "Verifying…" : "Verify OTP"}
                </Button>
              </div>
            </form>
          ) : null}

          {showResetSection ? (
            <form
              onSubmit={handleResetPassword}
              className="mt-8 flex flex-col gap-6 border-t border-[var(--border)] pt-8"
              noValidate
            >
              <FormTextField
                id="forgot-new-password"
                name="new_password"
                label="New Password"
                type="password"
                placeholder="Enter new password"
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setNewPasswordError(null);
                  dispatch(clearResetPasswordError());
                }}
                disabled={resetLoading}
                error={newPasswordError ?? undefined}
              />

              <FormTextField
                id="forgot-confirm-password"
                name="confirm_password"
                label="Confirm New Password"
                type="password"
                placeholder="Confirm new password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setConfirmPasswordError(null);
                  dispatch(clearResetPasswordError());
                }}
                disabled={resetLoading}
                error={confirmPasswordError ?? undefined}
              />

              {resetApiError ? (
                <p
                  className="text-sm font-medium text-[var(--destructive)]"
                  role="alert"
                >
                  {resetApiError}
                </p>
              ) : null}

              {resetSuccessMessage ? (
                <p className="text-sm font-medium text-emerald-700" role="status">
                  {resetSuccessMessage}
                </p>
              ) : null}

              <div className="pt-1">
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={resetLoading}
                >
                  {resetLoading ? "Resetting…" : "Reset Password"}
                </Button>
              </div>
            </form>
          ) : null}

          <div className="mt-8 border-t border-[var(--border)] pt-6 text-center">
            <Link
              to="/login"
              className="text-sm font-medium text-[var(--primary)] transition-colors hover:text-[var(--ocean-blue-dark)] hover:underline"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
