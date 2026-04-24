import React, { forwardRef } from "react";
import type {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "../ui/utils";

const fieldClassName = cn(
  "w-full rounded-lg border border-[var(--border)] bg-[var(--input-background)] px-4 py-3 text-base text-[var(--foreground)]",
  "placeholder:text-[var(--muted-foreground)]",
  "shadow-sm transition-[box-shadow,border-color]",
  "focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/25",
  "disabled:cursor-not-allowed disabled:opacity-60",
);

export interface DashboardTextFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  /** Optional right-aligned content on the label row (e.g. character count). */
  labelAction?: ReactNode;
}

export const DashboardTextField = forwardRef<
  HTMLInputElement,
  DashboardTextFieldProps
>(({ id, label, labelAction, className, ...props }, ref) => (
  <div className="w-full space-y-2">
    <div className="flex items-center justify-between gap-2">
      <label
        htmlFor={id}
        className="min-w-0 text-sm font-medium text-[var(--gray-dark)]"
      >
        {label}
      </label>
      {labelAction != null ? (
        <span className="shrink-0">{labelAction}</span>
      ) : null}
    </div>
    <input
      ref={ref}
      id={id}
      className={cn(fieldClassName, className)}
      {...props}
    />
  </div>
));
DashboardTextField.displayName = "DashboardTextField";

export interface DashboardTextareaFieldProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  /** Optional right-aligned content on the label row (e.g. character count). */
  labelAction?: ReactNode;
}

export const DashboardTextareaField = forwardRef<
  HTMLTextAreaElement,
  DashboardTextareaFieldProps
>(({ id, label, labelAction, className, rows = 4, ...props }, ref) => (
  <div className="w-full space-y-2">
    <div className="flex items-center justify-between gap-2">
      <label
        htmlFor={id}
        className="min-w-0 text-sm font-medium text-[var(--gray-dark)]"
      >
        {label}
      </label>
      {labelAction != null ? (
        <span className="shrink-0">{labelAction}</span>
      ) : null}
    </div>
    <textarea
      ref={ref}
      id={id}
      rows={rows}
      className={cn(fieldClassName, "min-h-[100px] resize-y block", className)}
      {...props}
    />
  </div>
));
DashboardTextareaField.displayName = "DashboardTextareaField";

export interface DashboardSelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  children: React.ReactNode;
}

export const DashboardSelectField = forwardRef<
  HTMLSelectElement,
  DashboardSelectFieldProps
>(({ id, label, className, children, ...props }, ref) => (
  <div className="w-full space-y-2">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-[var(--gray-dark)]"
    >
      {label}
    </label>
    <select
      ref={ref}
      id={id}
      className={cn(fieldClassName, "cursor-pointer", className)}
      {...props}
    >
      {children}
    </select>
  </div>
));
DashboardSelectField.displayName = "DashboardSelectField";
