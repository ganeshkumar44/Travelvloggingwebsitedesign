import React, { useState } from "react";
import { Button } from "../../Button";
import {
  DashboardTextareaField,
  DashboardTextField,
} from "../DashboardFormField";

export function StoriesSection() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileLabel, setFileLabel] = useState<string | null>(null);

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
        <div className="grid max-w-xl gap-6">
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
        </div>

        <div className="mt-8">
          <Button type="button">Submit New Vlog</Button>
        </div>
      </div>
    </div>
  );
}
