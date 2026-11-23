import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
type Status = "available" | "booked" | "fewSeats" | "yourBooking";

type StatusBadgeProps = {
  status: Status;
  children?: ReactNode;
};
const statusLabels: Record<Status, string> = {
  available: "Available",
  booked: "Booked",
  fewSeats: "Few seats",
  yourBooking: "Your booking",
};
const statusStyles: Record<Status, string> = {
  available: "bg-brand-subtle  text-fg-brand ",
  booked: "bg-danger-subtle text-fg-danger",
  fewSeats: "bg-warning-subtle text-fg-warning",
  yourBooking: "bg-info-subtle text-fg-info",
};

const statusDotStyles: Record<Status, string> = {
  available: "bg-fg-brand",
  booked: "bg-fg-danger",
  fewSeats: "bg-fg-warning",
  yourBooking: "bg-fg-info",
};

export function StatusBadge({ status, children }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[6px] rounded-full px-[10px] py-1 text-label-sm font-sans ",
        statusStyles[status],
      )}
    >
      <span
        aria-hidden="true"
        className={cn("size-2 rounded-full", statusDotStyles[status])}
      />

      {children ?? statusLabels[status]}
    </span>
  );
}
