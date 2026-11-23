import { useId, type ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./icon";

export interface TextInputProps extends ComponentProps<"input"> {
  label: string;
  helper?: string;
  error?: string;
  icon?: IconName;
  suffix?: string;
}

export function TextInput({
  label,
  helper,
  error,
  icon,
  suffix,
  disabled,
  readOnly,
  id,
  className,
  "aria-describedby": ariaDescribedBy,
  ...props
}: TextInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = `${inputId}-description`;

  const description = error || helper;

  const describedBy =
    [ariaDescribedBy, description ? descriptionId : undefined]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={inputId}
        className="text-label-sm font-medium text-fg-secondary"
      >
        {label}
      </label>

      <div
        className={cn(
          "flex items-center gap-2 rounded-md border p-3",
          "bg-surface transition-colors",
          error
            ? "border-line-danger"
            : "border-line has-[:focus-visible]:border-line-brand",
          "has-[:focus-visible]:focus-ring",
          disabled && "cursor-not-allowed border border-line-default bg-subtle",
        )}
      >
        {icon && <Icon name={icon} size={18} className="text-fg-secondary" />}

        <input
          id={inputId}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            "min-w-0 flex-1 bg-transparent text-body-md font-normal text-fg outline-none",
            "placeholder:text-fg-tertiary",
            "disabled:cursor-not-allowed disabled:text-fg-tertiary",
            "read-only:cursor-default",
            className,
          )}
          {...props}
        />

        {suffix && (
          <span className="shrink-0 text-body-md font-normal text-fg-tertiary">
            {suffix}
          </span>
        )}
      </div>

      {description && (
        <p
          id={descriptionId}
          className={cn(
            "text-label-sm font-medium",
            error ? "text-fg-danger" : "text-fg-tertiary",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
