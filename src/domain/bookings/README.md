# bookings

**Owns:** bookings, availability, time slots, booking rules.
**Status:** ⬜ empty. Copy the shape of `domain/rooms`.

## Rules from the proposal (these go in `bookings.rules.ts`)
- A room or seat can't have two confirmed bookings that overlap in time.
- Whole-room and single-occupant spaces hold one booking at a time.
- The Silent Room is booked per seat (10 seats). A person can pick a seat or take the next open one.
- The holder defaults to the signed-in employee. Only admins can book on someone else's behalf.
- Quick picks show today's next open slots; a date/time picker covers anything later.

## Files to create
| File | First things in it |
|---|---|
| `bookings.types.ts` | `Booking` entity, `BookingRowDto`, `BookRoomInput` (Zod) |
| `bookings.rules.ts` | `overlaps(a, b)`, `canBook(request, existing, user)`, `nextOpenSeat(...)` |
| `use-cases/` | `get-my-bookings.ts`, `get-room-availability.ts`, `book-room.ts` |
| `actions/` | `book-room-action.ts`, `cancel-booking-action.ts` |
| `repositories/bookings/queries/` | `find-bookings-for-room.ts`, `find-upcoming-by-holder.ts` |
| `repositories/bookings/mutations/` | `create-booking-if-free.ts` (owns the transaction), `cancel-booking.ts` |
| `components/bookings/` | `BookingPanel` (D2), `SeatPicker`, `BookingRow` (D4) |

## Suggested order
1. `overlaps()` + tests. Edge case: ranges that only touch (10:00–11:00 and 11:00–12:00) don't overlap.
2. `Booking` model in `prisma/schema.prisma` → `npm run db:migrate`.
3. Read side: "My bookings" page (D4).
4. Write side: `bookRoom` use case + action + booking panel.
5. Add a Postgres exclusion constraint so overlapping confirmed bookings are impossible even under races.

Store times in UTC. Display them in `OFFICE_TIMEZONE` (Africa/Cairo).
