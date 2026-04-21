import React, { useState } from "react";
import { Button } from "../../Button";
import {
  DashboardSelectField,
  DashboardTextareaField,
  DashboardTextField,
} from "../DashboardFormField";

export function ProfileDetailsSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [aboutAuthor, setAboutAuthor] = useState("");
  const [profession, setProfession] = useState("");

  const fieldsLocked = !isEditing;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
          Profile Details
        </h2>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          View and update your profile information.
        </p>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-[var(--shadow-sm)]">
        <div className="grid gap-6 sm:grid-cols-2">
          <DashboardTextField
            id="dash-profile-firstname"
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={fieldsLocked}
            autoComplete="given-name"
          />
          <DashboardTextField
            id="dash-profile-lastname"
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={fieldsLocked}
            autoComplete="family-name"
          />
          <DashboardTextField
            id="dash-profile-phone"
            label="Phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={fieldsLocked}
            autoComplete="tel"
          />
          <DashboardSelectField
            id="dash-profile-gender"
            label="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            disabled={fieldsLocked}
          >
            <option value="">Select</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="non-binary">Non-binary</option>
            <option value="prefer-not">Prefer not to say</option>
          </DashboardSelectField>
        </div>

        <div className="mt-6 grid gap-6">
          <DashboardTextareaField
            id="dash-profile-about"
            label="About Author"
            value={aboutAuthor}
            onChange={(e) => setAboutAuthor(e.target.value)}
            disabled={fieldsLocked}
            rows={5}
          />
          <DashboardTextField
            id="dash-profile-profession"
            label="Profession"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            disabled={fieldsLocked}
          />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={isEditing}
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
          <Button
            type="button"
            disabled={!isEditing}
            onClick={() => setIsEditing(false)}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}
