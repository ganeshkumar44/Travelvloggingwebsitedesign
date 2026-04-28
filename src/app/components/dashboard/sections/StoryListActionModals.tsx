import React, { useEffect, useRef, useState } from "react";
import { MoreVertical, Plus } from "lucide-react";
import { Button } from "../../Button";
import { cn } from "../../ui/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
  DashboardTextareaField,
  DashboardTextField,
} from "../DashboardFormField";
import type { AllStoriesItem } from "../../../../features/allStories/allStoriesTypes";

const STORY_IMAGE_BASE = "http://127.0.0.1:8000";
const MAX_TAGS = 5;
const TITLE_MAX_LEN = 200;

const tagInputClassName = cn(
  "w-full rounded-lg border border-[var(--border)] bg-[var(--input-background)] px-4 py-3 text-base text-[var(--foreground)]",
  "placeholder:text-[var(--muted-foreground)]",
  "shadow-sm transition-[box-shadow,border-color]",
  "focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/25",
  "disabled:cursor-not-allowed disabled:opacity-60",
);

function orSeparator() {
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

function getStoryImageUrlForEdit(image: string): string {
  const trimmed = (image || "").trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `${STORY_IMAGE_BASE}${trimmed.startsWith("/") ? "" : "/"}${trimmed}`;
}

type StoryListModal = "edit" | "delete" | "accept" | "reject" | null;

export function StoryTableRowActions({ story }: { story: AllStoriesItem }) {
  const [activeModal, setActiveModal] = useState<StoryListModal>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  const [editFile, setEditFile] = useState<File | null>(null);
  const [editFileLabel, setEditFileLabel] = useState<string | null>(null);
  const [editImageUrl, setEditImageUrl] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editTags, setEditTags] = useState<string[]>([""]);

  const canAddTag = editTags.length < MAX_TAGS;
  const fileDropClassName =
    "border-[var(--border)] hover:border-[var(--primary)]/50";

  useEffect(() => {
    if (activeModal !== "edit") return;
    setEditFile(null);
    setEditFileLabel(null);
    setEditImageUrl(getStoryImageUrlForEdit(story.image) || "");
    setEditLocation(story.location ?? "");
    setEditTitle(story.title || "");
    setEditDescription(story.description || "");
    setEditTags(
      story.tags && story.tags.length
        ? [...story.tags]
        : [""],
    );
  }, [activeModal, story]);

  const setEditTagAt = (index: number, value: string) => {
    setEditTags((prev) => prev.map((t, i) => (i === index ? value : t)));
  };

  const addEditTagField = () => {
    if (editTags.length < MAX_TAGS) {
      setEditTags((prev) => [...prev, ""]);
    }
  };

  const openModal = (m: Exclude<StoryListModal, null>) => {
    setActiveModal(m);
  };

  const closeModals = () => {
    setActiveModal(null);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-[var(--foreground)] transition-colors hover:bg-[var(--muted)]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/30"
            aria-label="Open story actions"
          >
            <MoreVertical className="h-4 w-4" strokeWidth={2} aria-hidden />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[10rem]">
          <DropdownMenuItem onSelect={() => openModal("edit")}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => openModal("delete")}
            variant="destructive"
          >
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => openModal("accept")}>
            Accept
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => openModal("reject")}>
            Reject
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog
        open={activeModal === "edit"}
        onOpenChange={(o) => {
          if (!o) setActiveModal(null);
        }}
      >
        <DialogContent className="max-h-[90vh] w-full max-w-2xl gap-0 overflow-y-auto p-0 sm:max-w-2xl">
          <div className="border-b border-[var(--border)] px-6 py-4">
            <DialogHeader className="text-left">
              <DialogTitle className="text-xl font-semibold text-[var(--foreground)]">
                Edit Story
              </DialogTitle>
              <DialogDescription className="text-left text-sm text-[var(--muted-foreground)]">
                Update story details below
              </DialogDescription>
            </DialogHeader>
          </div>
          <form
            id={`edit-story-form-${story.id}`}
            className="px-6 py-4"
            onSubmit={(e) => {
              e.preventDefault();
              closeModals();
            }}
          >
            <div className="grid max-w-full gap-6">
              <div className="w-full space-y-2">
                <span className="block text-sm font-medium text-[var(--gray-dark)]">
                  Upload Image
                </span>
                <label
                  htmlFor={`edit-story-file-${story.id}`}
                  className={cn(
                    "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed bg-[var(--input-background)] px-4 py-10 text-center transition-colors hover:border-[var(--primary)]/50 hover:bg-[var(--muted)]/40",
                    fileDropClassName,
                  )}
                >
                  <span className="text-sm font-medium text-[var(--foreground)]">
                    {editFileLabel ?? "Choose a file"}
                  </span>
                  <span className="mt-1 text-xs text-[var(--muted-foreground)]">
                    PNG, JPG, or WebP
                  </span>
                  <input
                    id={`edit-story-file-${story.id}`}
                    ref={editFileInputRef}
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => {
                      const f = e.target.files?.[0] ?? null;
                      setEditFile(f);
                      setEditFileLabel(f ? f.name : null);
                    }}
                  />
                </label>
              </div>

              {orSeparator()}

              <div className="w-full space-y-2">
                <DashboardTextField
                  id={`edit-story-image-url-${story.id}`}
                  label="Upload Image URL"
                  type="url"
                  value={editImageUrl}
                  onChange={(e) => setEditImageUrl(e.target.value)}
                  autoComplete="off"
                  placeholder="https://"
                />
              </div>

              <DashboardTextField
                id={`edit-story-location-${story.id}`}
                label="Location"
                value={editLocation}
                onChange={(e) => setEditLocation(e.target.value)}
                autoComplete="off"
              />

              <div className="w-full space-y-1.5">
                <DashboardTextField
                  id={`edit-story-title-${story.id}`}
                  label="Title"
                  value={editTitle}
                  maxLength={TITLE_MAX_LEN}
                  onChange={(e) => {
                    setEditTitle(e.target.value.slice(0, TITLE_MAX_LEN));
                  }}
                />
                <div className="flex items-center justify-between gap-3">
                  <p className="min-w-0 text-xs italic text-[var(--muted-foreground)]">
                    Maximum 200 characters allowed
                  </p>
                  <span
                    className="shrink-0 text-xs tabular-nums text-[var(--muted-foreground)]"
                    aria-live="polite"
                  >
                    {TITLE_MAX_LEN - editTitle.length}
                  </span>
                </div>
              </div>

              <div className="w-full space-y-1.5">
                <DashboardTextareaField
                  id={`edit-story-desc-${story.id}`}
                  label="Description"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={5}
                />
                <p className="min-w-0 text-xs italic text-[var(--muted-foreground)]">
                  Minimum 500 characters required
                </p>
                <span
                  className="text-xs tabular-nums text-[var(--muted-foreground)]"
                  aria-live="polite"
                >
                  {editDescription.length}
                </span>
              </div>

              <div className="w-full space-y-3">
                <span
                  className="block text-sm font-medium text-[var(--gray-dark)]"
                  id={`edit-story-tags-h-${story.id}`}
                >
                  Tags
                </span>
                <div
                  className="flex flex-col gap-3"
                  role="group"
                  aria-labelledby={`edit-story-tags-h-${story.id}`}
                >
                  {editTags.map((value, index) => (
                    <input
                      key={`${story.id}-edit-tag-${index}`}
                      id={`edit-story-tag-${story.id}-${index}`}
                      type="text"
                      value={value}
                      onChange={(e) => setEditTagAt(index, e.target.value)}
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
                    onClick={addEditTagField}
                    disabled={!canAddTag}
                  >
                    <Plus className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
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
          </form>
          <DialogFooter className="border-t border-[var(--border)] bg-[var(--card)] px-6 py-4 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={closeModals}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form={`edit-story-form-${story.id}`}
              variant="primary"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={activeModal === "delete"}
        onOpenChange={(o) => {
          if (!o) setActiveModal(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Story</DialogTitle>
            <DialogDescription>
              This action cannot be undone
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm leading-relaxed text-[var(--foreground)]">
            Are you sure you want to delete this story? If deleted, it will not
            be visible in the future.
          </p>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeModals}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              className="border-2 border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
              onClick={closeModals}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={activeModal === "accept"}
        onOpenChange={(o) => {
          if (!o) setActiveModal(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Story</DialogTitle>
            <DialogDescription>
              Please review before approving
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm leading-relaxed text-[var(--foreground)]">
            Please review the story before approving. Click Accept to approve
            this story.
          </p>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeModals}>
              Cancel
            </Button>
            <Button type="button" variant="primary" onClick={closeModals}>
              Accept
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={activeModal === "reject"}
        onOpenChange={(o) => {
          if (!o) setActiveModal(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Story</DialogTitle>
            <DialogDescription>
              Please review before rejecting
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm leading-relaxed text-[var(--foreground)]">
            Please review the story before rejecting. Click Reject to reject
            this story.
          </p>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeModals}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              className="border-2 border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
              onClick={closeModals}
            >
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
