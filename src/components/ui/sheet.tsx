"use client";

import * as Dialog from "@radix-ui/react-dialog";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

// Root
export const Sheet = Dialog.Root;

// Trigger: the button that opens the sheet
export const SheetTrigger = Dialog.Trigger;

// Close: any element that closes the sheet
export const SheetClose = Dialog.Close;

// Header
export function SheetHeader({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 p-6 border-b  border-line",
        className,
      )}
      {...props}
    />
  );
}

// Title
export const SheetTitle = Dialog.Title;

// Description
export const SheetDescription = Dialog.Description;

// Body: scrollable content
export function SheetBody({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("min-h-0 flex-1 overflow-y-auto px-6 py-2", className)}
      {...props}
    />
  );
}

// Footer
export function SheetFooter({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "mt-auto flex flex-col-reverse gap-3 border-t border-line p-6 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

// Content
type SheetContentProps = ComponentPropsWithoutRef<typeof Dialog.Content> & {
  showCloseButton?: boolean;
};

export function SheetContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: SheetContentProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-overlay" />

      <Dialog.Content
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 flex max-h-[90dvh] flex-col rounded-t-lg border border-line bg-surface shadow-lg outline-none",
          "sm:bottom-0 sm:left-auto sm:top-0 sm:h-full sm:max-h-none sm:w-[520px] sm:rounded-none sm:border-l",
          className,
        )}
        {...props}
      >
        {/* Mobile handle */}
        <div
          className="mx-auto mt-3 h-1 w-10 rounded-full bg-line-strong sm:hidden"
          aria-hidden="true"
        />

        {children}

        {showCloseButton && (
          <Dialog.Close
            type="button"
            aria-label="Close"
            className="absolute right-4 top-4 inline-flex size-8 items-center justify-center rounded-sm text-fg-secondary hover:bg-muted focus-visible:focus-ring"
          >
            <span aria-hidden="true">×</span>
          </Dialog.Close>
        )}
      </Dialog.Content>
    </Dialog.Portal>
  );
}
