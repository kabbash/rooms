import type { RoomCardDto } from "@/domain/rooms/rooms.types";

/**
 * DOMAIN COMPONENT — mirrors the Figma "Room Card".
 * Receives a DTO and renders it. No data fetching, no business rules.
 */
export function RoomCard({ room }: { room: RoomCardDto }) {
  return (
    <article className="rounded-md border border-line bg-surface p-4 shadow-sm">
      <p className="text-overline uppercase tracking-wide text-fg-tertiary">{room.code}</p>
      <h3 className="mt-1 text-h3">{room.displayName}</h3>
      <p className="mt-2 text-body-sm text-fg-secondary">{room.capacityLabel}</p>
      {/* TODO(bookings): live status — "Available" / "Booked until 14:30" / "6/10 seats free" */}
    </article>
  );
}
