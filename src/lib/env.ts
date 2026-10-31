import "server-only";
import { z } from "zod";

/** Validated environment. Import `env` instead of reading process.env directly. */
const schema = z.object({
  DATABASE_URL: z.string().min(1),
  PORTAL_URL: z.url().default("https://portal.remotecoders.org"),
  OFFICE_TIMEZONE: z.string().default("Africa/Cairo"),
});

export const env = schema.parse(process.env);
