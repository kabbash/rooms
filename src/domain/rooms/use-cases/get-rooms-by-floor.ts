import "server-only";
import { findActiveRooms } from "@/repositories/rooms/queries/find-active-rooms";
import { capacityLabel, groupByFloor, roomDisplayName } from "@/domain/rooms/rooms.rules";
import type { FloorDto, Room, RoomCardDto } from "@/domain/rooms/rooms.types";

/**
 * USE CASE — one file per thing a user wants to do.
 *
 * A use case: loads data through repositories → asks the rules → saves through
 * repositories → returns a DTO or a Result.
 *
 * Called ONLY from entry points: pages/layouts/route handlers in app/, and actions/.
 * Never from components, and never from another use case.
 */

function toRoomCardDto(room: Room): RoomCardDto {
  return {
    id: room.id,
    code: room.code,
    displayName: roomDisplayName(room),
    capacityLabel: capacityLabel(room),
    bookingType: room.bookingType,
  };
}

/** D1 — the Rooms page: active rooms, grouped by floor. */
export async function getRoomsByFloor(): Promise<FloorDto[]> {
  const rooms = await findActiveRooms();
  return groupByFloor(rooms).map((floor) => ({
    floorNumber: floor.floorNumber,
    rooms: floor.rooms.map(toRoomCardDto),
  }));
}
