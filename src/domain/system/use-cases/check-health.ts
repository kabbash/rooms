import "server-only";
import { pingDatabase } from "@/repositories/system/queries/ping-database";

export type HealthReport = {
  status: "ok" | "degraded";
  database: "ok" | "unreachable";
};

/** Used by the deploy smoke test and uptime checks: GET /api/health. */
export async function checkHealth(): Promise<HealthReport> {
  try {
    await pingDatabase();
    return { status: "ok", database: "ok" };
  } catch {
    return { status: "degraded", database: "unreachable" };
  }
}
