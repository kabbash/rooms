import { connection, NextResponse } from "next/server";
import { checkHealth } from "@/domain/system/use-cases/check-health";
import { env } from "@/lib/env";

/**
 * GET /api/health — an ENTRY POINT.
 * 200 when the app and database are up, 503 otherwise.
 * Not behind the basic-auth gate (see src/proxy.ts) so deploys can smoke-test it.
 */
export async function GET() {
  await connection(); // always run at request time, never prerendered
  const report = await checkHealth();
  return NextResponse.json(
    { ...report, commit: env.COMMIT_SHA },
    { status: report.status === "ok" ? 200 : 503, headers: { "Cache-Control": "no-store" } },
  );
}
