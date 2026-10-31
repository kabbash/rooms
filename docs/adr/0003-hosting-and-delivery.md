# ADR 0003 — Hosting and delivery pipeline

- **Status:** Accepted
- **Date:** 2026-10-31
- **Deciders:** Ahmad Kabbash

## Context

The team needs a shared cloud **dev** environment where merged work runs together,
and soon a **staging** environment where the product owner reviews shipped features.

Forces:

- One Next.js app and one Postgres database (ADR 0002).
- Two-way Google Calendar sync (proposal §9) needs a public HTTPS webhook URL and
  background work (renewing watch channels, retries). That favors something that runs
  containers and scheduled jobs.
- Cost should be close to zero while this is a dev/staging-only project.
- No auth yet (RC Portal SSO is undecided), so cloud environments must not be open to everyone.
- The repo lives on a personal GitHub account (`kabbash/rooms`) for now.

## Options considered

1. **Vercel + Neon:** least setup, built-in PR previews. But no long-running jobs (needs
   Vercel Cron + Inngest/Trigger.dev for calendar sync), per-seat Pro pricing for a team,
   and a lock-in to Vercel's runtime model.
2. **Cloud Run + Cloud SQL:** one cloud provider, but Cloud SQL bills ~$10/month per
   instance even when idle (~$20+ for dev + staging).
3. **Cloud Run + Neon:** the app ships as a portable Docker image; Cloud Run scales to zero
   and its monthly free tier covers dev traffic; Neon's free plan gives a database
   branch per environment that also suspends when idle. Cloud Run Jobs + Cloud Scheduler
   fit calendar sync later.
4. **A single VPS + Docker Compose:** cheapest at scale, but we'd own TLS, backups and patching.

## Decision

**Cloud Run (europe-west3, Frankfurt) + Neon Postgres (AWS eu-central-1, Frankfurt), deployed by GitHub Actions.**

```
PR ─────────► ci.yml: migrate empty DB · schema/migration drift check · seed · lint · typecheck · test · build

main ───────► deploy-dev.yml: CI → docker build once (tag = commit SHA) → push to Artifact Registry
                              → _deploy.yml(dev): prisma migrate deploy → seed if empty → gcloud run deploy rooms-dev → smoke test

manual / v* ► promote-staging.yml: look up the SAME image digest that ran on dev
                              → _deploy.yml(staging): migrate → deploy rooms-staging → smoke test
                              (GitHub environment "staging" can require approval)

manual ─────► db-dev.yml: seed (upsert, keeps data) or reset (drop all → migrate → seed) on dev
```

| | dev | staging |
|---|---|---|
| Trigger | every merge to `main` | "Run workflow" button or a `v*` tag |
| Cloud Run service | `rooms-dev` | `rooms-staging` |
| Neon branch | `dev` | `staging` |
| Seed data | first deploy only (empty DB); then manual *Dev database* workflow (seed / reset) | first promotion only (empty DB); data then belongs to the PO |
| GitHub environment | `dev` (main only) | `staging` (approval) |

Principles:

- **Build once, promote.** Staging never rebuilds; it runs the digest dev already ran.
- **No long-lived cloud keys.** GitHub authenticates to Google with OIDC (Workload Identity
  Federation), restricted to this repo's `main` branch and `v*` tags.
- **Secrets live in Google Secret Manager** (database URLs, basic-auth password). GitHub
  holds only non-secret identifiers as repository variables.
- **Migrations run before the new revision takes traffic**, from the same commit as the image.
- **Temporary access gate:** `src/proxy.ts` enforces HTTP basic auth when
  `BASIC_AUTH_USER`/`BASIC_AUTH_PASSWORD` are set. `/api/health` stays open for smoke tests.

Setup steps: [docs/infra/setup.md](../infra/setup.md).

## Consequences

- **Migrations must be backward compatible** (expand → deploy → contract). For a few seconds
  the old revision runs against the new schema; rollbacks don't undo migrations. Rename a
  column in two PRs: add the new one and write both, then drop the old one.
- **Rollback** = route traffic back to the previous revision
  (`gcloud run services update-traffic rooms-dev --to-revisions=<rev>=100 --region europe-west3`)
  or promote an older commit to staging.
- **Cold starts:** Cloud Run (min instances 0) and Neon (autosuspend) both sleep when idle; the
  first request after a quiet period takes a second or two. Acceptable for dev/staging.
- **Calendar sync** (later): the webhook is a route handler; channel renewal becomes a Cloud Run
  Job triggered by Cloud Scheduler, built from the same image.
- **Basic auth is a stopgap.** Remove it once SSO is in; consider Identity-Aware Proxy for
  staging if the PO and team all have Google accounts.
- **Production** will be a third environment (`rooms-prod`, Neon `main` branch) with the same
  promote step, once we get there.
- Moving the repo to an organization later means updating the Workload Identity provider's
  `attribute-condition` and the principal binding (see setup guide).
