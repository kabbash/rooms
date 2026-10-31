"use server";

import { revalidatePath } from "next/cache";
import type { Result } from "@/lib/result";
import { DeactivateRoomInput } from "@/domain/rooms/rooms.types";
import { deactivateRoom } from "@/domain/rooms/use-cases/deactivate-room";

/**
 * SERVER ACTION — an entry point for forms and buttons. One action per file.
 *
 * Keep it thin: validate the input → call ONE use case → refresh what changed.
 * No business rules and no database calls here.
 *
 * Usage in a Client Component:
 *   const [state, formAction] = useActionState(deactivateRoomAction, null);
 *   <form action={formAction}><input type="hidden" name="roomId" value={id} />…</form>
 */
export async function deactivateRoomAction(_prev: Result | null, formData: FormData): Promise<Result> {
  const input = DeactivateRoomInput.safeParse(Object.fromEntries(formData));
  if (!input.success) return { ok: false, error: "Invalid request." };

  const result = await deactivateRoom(input.data.roomId);

  if (result.ok) {
    revalidatePath("/");
    revalidatePath("/admin/rooms");
  }
  return result;
}
