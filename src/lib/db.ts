import "server-only";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import { env } from "@/lib/env";

/**
 * One Prisma client per process (cached on globalThis so dev hot-reload
 * doesn't open a new connection pool every save).
 *
 * Only files in `repositories/` import this — never pages or components.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter: new PrismaPg({ connectionString: env.DATABASE_URL }) });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
