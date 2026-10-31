import type { Room } from "./rooms.types";

/**
 * RULES — business logic as pure functions.
 *
 * No database, no React, no Next. Same input → same output.
 * Every decision the app makes about rooms should live here, so it can be unit-tested.
 */

/** The friendly name if there is one, otherwise the code. */
export function roomDisplayName(room: Pick<Room, "name" | "code">): string {
  return room.name?.trim() || room.code;
}

/** Short capacity label for room cards. */
export function capacityLabel(room: Pick<Room, "capacity" | "bookingType">): string {
  if (room.bookingType === "SEAT_LEVEL") return `${room.capacity} seats`;
  return room.capacity === 1 ? "1 person" : `Up to ${room.capacity} people`;
}

/** Rooms grouped by floor, floors ascending. */
export function groupByFloor(rooms: Room[]): { floorNumber: number; rooms: Room[] }[] {
  const byFloor = new Map<number, Room[]>();
  for (const room of rooms) {
    const list = byFloor.get(room.floorNumber) ?? [];
    list.push(room);
    byFloor.set(room.floorNumber, list);
  }
  return [...byFloor.entries()]
    .sort(([a], [b]) => a - b)
    .map(([floorNumber, rooms]) => ({ floorNumber, rooms }));
}

/** Can this room be taken out of service? */
export function canDeactivate(room: Pick<Room, "isActive">): { ok: true } | { ok: false; reason: string } {
  if (!room.isActive) return { ok: false, reason: "This room is already inactive." };
  // TODO(bookings): refuse if the room has upcoming confirmed bookings.
  return { ok: true };
}
