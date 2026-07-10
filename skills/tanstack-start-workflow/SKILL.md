---
name: tanstack-start-workflow
description: Plan and execute non-trivial TanStack Start features, refactors, upgrades, or migrations. Use when a task crosses routing, server functions, rendering, data access, build configuration, or deployment boundaries and needs an evidence-first implementation plan with explicit verification.
---

# TanStack Start Workflow

## Establish the baseline

1. Read repository instructions and the target application's manifest, lockfile, build config, router setup, and relevant routes.
2. Record exact Start, Router, React, Vite or Rsbuild versions.
3. Identify the request path from browser entry through route, loader, server function or route, middleware, and external dependency.
4. Reproduce the current behavior before changing code when a runtime is available.
5. State assumptions, constraints, and a measurable success condition.

Read `../../docs/architecture.md` for the framework model and `../../docs/migration-and-decisions.md` for migration work.

## Plan the smallest coherent change

Draw the affected data flow. Separate navigation concerns, data-security boundaries, domain logic, rendering, and deployment. Preserve existing build and runtime choices unless the requested outcome requires a change.

Ask before installing packages, modifying a lockfile, creating migrations, deleting files, deploying, committing, or pushing.

## Implement

1. Write or update the narrowest failing test when practical.
2. Change one boundary at a time.
3. Keep inputs, outputs, and runtime ownership explicit.
4. Reject invalid states with actionable errors.
5. Avoid speculative abstractions and compatibility fallbacks.

Invoke the routing, server-functions, middleware, rendering, auth, deployment, or testing skill when that boundary becomes material.

## Verify

Run the smallest relevant check first, followed by the repository's existing typecheck, lint, tests, and production build. For UI changes, reproduce the workflow in a browser and inspect console and network errors.

Report the result, changed files, checks run, unverified paths, and residual risks.
