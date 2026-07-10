---
name: tanstack-start-routing
description: Design, implement, review, or debug TanStack Start and TanStack Router routes. Use for file-route structure, root routes, layouts, params, search validation, loaders, loader dependencies, navigation, preloading, pending states, errors, not-found behavior, or route-tree generation.
---

# TanStack Start Routing

## Inspect the route contract

Read `../../docs/routing-and-data.md`. Inspect the source route files, generated route tree, router context, and the exact URL being changed. Confirm whether the task affects direct requests, client navigation, or both.

## Implement typed URL state

- Express hierarchy with the existing file-route conventions.
- Validate path and search inputs at the route boundary.
- Declare every loader input in loader dependencies.
- Keep secrets and direct database access out of isomorphic loaders.
- Use server functions for protected server work.
- Use typed links, navigation, redirects, and route APIs.
- Provide deliberate pending, error, and not-found behavior.

Treat `beforeLoad` as navigation and context control. Enforce protected-data access again in the server function or server route.

## Control performance

Parallelize independent loader work. Use preloading only when its network and compute cost is justified. Verify automatic or explicit code splitting in production output instead of assuming it occurred.

## Verify

Run route-tree generation and typecheck. Test valid and invalid params/search, direct load, client navigation, loader invalidation, pending state, error boundary, and not-found state. Use browser verification for navigation-visible changes.

Return the route contract, data flow, verification results, and any unresolved URL or cache behavior.
