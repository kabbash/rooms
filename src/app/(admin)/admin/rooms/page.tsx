import type { Metadata } from "next";

export const metadata: Metadata = { title: "Manage rooms" };

/**
 * A1 — Manage rooms (URL "/admin/rooms").
 * Lives in its own route group so it can get its own layout and admin-only guard.
 * TODO(auth): restrict to admins. TODO(rooms): list / add / edit rooms; wire up deactivateRoomAction (domain/rooms/actions/deactivate-room-action.ts).
 */
export default function ManageRoomsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-h1">Manage rooms</h1>
      <p className="mt-2 text-body-sm text-fg-tertiary">Not built yet.</p>
    </main>
  );
}
