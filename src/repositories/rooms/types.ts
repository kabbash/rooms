import type { Prisma } from "@/generated/prisma/client";
import type { roomSelect } from "./utils";

/**
 * Types shared by the rooms queries and mutations.
 */

/** A room row as the rooms queries load it (the columns in `roomSelect`). */
export type RoomRow = Prisma.RoomGetPayload<{ select: typeof roomSelect }>;
