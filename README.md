# Rooms — Remotecoders room booking

Book meeting rooms, Silent Room seats and Silent Boxes at the Maadi office.
Standalone app opened from the **Room Booking** link in the RC Portal sidebar.

> **Start here:**
>
> 1. Read [ADR 0001 — App structure](docs/adr/0001-app-structure.md).
> 2. Follow the `rooms` example through every folder (map in `src/domain/rooms/README.md`).
> 3. Pick a domain README (`bookings`, `auth`, `calendar-sync`) and build it the same way.

## Getting started

Needs Node 20.19+ and Docker (for Postgres).

```bash
cp .env.example .env
npm install            # also runs `prisma generate`
npm run db:up          # start Postgres in Docker
npm run db:migrate     # create tables (name the first migration "init")
npm run db:seed        # Floor 2 rooms from the proposal
npm run dev            # http://localhost:3000
```

| Command              | What it does                                     |
| -------------------- | ------------------------------------------------ |
| `npm run dev`        | Dev server                                       |
| `npm run lint`       | ESLint, including the architecture rules         |
| `npm run typecheck`  | TypeScript check                                 |
| `npm test`           | Vitest: rules and use cases (no database needed) |
| `npm run db:migrate` | Apply changes to `prisma/schema.prisma`          |
| `npm run db:seed`    | Re-run the seed (safe to repeat)                 |
| `npm run db:studio`  | Browse the database                              |

## Environments and deployment

| Environment | How code gets there                                               | URL                                     |
| ----------- | ----------------------------------------------------------------- | --------------------------------------- |
| **dev**     | Every merge to `main` (after CI passes)                           | see the latest _Deploy dev_ run         |
| **staging** | Actions → _Promote to staging_ → Run workflow (same image as dev) | see the latest _Promote to staging_ run |

Every PR runs CI: migrations against an empty database, a drift check (schema changes need a migration), seed, lint, typecheck, tests, build.
Write **backward-compatible migrations**: they run just before the new version goes live.

Details and one-time cloud setup: [ADR 0003](docs/adr/0003-hosting-and-delivery.md) · [docs/infra/setup.md](docs/infra/setup.md).

## Folder structure

```
src/
├─ app/                          ENTRY POINTS
│  ├─ (rooms)/page.tsx           "/"             D1 Rooms ← example
│  ├─ (rooms)/my-bookings/       "/my-bookings"  D4 (empty)
│  └─ (admin)/admin/rooms/       "/admin/rooms"  A1 (empty)
│
├─ components/
│  ├─ ui/                        design system: Button…, no domain knowledge
│  ├─ rooms/                     RoomCard, FloorSection ← example
│  └─ bookings/                  (empty)
│
├─ domain/
│  ├─ rooms/                     ← example
│  │  ├─ rooms.types.ts          entities, DTOs, Zod input schemas
│  │  ├─ rooms.rules.ts          pure business rules (+ .test.ts)
│  │  ├─ use-cases/              one file per use case (+ .test.ts)
│  │  │  ├─ get-rooms-by-floor.ts
│  │  │  └─ deactivate-room.ts
│  │  └─ actions/                one file per Server Action ("use server")
│  │     └─ deactivate-room-action.ts
│  ├─ bookings/  auth/  calendar-sync/     READMEs with tasks
│
├─ repositories/
│  ├─ rooms/                     ← example
│  │  ├─ queries/                find-active-rooms.ts, find-room-by-id.ts
│  │  ├─ mutations/              set-room-active.ts
│  │  ├─ types.ts                shared types (RoomRow)
│  │  └─ utils.ts                shared helpers (roomSelect, toRoom)
│  ├─ bookings/  auth/  calendar-sync/     (empty)
│
├─ lib/                          db.ts, env.ts, cn.ts, result.ts
└─ styles/tokens.css             Figma design tokens (light + dark)
```

## Layers and who may call whom

```
app/ (pages, layouts, route handlers) ─┐
domain/<x>/actions/ ───────────────────┴─► use-cases/ ─► repositories/<x>/ ─► db
                                                 └─► <x>.rules.ts (pure)
components/ ─► DTO types + actions only
```

| Layer                                   | Does                                                    | Must not                                |
| --------------------------------------- | ------------------------------------------------------- | --------------------------------------- |
| **Pages** (`app/`)                      | Call a use case, pass DTOs to components                | Touch repositories or `db`              |
| **Actions** (`domain/<x>/actions/`)     | Zod-validate → call **one** use case → `revalidatePath` | Contain rules or call repositories      |
| **Use cases** (`domain/<x>/use-cases/`) | Load → apply rules → save → return DTO / `Result`       | Import Prisma, React or other use cases |
| **Rules** (`*.rules.ts`)                | Pure decisions                                          | Import anything with side effects       |
| **Repositories** (`repositories/<x>/`)  | One query/write each, map rows to entity types          | Make business decisions                 |
| **Components**                          | Render DTOs, submit forms to actions                    | Fetch data, import use cases            |

`npm run lint` fails when any of these are broken. Use the `@/` alias for imports outside the current folder, so the lint rules can see them.

## How to add a feature: "My bookings" (D4)

