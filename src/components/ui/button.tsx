import { cva, type VariantProps } from "class-variance-authority";
import { cloneElement, isValidElement } from "react";
import type { ComponentProps, ReactElement, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Shared primitive mirroring the Figma "Button" component. Token classes only — no raw colors. */
const button = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-label-md transition-colors cursor-pointer disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-disabled disabled:text-fg-tertiary",
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-fg-on-brand hover:bg-brand-hover focus-visible:focus-ring",
        secondary:
          "border border-line bg-surface text-fg hover:border-line-strong hover:bg-subtle focus-visible:focus-ring",
        ghost:
          "text-fg-secondary hover:bg-brand-subtle focus-visible:border-2 focus-visible:border-line-brand",
        danger:
          "border border-line-danger bg-danger-subtle text-fg-danger hover:[border-color:var(--color-text-danger)] focus-visible:focus-ring",
      },
      size: {
        sm: "py-2 px-3",
        md: "py-3 px-5",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof button> & {
    leadingIcon?: ReactNode;
    trailingIcon?: ReactNode;
    loading?: boolean;
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  leadingIcon,
  trailingIcon,
  loading,
  disabled,
  asChild,
  children,
  ...props
}: ButtonProps) {
  const buttonClassName = cn(button({ variant, size }), className);

  if (asChild) {
    if (!isValidElement(children) || children.type !== "a") {
      throw new Error("Button with asChild must have an <a> child.");
    }

    const child = children as ReactElement<ComponentProps<"a">>;

    return cloneElement(child, {
      className: cn(
        buttonClassName,
        (disabled || loading) &&
          "pointer-events-none cursor-not-allowed bg-disabled text-fg-tertiary",
        child.props.className,
      ),
      "aria-busy": loading || undefined,
      children: (
        <>
          {loading && (
            <span
              className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
              aria-hidden="true"
            />
          )}
          {child.props.children}
        </>
      ),
      "aria-disabled": disabled || loading || undefined,
      tabIndex: disabled || loading ? -1 : child.props.tabIndex,
      onClick: (event) => {
        if (disabled || loading) {
          event.preventDefault();
          return;
        }

        child.props.onClick?.(event);
      },
    });
  }

  return (
    <button
      className={buttonClassName}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <span
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      ) : (
        leadingIcon
      )}

      {children}

      {!loading && trailingIcon}
    </button>
  );
}
