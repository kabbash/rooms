# ADR 0002 — Tech stack

- **Status:** Accepted
- **Date:** 2026-10-28

## Decision

| Concern | Choice | Why |
|---|---|---|
| Framework | **Next.js 16** (App Router, Turbopack) | Server Components + Server Actions; one deployable for UI and API. |
| Caching | **`cacheComponents: true`** | Nothing is cached unless marked `"use cache"`. Predictable for live availability. |
| React | **19.2 + React Compiler** | Automatic memoization — don't hand-write `useMemo`/`useCallback` by default. |
| Language | **TypeScript, strict** (+ `noUncheckedIndexedAccess`) | Catch nulls and missing cases at compile time. |
| Database | **PostgreSQL**, own database | Rooms is standalone; Postgres can enforce no-overlap with exclusion constraints. |
| ORM | **Prisma 7** (`prisma-client` generator, `@prisma/adapter-pg`) | Team familiarity, typed queries, migrations. Config in `prisma.config.ts`. |
| Validation | **Zod 4** | One schema validates forms, Server Action input and env. |
| Styling | **Tailwind CSS 4** + Figma tokens as CSS variables | Tokens in `src/styles/tokens.css`, mapped to utilities in `globals.css`. Light + dark. |
| Components | **shadcn/ui** conventions (`components.json`) | Copy-in components we own, built on accessible primitives. Output goes to `src/components/ui`. |
| Dates | **date-fns 4 + @date-fns/tz** | Store UTC, display `Africa/Cairo`. |
| Tests | **Vitest** (domain + use cases); Playwright later for flows | Domain tests need no DB or browser. |
| Lint | **ESLint 9 flat config** (`eslint-config-next`) + two architecture rules | `next lint` was removed in Next 16; run `eslint .` directly. |

## Not decided yet

- **Auth / SSO provider** for the RC Portal (OIDC? Google Workspace?) → will pick Auth.js or Better Auth once known.
- **Hosting** (Vercel vs self-hosted).
- **Background jobs** for calendar sync (Inngest / Trigger.dev / cron + queue).
- **Client data fetching** (TanStack Query) — only if live availability needs polling.

## Next.js 16 things to know

- `middleware.ts` is now **`proxy.ts`**.
- `params` and `searchParams` are **Promises**: `const { roomId } = await params`.
- In Server Actions, use `updateTag()` to see your own writes immediately; `revalidateTag(tag, profile)` now needs a second argument.
- With `cacheComponents`, reading cookies, headers, params or the database outside
  `<Suspense>` (and not under `"use cache"`) is a build error — wrap it.
