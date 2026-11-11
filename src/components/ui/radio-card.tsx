import type { ComponentProps } from "react";
import { Icon, type IconName } from "@/components/ui/icon";
import { cn } from "@/lib/cn";

export interface RadioCardProps extends Omit<
  ComponentProps<"input">,
  "type" | "className" | "title" | "value"
> {
  value: string;
  title: string;
  description: string;
  icon: IconName;
  className?: string;
}

export function RadioCard({
  value,
  title,
  description,
  icon,
  className,
  ...props
}: RadioCardProps) {
  return (
    <label
      className={cn(
        "group flex w-[200px] cursor-pointer items-start gap-[10px] rounded-md border border-line bg-surface p-[13px] text-fg transition-colors",
        "has-[:checked]:border-2 has-[:checked]:border-line-brand has-[:checked]:bg-brand-subtle has-[:checked]:p-3",
        "has-[:focus-visible]:focus-ring",
        "has-[:disabled]:cursor-not-allowed has-[:disabled]:border-line has-[:disabled]:bg-disabled has-[:disabled]:text-fg-tertiary",
        className,
      )}
    >
      <input type="radio" value={value} className="sr-only" {...props} />

      <span className="flex min-w-0 flex-1 flex-col gap-2">
        <span
          aria-hidden="true"
          className="flex size-5 items-center text-fg-secondary group-has-[:checked]:text-icon-brand group-has-[:disabled]:text-fg-tertiary"
        >
          <Icon name={icon} size={20} />
        </span>

        <span className="flex flex-col gap-0.5">
          <span className="text-label-md font-semibold">{title}</span>

          <span className="text-label-sm text-fg-secondary group-has-[:disabled]:text-fg-tertiary">
            {description}
          </span>
        </span>
      </span>

      <span
        aria-hidden="true"
        className="flex size-5 shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface group-has-[:checked]:border-brand group-has-[:checked]:bg-brand"
      >
        <span className="size-2 rounded-full bg-fg-on-brand opacity-0 group-has-[:checked]:opacity-100" />
      </span>
    </label>
  );
}
