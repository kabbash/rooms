# rooms — worked example

**Owns:** floors, rooms, equipment, booking type (whole-room / seat-level / single-occupant).

Every other domain copies this shape:

| File | Role |
|---|---|
| `src/domain/rooms/rooms.types.ts` | Entity `Room`, DTOs `RoomCardDto` / `FloorDto`, input schema `DeactivateRoomInput` |
| `src/domain/rooms/rooms.rules.ts` (+ test) | Pure rules: `roomDisplayName`, `capacityLabel`, `groupByFloor`, `canDeactivate` |
| `src/domain/rooms/use-cases/get-rooms-by-floor.ts` (+ test) | `getRoomsByFloor()` (read) |
| `src/domain/rooms/use-cases/deactivate-room.ts` (+ test) | `deactivateRoom()` (write) |
| `src/domain/rooms/actions/deactivate-room-action.ts` | `deactivateRoomAction`: validate → use case → revalidate |
| `src/repositories/rooms/queries/find-active-rooms.ts` | `findActiveRooms` |
| `src/repositories/rooms/queries/find-room-by-id.ts` | `findRoomById` |
| `src/repositories/rooms/mutations/set-room-active.ts` | `setRoomActive` |
| `src/repositories/rooms/types.ts` | Shared repository types: `RoomRow` |
| `src/repositories/rooms/utils.ts` | Shared helpers: `roomSelect` + `toRoom()` (row → `Room`) |
| `src/components/rooms/` | `RoomCard`, `FloorSection` |

**Read flow:** `app/(rooms)/page.tsx` → `getRoomsByFloor()` → `findActiveRooms()` →
`groupByFloor()` + `toRoomCardDto()` → `<FloorSection />`

**Write flow:** form → `deactivateRoomAction` → `deactivateRoom()` → `findRoomById()` →
`canDeactivate()` → `setRoomActive()` → `revalidatePath()`

## Open tasks
- Equipment model + equipment tags on `RoomCard`
- Admin page A1: list rooms, add/edit, wire up `deactivateRoomAction`
- Floor 1 rooms once names and capacities are shared
