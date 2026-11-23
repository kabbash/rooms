"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";
import { SelectOptions, type SelectOption } from "./select-options";
import { SelectDate } from "./select-date";
import type { IconName } from "./icon";

interface SharedProps {
  label: string;
  helper?: string;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  className?: string;
}

interface OptionsProps extends SharedProps {
  type?: "select";
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  icon?: IconName;
}

interface DateProps extends SharedProps {
  type: "date";
  value?: string;
  onChange?: (value: string) => void;
  options?: never;
  icon?: never;
}

export type SelectFieldProps = OptionsProps | DateProps;

export function SelectField(props: SelectFieldProps) {
  const inputId = useId();
  const descriptionId = `${inputId}-description`;
  const description = props.error || props.helper;

  return (
    <div className="flex flex-col gap-2">
      {props.type === "date" ? (
        <SelectDate
          label={props.label}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          error={props.error}
          disabled={props.disabled}
          readOnly={props.readOnly}
          className={props.className}
          descriptionId={description ? descriptionId : undefined}
        />
      ) : (
        <SelectOptions
          label={props.label}
          options={props.options}
          value={props.value}
          onChange={props.onChange}
          error={props.error}
          disabled={props.disabled}
          icon={props.icon}
          className={props.className}
          descriptionId={description ? descriptionId : undefined}
        />
      )}

      {description && (
        <p
          id={descriptionId}
          className={cn(
            "text-label-sm font-medium",
            props.error ? "text-fg-danger" : "text-fg-tertiary",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
