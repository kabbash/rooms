import type { FloorDto } from "@/domain/rooms/rooms.types";
import { RoomCard } from "./room-card";

export function FloorSection({ floor }: { floor: FloorDto }) {
  return (
    <section>
      <h2 className="text-h2">Floor {floor.floorNumber}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {floor.rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </section>
  );
}
