"use client";

import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export interface ToggleProps extends Omit<
  ComponentProps<"button">,
  "onChange"
> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
}

export function Toggle({
  checked,
  onCheckedChange,
  label,
  className,
  disabled,
  ...props
}: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors",
        "focus-visible:outline-none focus-visible:focus-ring",
        "disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-brand" : "bg-muted",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none inline-block size-5 rounded-full bg-surface shadow-sm transition-transform",
          checked ? "translate-x-5" : "translate-x-0.5",
        )}
      />
    </button>
  );
}
