import React, { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "./ui/utils";

export interface FormTextFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

const FormTextField = forwardRef<HTMLInputElement, FormTextFieldProps>(
  ({ id, label, className, ...props }, ref) => {
    return (
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
          className={cn(
            "w-full rounded-lg border border-[var(--border)] bg-[var(--input-background)] px-4 py-3 text-base text-[var(--foreground)]",
            "placeholder:text-[var(--muted-foreground)]",
            "shadow-sm transition-[box-shadow,border-color]",
            "focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/25",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);

FormTextField.displayName = "FormTextField";

export { FormTextField };
