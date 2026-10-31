import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/** Shared primitive mirroring the Figma "Button" component. Token classes only — no raw colors. */
const button = cva(
  "inline-flex items-center justify-center gap-2 rounded-sm text-label-md transition-colors focus-visible:focus-ring disabled:pointer-events-none disabled:bg-disabled disabled:text-fg-tertiary",
  {
    variants: {
      variant: {
        primary: "bg-brand text-fg-on-brand hover:bg-brand-hover",
        secondary: "border border-line-strong bg-surface text-fg hover:bg-subtle",
        ghost: "text-fg-secondary hover:bg-muted",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-10 px-4",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonProps = ComponentProps<"button"> & VariantProps<typeof button>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(button({ variant, size }), className)} {...props} />;
}
