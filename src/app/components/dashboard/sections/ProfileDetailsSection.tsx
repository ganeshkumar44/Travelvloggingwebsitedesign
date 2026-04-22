import React, { useState } from "react";
import { Button } from "../../Button";
import {
  DashboardTextareaField,
  DashboardTextField,
  DashboardSelectField,
} from "../DashboardFormField";
import { cn } from "../../ui/utils";

type SocialKey = "facebook" | "twitter" | "linkedin" | "instagram" | "youtube";

const SOCIAL_ERROR: Record<SocialKey, string> = {
  facebook: "Please enter a valid Facebook URL",
  twitter: "Please enter a valid Twitter URL",
  linkedin: "Please enter a valid LinkedIn URL",
  instagram: "Please enter a valid Instagram URL",
  youtube: "Please enter a valid YouTube URL",
};

const emptySocialErrors: Record<SocialKey, string> = {
  facebook: "",
  twitter: "",
  linkedin: "",
  instagram: "",
  youtube: "",
};

function parseUserUrl(raw: string): URL | null {
  const t = raw.trim();
  if (!t) return null;
  let url: URL;
  try {
    url = /^https?:\/\//i.test(t) ? new URL(t) : new URL(`https://${t}`);
  } catch {
    return null;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return null;
  return url;
}

function hostMatchesBase(hostname: string, base: string): boolean {
  const h = hostname.toLowerCase();
  const b = base.toLowerCase();
  return h === b || h.endsWith(`.${b}`);
}

function isFacebookHost(hostname: string): boolean {
  return hostMatchesBase(hostname, "facebook.com") || hostMatchesBase(hostname, "fb.com");
}

function isTwitterHost(hostname: string): boolean {
  return hostMatchesBase(hostname, "twitter.com") || hostMatchesBase(hostname, "x.com");
}

function isLinkedInHost(hostname: string): boolean {
  return hostMatchesBase(hostname, "linkedin.com");
}

function isInstagramHost(hostname: string): boolean {
  return hostMatchesBase(hostname, "instagram.com");
}

function isYouTubeHost(hostname: string): boolean {
  return (
    hostMatchesBase(hostname, "youtube.com") ||
    hostMatchesBase(hostname, "youtu.be")
  );
}

function isValidPlatformUrl(key: SocialKey, raw: string): boolean {
  const u = parseUserUrl(raw);
  if (!u) return false;
  const h = u.hostname;
  switch (key) {
    case "facebook":
      return isFacebookHost(h);
    case "twitter":
      return isTwitterHost(h);
    case "linkedin":
      return isLinkedInHost(h);
    case "instagram":
      return isInstagramHost(h);
    case "youtube":
      return isYouTubeHost(h);
    default:
      return false;
  }
}

function validateSocialLinks(
  social: Record<SocialKey, string>,
): Record<SocialKey, string> {
  const next: Record<SocialKey, string> = { ...emptySocialErrors };
  (Object.keys(social) as SocialKey[]).forEach((k) => {
    const v = social[k].trim();
    if (!v) return;
    if (!isValidPlatformUrl(k, v)) {
      next[k] = SOCIAL_ERROR[k];
    }
  });
  return next;
}

const initialSocial: Record<SocialKey, string> = {
  facebook: "",
  twitter: "",
  linkedin: "",
  instagram: "",
  youtube: "",
};

export function ProfileDetailsSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [aboutAuthor, setAboutAuthor] = useState("");
  const [profession, setProfession] = useState("");
  const [social, setSocial] = useState<Record<SocialKey, string>>(initialSocial);
  const [socialErrors, setSocialErrors] = useState<Record<SocialKey, string>>(
    emptySocialErrors,
  );

  const fieldsLocked = !isEditing;

  const setSocialField = (key: SocialKey, value: string) => {
    setSocial((prev) => ({ ...prev, [key]: value }));
    if (socialErrors[key]) {
      setSocialErrors((e) => ({ ...e, [key]: "" }));
    }
  };

  const handleEdit = () => {
    setSocialErrors({ ...emptySocialErrors });
    setIsEditing(true);
  };

  const handleUpdate = () => {
    const nextErrors = validateSocialLinks(social);
    if (Object.values(nextErrors).some(Boolean)) {
      setSocialErrors(nextErrors);
      return;
    }
    setSocialErrors({ ...emptySocialErrors });
    setIsEditing(false);
  };

  const socialField = (key: SocialKey, label: string) => {
    const err = socialErrors[key];
    return (
      <div key={key} className="w-full space-y-2">
        <DashboardTextField
          id={`dash-profile-social-${key}`}
          label={label}
          type="url"
          value={social[key]}
          onChange={(e) => setSocialField(key, e.target.value)}
          disabled={fieldsLocked}
          inputMode="url"
          autoComplete="url"
          placeholder="https://"
          className={cn(err && "border-red-500 focus:border-red-500 focus:ring-red-500/25")}
          aria-invalid={!!err}
        />
        {err ? (
          <p className="text-sm text-red-600" role="alert">
            {err}
          </p>
        ) : null}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
            Profile Details
          </h2>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            View and update your profile information.
          </p>
        </div>
        <div className="flex shrink-0 justify-end sm:pt-0">
          <Button
            type="button"
            variant="outline"
            disabled={isEditing}
            onClick={handleEdit}
          >
            Edit
          </Button>
        </div>
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
          <div className="w-full sm:col-span-2">
            <DashboardTextField
              id="dash-profile-username"
              label="Username (optional)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={fieldsLocked}
              autoComplete="username"
            />
          </div>
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

        <div className="mt-8 border-t border-[var(--border)] pt-8">
          <h3 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
            Social media links
          </h3>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Add links to your public profiles. Each field is optional. URLs must match
            the platform for that field (for example, only use Instagram URLs in the
            Instagram field).
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {socialField("facebook", "Facebook")}
            {socialField("twitter", "Twitter")}
            {socialField("linkedin", "LinkedIn")}
            {socialField("instagram", "Instagram")}
            {socialField("youtube", "YouTube")}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            type="button"
            disabled={!isEditing}
            onClick={handleUpdate}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}
