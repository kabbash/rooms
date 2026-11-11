import type { ComponentProps } from "react";
import { Icon, type IconName } from "@/components/ui/icon";
import { cn } from "@/lib/cn";

export interface CheckboxChipProps extends Omit<
  ComponentProps<"input">,
  "type" | "checked" | "className"
> {
  checked: boolean;
  icon: IconName;
  label: string;
  className?: string;
}

export function CheckboxChip({
  checked,
  icon,
  label,
  className,
  disabled,
  ...props
}: CheckboxChipProps) {
  return (
    <label
      className={cn(
        "group inline-flex cursor-pointer items-center gap-2 rounded-md border border-line bg-surface py-2 pr-[14px] pl-[10px] text-label-md text-fg transition-colors",
        "has-[:checked]:border-line-brand has-[:checked]:bg-brand-subtle has-[:checked]:text-fg-brand",
        "has-[:focus-visible]:focus-ring",
        "has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50",
        className,
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        className="peer sr-only"
        {...props}
      />

      <span
        aria-hidden="true"
        className="flex size-3.5 shrink-0 items-center justify-center rounded-[4px] border border-line-strong bg-surface group-has-[:checked]:border-brand group-has-[:checked]:bg-brand"
      >
        <svg
          viewBox="0 0 12 12"
          fill="none"
          className="size-3 text-white opacity-0 group-has-[:checked]:opacity-100"
        >
          <path
            d="M10 3L4.5 8.5L2 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <span aria-hidden="true" className="flex shrink-0 items-center">
        <Icon name={icon} size={20} />
      </span>

      <span>{label}</span>
    </label>
  );
}
