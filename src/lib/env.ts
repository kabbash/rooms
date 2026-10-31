import "server-only";
import { z } from "zod";

/** Validated environment. Import `env` instead of reading process.env directly. */
const schema = z.object({
  DATABASE_URL: z.string().min(1),
  PORTAL_URL: z.url().default("https://portal.remotecoders.org"),
  OFFICE_TIMEZONE: z.string().default("Africa/Cairo"),
  /** Git commit the running image was built from. Set by the deploy workflow. */
  COMMIT_SHA: z.string().default("local"),
});

// BASIC_AUTH_USER / BASIC_AUTH_PASSWORD are read in src/proxy.ts directly:
// the proxy runs outside the React Server layer, where "server-only" can't be imported.

export const env = schema.parse(process.env);
