import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * Architecture rules (README → "Layers and who may call whom").
 *
 *   app/ (pages, layouts, route handlers)  ┐
 *   domain/<x>/actions/*.ts                ┴─► domain/<x>/use-cases/*.ts ─► repositories/<x>/{queries,mutations}/ ─► lib/db
 *                                                         └─► <x>.rules.ts (pure)
 *   components/  ─► DTO types (<x>.types.ts) + actions only
 *
 * Use the "@/" alias for every import outside the current folder, so these rules can see it.
 */

const DB = {
  group: ["@/lib/db", "@/generated/**", "@prisma/*", "pg"],
  message: "Only repositories/ talk to the database.",
};
const REPOSITORIES = {
  group: ["@/repositories/**"],
  message: "Only use-cases/ files call repositories.",
};
const USE_CASES = {
  group: ["@/domain/*/use-cases/**"],
  message: "Use cases are called only from entry points: app/ (pages, layouts, route handlers) and actions/.",
};
const ACTIONS = {
  group: ["@/domain/*/actions/**"],
  message: "Server Actions are entry points; only components and pages use them.",
};
const COMPONENTS = {
  group: ["@/components/**"],
  message: "Server code must not depend on components.",
};
const FRAMEWORK = {
  group: ["react", "react-dom", "next", "next/*"],
  message: "This layer is framework-free. Next/React belong in app/, components/ and actions/.",
};
const DOMAIN_IN_DESIGN_SYSTEM = {
  group: ["@/domain/**", "@/components/*/**", "!@/components/ui/**"],
  message: "components/ui is the design system: it must not know about rooms or bookings.",
};

const restrict = (...patterns) => ({ "no-restricted-imports": ["error", { patterns }] });

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  // Entry points
  { files: ["src/app/**/*.{ts,tsx}"], rules: restrict(DB, REPOSITORIES) },
  { files: ["src/domain/**/actions/**/*.ts"], rules: restrict(DB, REPOSITORIES, COMPONENTS) },

  // Domain
  // A use case never calls another use case.
  { files: ["src/domain/**/use-cases/**/*.ts"], rules: restrict(DB, USE_CASES, ACTIONS, COMPONENTS, FRAMEWORK) },
  {
    files: ["src/domain/**/*.rules.ts", "src/domain/**/*.types.ts"],
    rules: restrict(DB, REPOSITORIES, USE_CASES, ACTIONS, COMPONENTS, FRAMEWORK),
  },

  // Data access
  { files: ["src/repositories/**/*.ts"], rules: restrict(USE_CASES, ACTIONS, COMPONENTS, FRAMEWORK) },

  // UI (the design-system block comes last so it overrides the general one)
  { files: ["src/components/**/*.tsx"], rules: restrict(DB, REPOSITORIES, USE_CASES) },
  { files: ["src/components/ui/**/*.tsx"], rules: restrict(DB, REPOSITORIES, USE_CASES, DOMAIN_IN_DESIGN_SYSTEM) },

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "src/generated/**"]),
]);
