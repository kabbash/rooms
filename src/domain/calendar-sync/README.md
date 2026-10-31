# calendar-sync

**Owns:** two-way sync between bookings and Google Calendar.
**Status:** ⬜ empty. Start after `bookings` works.

## Behaviour from the proposal
- A booking created in Rooms creates a Google Calendar event, tagged with the room/seat and the employee.
- An event cancelled or moved in Google Calendar updates the booking in Rooms.
- Each Silent Room seat syncs as its own calendar hold.

## Where things go
- `repositories/calendar-sync/` → the Google Calendar API calls (`createHold`, `updateHold`, `cancelHold`).
  Google is an external data source, so like the database it is reached only through repositories.
- `use-cases/` → `sync-booking-created.ts`, `handle-calendar-change.ts`
- `app/api/webhooks/google-calendar/route.ts` → an entry point that receives Google push notifications and calls a use case
- Push channels expire, so renewing them needs a scheduled job (another entry point), not a request handler.

Google's types stay inside `repositories/calendar-sync/`. Map them to our own types there.