1. **Types.** In `domain/bookings/bookings.types.ts`, add the `Booking` entity and a `BookingRowDto`.
2. **Schema.** Add the `Booking` model to `prisma/schema.prisma`, then run `npm run db:migrate`.
3. **Repository.** Add `repositories/bookings/queries/find-upcoming-by-holder.ts` exporting `findUpcomingByHolder(userId)`. It returns `Booking[]`.
4. **Rules.** In `bookings.rules.ts`, add anything that decides or calculates (status labels, "can cancel?"), with tests.
5. **Use case.** Add `domain/bookings/use-cases/get-my-bookings.ts` exporting `getMyBookings(userId)`. It calls the repository and the rules and returns `BookingRowDto[]`. Test it with `vi.mock` on the repository.
6. **Component.** In `components/bookings/booking-row.tsx`, render one `BookingRowDto`.
7. **Page.** In `app/(rooms)/my-bookings/page.tsx`, call `getMyBookings()` inside `<Suspense>` and render the rows.

For a **write** (cancel a booking), add `repositories/bookings/mutations/cancel-booking.ts`, a
`use-cases/cancel-booking.ts` use case, and `actions/cancel-booking-action.ts`. Copy `domain/rooms/actions/deactivate-room-action.ts`.

Before opening a PR, run `npm run lint && npm run typecheck && npm test`.

## Conventions

- **Names:**
  - `<domain>.types.ts` / `<domain>.rules.ts` in `domain/<domain>/`
  - one function per file, named after the function in kebab-case: `use-cases/get-rooms-by-floor.ts`,
    `actions/deactivate-room-action.ts`, `queries/find-room-by-id.ts`, `mutations/set-room-active.ts`
  - `kebab-case.tsx` for components
- **Repository functions:** `find…` / `count…` for reads; `create…` / `update…` / `set…` / `delete…` for writes.
- **Use case functions:** start with a verb from the user's point of view: `getRoomsByFloor`, `bookRoom`, `cancelBooking`.
- **Errors:** expected failures ("slot taken") are returned as `Result` values. Throw only for bugs and outages.
- **Server vs client:** components are Server Components by default. Add `"use client"` only for interactivity, as low in the tree as possible.
- **Dates:** store UTC, display in `OFFICE_TIMEZONE` (Africa/Cairo).
- **Colors:** token classes only (`bg-surface`, `text-fg-secondary`, `border-line`). Never hex values.

## Design Tokens

Design tokens are defined in `src/styles/tokens.css` and exposed as Tailwind utilities through `src/app/globals.css`.

Use semantic token utilities in components instead of hardcoded colors or arbitrary values.

### Colors

| Semantic token        | Tailwind utility           |
| --------------------- | -------------------------- |
| Canvas                | `bg-canvas`                |
| Surface               | `bg-surface`               |
| Subtle background     | `bg-subtle`                |
| Muted background      | `bg-muted`                 |
| Brand                 | `bg-brand`                 |
| Brand hover           | `bg-brand-hover`           |
| Brand subtle          | `bg-brand-subtle`          |
| Danger subtle         | `bg-danger-subtle`         |
| Warning subtle        | `bg-warning-subtle`        |
| Info subtle           | `bg-info-subtle`           |
| Disabled              | `bg-disabled`              |
| Overlay               | `bg-overlay`               |
| Primary text          | `text-fg`                  |
| Secondary text        | `text-fg-secondary`        |
| Tertiary text         | `text-fg-tertiary`         |
| Text on brand         | `text-fg-on-brand`         |
| Brand text            | `text-fg-brand`            |
| Danger text           | `text-fg-danger`           |
| Warning text          | `text-fg-warning`          |
| Info text             | `text-fg-info`             |
| Text on inverse       | `text-fg-on-inverse`       |
| Muted text on inverse | `text-fg-on-inverse-muted` |
| Default border        | `border-line`              |
| Strong border         | `border-line-strong`       |
| Brand border          | `border-line-brand`        |
| Subtle brand border   | `border-line-brand-subtle` |
| Warning border        | `border-line-warning`      |
| Danger border         | `border-line-danger`       |
| Brand icon            | `text-icon-brand`          |

### Typography

Each utility maps to a Figma text style, including its font size, line height, and weight.

| Figma style     | Tailwind utility  |
| --------------- | ----------------- |
| Display / Large | `text-display-lg` |
| Heading / H1    | `text-h1`         |
| Heading / H2    | `text-h2`         |
| Heading / H3    | `text-h3`         |
| Body / Medium   | `text-body-md`    |
| Body / Small    | `text-body-sm`    |
| Label / Medium  | `text-label-md`   |
| Label / Small   | `text-label-sm`   |
| Overline        | `text-overline`   |

Roboto is the default font through `font-sans`.

### Spacing

| Token value | Tailwind utility         |
| ----------- | ------------------------ |
| 4px         | `p-1`, `m-1`, `gap-1`    |
| 8px         | `p-2`, `m-2`, `gap-2`    |
| 12px        | `p-3`, `m-3`, `gap-3`    |
| 16px        | `p-4`, `m-4`, `gap-4`    |
| 20px        | `p-5`, `m-5`, `gap-5`    |
| 24px        | `p-6`, `m-6`, `gap-6`    |
| 32px        | `p-8`, `m-8`, `gap-8`    |
| 48px        | `p-12`, `m-12`, `gap-12` |

### Border Radius

| Token value | Tailwind utility |
| ----------- | ---------------- |
| 8px         | `rounded-sm`     |
| 12px        | `rounded-md`     |
| 16px        | `rounded-lg`     |
| 999px       | `rounded-full`   |

### Focus Ring

Use `focus-visible:focus-ring` for the shared keyboard focus indicator.

### Shadows

Shadow utilities are deferred until approved shadow values are available in Figma.

### Theme Support

The current implementation provides Light semantic tokens only. Dark Mode is not implemented yet.

## Adding shadcn components

Run `npx shadcn@latest add dialog`. The file lands in `src/components/ui`. Swap its default color classes for our token classes.
