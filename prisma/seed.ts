import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, type BookingType } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Source: Room Booking proposal → "Floor 2 — Room Inventory".
const floor2: { code: string; name: string | null; capacity: number; bookingType: BookingType }[] = [
  { code: "Maadi Office-2-1", name: "Cairo", capacity: 9, bookingType: "WHOLE_ROOM" },
  { code: "Maadi Office-2-2", name: "Sanaa", capacity: 5, bookingType: "WHOLE_ROOM" },
  { code: "Maadi Office-2-3", name: "Asmara", capacity: 5, bookingType: "WHOLE_ROOM" },
  { code: "Maadi Office-2-4", name: "Khartoum", capacity: 11, bookingType: "WHOLE_ROOM" },
  { code: "Maadi Office-2-5", name: "Damascus", capacity: 7, bookingType: "WHOLE_ROOM" },
  { code: "Silent Room", name: null, capacity: 10, bookingType: "SEAT_LEVEL" },
  { code: "Silent Box 1", name: null, capacity: 1, bookingType: "SINGLE_OCCUPANT" },
  { code: "Silent Box 2", name: null, capacity: 1, bookingType: "SINGLE_OCCUPANT" },
];

async function main() {
  // `--if-empty` (used on every cloud deploy): only seed a brand-new database, so data
  // the team entered on dev survives deploys. Re-seed on purpose with plain `db:seed`.
  if (process.argv.includes("--if-empty") && (await prisma.floor.count()) > 0) {
    console.log("Database already has data, skipping seed.");
    return;
  }

  // Floor 1 is an open item in the proposal (names/capacities not shared yet).
  await prisma.floor.upsert({ where: { number: 1 }, update: {}, create: { number: 1, name: "Floor 1" } });
  const f2 = await prisma.floor.upsert({ where: { number: 2 }, update: {}, create: { number: 2, name: "Floor 2" } });

  for (const [i, r] of floor2.entries()) {
    await prisma.room.upsert({
      where: { code: r.code },
      update: { name: r.name, capacity: r.capacity, bookingType: r.bookingType, sortOrder: i },
      create: { ...r, sortOrder: i, floorId: f2.id },
    });
  }

  console.log(`Seeded 2 floors and ${floor2.length} rooms.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
