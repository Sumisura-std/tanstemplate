# Skills

Index of the skills installed in this project, grouped by origin and purpose.

> Zed only discovers skills that are **direct children** of `.agents/skills/` (`.agents/skills/<name>/SKILL.md`). Nested folders such as `.agents/skills/better-auth/create-auth/` are not discovered, so the grouping lives in this file instead of in the directory layout. Do not rename or move skill folders: `skills-lock.json` and the symlinks in `.claude/skills/` and `.fx/skills/` refer to them by name.

Sources are tracked in `/skills-lock.json`. Skills marked with `*` are not in the lock file.

## Matt Pocock (`mattpocock/skills`)

### Planning and specs

| Skill | Purpose |
| --- | --- |
| `grilling` | Grill the user about a plan or decision until it is sharp. |
| `grill-me` | Relentless interview to sharpen a plan or design. |
| `grill-with-docs` | Same interview, also writes ADRs and a glossary as it goes. |
| `to-spec` | Turn the current conversation into a spec on the issue tracker. |
| `to-tickets` | Break a plan or spec into tracer-bullet tickets with blocking edges. |
| `to-questionnaire` | Turn an open decision into a questionnaire for someone else. |
| `wayfinder` | Plan work larger than one session as a map of decision tickets. |
| `domain-modeling` | Build the domain model, `GLOSSARY.md` and ADRs. |

### Implementation

| Skill | Purpose |
| --- | --- |
| `implement` | Implement work from a spec or a set of tickets. |
| `implement-spec` | Implement the result of `to-spec` and `to-tickets`. |
| `tdd` | Test-driven development (red-green-refactor). |
| `prototype` | Throwaway prototype to answer a design question. |
| `diagnosing-bugs` | Diagnosis loop for hard bugs and performance regressions. |

### Review and architecture

| Skill | Purpose |
| --- | --- |
| `code-review` | Review changes on two axes: repo standards and spec. |
| `codebase-design` | Deep-module vocabulary for interface and seam design. |
| `improve-codebase-architecture` | Find deepening opportunities and report them as HTML. |
| `retro` | Retrospective on a coding session. |

### Workflow and collaboration

| Skill | Purpose |
| --- | --- |
| `ask-matt` | Router: which skill or flow fits the situation. |
| `setup-matt-pocock-skills` | One-time setup: issue tracker, labels, doc layout. |
| `triage` | Move issues and external PRs through triage states. |
| `handoff` | Compact the conversation into a handoff document. |
| `pr` | Write a PR body. |
| `research` | Investigate a question and save findings as Markdown. |
| `teach` | Teach a new skill or concept in this workspace. |
| `wait-what` | Re-pitch the last message when it did not land. |
| `wizard` | Interactive bash wizard for steps only a human can do. |
| `writing-for-agents` | Write or edit skills, `AGENTS.md` and `CLAUDE.md`. |

## Better Auth (`better-auth/skills`)

| Skill | Purpose |
| --- | --- |
| `create-auth` | Scaffold authentication with Better Auth. |
| `better-auth-best-practices` | Server and client config, adapters, sessions, plugins. |
| `better-auth-security-best-practices` | Rate limiting, secrets, CSRF, cookies, audit logging. |
| `email-and-password-best-practices` | Verification, password reset, policies, hashing. |
| `organization-best-practices` | Multi-tenant organizations, roles, teams, RBAC. |
| `two-factor-authentication-best-practices` | TOTP, OTP, backup codes, trusted devices. |

## oRPC (`middleapi/orpc`)

| Skill | Purpose |
| --- | --- |
| `orpc` | Core builder, routers, middleware, clients, TanStack Query. |
| `orpc-contract` | Contract-first APIs with `oc` and `implement`. |
| `orpc-openapi` | Expose a router as an OpenAPI HTTP API. |
| `orpc-migrate` | Migrate from tRPC or from oRPC v1 to v2. |

## evlog (`evlog.dev`)

| Skill                     | Purpose                               |
| ------------------------- | ------------------------------------- |
| `review-logging-patterns` | Review logging and adopt wide events. |
| `analyze-logs`            | Analyze `.evlog/logs/` NDJSON events. |
| `build-audit-logs`        | Build or review audit trails.         |

## Void (shipped by the `void` package)

Symlinks into `node_modules/void/skills/`, so they exist after `bun install`.

| Skill | Purpose |
| --- | --- |
| `void` * | Build Void apps and use the Void CLI. |
| `migrate-vite-cloudflare-to-void` * | Migrate a Vite + `@cloudflare/vite-plugin` app to Void. |

## Tooling and libraries

| Skill | Source | Purpose |
| --- | --- | --- |
| `ultracite` | `haydenbleasel/ultracite` | Lint and format preset. |
| `gdp-ts` | `rauchg/gdp-ts` | Authorization as compile-time proofs. |
| `modern-react-guidance` | `adhhamdev/modern-react-guidance` | React 19+ patterns. |
| `mdxcn` | `shadcn-labs/mdxcn` | Graphs and diagrams next to prose. |
| `e2e` * | local | End-to-end tests with the `e2e` runner. |
