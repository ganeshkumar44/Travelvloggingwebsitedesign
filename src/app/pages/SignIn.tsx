import React, { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FormTextField } from "../components/FormTextField";
import { Button } from "../components/Button";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  clearLoginError,
  fetchUserProfile,
  loginUser,
} from "../../features/auth/authSlice";

export default function SignIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, error, accessToken } = useAppSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (accessToken) {
      navigate("/dashboard", { replace: true });
    }
  }, [accessToken, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      void dispatch(fetchUserProfile(result.payload.access_token));
    }
  };

  const isLoading = status === "loading";

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
              id="signin-email"
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) dispatch(clearLoginError());
              }}
              disabled={isLoading}
            />
            <FormTextField
              id="signin-password"
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) dispatch(clearLoginError());
              }}
              disabled={isLoading}
            />

            {error ? (
              <p
                className="text-sm font-medium text-[var(--destructive)]"
                role="alert"
              >
                {error}
              </p>
            ) : null}

            <div className="pt-1">
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Signing in…" : "Submit"}
              </Button>
            </div>
          </form>

          <div className="mt-8 flex flex-col gap-3 border-t border-[var(--border)] pt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <Link
              to="/forgot-password"
              className="text-left text-sm font-medium text-[var(--primary)] transition-colors hover:text-[var(--ocean-blue-dark)] hover:underline sm:text-left"
            >
              Forgot password?
            </Link>
            <Link
              to="/register"
              className="text-left text-sm font-medium text-[var(--primary)] transition-colors hover:text-[var(--ocean-blue-dark)] hover:underline sm:text-right"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
