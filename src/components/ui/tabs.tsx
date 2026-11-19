"use client";

import { useRef } from "react";
import type { KeyboardEvent } from "react";
import { cn } from "@/lib/cn";

type TabItem = {
  value: string;
  label: string;
  disabled?: boolean;
};

type TabsProps = {
  items: TabItem[];
  value: string;
  onValueChange: (value: string) => void;
  "aria-label": string;
  className?: string;
};

export function Tabs({
  items,
  value,
  onValueChange,
  "aria-label": ariaLabel,
  className,
}: TabsProps) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) {
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % items.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + items.length) % items.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = items.length - 1;
    } else {
      return;
    }

    event.preventDefault();

    let attempts = 0;

    while (items[nextIndex]?.disabled && attempts < items.length) {
      if (event.key === "ArrowLeft" || event.key === "End") {
        nextIndex = (nextIndex - 1 + items.length) % items.length;
      } else {
        nextIndex = (nextIndex + 1) % items.length;
      }

      attempts++;
    }

    // Stop if all tabs are disabled.
    if (attempts === items.length || items[nextIndex]?.disabled) return;

    tabRefs.current[nextIndex]?.focus();
    const nextTab = items[nextIndex];

    if (!nextTab) return;

    onValueChange(nextTab.value);
  }

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "flex w-full items-stretch gap-1 rounded-md bg-muted p-1 md:inline-flex md:w-fit",
        className,
      )}
    >
      {items.map((item, index) => {
        const isActive = item.value === value;

        return (
          <button
            key={item.value}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            type="button"
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            disabled={item.disabled}
            onClick={() => onValueChange(item.value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={cn(
              "min-w-0 flex-1 cursor-pointer rounded-sm px-4 py-2 text-center text-label-md transition-colors md:flex-none",
              "focus-visible:focus-ring disabled:cursor-not-allowed disabled:opacity-50",
              isActive
                ? "bg-surface text-fg shadow-[0_1px_3px_0_rgba(18,23,38,0.06)]"
                : "bg-transparent text-fg-secondary hover:text-fg",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
