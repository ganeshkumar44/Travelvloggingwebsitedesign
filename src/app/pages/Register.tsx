import React, { FormEvent, useState } from "react";
import { FormTextField } from "../components/FormTextField";
import { Button } from "../components/Button";
import { cn } from "../components/ui/utils";

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
] as const;

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
              onChange={(e) => setFirstname(e.target.value)}
            />
            <FormTextField
              id="register-lastname"
              name="lastname"
              label="Last Name"
              placeholder="Enter your last name"
              autoComplete="family-name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <FormTextField
              id="register-email"
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormTextField
              id="register-phone"
              name="phone"
              label="Phone"
              type="tel"
              placeholder="Enter your phone number"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <FormTextField
              id="register-password"
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormTextField
              id="register-confirm-password"
              name="confirm_password"
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <fieldset className="space-y-3">
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
                      onChange={() => setGender(opt.value)}
                      className={cn(
                        "h-4 w-4 shrink-0 border-[var(--border)] text-[var(--primary)]",
                        "focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/25",
                      )}
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

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
