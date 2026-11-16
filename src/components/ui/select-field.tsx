"use client";

import { useId } from "react";
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
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
  Label,
} from "react-aria-components";
import { parseDate } from "@internationalized/date";
import { Icon, type IconName } from "./icon";
import { cn } from "@/lib/cn";

type SelectOption = {
  label: string;
  value: string;
};

interface SharedProps {
  label: string;
  helper?: string;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  icon?: IconName;
  placeholder?: string;
  className?: string;
}

interface OptionsProps extends SharedProps {
  type?: "select";
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
}

interface DateProps extends SharedProps {
  type: "date";
  value?: string;
  onChange?: (value: string) => void;
  options?: never;
}

interface TimeProps extends SharedProps {
  type: "time";
  value?: string;
  onChange?: (value: string) => void;
}

export type SelectFieldProps = OptionsProps | DateProps | TimeProps;

export function SelectField(props: SelectFieldProps) {
  const generatedId = useId();
  const inputId = generatedId;
  const descriptionId = `${inputId}-description`;
  const description = props.error || props.helper;

  const selectedDate =
    props.type === "date" && props.value ? parseDate(props.value) : null;

  const formattedDate = selectedDate
    ? new Intl.DateTimeFormat("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }).format(selectedDate.toDate("UTC"))
    : (props.placeholder ?? "Select date");

  const triggerClassName = cn(
    "flex min-h-12 w-full items-center gap-2 rounded-md border p-3",
    "bg-surface transition-colors",
    props.error
      ? "border-line-danger"
      : "border-line focus-within:border-line-brand",
    "focus-within:focus-ring",
    props.disabled && "cursor-not-allowed bg-subtle text-fg-tertiary",
    props.className,
  );

  const timeOptions: SelectOption[] = [];

  for (let minutes = 9 * 60; minutes <= 18 * 60; minutes += 30) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const label = `${String(hours).padStart(2, "0")}:${String(
      remainingMinutes,
    ).padStart(2, "0")}`;

    timeOptions.push({ label, value: label });
  }

  const options = props.type === "time" ? timeOptions : props.options;

  return (
    <div className="flex flex-col gap-2">
      {props.type === "date" ? (
        <DatePicker
          isDisabled={props.disabled}
          isReadOnly={props.readOnly}
          value={selectedDate}
          onChange={(date) => props.onChange?.(date?.toString() ?? "")}
          isInvalid={Boolean(props.error)}
          aria-describedby={description ? descriptionId : undefined}
        >
          <Label className="text-label-sm font-medium text-fg-secondary">
            {props.label}
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
                    <Icon
                      name="chevron-down"
                      size={18}
                      className="-rotate-90"
                    />
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
      ) : (
        <Select
          isDisabled={props.disabled}
          selectedKey={props.value}
          onSelectionChange={(key) =>
            props.onChange?.(key === null ? "" : String(key))
          }
          isInvalid={Boolean(props.error)}
          aria-describedby={description ? descriptionId : undefined}
        >
          <Label className="text-label-sm font-medium text-fg-secondary">
            {props.label}
          </Label>

          <Button className={cn(triggerClassName, "justify-start text-left")}>
            {props.icon && (
              <Icon
                name={props.icon}
                size={18}
                className="shrink-0 text-fg-secondary"
              />
            )}

            <SelectValue className="min-w-0 flex-1 text-left text-body-md text-fg" />

            <Icon
              name="chevron-down"
              size={18}
              className="shrink-0 text-fg-secondary"
            />
          </Button>

          <Popover className="w-[--trigger-width] rounded-md border border-line bg-surface p-1 shadow-lg">
            <ListBox className="max-h-60 overflow-auto outline-none">
              {(options ?? []).map((option) => (
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
