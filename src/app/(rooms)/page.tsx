import { Suspense } from "react";
import { connection } from "next/server";
import { FloorSection } from "@/components/rooms/floor-section";
import { getRoomsByFloor } from "@/domain/rooms/use-cases/get-rooms-by-floor";

/**
 * D1 — Rooms (URL "/"). An ENTRY POINT.
 *
 * A page: call a use case → pass the DTOs to domain components.
 * No business logic, no repositories, no database.
 *
 * With `cacheComponents` on, dynamic data must render inside <Suspense>.
 */
export default function RoomsPage() {
  return (
    <>
      <h1 className="text-h1">Rooms</h1>
      <p className="mt-1 text-body-sm text-fg-secondary">Maadi office · book a room or a seat</p>

      <Suspense fallback={<p className="mt-8 text-body-sm text-fg-tertiary">Loading rooms…</p>}>
        <RoomList />
      </Suspense>
    </>
  );
}

async function RoomList() {
  await connection(); // render at request time (room data comes from the database)
  const floors = await getRoomsByFloor();

  if (floors.length === 0) {
    return <p className="mt-8 text-body-sm text-fg-tertiary">No rooms yet. Run `npm run db:seed`.</p>;
  }

  return (
    <div className="mt-8 space-y-10">
      {floors.map((floor) => (
        <FloorSection key={floor.floorNumber} floor={floor} />
      ))}
    </div>
  );
}
