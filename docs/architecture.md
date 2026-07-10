# Architecture and project setup

## Mental model

TanStack Start adds a server runtime and build pipeline to TanStack Router. Router remains the application contract for route matching, typed parameters, search state, loaders, preloading, and navigation. Start supplies full-document SSR, streaming, server functions, server routes, middleware, and deployable output.

Use Router alone for a client-side application that does not need Start's server or full-stack build features. Use Start when the same route tree must coordinate server rendering, server-only work, HTTP endpoints, or runtime-specific output.

## Initial project audit

Before editing a Start application, inspect:

1. `package.json` and the lockfile for exact Start, Router, React, Vite or Rsbuild versions.
2. The Start plugin in `vite.config.*` or `rsbuild.config.*`.
3. `src/router.*`, the generated route tree, and the root route.
4. Client and server entry points when customized.
5. Hosting adapter or runtime configuration.
6. Existing tests, typecheck, lint, build, and browser commands.

Do not infer the build tool or deployment runtime from a generic Start example.

## Essential project pieces

- A build configuration registers the TanStack Start plugin and React integration.
- The router creates and exports a typed Router instance.
- The root route owns the document shell, `HeadContent`, nested `Outlet`, and `Scripts`.
- File routes define path contracts and contribute to the generated route tree.
- Client and server entry points may be customized only when the default behavior is insufficient.

## Architecture boundary

Organize code by runtime responsibility rather than by convenience:

```text
browser event
    |
    v
route/component ----> server function ----> domain/data service
    |                       |
    |                       +---- auth + validation + request context
    v
typed navigation

external HTTP client ----> server route ----> domain/data service
```

Server functions are application RPC endpoints. Server routes are ordinary HTTP endpoints suitable for external callers, webhooks, or custom response formats.

## Setup choices

- Prefer the official CLI or a maintained official example for new applications.
- Preserve Vite or Rsbuild when working in an existing application.
- Keep `routeTree.gen.ts` generated; edit source route files instead.
- Treat the root document structure as infrastructure and keep product logic in routes or domain modules.
- Add a custom entry point only for a concrete requirement such as request context, server configuration, or custom error handling.

## Official sources

- [Overview](https://tanstack.com/start/latest/docs/framework/react/overview)
- [Getting started](https://tanstack.com/start/latest/docs/framework/react/getting-started)
- [Build from scratch](https://tanstack.com/start/latest/docs/framework/react/build-from-scratch)
- [Routing](https://tanstack.com/start/latest/docs/framework/react/guide/routing)
- [Client entry point](https://tanstack.com/start/latest/docs/framework/react/guide/client-entry-point)
- [Server entry point](https://tanstack.com/start/latest/docs/framework/react/guide/server-entry-point)
