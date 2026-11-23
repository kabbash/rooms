"use client";

import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components";
import { Icon, type IconName } from "./icon";
import { cn } from "@/lib/cn";

export type SelectOption = {
  label: string;
  value: string;
};

interface SelectOptionsProps {
  label: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  icon?: IconName;
  className?: string;
  descriptionId?: string;
}

export function SelectOptions({
  label,
  options,
  value,
  onChange,
  error,
  disabled,
  icon,
  className,
  descriptionId,
}: SelectOptionsProps) {
  const triggerClassName = cn(
    "flex min-h-12 w-full items-center gap-2 rounded-md border p-3",
    "bg-surface transition-colors",
    error ? "border-line-danger" : "border-line focus-within:border-line-brand",
    "focus-within:focus-ring",
    disabled && "cursor-not-allowed bg-subtle text-fg-tertiary",
    className,
  );

  return (
    <Select
      aria-describedby={descriptionId}
      isDisabled={disabled}
      selectedKey={value}
      onSelectionChange={(key) => onChange?.(key === null ? "" : String(key))}
      isInvalid={Boolean(error)}
    >
      <Label className="text-label-sm font-medium text-fg-secondary">
        {label}
      </Label>

      <Button className={cn(triggerClassName, "justify-start text-left")}>
        {icon && (
          <Icon name={icon} size={18} className="shrink-0 text-fg-secondary" />
        )}

        <SelectValue className="min-w-0 flex-1 text-left text-body-md text-fg" />

        <Icon
          name="chevron-down"
          size={18}
          className="shrink-0 text-fg-secondary"
        />
      </Button>

      <Popover className="w-[var(--trigger-width)] rounded-md border border-line bg-surface p-1 shadow-lg">
        <ListBox className="w-full max-h-60 overflow-auto outline-none">
          {options.map((option) => (
            <ListBoxItem
              key={option.value}
              id={option.value}
              textValue={option.label}
              className="cursor-pointer rounded-sm px-3 py-2 text-body-sm text-fg outline-none hover:bg-subtle focus:bg-brand-subtle data-[selected]:bg-brand-subtle"
            >
              {option.label}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </Select>
  );
}
