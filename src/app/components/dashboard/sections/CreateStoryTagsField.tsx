import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import { cn } from "../../ui/utils";
import type { StoryTagsFetchStatus } from "../../../../features/storyTags/storyTagsTypes";

const inputClassName = cn(
  "w-full rounded-lg border border-[var(--border)] bg-[var(--input-background)] px-4 py-3 text-base text-[var(--foreground)]",
  "placeholder:text-[var(--muted-foreground)]",
  "shadow-sm transition-[box-shadow,border-color]",
  "focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/25",
  "disabled:cursor-not-allowed disabled:opacity-60",
);

export type CreateStoryTagsFieldProps = {
  selectedTags: string[];
  onRemoveTag: (index: number) => void;
  draft: string;
  onDraftChange: (value: string) => void;
  /** Return true if the tag was accepted */
  onCommitTag: (tag: string) => boolean;
  suggestionSource: string[];
  fetchStatus: StoryTagsFetchStatus;
  disabled?: boolean;
  error?: string;
  /** For element ids, e.g. "dash-stories" */
  idPrefix: string;
  "aria-labelledby"?: string;
};

export function CreateStoryTagsField({
  selectedTags,
  onRemoveTag,
  draft,
  onDraftChange,
  onCommitTag,
  suggestionSource,
  fetchStatus,
  disabled = false,
  error,
  idPrefix,
  "aria-labelledby": ariaLabelledBy,
}: CreateStoryTagsFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [highlighted, setHighlighted] = useState(-1);

  const query = draft.trim().toLowerCase();

  const filteredSuggestions = useMemo(() => {
    if (!query) return [];
    const selectedLower = new Set(
      selectedTags.map((t) => t.toLowerCase()),
    );
    return suggestionSource.filter(
      (tag) =>
        tag.toLowerCase().includes(query) &&
        !selectedLower.has(tag.toLowerCase()),
    );
  }, [draft, query, selectedTags, suggestionSource]);

  /** Visibility follows input value only (not focus/blur). */
  const showDropdown =
    query.length > 0 && !disabled && selectedTags.length < 5;

  useEffect(() => {
    setHighlighted(-1);
  }, [query, filteredSuggestions]);

  useEffect(() => {
    if (!showDropdown || highlighted < 0 || !listRef.current) return;
    const row = listRef.current.querySelector<HTMLElement>(
      `[data-suggestion-index="${highlighted}"]`,
    );
    row?.scrollIntoView({ block: "nearest" });
  }, [highlighted, showDropdown]);

  const refocusInput = useCallback(() => {
    queueMicrotask(() => {
      inputRef.current?.focus();
    });
  }, []);

  const pickSuggestion = useCallback(
    (tag: string) => {
      const ok = onCommitTag(tag);
      if (ok) {
        onDraftChange("");
        setHighlighted(-1);
        refocusInput();
      }
    },
    [onCommitTag, onDraftChange, refocusInput],
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown && e.key !== "Enter") return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!showDropdown || filteredSuggestions.length === 0) return;
      setHighlighted((h) =>
        h < 0 ? 0 : Math.min(h + 1, filteredSuggestions.length - 1),
      );
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!showDropdown || filteredSuggestions.length === 0) return;
      setHighlighted((h) => (h <= 0 ? 0 : h - 1));
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setHighlighted(-1);
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (
        showDropdown &&
        highlighted >= 0 &&
        highlighted < filteredSuggestions.length
      ) {
        pickSuggestion(filteredSuggestions[highlighted]);
        return;
      }
      const t = draft.trim();
      if (t && onCommitTag(t)) {
        setHighlighted(-1);
        refocusInput();
      }
    }
  };

  const inputId = `${idPrefix}-tag-input`;

  return (
    <div className="w-full space-y-3" role="group" aria-labelledby={ariaLabelledBy}>
      {selectedTags.length > 0 ? (
        <div className="flex flex-wrap gap-2" aria-label="Selected tags">
          {selectedTags.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="inline-flex max-w-full items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--muted)]/50 px-3 py-1 text-sm font-medium text-[var(--foreground)]"
            >
              <span className="min-w-0 truncate">{tag}</span>
              <button
                type="button"
                className="inline-flex shrink-0 rounded-full p-0.5 text-[var(--muted-foreground)] transition-colors hover:bg-[var(--muted)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/30 disabled:pointer-events-none disabled:opacity-50"
                onClick={() => onRemoveTag(index)}
                disabled={disabled}
                aria-label={`Remove tag ${tag}`}
              >
                <X className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
              </button>
            </span>
          ))}
        </div>
      ) : null}

      <div className="relative">
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          value={draft}
          onChange={(e) => onDraftChange(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={disabled || selectedTags.length >= 5}
          autoComplete="off"
          placeholder={
            selectedTags.length >= 5
              ? "Maximum tags reached"
              : "Type to search tags or enter a custom tag"
          }
          className={cn(
            inputClassName,
            error &&
              "border-red-500 focus:border-red-500 focus:ring-red-500/25",
          )}
          aria-expanded={showDropdown}
          aria-controls={`${idPrefix}-tag-suggestions`}
          aria-autocomplete="list"
          aria-activedescendant={
            showDropdown && highlighted >= 0
              ? `${idPrefix}-suggestion-${highlighted}`
              : undefined
          }
        />

        {showDropdown ? (
          <div
            ref={listRef}
            id={`${idPrefix}-tag-suggestions`}
            role="listbox"
            className="absolute left-0 right-0 top-full z-20 mt-1 max-h-48 overflow-auto rounded-lg border border-[var(--border)] bg-[var(--card)] py-1 shadow-md"
          >
            {fetchStatus === "loading" ? (
              <div className="px-3 py-2 text-sm text-[var(--muted-foreground)]">
                Loading suggestions…
              </div>
            ) : filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((tag, index) => (
                <button
                  key={`${tag}-${index}`}
                  type="button"
                  role="option"
                  id={`${idPrefix}-suggestion-${index}`}
                  data-suggestion-index={index}
                  aria-selected={highlighted === index}
                  className={cn(
                    "flex w-full cursor-pointer px-3 py-2 text-left text-sm text-[var(--foreground)] transition-colors",
                    highlighted === index
                      ? "bg-[var(--muted)]"
                      : "hover:bg-[var(--muted)]/70",
                  )}
                  onMouseDown={(ev) => {
                    ev.preventDefault();
                    pickSuggestion(tag);
                  }}
                >
                  {tag}
                </button>
              ))
            ) : (
              <div
                className="px-3 py-2 text-sm text-[var(--muted-foreground)]"
                role="status"
              >
                No tags found
              </div>
            )}
          </div>
        ) : null}
      </div>

      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
