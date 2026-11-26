import "server-only";
import type { Prisma } from "@/generated/prisma/client";
import type { Seat, Room } from "@/domain/rooms/rooms.types";
import type { RoomRow, SeatRow } from "./types";
/**
 * Helpers shared by the rooms queries and mutations.
 *
 * `roomSelect` + `toRoom()`: every query loads the same columns and returns the same `Room` shape.
 */
export const roomSelect = {
  id: true,
  code: true,
  name: true,
  capacity: true,
  bookingType: true,
  isActive: true,
  floor: { select: { number: true } },
} satisfies Prisma.RoomSelect;

export function toRoom(row: RoomRow): Room {
  return {
    id: row.id,
    code: row.code,
    name: row.name,
    capacity: row.capacity,
    bookingType: row.bookingType,
    floorNumber: row.floor.number,
    isActive: row.isActive,
  };
}

export const seatSelect = {
  id: true,
  roomId: true,
  number: true,
  isActive: true,
} satisfies Prisma.SeatSelect;

export function toSeat(row: SeatRow): Seat {
  return {
    id: row.id,
    roomId: row.roomId,
    number: row.number,
    isActive: row.isActive,
  };
}
