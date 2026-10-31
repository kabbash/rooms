# auth

**Owns:** who is signed in, and their role (employee / admin).
**Status:** ⬜ empty. The RC Portal SSO provider isn't decided yet.

## Shape to aim for
- `auth.types.ts` → `CurrentUser = { id, name, email, role }`
- `auth.rules.ts` → `canBookOnBehalf(user)`, `canManageRooms(user)`
- `repositories/auth/session.ts` → `getSessionUser()`: reads the session. Start with a fake that
  returns a seeded dev user, then swap in real SSO later. This is the only place that touches cookies or tokens.
- `src/proxy.ts` (Next 16's name for middleware) → redirect to sign-in when there's no session.

Use cases that need the user (e.g. `bookRoom`) call `getSessionUser()` from the auth
repository and check permissions with `auth.rules.ts`. They don't call another use case.
