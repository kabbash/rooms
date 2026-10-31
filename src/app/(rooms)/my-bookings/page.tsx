import type { Metadata } from "next";

export const metadata: Metadata = { title: "My bookings" };

/** D4 — My bookings. TODO(booking): list the signed-in user's upcoming bookings. */
export default function MyBookingsPage() {
  return (
    <>
      <h1 className="text-h1">My bookings</h1>
      <p className="mt-2 text-body-sm text-fg-tertiary">Not built yet — see src/domain/bookings/README.md.</p>
    </>
  );
}
