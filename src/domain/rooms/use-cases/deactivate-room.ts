import "server-only";
import { setRoomActive } from "@/repositories/rooms/mutations/set-room-active";
import { findRoomById } from "@/repositories/rooms/queries/find-room-by-id";
import type { Result } from "@/lib/result";
import { canDeactivate } from "@/domain/rooms/rooms.rules";

/** A1 — admin takes a room out of service. Example of the write flow. */
export async function deactivateRoom(roomId: string): Promise<Result> {
  // TODO(auth): only admins may do this — check the current user's role first.
  const room = await findRoomById(roomId);
  if (!room) return { ok: false, error: "Room not found." };

  const check = canDeactivate(room);
  if (!check.ok) return { ok: false, error: check.reason };

  await setRoomActive(roomId, false);
  return { ok: true };
}
