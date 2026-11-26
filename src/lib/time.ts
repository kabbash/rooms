import { TZDate } from "@date-fns/tz";
import { format, addDays, startOfDay } from "date-fns";

export function toOfficeTime(date: Date, tz: string): TZDate {
  return new TZDate(date.getTime(), tz);
}

export function fromOfficeLocal(day: string, time: string, tz: string): Date {
  const [year, month, dayOfMonth] = day.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);

  if (
    ![year, month, dayOfMonth, hours, minutes].every(Number.isInteger) ||
    month! < 1 ||
    month! > 12 ||
    dayOfMonth! < 1 ||
    dayOfMonth! > new Date(Date.UTC(year!, month!, 0)).getUTCDate() ||
    hours! < 0 ||
    hours! > 23 ||
    minutes! < 0 ||
    minutes! > 59
  ) {
    throw new Error("Invalid office date or time");
  }

  const officeDate = new TZDate(
    year!,
    month! - 1,
    dayOfMonth!,
    hours!,
    minutes!,
    tz,
  );

  return new Date(officeDate.getTime());
}

export function officeDayRange(
  date: Date,
  tz: string,
): { start: Date; end: Date } {
  const officeDate = toOfficeTime(date, tz);
  const start = startOfDay(officeDate);
  const end = startOfDay(addDays(officeDate, 1));

  return {
    start: new Date(start.getTime()),
    end: new Date(end.getTime()),
  };
}

export function formatOfficeTime(date: Date, tz: string): string {
  return format(toOfficeTime(date, tz), "HH:mm");
}

export function formatOfficeDate(date: Date, tz: string): string {
  return format(toOfficeTime(date, tz), "EEE, dd MMM");
}

export function formatOfficeRange(start: Date, end: Date, tz: string): string {
  return `${formatOfficeTime(start, tz)}–${formatOfficeTime(end, tz)}`;
}
