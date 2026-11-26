import { describe, it, expect } from "vitest";
import {
  toOfficeTime,
  fromOfficeLocal,
  officeDayRange,
  formatOfficeTime,
  formatOfficeDate,
  formatOfficeRange,
} from "./time";

describe("toOfficeTime", () => {
  it("converts a UTC date to Cairo office time", () => {
    const date = new Date("2026-11-23T12:30:00.000Z");

    const result = toOfficeTime(date, "Africa/Cairo");

    expect(result.getHours()).toBe(14);
    expect(result.getMinutes()).toBe(30);
  });
});

describe("fromOfficeLocal", () => {
  it("converts Cairo local date and time to UTC", () => {
    const result = fromOfficeLocal("2026-11-23", "14:30", "Africa/Cairo");

    expect(result.toISOString()).toBe("2026-11-23T12:30:00.000Z");
  });

  it("supports a timezone other than Cairo", () => {
    const result = fromOfficeLocal("2026-01-15", "09:00", "America/New_York");

    expect(result.toISOString()).toBe("2026-01-15T14:00:00.000Z");
  });

  it("throws an error for invalid date or time", () => {
    expect(() =>
      fromOfficeLocal("2026-02-30", "14:30", "Africa/Cairo"),
    ).toThrow("Invalid office date or time");

    expect(() =>
      fromOfficeLocal("2026-11-23", "25:00", "Africa/Cairo"),
    ).toThrow("Invalid office date or time");
  });
});

describe("officeDayRange", () => {
  it("returns the start and end of a Cairo office day in UTC", () => {
    const date = new Date("2026-11-23T12:00:00.000Z");

    const result = officeDayRange(date, "Africa/Cairo");

    expect(result.start.toISOString()).toBe("2026-11-22T22:00:00.000Z");
    expect(result.end.toISOString()).toBe("2026-11-23T22:00:00.000Z");
  });

  it("handles a day that crosses midnight in Cairo", () => {
    const date = new Date("2026-11-23T22:30:00.000Z");

    const result = officeDayRange(date, "Africa/Cairo");

    expect(result.start.toISOString()).toBe("2026-11-23T22:00:00.000Z");
    expect(result.end.toISOString()).toBe("2026-11-24T22:00:00.000Z");
  });

  it("handles the Cairo daylight saving time start", () => {
    const date = new Date("2026-04-24T12:00:00.000Z");

    const result = officeDayRange(date, "Africa/Cairo");

    const duration = result.end.getTime() - result.start.getTime();

    expect(duration).toBe(23 * 60 * 60 * 1000);
  });

  it("handles the Cairo daylight saving time end", () => {
    const date = new Date("2026-10-29T12:00:00.000Z");

    const result = officeDayRange(date, "Africa/Cairo");

    const duration = result.end.getTime() - result.start.getTime();

    expect(duration).toBe(25 * 60 * 60 * 1000);
  });
});

describe("formatOfficeTime", () => {
  it("formats time using the 24-hour format", () => {
    const date = new Date("2026-11-23T12:30:00.000Z");

    expect(formatOfficeTime(date, "Africa/Cairo")).toBe("14:30");
  });
});

describe("formatOfficeDate", () => {
  it("formats the date using the expected format", () => {
    const date = new Date("2026-11-23T12:30:00.000Z");

    expect(formatOfficeDate(date, "Africa/Cairo")).toBe("Mon, 23 Nov");
  });
});

describe("formatOfficeRange", () => {
  it("formats a time range using the 24-hour format", () => {
    const start = new Date("2026-11-23T12:30:00.000Z");
    const end = new Date("2026-11-23T13:30:00.000Z");

    expect(formatOfficeRange(start, end, "Africa/Cairo")).toBe("14:30–15:30");
  });
});
