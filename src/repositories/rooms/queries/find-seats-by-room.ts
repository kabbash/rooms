import "server-only";
import { db } from "@/lib/db";
import type { Seat } from "@/domain/rooms/rooms.types";
import { seatSelect, toSeat } from "../utils";

/** All seats belonging to a room, ordered by seat number. */
export async function findSeatsByRoom(roomId: string): Promise<Seat[]> {
  const rows = await db.seat.findMany({
    where: { roomId },
    select: seatSelect,
    orderBy: { number: "asc" },
  });

  return rows.map(toSeat);
}
