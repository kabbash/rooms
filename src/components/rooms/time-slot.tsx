import { cva } from "class-variance-authority";
import type { ComponentProps } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { useRef } from "react";

export type TimeSlotState = "default" | "selected" | "unavailable";

export type TimeSlotProps = {
  start: string;
  end: string;
  state: TimeSlotState;
} & Omit<ComponentProps<"button">, "children">;

export type TimeSlotGroupProps = {
  slots: TimeSlotProps[];
  value: string | null;
  onChange: (value: string) => void;
};

const timeSlotStyles = cva(
  "inline-flex h-10 w-[132px] items-center justify-center gap-1 px-4 py-2  rounded-md border transition-colors",
  {
    variants: {
      state: {
        default:
          "border-line bg-surface text-fg hover:bg-subtle focus-visible:focus-ring",
        selected:
          "border-line-brand bg-brand text-fg-on-brand focus-visible:focus-ring",
        unavailable:
          "border-line bg-subtle text-fg-tertiary cursor-not-allowed",
      },
    },
  },
);

export function TimeSlot({
  start,
  end,
  state,
  className,
  disabled,
  ...buttonProps
}: TimeSlotProps) {
  const isUnavailable = state === "unavailable";

  return (
    <button
      {...buttonProps}
      type="button"
      className={cn(timeSlotStyles({ state }), className)}
      disabled={isUnavailable || disabled}
      aria-label={`${start} to ${end}${isUnavailable ? ", unavailable" : ""}`}
    >
      {state === "selected" && <Icon name="check" size={14} />}
      <span className="text-label-md">
        {start} - {end}
      </span>
    </button>
  );
}

export function TimeSlotGroup({ slots, value, onChange }: TimeSlotGroupProps) {
  const slotRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selectedIndex = slots.findIndex(
    (slot) => slot.start === value && slot.state !== "unavailable",
  );

  const firstAvailableIndex = slots.findIndex(
    (slot) => slot.state !== "unavailable",
  );

  const activeIndex =
    selectedIndex !== -1 ? selectedIndex : firstAvailableIndex;

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (
      !["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(event.key)
    ) {
      return;
    }

    event.preventDefault();

    const direction =
      event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;

    for (let step = 1; step < slots.length; step++) {
      const nextIndex =
        (index + direction * step + slots.length) % slots.length;

      const nextSlot = slots[nextIndex];

      if (nextSlot && nextSlot.state !== "unavailable") {
        slotRefs.current[nextIndex]?.focus();
        onChange(nextSlot.start);
        return;
      }
    }
  }

  return (
    <div
      role="radiogroup"
      aria-label="Available time slots"
      className="grid grid-cols-2 md:grid-cols-3 gap-2"
    >
      {slots.map((slot, index) => {
        const isUnavailable = slot.state === "unavailable";
        const isSelected = slot.start === value && !isUnavailable;

        const state: TimeSlotState = isUnavailable
          ? "unavailable"
          : isSelected
            ? "selected"
            : "default";

        return (
          <TimeSlot
            key={`${slot.start}-${slot.end}`}
            ref={(element) => {
              slotRefs.current[index] = element;
            }}
            start={slot.start}
            end={slot.end}
            state={state}
            role="radio"
            aria-checked={isSelected}
            aria-disabled={isUnavailable}
            tabIndex={index === activeIndex ? 0 : -1}
            onClick={() => onChange(slot.start)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          />
        );
      })}
    </div>
  );
}
