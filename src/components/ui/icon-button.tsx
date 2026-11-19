import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./icon";

type IconButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "aria-label" | "children"
> & {
  "aria-label": string;
  icon: IconName;
  variant?: "neutral" | "edit" | "danger";
};

export function IconButton({
  "aria-label": ariaLabel,
  icon,
  variant = "neutral",
  className,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={ariaLabel}
      className={cn(
        "inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md border p-2",
        "focus-visible:focus-ring disabled:cursor-not-allowed disabled:opacity-50",

        variant === "edit" &&
          "border-line bg-surface text-fg-secondary enabled:hover:border-[var(--color-text-info)] enabled:hover:bg-info-subtle enabled:hover:text-fg-info",

        variant === "danger" &&
          "border-line-danger bg-danger-subtle text-fg-danger enabled:hover:border-[var(--color-text-danger)] enabled:hover:bg-danger-subtle",

        variant === "neutral" && "border-line bg-surface text-fg-secondary",

        className,
      )}
      {...props}
    >
      <Icon name={icon} size={18} />
    </button>
  );
}
