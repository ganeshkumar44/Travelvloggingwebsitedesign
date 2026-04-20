import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FormTextField } from "../components/FormTextField";
import { Button } from "../components/Button";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  REGISTER_SESSION_KEYS,
  clearRegisterPendingOtpEmail,
} from "../../features/register/registerSession";
import { resetRegisterState } from "../../features/register/registerSlice";
import {
  clearVerifyRegistrationOtpErrors,
  resetVerifyRegistrationOtpState,
  setVerifyRegistrationOtpFieldError,
  setVerifyRegistrationPendingEmail,
  verifyRegistrationOtp,
} from "../../features/verifyRegistrationOtp/verifyRegistrationOtpSlice";

export default function RegisterOtp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pendingEmail, status, apiError, otpFieldError } = useAppSelector(
    (s) => s.verifyRegistrationOtp,
  );

  const [otp, setOtp] = useState("");

  const isLoading = status === "loading";

  useEffect(() => {
    const stored = sessionStorage.getItem(
      REGISTER_SESSION_KEYS.pendingOtpEmail,
    );
    if (!stored) {
      navigate("/register", { replace: true });
      return;
    }
    dispatch(setVerifyRegistrationPendingEmail(stored));
  }, [dispatch, navigate]);

  useEffect(() => {
    if (status === "succeeded") {
      clearRegisterPendingOtpEmail();
      dispatch(resetRegisterState());
      dispatch(resetVerifyRegistrationOtpState());
      navigate("/sign-in", { replace: true });
    }
  }, [status, dispatch, navigate]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(clearVerifyRegistrationOtpErrors());
    const trimmedOtp = otp.trim();
    if (!trimmedOtp) {
      dispatch(setVerifyRegistrationOtpFieldError("OTP is required"));
      return;
    }
    const email = (pendingEmail ?? "").trim();
    if (!email) return;
    void dispatch(verifyRegistrationOtp({ email, otp: trimmedOtp }));
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[var(--gray-light)] via-white to-[var(--gray-light)]">
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 sm:p-10 shadow-[var(--shadow-xl)]">
          <h1 className="text-center text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
            Register OTP Verification
          </h1>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-6"
            noValidate
          >
            <input
              type="hidden"
              name="email"
              value={pendingEmail ?? ""}
              readOnly
              aria-hidden
            />

            <FormTextField
              id="register-otp"
              name="otp"
              label="OTP"
              placeholder="Enter OTP"
              autoComplete="one-time-code"
              inputMode="numeric"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                dispatch(clearVerifyRegistrationOtpErrors());
              }}
              disabled={isLoading}
              error={otpFieldError ?? undefined}
            />

            {apiError ? (
              <p
                className="text-sm font-medium text-[var(--destructive)]"
                role="alert"
              >
                {apiError}
              </p>
            ) : null}

            <div className="pt-1">
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Submitting…" : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
