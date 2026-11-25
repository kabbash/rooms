import type { Prisma } from "@/generated/prisma/client";
import type { roomSelect, seatSelect } from "./utils";
/**
 * Types shared by the rooms queries and mutations.
 */

/** A room row as the rooms queries load it (the columns in `roomSelect`). */
export type RoomRow = Prisma.RoomGetPayload<{ select: typeof roomSelect }>;

/** A seat row as the rooms queries load it (the columns in seatSelect). */
export type SeatRow = Prisma.SeatGetPayload<{
  select: typeof seatSelect;
}>;
