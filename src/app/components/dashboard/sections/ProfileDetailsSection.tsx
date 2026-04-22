import React, { useCallback, useEffect, useState } from "react";
import { Button } from "../../Button";
import {
  DashboardTextareaField,
  DashboardTextField,
  DashboardSelectField,
} from "../DashboardFormField";
import { cn } from "../../ui/utils";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { fetchUserProfile } from "../../../../features/auth/authSlice";
import {
  clearUpdateError,
  resetUpdateState,
  updateProfile,
} from "../../../../features/profile/profileSlice";
import type { UpdateProfileRequest } from "../../../../features/profile/profileTypes";
import type { ProfileResponse } from "../../../../features/auth/authTypes";

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

const GENDER_OPTIONS = [
  "Male",
  "Female",
  "Non-binary",
  "Prefer not to say",
] as const;

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

function str(v: string | null | undefined): string {
  return v == null ? "" : String(v);
}

function profileToForm(p: ProfileResponse) {
  return {
    firstname: str(p.firstname),
    lastname: str(p.lastname),
    phone: str(p.phone),
    gender: normalizeGenderValue(str(p.gender)),
    about_author: str(p.about_author),
    profession: str(p.profession),
    username: str(p.username),
    social: {
      facebook: str(p.facebook),
      twitter: str(p.twitter),
      linkedin: str(p.linkedin),
      instagram: str(p.instagram),
      youtube: str(p.youtube),
    } as Record<SocialKey, string>,
  };
}

function normalizeGenderValue(g: string): string {
  const t = g.trim();
  if (!t) return "";
  const found = GENDER_OPTIONS.find(
    (o) => o.toLowerCase() === t.toLowerCase(),
  );
  return found ?? t;
}

function formToUpdateBody(
  f: ReturnType<typeof profileToForm>,
): UpdateProfileRequest {
  return {
    firstname: f.firstname.trim(),
    lastname: f.lastname.trim(),
    phone: f.phone.trim(),
    gender: f.gender.trim(),
    about_author: f.about_author.trim(),
    profession: f.profession.trim(),
    username: f.username.trim(),
    facebook: f.social.facebook.trim(),
    twitter: f.social.twitter.trim(),
    linkedin: f.social.linkedin.trim(),
    youtube: f.social.youtube.trim(),
    instagram: f.social.instagram.trim(),
  };
}

function ViewField({ label, value, isLink }: { label: string; value: string; isLink?: boolean }) {
  const empty = !value.trim();
  const show = empty ? "—" : value;
  return (
    <div className="w-full space-y-2">
      <p className="text-sm font-medium text-[var(--gray-dark)]">{label}</p>
      {isLink && !empty ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="block break-all text-base text-[var(--primary)] underline"
        >
          {value}
        </a>
      ) : (
        <p className="whitespace-pre-wrap text-base text-[var(--foreground)]">{show}</p>
      )}
    </div>
  );
}

