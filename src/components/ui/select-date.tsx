"use client";

import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  DateInput,
  DatePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Label,
  Popover,
} from "react-aria-components";
import { parseDate } from "@internationalized/date";
import { Icon } from "./icon";
import { cn } from "@/lib/cn";

interface SelectDateProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  descriptionId?: string;
}

export function SelectDate({
  label,
  value,
  onChange,
  placeholder,
  error,
  disabled,
  readOnly,
  descriptionId,
  className,
}: SelectDateProps) {
  const selectedDate = value ? parseDate(value) : null;

  const formattedDate = selectedDate
    ? new Intl.DateTimeFormat("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }).format(selectedDate.toDate("UTC"))
    : (placeholder ?? "Select date");

  const triggerClassName = cn(
    "flex min-h-12 w-full items-center gap-2 rounded-md border p-3",
    "bg-surface transition-colors",
    error ? "border-line-danger" : "border-line focus-within:border-line-brand",
    "focus-within:focus-ring",
    disabled && "cursor-not-allowed bg-subtle text-fg-tertiary",
    className,
  );

  return (
    <DatePicker
      isDisabled={disabled}
      isReadOnly={readOnly}
      value={selectedDate}
      onChange={(date) => onChange?.(date?.toString() ?? "")}
      isInvalid={Boolean(error)}
      aria-describedby={descriptionId}
    >
      <Label className="text-label-sm font-medium text-fg-secondary">
        {label}
      </Label>

      <Group className={triggerClassName}>
        <Button
          className="flex w-full items-center gap-2 text-left outline-none focus-visible:focus-ring"
          aria-label={`Choose date: ${formattedDate}`}
        >
          <Icon
            name="calendar"
            size={18}
            className="shrink-0 text-fg-secondary"
          />

          <span className="text-body-md font-normal text-fg">
            {formattedDate}
          </span>

          <Icon
            name="chevron-down"
            size={18}
            className="ml-auto shrink-0 text-fg-secondary"
          />
        </Button>

        <DateInput className="sr-only">
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
      </Group>

      <Popover
        placement="bottom start"
        className="rounded-lg border border-line bg-surface p-4 shadow-lg"
      >
        <Dialog className="outline-none">
          <Calendar className="w-64">
            <header className="mb-4 flex items-center justify-between">
              <Button
                slot="previous"
                aria-label="Previous month"
                className="flex size-8 items-center justify-center rounded-md text-fg-secondary hover:bg-subtle focus-visible:focus-ring"
              >
                <Icon name="chevron-down" size={18} className="rotate-90" />
              </Button>

              <Heading className="text-label-md font-medium text-fg" />

              <Button
                slot="next"
                aria-label="Next month"
                className="flex size-8 items-center justify-center rounded-md text-fg-secondary hover:bg-subtle focus-visible:focus-ring"
              >
                <Icon name="chevron-down" size={18} className="-rotate-90" />
              </Button>
            </header>

            <CalendarGrid className="w-full">
              {(date) => (
                <CalendarCell
                  date={date}
                  className={cn(
                    "flex size-9 cursor-pointer items-center justify-center rounded-md text-body-sm text-fg outline-none transition-colors",
                    "hover:bg-brand-subtle",
                    "data-[selected]:bg-brand data-[selected]:text-white",
                    "data-[outside-month]:text-fg-tertiary",
                    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-40",
                    "focus-visible:focus-ring",
                  )}
                />
              )}
            </CalendarGrid>
          </Calendar>
        </Dialog>
      </Popover>
    </DatePicker>
  );
}
