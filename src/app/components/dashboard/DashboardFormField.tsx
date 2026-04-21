import React, { forwardRef } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
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
}

export const DashboardTextField = forwardRef<
  HTMLInputElement,
  DashboardTextFieldProps
>(({ id, label, className, ...props }, ref) => (
  <div className="w-full space-y-2">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-[var(--gray-dark)]"
    >
      {label}
    </label>
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
}

export const DashboardTextareaField = forwardRef<
  HTMLTextAreaElement,
  DashboardTextareaFieldProps
>(({ id, label, className, rows = 4, ...props }, ref) => (
  <div className="w-full space-y-2">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-[var(--gray-dark)]"
    >
      {label}
    </label>
    <textarea
      ref={ref}
      id={id}
      rows={rows}
      className={cn(fieldClassName, "min-h-[100px] resize-y", className)}
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
