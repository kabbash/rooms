import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Room } from "@/domain/rooms/rooms.types";

// Replace the repositories with fakes: no database needed to test a use case.
vi.mock("@/repositories/rooms/queries/find-room-by-id", () => ({ findRoomById: vi.fn() }));
vi.mock("@/repositories/rooms/mutations/set-room-active", () => ({ setRoomActive: vi.fn() }));

import { setRoomActive } from "@/repositories/rooms/mutations/set-room-active";
import { findRoomById } from "@/repositories/rooms/queries/find-room-by-id";
import { deactivateRoom } from "./deactivate-room";

const cairo: Room = {
  id: "r1",
  code: "Maadi Office-2-1",
  name: "Cairo",
  capacity: 9,
  bookingType: "WHOLE_ROOM",
  floorNumber: 2,
  isActive: true,
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("deactivateRoom", () => {
  it("deactivates an active room", async () => {
    vi.mocked(findRoomById).mockResolvedValue(cairo);

    const result = await deactivateRoom("r1");

    expect(result).toEqual({ ok: true });
    expect(setRoomActive).toHaveBeenCalledWith("r1", false);
  });

  it("does not write when the rules say no", async () => {
    vi.mocked(findRoomById).mockResolvedValue({ ...cairo, isActive: false });

    const result = await deactivateRoom("r1");

    expect(result.ok).toBe(false);
    expect(setRoomActive).not.toHaveBeenCalled();
  });

  it("reports a missing room", async () => {
    vi.mocked(findRoomById).mockResolvedValue(null);

    expect(await deactivateRoom("nope")).toEqual({ ok: false, error: "Room not found." });
  });
});
