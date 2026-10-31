import "server-only";
import { db } from "@/lib/db";

/** Round-trips `SELECT 1`. Throws if the database is unreachable. */
export async function pingDatabase(): Promise<void> {
  await db.$queryRaw`SELECT 1`;
}
