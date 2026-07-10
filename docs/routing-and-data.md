# Routing and data loading

## Route contract

A route should make its URL and data requirements explicit. Prefer file-based routes, typed path parameters, validated search parameters, loader dependencies, and route context over ad hoc parsing or global state.

```text
URL -> route match -> params/search validation -> beforeLoad -> loader -> component
                                      |
                                      +-> navigation control/context
```

## Root and nested routes

The root route defines the document shell and shared context. Nested routes render through `Outlet`. Pathless layouts group behavior without adding a path segment; layout and break-out conventions affect both matching and server-route uniqueness, so inspect the generated route tree after structural changes.

## Loaders

- Use route loaders for data needed to render a route.
- Put every input that changes loader output into loader dependencies.
- Prefer parallel independent work and avoid serial waterfalls.
- Return serializable data across server-to-client boundaries.
- Use pending, error, and not-found boundaries intentionally.
- Distinguish Router cache behavior from external caches such as TanStack Query or a CDN.

Loaders can execute in more than one environment depending on navigation and rendering. Do not place secrets or direct database access in an ordinary loader. Call a server function or a protected server-only module instead.

## Search parameters

Validate search parameters at the route boundary. Use typed search state for filters, pagination, sorting, and view modes that should survive navigation or sharing. Avoid manually concatenating query strings when typed `Link` and navigation APIs can preserve the contract.

## Preloading and code splitting

Use route preloading to reduce navigation latency, but account for its data and network cost. Keep critical route configuration in the main route file and move non-critical components to lazy route files when the existing build strategy supports it. Verify the produced chunks instead of assuming a split occurred.

## Review checklist

- Route filenames match the intended URL and nesting.
- Params and search values are validated and typed.
- Loaders declare dependencies and avoid client/server boundary leaks.
- Auth checks that protect data live in the endpoint, not only `beforeLoad`.
- Links and redirects use typed destinations.
- Error, pending, and not-found states are reachable and tested.
- Route-tree generation and typecheck succeed.

## Official sources

- [Start routing guide](https://tanstack.com/start/latest/docs/framework/react/guide/routing)
- [Router overview](https://tanstack.com/router/latest/docs/framework/react/overview)
- [File-based routing](https://tanstack.com/router/latest/docs/framework/react/routing/file-based-routing)
- [Data loading](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading)
- [Search parameters](https://tanstack.com/router/latest/docs/framework/react/guide/search-params)
- [Preloading](https://tanstack.com/router/latest/docs/framework/react/guide/preloading)
