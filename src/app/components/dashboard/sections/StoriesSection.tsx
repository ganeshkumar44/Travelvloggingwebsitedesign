import React, { useEffect, useMemo, useRef, useState } from "react";
import { Filter, MoreVertical, Plus } from "lucide-react";
import { Button } from "../../Button";
import { cn } from "../../ui/utils";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  clearStoryUploadError,
  resetStoryUploadState,
  uploadStory,
} from "../../../../features/storyUpload/storyUploadSlice";
import { fetchAllStories } from "../../../../features/allStories/allStoriesSlice";
import type { AllStoriesItem } from "../../../../features/allStories/allStoriesTypes";

const MAX_TAGS = 5;
const TITLE_MAX_LEN = 200;

const STORIES_TAB_LIST = "list" as const;
const STORIES_TAB_CREATE = "create" as const;
const STORY_IMAGE_BASE_URL = "http://127.0.0.1:8000";
const PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;

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

type StoryFilters = {
  username: string;
  title: string;
  location: string;
  tags: string;
  createdAt: string;
  updatedAt: string;
  likes: string;
  dislikes: string;
};

const INITIAL_STORY_FILTERS: StoryFilters = {
  username: "",
  title: "",
  location: "",
  tags: "",
  createdAt: "",
  updatedAt: "",
  likes: "",
  dislikes: "",
};

