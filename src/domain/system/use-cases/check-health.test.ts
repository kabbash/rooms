import { beforeEach, describe, expect, it, vi } from "vitest";

// Replace the repository with a fake: no database needed to test the use case.
vi.mock("@/repositories/system/queries/ping-database", () => ({ pingDatabase: vi.fn() }));

import { pingDatabase } from "@/repositories/system/queries/ping-database";
import { checkHealth } from "./check-health";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("checkHealth", () => {
  it("is ok when the database answers", async () => {
    vi.mocked(pingDatabase).mockImplementation(async () => {});

    expect(await checkHealth()).toEqual({ status: "ok", database: "ok" });
  });

  it("is degraded when the database is unreachable", async () => {
    vi.mocked(pingDatabase).mockImplementation(async () => {
      throw new Error("database unreachable (test)");
    });

    expect(await checkHealth()).toEqual({ status: "degraded", database: "unreachable" });
  });
});
