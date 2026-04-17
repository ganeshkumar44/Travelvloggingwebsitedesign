import React, { FormEvent } from "react";
import { FormTextField } from "../components/FormTextField";
import { Button } from "../components/Button";

export default function SignIn() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[var(--gray-light)] via-white to-[var(--gray-light)]">
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 sm:p-10 shadow-[var(--shadow-xl)]">
          <h1 className="text-center text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
            Sign In
          </h1>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-6"
            noValidate
          >
            <FormTextField
              id="signin-username"
              name="username"
              label="Username"
              placeholder="Enter your username"
              autoComplete="username"
            />
            <FormTextField
              id="signin-password"
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            <div className="pt-1">
              <Button type="submit" className="w-full" size="lg">
                Submit
              </Button>
            </div>
          </form>

          <div className="mt-8 flex flex-col gap-3 border-t border-[var(--border)] pt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <button
              type="button"
              className="text-left text-sm font-medium text-[var(--primary)] transition-colors hover:text-[var(--ocean-blue-dark)] hover:underline sm:text-left"
            >
              Forgot password?
            </button>
            <button
              type="button"
              className="text-left text-sm font-medium text-[var(--primary)] transition-colors hover:text-[var(--ocean-blue-dark)] hover:underline sm:text-right"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
