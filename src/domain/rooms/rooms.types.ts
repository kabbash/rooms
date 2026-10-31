import { z } from "zod";

/**
 * TYPES — the vocabulary of the rooms domain.
 *
 * - Entities: what repositories return. Our own types, never Prisma's.
 * - DTOs: what use cases hand to pages and components. Plain, serializable,
 *   only the fields the UI needs, safe to send to the browser.
 * - Input schemas: Zod schemas that Server Actions validate form data against.
 */

export type BookingType = "WHOLE_ROOM" | "SEAT_LEVEL" | "SINGLE_OCCUPANT";

// ─── Entity ──────────────────────────────────────────────────────────────────

export type Room = {
  id: string;
  code: string; // "Maadi Office-2-1"
  name: string | null; // "Cairo"
  capacity: number;
  bookingType: BookingType;
  floorNumber: number;
  isActive: boolean;
};

// ─── DTOs ────────────────────────────────────────────────────────────────────

export type RoomCardDto = {
  id: string;
  code: string;
  displayName: string;
  capacityLabel: string;
  bookingType: BookingType;
};

export type FloorDto = {
  floorNumber: number;
  rooms: RoomCardDto[];
};

// ─── Inputs ──────────────────────────────────────────────────────────────────

export const DeactivateRoomInput = z.object({
  roomId: z.string().min(1),
});
export type DeactivateRoomInput = z.infer<typeof DeactivateRoomInput>;
