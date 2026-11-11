"use client";

import * as ToastPrimitive from "@radix-ui/react-toast";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

// Provider
export const ToastProvider = ToastPrimitive.Provider;

// Root
export const Toast = ToastPrimitive.Root;

// Title
export const ToastTitle = ToastPrimitive.Title;

// Description
export const ToastDescription = ToastPrimitive.Description;

// Close button
export const ToastClose = ToastPrimitive.Close;

// Viewport: where toasts appear
type ToastViewportProps = ComponentPropsWithoutRef<
  typeof ToastPrimitive.Viewport
>;

export function ToastViewport({ className, ...props }: ToastViewportProps) {
  return (
    <ToastPrimitive.Viewport
      className={cn(
        "fixed right-4 top-1  z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2 outline-none",
        className,
      )}
      {...props}
    />
  );
}

// Content layout
type ToastContentProps = ComponentPropsWithoutRef<"div">;

export function ToastContent({ className, ...props }: ToastContentProps) {
  return <div className={cn("flex items-start gap-3", className)} {...props} />;
}

// Success icon
export function ToastSuccessIcon() {
  return (
    <span
      aria-hidden="true"
      className="flex size-6 shrink-0 items-center justify-center rounded-full bg-fg-on-inverse text-inverse"
    >
      ✓
    </span>
  );
}
