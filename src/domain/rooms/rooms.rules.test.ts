import { describe, expect, it } from "vitest";
import { canDeactivate, capacityLabel, groupByFloor, roomDisplayName } from "./rooms.rules";
import type { Room } from "./rooms.types";

const room = (overrides: Partial<Room> = {}): Room => ({
  id: "r1",
  code: "Maadi Office-2-1",
  name: "Cairo",
  capacity: 9,
  bookingType: "WHOLE_ROOM",
  floorNumber: 2,
  isActive: true,
  ...overrides,
});

describe("roomDisplayName", () => {
  it("prefers the friendly name", () => {
    expect(roomDisplayName(room())).toBe("Cairo");
  });

  it("falls back to the code when there is no name", () => {
    expect(roomDisplayName(room({ name: null, code: "Silent Box 1" }))).toBe("Silent Box 1");
  });
});

describe("capacityLabel", () => {
  it("talks about seats for seat-level rooms", () => {
    expect(capacityLabel(room({ bookingType: "SEAT_LEVEL", capacity: 10 }))).toBe("10 seats");
  });

  it("handles single occupants", () => {
    expect(capacityLabel(room({ bookingType: "SINGLE_OCCUPANT", capacity: 1 }))).toBe("1 person");
  });
});

describe("groupByFloor", () => {
  it("groups rooms and sorts floors ascending", () => {
    const groups = groupByFloor([
      room({ id: "a", floorNumber: 2 }),
      room({ id: "b", floorNumber: 1 }),
      room({ id: "c", floorNumber: 2 }),
    ]);
    expect(groups.map((g) => g.floorNumber)).toEqual([1, 2]);
    expect(groups[1]?.rooms.map((r) => r.id)).toEqual(["a", "c"]);
  });
});

describe("canDeactivate", () => {
  it("allows deactivating an active room", () => {
    expect(canDeactivate(room())).toEqual({ ok: true });
  });

  it("refuses a room that is already inactive", () => {
    expect(canDeactivate(room({ isActive: false })).ok).toBe(false);
  });
});
