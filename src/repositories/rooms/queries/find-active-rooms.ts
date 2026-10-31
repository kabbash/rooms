import "server-only";
import { db } from "@/lib/db";
import type { Room } from "@/domain/rooms/rooms.types";
import { roomSelect, toRoom } from "../utils";

/** All rooms that are in service, ordered by floor then by their position on the floor. */
export async function findActiveRooms(): Promise<Room[]> {
  const rows = await db.room.findMany({
    where: { isActive: true },
    select: roomSelect,
    orderBy: [{ floor: { number: "asc" } }, { sortOrder: "asc" }],
  });
  return rows.map(toRoom);
}
