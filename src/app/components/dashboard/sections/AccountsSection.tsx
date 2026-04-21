import React, { useState } from "react";
import { Button } from "../../Button";
import { DashboardTextField } from "../DashboardFormField";

export function AccountsSection() {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
          Accounts
        </h2>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Manage your sign-in email and password.
        </p>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-[var(--shadow-sm)]">
        <div className="grid max-w-xl gap-6">
          <DashboardTextField
            id="dash-accounts-email"
            label="Email ID"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <DashboardTextField
            id="dash-accounts-old-password"
            label="Old Password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            autoComplete="current-password"
          />
          <DashboardTextField
            id="dash-accounts-new-password"
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
          />
          <DashboardTextField
            id="dash-accounts-confirm-password"
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>

        <div className="mt-8">
          <Button type="button">Update</Button>
        </div>
      </div>
    </div>
  );
}
