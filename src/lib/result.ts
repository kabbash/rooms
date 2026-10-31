/**
 * What use cases and Server Actions return for writes.
 * Expected failures ("room already booked") are values, not exceptions,
 * so the UI can show them. Throw only for real bugs and outages.
 */
export type Result = { ok: true } | { ok: false; error: string };
