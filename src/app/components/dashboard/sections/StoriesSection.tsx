import React, { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "../../Button";
import { cn } from "../../ui/utils";
import {
  DashboardTextareaField,
  DashboardTextField,
} from "../DashboardFormField";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  clearStoryUploadError,
  resetStoryUploadState,
  uploadStory,
} from "../../../../features/storyUpload/storyUploadSlice";

const MAX_TAGS = 5;

const IMAGE_REQUIRED_MSG =
  "Image is required (upload file or provide URL)";

/** Match `DashboardTextField` input styles (no per-field label for tag rows). */
const tagInputClassName = cn(
  "w-full rounded-lg border border-[var(--border)] bg-[var(--input-background)] px-4 py-3 text-base text-[var(--foreground)]",
  "placeholder:text-[var(--muted-foreground)]",
  "shadow-sm transition-[box-shadow,border-color]",
  "focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/25",
  "disabled:cursor-not-allowed disabled:opacity-60",
);

type FieldErrors = {
  image?: string;
  title?: string;
  description?: string;
  tags?: string;
};

function OrSeparator() {
  return (
    <div
      className="my-1 flex w-full items-center gap-3 py-1"
      role="separator"
      aria-orientation="horizontal"
    >
      <div className="h-px min-w-0 flex-1 bg-[var(--border)]" />
      <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
        OR
      </span>
      <div className="h-px min-w-0 flex-1 bg-[var(--border)]" />
    </div>
  );
}

