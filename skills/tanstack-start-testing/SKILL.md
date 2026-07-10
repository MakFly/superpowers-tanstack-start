---
name: tanstack-start-testing
description: Create verification plans, write tests, review coverage, or diagnose TanStack Start failures. Use for validators, server functions, middleware, server routes, route loaders, rendering, hydration, production builds, browser scenarios, ESLint Start rules, or evidence-first debugging.
---

# TanStack Start Testing

## Select the smallest meaningful check

Read `../../docs/testing-and-debugging.md`. Map the changed behavior to its owning boundary and reproduce the failure before editing when possible.

1. Test pure validators and domain logic.
2. Test server functions, middleware, or server routes through their public contract.
3. Test route matching, params, search, loaders, and boundaries.
4. Run typecheck, configured lint, and production build.
5. Reproduce browser-visible behavior and inspect console and network output.

Use the project's existing runner and conventions. Ask before installing a test framework or changing configuration.

## Cover failure paths

Include malformed input, authentication, authorization, cross-tenant access, dependency failure, redirect, not-found, status/header behavior, hydration mismatch, direct load, and client navigation as relevant.

## Diagnose without masking

Trace the first actionable error through route, loader, endpoint, middleware, and dependency. Compare development and production when import protection, tree shaking, SSR, or adapter output is involved. Do not add catch-all fallbacks or suppress warnings to make a test pass.

Report the reproduction, expected result, checks run, observed evidence, and remaining unverified paths.
