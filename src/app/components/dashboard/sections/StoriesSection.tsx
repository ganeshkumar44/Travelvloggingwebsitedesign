import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "../../Button";
import { cn } from "../../ui/utils";
import {
  DashboardTextareaField,
  DashboardTextField,
} from "../DashboardFormField";

const MAX_TAGS = 5;

/** Match `DashboardTextField` input styles (no per-field label for tag rows). */
const tagInputClassName = cn(
  "w-full rounded-lg border border-[var(--border)] bg-[var(--input-background)] px-4 py-3 text-base text-[var(--foreground)]",
  "placeholder:text-[var(--muted-foreground)]",
  "shadow-sm transition-[box-shadow,border-color]",
  "focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/25",
  "disabled:cursor-not-allowed disabled:opacity-60",
);

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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileLabel, setFileLabel] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState<string[]>([""]);

  const canAddTag = tags.length < MAX_TAGS;

  const setTagAt = (index: number, value: string) => {
    setTags((prev) =>
      prev.map((t, i) => (i === index ? value : t)),
    );
  };

  const addTagField = () => {
    if (!canAddTag) return;
    setTags((prev) => [...prev, ""]);
  };

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

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-[var(--shadow-sm)]">
        <div className="grid max-w-full gap-6">
          <div className="w-full space-y-2">
            <span className="block text-sm font-medium text-[var(--gray-dark)]">
              Upload Image
            </span>
            <label
              htmlFor="dash-stories-image"
              className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--border)] bg-[var(--input-background)] px-4 py-10 text-center transition-colors hover:border-[var(--primary)]/50 hover:bg-[var(--muted)]/40"
            >
              <span className="text-sm font-medium text-[var(--foreground)]">
                {fileLabel ?? "Choose a file"}
              </span>
              <span className="mt-1 text-xs text-[var(--muted-foreground)]">
                PNG, JPG, or WebP
              </span>
              <input
                id="dash-stories-image"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  setFileLabel(f ? f.name : null);
                }}
              />
            </label>
          </div>

          <OrSeparator />

          <DashboardTextField
            id="dash-stories-image-url"
            label="Upload Image URL"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            autoComplete="off"
            placeholder="https://"
          />

          <DashboardTextField
            id="dash-stories-location"
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            autoComplete="off"
          />

          <DashboardTextField
            id="dash-stories-title"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <DashboardTextareaField
            id="dash-stories-description"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
          />

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
                  className={tagInputClassName}
                  placeholder="Enter tag"
                  autoComplete="off"
                />
              ))}
            </div>
            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addTagField}
                disabled={!canAddTag}
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
          <Button type="button">Submit New Vlog</Button>
        </div>
      </div>
    </div>
  );
}
