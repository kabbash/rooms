import "server-only";
import { db } from "@/lib/db";

/** Puts a room in or out of service. */
export async function setRoomActive(roomId: string, isActive: boolean): Promise<void> {
  await db.room.update({ where: { id: roomId }, data: { isActive } });
}
