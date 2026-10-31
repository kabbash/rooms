import "server-only";
import { db } from "@/lib/db";
import type { Room } from "@/domain/rooms/rooms.types";
import { roomSelect, toRoom } from "../utils";

/** One room, active or not. `null` when the id does not exist. */
export async function findRoomById(roomId: string): Promise<Room | null> {
  const row = await db.room.findUnique({ where: { id: roomId }, select: roomSelect });
  return row ? toRoom(row) : null;
}
