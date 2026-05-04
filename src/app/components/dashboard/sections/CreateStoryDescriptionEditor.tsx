import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { Button } from "../../Button";
import { cn } from "../../ui/utils";
import {
  buildStoryTableHtml,
  registerStoryQuillTableEmbed,
} from "./quillStoryEditorSetup";
import "react-quill/dist/quill.snow.css";

export type CreateStoryDescriptionEditorProps = {
  id: string;
  label: string;
  value: string;
  onChange: (html: string) => void;
  disabled?: boolean;
  error?: boolean;
  placeholder?: string;
};

export function CreateStoryDescriptionEditor({
  id,
  label,
  value,
  onChange,
  disabled = false,
  error = false,
  placeholder = "Write your story…",
}: CreateStoryDescriptionEditorProps) {
  const quillRef = useRef<ReactQuill>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const tableInsertIndexRef = useRef(0);
  const insertTableActionRef = useRef<(quill: import("quill").default) => void>(
    () => {},
  );

  const [emojiOpen, setEmojiOpen] = useState(false);
  const [tableDialogOpen, setTableDialogOpen] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);

  useLayoutEffect(() => {
    registerStoryQuillTableEmbed();
  }, []);

  insertTableActionRef.current = (quill: import("quill").default) => {
    const range = quill.getSelection(true);
    const index = range
      ? range.index
      : Math.max(0, quill.getLength() - 1);
    tableInsertIndexRef.current = index;
    setTableRows(3);
    setTableCols(3);
    setTableDialogOpen(true);
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "link"],
          ["emoji", "insertTable"],
          ["clean"],
        ],
        handlers: {
          emoji: () => {
            setEmojiOpen((o) => !o);
          },
          insertTable: function (this: { quill: import("quill").default }) {
            insertTableActionRef.current(this.quill);
          },
        },
      },
    }),
    [],
  );

  const formats = useMemo(
    () => ["header", "bold", "italic", "underline", "link", "tableEmbed"],
    [],
  );

  const confirmInsertTable = () => {
    const quill = quillRef.current?.getEditor();
    if (!quill) {
      setTableDialogOpen(false);
      return;
    }
    const html = buildStoryTableHtml(tableRows, tableCols);
    const index = tableInsertIndexRef.current;
    quill.insertEmbed(index, "tableEmbed", html, "user");
    quill.setSelection(index + 1, 0, "user");
    setTableDialogOpen(false);
  };

  useEffect(() => {
    if (!emojiOpen && !tableDialogOpen) return;
    function onDocMouseDown(ev: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(ev.target as Node)) {
        setEmojiOpen(false);
        setTableDialogOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [emojiOpen, tableDialogOpen]);

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between gap-2">
        <label
          htmlFor={id}
          className="min-w-0 text-sm font-medium text-[var(--gray-dark)]"
        >
          {label}
        </label>
      </div>
      <div ref={wrapRef} className="relative w-full">
        <div
          className={cn(
            "create-story-description-quill w-full overflow-hidden rounded-lg border bg-[var(--input-background)] shadow-sm transition-[box-shadow,border-color]",
            "focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/25",
            error &&
              "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/25",
            !error && "border-[var(--border)]",
            disabled && "pointer-events-none opacity-60",
          )}
        >
          <ReactQuill
            ref={quillRef}
            id={id}
            theme="snow"
            value={value}
            onChange={(html: string) => {
              onChange(html);
            }}
            modules={modules}
            formats={formats}
            placeholder={placeholder}
            readOnly={disabled}
          />
        </div>
        {emojiOpen ? (
          <div className="absolute left-0 top-full z-[70] mt-2 rounded-xl border border-[var(--border)] bg-[var(--card)] p-1 shadow-lg">
            <EmojiPicker
              width={320}
              height={400}
              theme={Theme.LIGHT}
              onEmojiClick={(e) => {
                const quill = quillRef.current?.getEditor();
                if (!quill) return;
                const range = quill.getSelection(true);
                const idx = range
                  ? range.index
                  : Math.max(0, quill.getLength() - 1);
                quill.insertText(idx, e.emoji, "user");
                quill.setSelection(idx + e.emoji.length, 0, "user");
                setEmojiOpen(false);
              }}
            />
          </div>
        ) : null}
        {tableDialogOpen ? (
          <div
            className="absolute left-0 top-full z-[70] mt-2 w-full max-w-xs rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-lg"
            role="dialog"
            aria-label="Insert table"
          >
            <p className="mb-3 text-sm font-medium text-[var(--foreground)]">
              Table size
            </p>
            <div className="mb-4 grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label
                  htmlFor={`${id}-table-rows`}
                  className="text-xs font-medium text-[var(--muted-foreground)]"
                >
                  Rows
                </label>
                <input
                  id={`${id}-table-rows`}
                  type="number"
                  min={1}
                  max={20}
                  value={tableRows}
                  onChange={(e) =>
                    setTableRows(
                      Math.min(
                        20,
                        Math.max(1, Number.parseInt(e.target.value, 10) || 1),
                      ),
                    )
                  }
                  className="w-full rounded-md border border-[var(--border)] bg-[var(--input-background)] px-2 py-2 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label
                  htmlFor={`${id}-table-cols`}
                  className="text-xs font-medium text-[var(--muted-foreground)]"
                >
                  Columns
                </label>
                <input
                  id={`${id}-table-cols`}
                  type="number"
                  min={1}
                  max={20}
                  value={tableCols}
                  onChange={(e) =>
                    setTableCols(
                      Math.min(
                        20,
                        Math.max(1, Number.parseInt(e.target.value, 10) || 1),
                      ),
                    )
                  }
                  className="w-full rounded-md border border-[var(--border)] bg-[var(--input-background)] px-2 py-2 text-sm"
                />
              </div>
            </div>
            <p className="mb-3 text-xs text-[var(--muted-foreground)]">
              Between 1 and 20 each.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setTableDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={confirmInsertTable}
              >
                Insert table
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
