import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FormTextField } from "../components/FormTextField";
import { Button } from "../components/Button";
import { cn } from "../components/ui/utils";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  clearRegisterFieldError,
  resetRegisterState,
  setRegisterFieldErrors,
  registerUser,
} from "../../features/register/registerSlice";
import type { RegisterRequest } from "../../features/register/registerTypes";
import {
  hasValidationErrors,
  validateRegisterForm,
} from "../../features/register/registerValidation";

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
] as const;

export default function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, apiError, fieldErrors } = useAppSelector((s) => s.register);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");

  const isLoading = status === "loading";

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/register-otp", { replace: true });
      dispatch(resetRegisterState());
    }
  }, [status, navigate, dispatch]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload: RegisterRequest = {
      firstname,
      lastname,
      email,
      phone,
      password,
      confirm_password: confirmPassword,
      gender,
    };
    const errors = validateRegisterForm(payload);
    if (hasValidationErrors(errors)) {
      dispatch(setRegisterFieldErrors(errors));
      return;
    }
    void dispatch(registerUser(payload));
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[var(--gray-light)] via-white to-[var(--gray-light)]">
      <div className="mx-auto w-full max-w-lg">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 sm:p-10 shadow-[var(--shadow-xl)]">
          <h1 className="text-center text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
            Register
          </h1>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-6"
            noValidate
          >
            <FormTextField
              id="register-firstname"
              name="firstname"
              label="First Name"
              placeholder="Enter your first name"
              autoComplete="given-name"
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
                dispatch(clearRegisterFieldError("firstname"));
              }}
              disabled={isLoading}
              error={fieldErrors.firstname}
            />
            <FormTextField
              id="register-lastname"
              name="lastname"
              label="Last Name"
              placeholder="Enter your last name"
              autoComplete="family-name"
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value);
                dispatch(clearRegisterFieldError("lastname"));
              }}
              disabled={isLoading}
              error={fieldErrors.lastname}
            />
            <FormTextField
              id="register-email"
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                dispatch(clearRegisterFieldError("email"));
              }}
              disabled={isLoading}
              error={fieldErrors.email}
            />
            <FormTextField
              id="register-phone"
              name="phone"
              label="Phone"
              type="tel"
              placeholder="Enter your phone number"
              autoComplete="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                dispatch(clearRegisterFieldError("phone"));
              }}
              disabled={isLoading}
              error={fieldErrors.phone}
            />
            <FormTextField
              id="register-password"
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                dispatch(clearRegisterFieldError("password"));
                dispatch(clearRegisterFieldError("confirm_password"));
              }}
              disabled={isLoading}
              error={fieldErrors.password}
            />
            <FormTextField
              id="register-confirm-password"
              name="confirm_password"
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                dispatch(clearRegisterFieldError("confirm_password"));
              }}
              disabled={isLoading}
              error={fieldErrors.confirm_password}
            />

            <fieldset className="space-y-2">
              <legend className="mb-1 block text-sm font-medium text-[var(--gray-dark)]">
                Gender
              </legend>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6">
                {genderOptions.map((opt) => (
                  <label
                    key={opt.value}
                    className="flex cursor-pointer items-center gap-2.5 text-base text-[var(--foreground)]"
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={opt.value}
                      checked={gender === opt.value}
                      onChange={() => {
                        setGender(opt.value);
                        dispatch(clearRegisterFieldError("gender"));
                      }}
                      disabled={isLoading}
                      className={cn(
                        "h-4 w-4 shrink-0 border-[var(--border)] text-[var(--primary)]",
                        "focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/25",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                      )}
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
              {fieldErrors.gender ? (
                <p
                  className="text-sm font-medium text-[var(--destructive)]"
                  role="alert"
                >
                  {fieldErrors.gender}
                </p>
              ) : null}
            </fieldset>

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
