# ADR 0001 — App structure: components, domain, repositories

- **Status:** Accepted
- **Date:** 2026-10-31
- **Deciders:** Room Booking team

## Context

Rooms is a standalone Next.js app for booking meeting rooms, Silent Room seats
and Silent Boxes in the Maadi office, with two-way Google Calendar sync. Interns
will build most of it, so the structure must:

- be recognizable to anyone who has used Next.js or shadcn/ui;
- keep business rules out of pages and out of database code, so they can be tested;
- make it obvious where every new file goes;
- be enforced by lint, not only by code review.

## Decision

### Top-level folders

```
src/
├─ app/            Entry points: pages, layouts, route handlers
├─ components/
│  ├─ ui/          Design system (Button, Badge, Drawer…), no domain knowledge
│  └─ <domain>/    Domain components (RoomCard, BookingPanel…)
├─ domain/
│  └─ <domain>/    types (entities, DTOs, inputs) · rules · use cases · actions
├─ repositories/
│  └─ <domain>/    queries/ · mutations/ (one function per file): the only code that touches the DB or external APIs
└─ lib/            db client, env, cn, Result, date helpers
```

Domains: `rooms` (worked example), `bookings`, `auth`, `calendar-sync`.

### What each file does

| File | Responsibility | Never |
|---|---|---|
| `domain/<x>/<x>.types.ts` | Entities (what repositories return), DTOs (what the UI gets), Zod input schemas | Logic |
| `domain/<x>/<x>.rules.ts` | Business decisions as pure functions | Database, React, Next |
| `domain/<x>/use-cases/<name>.ts` | One file per user intent: load via repositories → apply rules → save via repositories → return a DTO or `Result` | Prisma, React, calling other use cases |
| `domain/<x>/actions/<name>-action.ts` | One Server Action per file: validate input with Zod → call one use case → revalidate | Business rules, repositories |
| `repositories/<x>/queries/<name>.ts` | One read per file. Map rows to entity types. | Business decisions |
| `repositories/<x>/mutations/<name>.ts` | One write per file. Owns transactions when a write must be atomic. | Business decisions |
| `components/<x>/` | Render DTOs, call actions from forms | Data fetching, rules |
| `components/ui/` | Generic design-system pieces | Anything domain-specific |

### Who may call whom

```
ENTRY POINTS                       DOMAIN                        DATA
app/ pages, layouts, routes ─┐
                             ├──► use-cases/ ─────────────► repositories/<x>/ ──► lib/db, Google API
actions/ ────────────────────┘          │
                                        └──► <x>.rules.ts (pure)

components/ ──► DTO types (<x>.types.ts) and actions/ only
```

1. **Use cases run only from entry points:** pages, layouts, route handlers (e.g. webhooks), Server Actions, and later scheduled jobs.
2. **Use cases don't call other use cases.** If `bookRoom` needs the user, it calls the auth repository and the auth rules directly. Call chains stay one level deep.
3. **Only repositories touch the database or external APIs.** Prisma and Google types stop there; repositories return our entity types.
4. **Components only see DTOs.** They never import use cases, repositories or `db`.

All four rules are enforced by `eslint.config.mjs`.

## Why this shape

- **Familiar.** `components/ui` is the shadcn and Next.js convention, and it matches the Figma file
  (design-system components vs Room Booking components).
- **Testable.**
  - Rules are pure, so they're tested directly.
  - Use cases are tested by mocking their repository modules (`vi.mock`), with no database.
  - Repositories are thin enough to cover later with a few integration tests.
- **Safe for the browser.** DTOs are plain, serializable objects with only the fields the UI needs.
  Next.js recommends this pattern for data passed from server to client.
- **One place for SQL.** Performance work (indexes, `select`, N+1 queries) happens only in `repositories/`.

## Trade-offs we accept

- **A feature touches several folders.** Building "book a room" means editing `domain/bookings`,
  `repositories/bookings`, `components/bookings` and a route in `app/`. The same domain name
  in each folder keeps this navigable.
- **More files than the simplest possible app.** For trivial reads, a use case might just call one
  query and map to a DTO. Keep it anyway: the consistency is worth more than the saved lines.
- **Entities and DTOs can look alike.** That's fine. They change for different reasons: entities follow
  the data model, DTOs follow the screens.

## Alternatives considered

1. **Layered modules with ports and dependency injection.** The most decoupled option, but too much
   ceremony for this team and app size.
2. **Feature folders with Prisma called from `queries.ts`.** The simplest option, but it mixes database
   access with decisions, and UI sits inside domain folders.

## Notes for later

- **Caching:** the room list changes rarely. It could use `"use cache"` with `cacheTag("rooms")`,
  invalidated by admin actions. Availability must stay uncached.
- **Double booking:** `createBookingIfFree` runs in a transaction, and Postgres also gets an exclusion
  constraint so overlapping confirmed bookings are impossible even under races.
- **Background jobs** for calendar sync get their own ADR when we start that work.
