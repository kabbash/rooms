import { Icon } from "@/components/ui/icon";
import { StatusBadge } from "@/components/ui/status-badge";
import { EquipmentTag } from "@/components/ui/equipment-tag";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { RoomCardDto } from "@/domain/rooms/rooms.types";
import type { ReactNode } from "react";

type RoomCardProps = {
  room: RoomCardDto;
  state?: "available" | "booked" | "yours";
  icon?: "door" | "seat";
  floor: number;
  equipment?: {
    icon: ReactNode;
    label: string;
  }[];
  freeUntil?: string;
  booking?: {
    holder: string;
    avatarName?: string;
    start: string;
    end: string;
    duration: string;
  };
  nextFreeAt?: string;
  onBook?: () => void;
  onCancel?: () => void;
};

export function RoomCard({
  room,
  state,
  icon = "door",
  floor,
  equipment = [],
  freeUntil,
  booking,
  nextFreeAt,
  onBook,
  onCancel,
}: RoomCardProps) {
  const roomIcon = icon === "seat" ? "armchair" : "door";

  return (
    <article className="flex w-full max-w-[340px] flex-col items-start gap-[var(--spacing-md)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-[var(--spacing-lg)] shadow-[0_1px_3px_0_rgba(18,23,38,0.06)]">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 self-stretch">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-brand-subtle text-fg-brand">
            <Icon name={roomIcon} size={20} />
          </div>

          <div className="min-w-0">
            <h3 className="break-words text-h3">{room.displayName}</h3>
            <p className="break-words font-sans text-label-sm font-medium text-fg-tertiary">
              {room.code}
            </p>
          </div>
        </div>

        {state && (
          <div className="shrink-0">
            <StatusBadge status={state === "yours" ? "yourBooking" : state} />
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-body-sm text-fg-secondary">
        <div className="flex items-center gap-2">
          <Icon name="users" size={16} />
          <span>{room.capacityLabel}</span>
        </div>

        <div className="flex items-center gap-2">
          <Icon name="layers" size={16} />
          <span>Floor {floor}</span>
        </div>
      </div>
      {/* Equipment */}
      {equipment.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {equipment.map((item) => (
            <EquipmentTag
              key={item.label}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </div>
      )}

      <div className="w-full border-t border-line" />

      {/* Available: free until + Book */}
      {state === "available" && (
        <div className="flex w-full items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-fg-brand">
            <Icon name="clock" size={16} />
            {freeUntil && (
              <span className="text-body-sm font-medium">
                Free until {freeUntil}
              </span>
            )}
          </div>

          <div className="shrink-0">
            <Button
              size="sm"
              variant="primary"
              onClick={onBook}
              aria-label={`Book ${room.displayName}`}
            >
              Book
            </Button>
          </div>
        </div>
      )}

      {(state === "booked" || state === "yours") && booking && (
        <div className="flex w-full items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <Avatar name={booking.avatarName ?? booking.holder} size={32} />

            <div className="min-w-0">
              <p className="break-words text-body-sm font-medium">
                {booking.holder}
              </p>
              <p className="font-sans text-label-sm text-fg-secondary">
                {booking.start} – {booking.end} · {booking.duration}
              </p>
            </div>
          </div>

          {state === "booked" && nextFreeAt && (
            <p className="shrink-0 text-right text-label-sm font-medium text-fg-tertiary">
              Free at {nextFreeAt}
            </p>
          )}

          {state === "yours" && (
            <div className="shrink-0">
              <Button
                size="sm"
                variant="danger"
                onClick={onCancel}
                aria-label={`Cancel booking for ${room.displayName}`}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
