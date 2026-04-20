import React, { FormEvent, useState } from "react";
import { FormTextField } from "../components/FormTextField";
import { Button } from "../components/Button";

export default function RegisterOtp() {
  const [otp, setOtp] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
            <FormTextField
              id="register-otp"
              name="otp"
              label="OTP"
              placeholder="Enter OTP"
              autoComplete="one-time-code"
              inputMode="numeric"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <div className="pt-1">
              <Button type="submit" className="w-full" size="lg">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