export function StoriesSection() {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((s) => s.auth.accessToken);
  const { status: uploadStatus, error: uploadError } = useAppSelector(
    (s) => s.storyUpload,
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileLabel, setFileLabel] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState<string[]>([""]);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const canAddTag = tags.length < MAX_TAGS;
  const isSubmitting = uploadStatus === "loading";

  const setTagAt = (index: number, value: string) => {
    setTags((prev) => prev.map((t, i) => (i === index ? value : t)));
    if (fieldErrors.tags) {
      setFieldErrors((e) => ({ ...e, tags: undefined }));
    }
    if (successMessage) setSuccessMessage(null);
  };

  const addTagField = () => {
    if (!canAddTag) return;
    setTags((prev) => [...prev, ""]);
  };

  const clearImageError = () => {
    if (fieldErrors.image) {
      setFieldErrors((e) => ({ ...e, image: undefined }));
    }
  };

  const validate = (): boolean => {
    const e: FieldErrors = {};
    if (!file && !imageUrl.trim()) {
      e.image = IMAGE_REQUIRED_MSG;
    }
    if (!title.trim()) {
      e.title = "Title is required";
    }
    if (!description.trim()) {
      e.description = "Description is required";
    }
    if (tags.length > MAX_TAGS) {
      e.tags = "Maximum 5 tags allowed";
    }
    setFieldErrors(e);
    return Object.keys(e).length === 0;
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setFile(null);
    setFileLabel(null);
    setImageUrl("");
    setLocation("");
    setTags([""]);
    setFieldErrors({});
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setSuccessMessage(null);
    dispatch(clearStoryUploadError());
    if (!validate() || !accessToken) return;

    const result = await dispatch(
      uploadStory({
        accessToken,
        title: title.trim(),
        description: description.trim(),
        location: location.trim(),
        file,
        fileUrl: imageUrl,
        tags,
      }),
    );

    if (uploadStory.fulfilled.match(result)) {
      setSuccessMessage("Story created successfully");
      resetForm();
      dispatch(resetStoryUploadState());
    }
  };

  const fileDropClass = fieldErrors.image
    ? "border-red-500/80 hover:border-red-500/80 bg-red-50/20 dark:bg-red-950/10"
    : "border-[var(--border)]";

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
          Stories
        </h2>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Create a new vlog entry for your audience.
        </p>
      </div>

      {uploadError ? (
        <p className="text-sm text-red-600" role="alert">
          {uploadError}
        </p>
      ) : null}

      {successMessage ? (
        <p
          className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-900/40 dark:bg-green-950/40 dark:text-green-200"
          role="status"
        >
          {successMessage}
        </p>
      ) : null}

      <form
        className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-[var(--shadow-sm)]"
        onSubmit={onSubmit}
        noValidate
      >
        <div className="grid max-w-full gap-6">
          <div className="w-full space-y-2">
            <span className="block text-sm font-medium text-[var(--gray-dark)]">
              Upload Image
            </span>
            <label
              htmlFor="dash-stories-image"
              className={cn(
                "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed bg-[var(--input-background)] px-4 py-10 text-center transition-colors hover:border-[var(--primary)]/50 hover:bg-[var(--muted)]/40",
                fileDropClass,
              )}
            >
              <span className="text-sm font-medium text-[var(--foreground)]">
                {fileLabel ?? "Choose a file"}
              </span>
              <span className="mt-1 text-xs text-[var(--muted-foreground)]">
                PNG, JPG, or WebP
              </span>
              <input
                id="dash-stories-image"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="sr-only"
                disabled={isSubmitting}
                onChange={(e) => {
                  const f = e.target.files?.[0] ?? null;
                  setFile(f);
                  setFileLabel(f ? f.name : null);
                  clearImageError();
                  if (successMessage) setSuccessMessage(null);
                  dispatch(clearStoryUploadError());
                }}
              />
            </label>
          </div>

          <OrSeparator />

          <div className="w-full space-y-2">
            <DashboardTextField
              id="dash-stories-image-url"
              label="Upload Image URL"
              type="url"
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
                clearImageError();
                if (successMessage) setSuccessMessage(null);
                dispatch(clearStoryUploadError());
              }}
              autoComplete="off"
              placeholder="https://"
              disabled={isSubmitting}
              className={
                fieldErrors.image
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/25"
                  : undefined
              }
            />
            {fieldErrors.image ? (
              <p className="text-sm text-red-600" role="alert">
                {fieldErrors.image}
              </p>
            ) : null}
          </div>

          <DashboardTextField
            id="dash-stories-location"
            label="Location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              if (successMessage) setSuccessMessage(null);
              dispatch(clearStoryUploadError());
            }}
            autoComplete="off"
            disabled={isSubmitting}
          />

          <div className="w-full space-y-2">
            <DashboardTextField
              id="dash-stories-title"
              label="Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (fieldErrors.title) {
                  setFieldErrors((er) => ({ ...er, title: undefined }));
                }
                if (successMessage) setSuccessMessage(null);
                dispatch(clearStoryUploadError());
              }}
              disabled={isSubmitting}
              className={
                fieldErrors.title
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/25"
                  : undefined
              }
            />
            {fieldErrors.title ? (
              <p className="text-sm text-red-600" role="alert">
                {fieldErrors.title}
              </p>
            ) : null}
          </div>

          <div className="w-full space-y-2">
            <DashboardTextareaField
              id="dash-stories-description"
              label="Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (fieldErrors.description) {
                  setFieldErrors((er) => ({ ...er, description: undefined }));
                }
                if (successMessage) setSuccessMessage(null);
                dispatch(clearStoryUploadError());
              }}
              rows={5}
              disabled={isSubmitting}
              className={
                fieldErrors.description
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/25"
                  : undefined
              }
            />
            {fieldErrors.description ? (
              <p className="text-sm text-red-600" role="alert">
                {fieldErrors.description}
              </p>
            ) : null}
          </div>

          <div className="w-full space-y-3">
            <span
              className="block text-sm font-medium text-[var(--gray-dark)]"
              id="dash-stories-tags-heading"
            >
              Tags
            </span>
            <div
              className="flex flex-col gap-3"
              role="group"
              aria-labelledby="dash-stories-tags-heading"
            >
              {tags.map((value, index) => (
                <input
                  key={index}
                  id={`dash-stories-tag-${index}`}
                  type="text"
                  value={value}
                  onChange={(e) => setTagAt(index, e.target.value)}
                  className={cn(
                    tagInputClassName,
                    fieldErrors.tags &&
                      "border-red-500 focus:border-red-500 focus:ring-red-500/25",
                  )}
                  placeholder="Enter tag"
                  autoComplete="off"
                  disabled={isSubmitting}
                />
              ))}
            </div>
            {fieldErrors.tags ? (
              <p className="text-sm text-red-600" role="alert">
                {fieldErrors.tags}
              </p>
            ) : null}
            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addTagField}
                disabled={!canAddTag || isSubmitting}
              >
                <Plus
                  className="h-4 w-4 shrink-0"
                  strokeWidth={2}
                  aria-hidden
                />
                Add more tag
              </Button>
              {!canAddTag ? (
                <p className="text-xs text-[var(--muted-foreground)]">
                  Maximum 5 tags
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting…" : "Submit New Vlog"}
          </Button>
        </div>
      </form>
    </div>
  );
}