/** YYYY-MM-DD in local time, for list display and date-only filtering. */
function formatStoryDate(input: string | null | undefined): string {
  if (!input) return "";
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getStoryAuthorName(story: AllStoriesItem): string {
  const first = story.user?.firstname?.trim() ?? "";
  const last = story.user?.lastname?.trim() ?? "";
  return `${first} ${last}`.trim();
}

function getStoryImageUrl(image: string): string {
  const trimmed = (image || "").trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `${STORY_IMAGE_BASE_URL}${trimmed.startsWith("/") ? "" : "/"}${trimmed}`;
}

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

function StoryRowActionsMenu() {
  return (
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
        <DropdownMenuItem onSelect={() => {}}>Edit</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => {}} variant="destructive">
          Delete
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => {}}>Accept</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => {}}>Reject</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function StoriesSection() {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((s) => s.auth.accessToken);
  const { status: uploadStatus, error: uploadError } = useAppSelector(
    (s) => s.storyUpload,
  );
  const {
    status: storiesStatus,
    error: storiesError,
    data: storiesData,
  } = useAppSelector((s) => s.allStories);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileLabel, setFileLabel] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState<string[]>([""]);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [filters, setFilters] = useState<StoryFilters>(INITIAL_STORY_FILTERS);
  const [storyListFiltersVisible, setStoryListFiltersVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE_OPTIONS[0]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const canAddTag = tags.length < MAX_TAGS;
  const isSubmitting = uploadStatus === "loading";
  const isStoriesLoading = storiesStatus === "loading";

  useEffect(() => {
    if (storiesStatus === "idle") {
      void dispatch(fetchAllStories());
    }
  }, [dispatch, storiesStatus]);

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

  const filteredStories = useMemo(() => {
    const usernameFilter = filters.username.trim().toLowerCase();
    const titleFilter = filters.title.trim().toLowerCase();
    const locationFilter = filters.location.trim().toLowerCase();
    const tagsFilter = filters.tags.trim().toLowerCase();
    const createdAtFilter = filters.createdAt.trim().toLowerCase();
    const updatedAtFilter = filters.updatedAt.trim().toLowerCase();
    const likesFilter = filters.likes.trim().toLowerCase();
    const dislikesFilter = filters.dislikes.trim().toLowerCase();

    return storiesData.filter((story) => {
      const username = getStoryAuthorName(story).toLowerCase();
      const title = (story.title || "").toLowerCase();
      const location = (story.location || "").toLowerCase();
      const tagsText = (story.tags ?? []).join(", ").toLowerCase();
      const createdAt = formatStoryDate(story.created_at).toLowerCase();
      const updatedAt = formatStoryDate(story.updated_at).toLowerCase();
      const likes = String(story.total_likes).toLowerCase();
      const dislikes = String(story.total_dislikes).toLowerCase();

      return (
        username.includes(usernameFilter) &&
        title.includes(titleFilter) &&
        location.includes(locationFilter) &&
        tagsText.includes(tagsFilter) &&
        createdAt.includes(createdAtFilter) &&
        updatedAt.includes(updatedAtFilter) &&
        likes.includes(likesFilter) &&
        dislikes.includes(dislikesFilter)
      );
    });
  }, [filters, storiesData]);

  const totalRecords = filteredStories.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedStories = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredStories.slice(start, start + pageSize);
  }, [currentPage, filteredStories, pageSize]);

  const updateFilter = (key: keyof StoryFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
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

      <Tabs defaultValue={STORIES_TAB_LIST} className="w-full">
        <TabsList
          className="grid h-auto w-full max-w-xl grid-cols-2 gap-1 p-1"
          aria-label="Stories section"
        >
          <TabsTrigger value={STORIES_TAB_LIST} className="px-3 py-2">
            Stories List
          </TabsTrigger>
          <TabsTrigger value={STORIES_TAB_CREATE} className="px-3 py-2">
            Create New Stories
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value={STORIES_TAB_LIST}
          className="mt-6 space-y-6"
        >
          {storyListFiltersVisible ? (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--shadow-sm)]">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <DashboardTextField
                  id="stories-filter-username"
                  label="Username"
                  value={filters.username}
                  onChange={(e) => updateFilter("username", e.target.value)}
                  placeholder="Search username"
                />
                <DashboardTextField
                  id="stories-filter-title"
                  label="Title"
                  value={filters.title}
                  onChange={(e) => updateFilter("title", e.target.value)}
                  placeholder="Search title"
                />
                <DashboardTextField
                  id="stories-filter-location"
                  label="Location"
                  value={filters.location}
                  onChange={(e) => updateFilter("location", e.target.value)}
                  placeholder="Search location"
                />
                <DashboardTextField
                  id="stories-filter-tags"
                  label="Tags"
                  value={filters.tags}
                  onChange={(e) => updateFilter("tags", e.target.value)}
                  placeholder="Search tags"
                />
                <DashboardTextField
                  id="stories-filter-created-at"
                  label="Created At"
                  value={filters.createdAt}
                  onChange={(e) => updateFilter("createdAt", e.target.value)}
                  placeholder="Search created date"
                />
                <DashboardTextField
                  id="stories-filter-updated-at"
                  label="Updated At"
                  value={filters.updatedAt}
                  onChange={(e) => updateFilter("updatedAt", e.target.value)}
                  placeholder="Search updated date"
                />
                <DashboardTextField
                  id="stories-filter-likes"
                  label="Likes"
                  value={filters.likes}
                  onChange={(e) => updateFilter("likes", e.target.value)}
                  placeholder="Search likes"
                />
                <DashboardTextField
                  id="stories-filter-dislikes"
                  label="Dislikes"
                  value={filters.dislikes}
                  onChange={(e) => updateFilter("dislikes", e.target.value)}
                  placeholder="Search dislikes"
                />
              </div>
            </div>
          ) : null}

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-sm)]">
            <div className="flex justify-end border-b border-[var(--border)]/80 px-4 py-2 sm:px-6 sm:py-2.5">
              <button
                type="button"
                onClick={() =>
                  setStoryListFiltersVisible((v) => !v)
                }
                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-[var(--foreground)] transition-colors hover:bg-[var(--muted)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/30"
                aria-label={
                  storyListFiltersVisible
                    ? "Hide story filters"
                    : "Show story filters"
                }
                aria-expanded={storyListFiltersVisible}
              >
                <Filter
                  className="h-5 w-5"
                  strokeWidth={2}
                  aria-hidden
                />
              </button>
            </div>
            {storiesError ? (
              <p className="px-6 py-5 text-sm text-red-600" role="alert">
                {storiesError}
              </p>
            ) : null}

            {isStoriesLoading ? (
              <p className="px-6 py-5 text-sm text-[var(--muted-foreground)]">
                Loading stories...
              </p>
            ) : null}

            {!isStoriesLoading && !storiesError && totalRecords === 0 ? (
              <p className="px-6 py-5 text-sm text-[var(--muted-foreground)]">
                No stories found
              </p>
            ) : null}

            {!isStoriesLoading && !storiesError && totalRecords > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-[1280px] w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-[var(--border)] bg-[var(--muted)]/30 text-left">
                        <th className="px-4 py-3 font-semibold">Username</th>
                        <th className="px-4 py-3 font-semibold">Title</th>
                        <th className="px-4 py-3 font-semibold">Image</th>
                        <th className="px-4 py-3 font-semibold">Description</th>
                        <th className="px-4 py-3 font-semibold">Location</th>
                        <th className="px-4 py-3 font-semibold">Tags</th>
                        <th className="px-4 py-3 font-semibold">Created At</th>
                        <th className="px-4 py-3 font-semibold">Updated At</th>
                        <th className="px-4 py-3 font-semibold">Likes</th>
                        <th className="px-4 py-3 font-semibold">Dislikes</th>
                        <th className="w-[88px] px-4 py-3 text-right font-semibold">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedStories.map((story) => (
                        <tr
                          key={story.id}
                          className="border-b border-[var(--border)]/80 align-top"
                        >
                          <td className="px-4 py-3">
                            {getStoryAuthorName(story) || "-"}
                          </td>
                          <td className="px-4 py-3">{story.title || "-"}</td>
                          <td className="px-4 py-3">
                            {story.image ? (
                              <img
                                src={getStoryImageUrl(story.image)}
                                alt={story.title || "Story"}
                                className="h-14 w-14 rounded-md border border-[var(--border)] object-cover"
                                loading="lazy"
                              />
                            ) : (
                              "-"
                            )}
                          </td>
                          <td className="max-w-[320px] px-4 py-3">
                            <p className="line-clamp-3">{story.description || "-"}</p>
                          </td>
                          <td className="px-4 py-3">{story.location || "-"}</td>
                          <td className="px-4 py-3">
                            {story.tags && story.tags.length > 0 ? (
                              <div className="flex flex-wrap gap-1.5">
                                {story.tags.map((tag) => (
                                  <span
                                    key={`${story.id}-${tag}`}
                                    className="rounded-md bg-[var(--muted)] px-2 py-0.5 text-xs"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3">
                            {formatStoryDate(story.created_at) || "-"}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3">
                            {formatStoryDate(story.updated_at) || "-"}
                          </td>
                          <td className="px-4 py-3">{story.total_likes}</td>
                          <td className="px-4 py-3">{story.total_dislikes}</td>
                          <td className="w-[88px] whitespace-nowrap px-4 py-3 text-right align-middle">
                            <div className="inline-flex justify-end">
                              <StoryRowActionsMenu />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-col gap-4 border-t border-[var(--border)] px-4 py-4 sm:px-6">
                  <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Showing{" "}
                      <span className="font-medium text-[var(--foreground)]">
                        {totalRecords === 0
                          ? 0
                          : (currentPage - 1) * pageSize + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium text-[var(--foreground)]">
                        {Math.min(currentPage * pageSize, totalRecords)}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium text-[var(--foreground)]">
                        {totalRecords}
                      </span>
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage <= 1}
                      >
                        Previous
                      </Button>
                      <span className="text-sm text-[var(--muted-foreground)]">
                        Page {currentPage} of {totalPages}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={currentPage >= totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="stories-page-size"
                      className="text-sm text-[var(--muted-foreground)]"
                    >
                      Rows per page
                    </label>
                    <select
                      id="stories-page-size"
                      className="rounded-md border border-[var(--border)] bg-[var(--input-background)] px-2.5 py-1.5 text-sm"
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                    >
                      {PAGE_SIZE_OPTIONS.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </TabsContent>

        <TabsContent value={STORIES_TAB_CREATE} className="mt-6 space-y-8">
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

              <div className="w-full space-y-1.5">
                <DashboardTextField
                  id="dash-stories-title"
                  label="Title"
                  value={title}
                  maxLength={TITLE_MAX_LEN}
                  onChange={(e) => {
                    const v = e.target.value.slice(0, TITLE_MAX_LEN);
                    setTitle(v);
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
                <div className="flex items-center justify-between gap-3">
                  <p className="min-w-0 text-xs italic text-[var(--muted-foreground)]">
                    Maximum 200 characters allowed
                  </p>
                  <span
                    className="shrink-0 text-xs tabular-nums text-[var(--muted-foreground)]"
                    aria-live="polite"
                  >
                    {TITLE_MAX_LEN - title.length}
                  </span>
                </div>
                {fieldErrors.title ? (
                  <p className="text-sm text-red-600" role="alert">
                    {fieldErrors.title}
                  </p>
                ) : null}
              </div>

              <div className="w-full space-y-1.5">
                <DashboardTextareaField
                  id="dash-stories-description"
                  label="Description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (fieldErrors.description) {
                      setFieldErrors((er) => ({
                        ...er,
                        description: undefined,
                      }));
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
                <div className="flex items-center justify-between gap-3">
                  <p className="min-w-0 text-xs italic text-[var(--muted-foreground)]">
                    Minimum 500 characters required
                  </p>
                  <span
                    className="shrink-0 text-xs tabular-nums text-[var(--muted-foreground)]"
                    aria-live="polite"
                  >
                    {description.length}
                  </span>
                </div>
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

            <div className="mt-8">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting…" : "Submit New Vlog"}
              </Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