export function ProfileDetailsSection() {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((s) => s.auth.accessToken);
  const serverProfile = useAppSelector((s) => s.auth.serverProfile);
  const profileFetchStatus = useAppSelector((s) => s.auth.profileFetchStatus);
  const profileFetchError = useAppSelector((s) => s.auth.profileFetchError);
  const updateStatus = useAppSelector((s) => s.profile.status);
  const updateError = useAppSelector((s) => s.profile.error);

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<ReturnType<typeof profileToForm> | null>(
    null,
  );
  const [socialErrors, setSocialErrors] = useState<Record<SocialKey, string>>(
    emptySocialErrors,
  );
  const [fieldErrors, setFieldErrors] = useState<{
    firstname?: string;
    lastname?: string;
    gender?: string;
  }>({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  const loadProfile = useCallback(() => {
    if (accessToken) {
      void dispatch(fetchUserProfile(accessToken));
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  useEffect(() => {
    if (isEditing) {
      dispatch(clearUpdateError());
    }
  }, [isEditing, dispatch]);

  const setSocialField = (key: SocialKey, value: string) => {
    if (!form) return;
    setForm((prev) =>
      prev ? { ...prev, social: { ...prev.social, [key]: value } } : prev,
    );
    if (socialErrors[key]) {
      setSocialErrors((e) => ({ ...e, [key]: "" }));
    }
  };

  const startEdit = () => {
    if (!serverProfile) return;
    setForm(profileToForm(serverProfile));
    setFieldErrors({});
    setSocialErrors({ ...emptySocialErrors });
    setSaveSuccess(false);
    setIsEditing(true);
    dispatch(clearUpdateError());
  };

  const cancelEdit = () => {
    if (serverProfile) {
      setForm(profileToForm(serverProfile));
    } else {
      setForm(null);
    }
    setFieldErrors({});
    setSocialErrors({ ...emptySocialErrors });
    setIsEditing(false);
    dispatch(clearUpdateError());
  };

  const saveEdit = async () => {
    if (!form || !accessToken) return;
    setSaveSuccess(false);

    const fe: { firstname?: string; lastname?: string; gender?: string } = {};
    if (!form.firstname.trim()) fe.firstname = "First name is required";
    if (!form.lastname.trim()) fe.lastname = "Last name is required";
    if (!form.gender.trim()) fe.gender = "Gender is required";
    if (Object.keys(fe).length) {
      setFieldErrors(fe);
      return;
    }
    setFieldErrors({});

    const sErr = validateSocialLinks(form.social);
    if (Object.values(sErr).some(Boolean)) {
      setSocialErrors(sErr);
      return;
    }
    setSocialErrors({ ...emptySocialErrors });

    const body = formToUpdateBody(form);
    const result = await dispatch(
      updateProfile({ accessToken, body }),
    );
    if (updateProfile.fulfilled.match(result)) {
      await dispatch(fetchUserProfile(accessToken));
      dispatch(resetUpdateState());
      setIsEditing(false);
      setForm(null);
      setSaveSuccess(true);
    }
  };

  const socialFieldEdit = (key: SocialKey, label: string) => {
    if (!form) return null;
    const err = socialErrors[key];
    return (
      <div key={key} className="w-full space-y-2">
        <DashboardTextField
          id={`dash-profile-social-${key}`}
          label={label}
          type="url"
          value={form.social[key]}
          onChange={(e) => setSocialField(key, e.target.value)}
          inputMode="url"
          autoComplete="url"
          placeholder="https://"
          className={cn(
            err && "border-red-500 focus:border-red-500 focus:ring-red-500/25",
          )}
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

  if (!accessToken) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
          Profile Details
        </h2>
        <p className="text-sm text-[var(--muted-foreground)]">You are not signed in.</p>
      </div>
    );
  }

  if (profileFetchStatus === "loading" && !serverProfile) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
          Profile Details
        </h2>
        <p className="text-sm text-[var(--muted-foreground)]">Loading profile…</p>
      </div>
    );
  }

  if (profileFetchStatus === "failed" && !serverProfile) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
          Profile Details
        </h2>
        <p className="text-sm text-red-600" role="alert">
          {profileFetchError ?? "Could not load profile."}
        </p>
        <Button type="button" onClick={loadProfile}>
          Retry
        </Button>
      </div>
    );
  }

  if (!serverProfile) {
    return null;
  }

  const f = isEditing && form ? form : profileToForm(serverProfile);
  const saving = updateStatus === "loading";

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
          {!isEditing ? (
            <Button
              type="button"
              variant="outline"
              onClick={startEdit}
            >
              Edit
            </Button>
          ) : null}
        </div>
      </div>

      {saveSuccess && !isEditing ? (
        <p
          className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-900/40 dark:bg-green-950/40 dark:text-green-200"
          role="status"
        >
          Profile updated successfully.
        </p>
      ) : null}

      {updateError && isEditing ? (
        <p className="text-sm text-red-600" role="alert">
          {updateError}
        </p>
      ) : null}

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-[var(--shadow-sm)]">
        {isEditing && form ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="w-full space-y-2">
                <DashboardTextField
                  id="dash-profile-firstname"
                  label="First Name"
                  value={form.firstname}
                  onChange={(e) =>
                    setForm((p) => (p ? { ...p, firstname: e.target.value } : p))
                  }
                  autoComplete="given-name"
                  className={cn(
                    fieldErrors.firstname &&
                      "border-red-500 focus:border-red-500 focus:ring-red-500/25",
                  )}
                  aria-invalid={!!fieldErrors.firstname}
                />
                {fieldErrors.firstname ? (
                  <p className="text-sm text-red-600" role="alert">
                    {fieldErrors.firstname}
                  </p>
                ) : null}
              </div>
              <div className="w-full space-y-2">
                <DashboardTextField
                  id="dash-profile-lastname"
                  label="Last Name"
                  value={form.lastname}
                  onChange={(e) =>
                    setForm((p) => (p ? { ...p, lastname: e.target.value } : p))
                  }
                  autoComplete="family-name"
                  className={cn(
                    fieldErrors.lastname &&
                      "border-red-500 focus:border-red-500 focus:ring-red-500/25",
                  )}
                  aria-invalid={!!fieldErrors.lastname}
                />
                {fieldErrors.lastname ? (
                  <p className="text-sm text-red-600" role="alert">
                    {fieldErrors.lastname}
                  </p>
                ) : null}
              </div>
              <div className="w-full sm:col-span-2">
                <DashboardTextField
                  id="dash-profile-username"
                  label="Username (optional)"
                  value={form.username}
                  onChange={(e) =>
                    setForm((p) => (p ? { ...p, username: e.target.value } : p))
                  }
                  autoComplete="username"
                />
              </div>
              <DashboardTextField
                id="dash-profile-phone"
                label="Phone (optional)"
                type="tel"
                value={form.phone}
                onChange={(e) =>
                  setForm((p) => (p ? { ...p, phone: e.target.value } : p))
                }
                autoComplete="tel"
              />
              <div className="w-full space-y-2">
                <DashboardSelectField
                  id="dash-profile-gender"
                  label="Gender"
                  value={form.gender}
                  onChange={(e) =>
                    setForm((p) => (p ? { ...p, gender: e.target.value } : p))
                  }
                  className={cn(
                    fieldErrors.gender &&
                      "border-red-500 focus:border-red-500 focus:ring-red-500/25",
                  )}
                >
                  <option value="">Select</option>
                  {GENDER_OPTIONS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                  {form.gender &&
                  !GENDER_OPTIONS.includes(
                    form.gender as (typeof GENDER_OPTIONS)[number],
                  ) ? (
                    <option value={form.gender}>{form.gender}</option>
                  ) : null}
                </DashboardSelectField>
                {fieldErrors.gender ? (
                  <p className="text-sm text-red-600" role="alert">
                    {fieldErrors.gender}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="mt-6 grid gap-6">
              <DashboardTextareaField
                id="dash-profile-about"
                label="About Author (optional)"
                value={form.about_author}
                onChange={(e) =>
                  setForm((p) =>
                    p ? { ...p, about_author: e.target.value } : p,
                  )
                }
                rows={5}
              />
              <DashboardTextField
                id="dash-profile-profession"
                label="Profession (optional)"
                value={form.profession}
                onChange={(e) =>
                  setForm((p) => (p ? { ...p, profession: e.target.value } : p))
                }
              />
            </div>
            <div className="mt-8 border-t border-[var(--border)] pt-8">
              <h3 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
                Social media links
              </h3>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                Optional. URLs must match the platform for each field.
              </p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {socialFieldEdit("facebook", "Facebook")}
                {socialFieldEdit("twitter", "Twitter")}
                {socialFieldEdit("linkedin", "LinkedIn")}
                {socialFieldEdit("instagram", "Instagram")}
                {socialFieldEdit("youtube", "YouTube")}
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                type="button"
                onClick={saveEdit}
                disabled={saving}
              >
                {saving ? "Saving…" : "Save"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={cancelEdit}
                disabled={saving}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            {serverProfile.email ? (
              <ViewField label="Email" value={serverProfile.email} isLink={false} />
            ) : null}
            {serverProfile.email ? (
              <div className="mb-6 mt-4 h-px w-full max-w-xl bg-[var(--border)]" />
            ) : null}
            <div
              className={cn(
                "grid gap-6 sm:grid-cols-2",
                !serverProfile.email && "pt-0",
              )}
            >
              <ViewField label="First Name" value={str(f.firstname)} />
              <ViewField label="Last Name" value={str(f.lastname)} />
            </div>
            <div className="mt-4 max-w-xl">
              <ViewField
                label="Username"
                value={str(serverProfile.username)}
              />
            </div>
            <div className="mt-4 grid gap-6 sm:grid-cols-2 sm:pt-2">
              <ViewField label="Phone" value={str(serverProfile.phone)} />
              <ViewField
                label="Gender"
                value={str(serverProfile.gender) || "—"}
              />
            </div>
            <div className="mt-6 max-w-3xl space-y-4">
              <ViewField
                label="About Author"
                value={str(serverProfile.about_author)}
              />
            </div>
            <div className="mt-4 max-w-xl">
              <ViewField
                label="Profession"
                value={str(serverProfile.profession)}
              />
            </div>
            <div className="mt-8 border-t border-[var(--border)] pt-8">
              <h3 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
                Social media links
              </h3>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                <ViewField
                  label="Facebook"
                  value={str(serverProfile.facebook)}
                  isLink={Boolean(serverProfile.facebook?.trim())}
                />
                <ViewField
                  label="Twitter"
                  value={str(serverProfile.twitter)}
                  isLink={Boolean(serverProfile.twitter?.trim())}
                />
                <ViewField
                  label="LinkedIn"
                  value={str(serverProfile.linkedin)}
                  isLink={Boolean(serverProfile.linkedin?.trim())}
                />
                <ViewField
                  label="Instagram"
                  value={str(serverProfile.instagram)}
                  isLink={Boolean(serverProfile.instagram?.trim())}
                />
                <ViewField
                  label="YouTube"
                  value={str(serverProfile.youtube)}
                  isLink={Boolean(serverProfile.youtube?.trim())}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
