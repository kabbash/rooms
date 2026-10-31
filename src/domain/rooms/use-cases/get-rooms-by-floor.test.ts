import { describe, expect, it, vi } from "vitest";
import type { Room } from "@/domain/rooms/rooms.types";

// Replace the repository with a fake: no database needed to test a use case.
vi.mock("@/repositories/rooms/queries/find-active-rooms", () => ({ findActiveRooms: vi.fn() }));

import { findActiveRooms } from "@/repositories/rooms/queries/find-active-rooms";
import { getRoomsByFloor } from "./get-rooms-by-floor";

const cairo: Room = {
  id: "r1",
  code: "Maadi Office-2-1",
  name: "Cairo",
  capacity: 9,
  bookingType: "WHOLE_ROOM",
  floorNumber: 2,
  isActive: true,
};

describe("getRoomsByFloor", () => {
  it("returns floors of room-card DTOs", async () => {
    vi.mocked(findActiveRooms).mockResolvedValue([cairo]);

    const floors = await getRoomsByFloor();

    expect(floors).toEqual([
      {
        floorNumber: 2,
        rooms: [
          {
            id: "r1",
            code: "Maadi Office-2-1",
            displayName: "Cairo",
            capacityLabel: "Up to 9 people",
            bookingType: "WHOLE_ROOM",
          },
        ],
      },
    ]);
  });
});
