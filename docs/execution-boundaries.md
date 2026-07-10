# Execution boundaries

## Isomorphic by default

Route modules and shared imports may participate in server and client builds. A function running on the server during initial rendering can later run in the browser during client navigation. File location alone does not make code server-only.

## Choose an explicit mechanism

- Use `createServerFn` for callable server work.
- Use `createServerOnlyFn` or a server-only file marker when code must never enter a client build.
- Use `createClientOnlyFn` or a client-only marker for browser-only APIs.
- Use environment functions when one logical operation needs explicit client and server implementations.
- Use server routes for external HTTP contracts.

Prefer framework execution APIs over scattered `typeof window` checks. Manual checks can be appropriate inside a tiny adapter, but they do not provide build-time import protection.

## Import protection

Start's import-protection plugin detects server-only imports reaching client graphs and client-only imports reaching server graphs. Keep server and client entry points separate, avoid mixed barrel files, and use type-only imports when only a type crosses the boundary.

Read the full violation trace. The direct import is not always the module that introduced the invalid dependency.

## Common failures

- Reading `process.env` at module scope and assuming request-specific values.
- Importing database, filesystem, or secret modules into route components.
- Calling browser globals during SSR.
- Returning non-serializable values from server functions or loaders.
- Hiding a boundary error by disabling import protection.
- Exporting server-only and client-safe values from the same barrel.

## Verification

Run a production build and inspect both server and client output when a change moves a boundary. A development-only success does not prove tree shaking or import protection is correct.

## Official sources

- [Execution model](https://tanstack.com/start/latest/docs/framework/react/guide/execution-model)
- [Code execution patterns](https://tanstack.com/start/latest/docs/framework/react/guide/code-execution-patterns)
- [Environment functions](https://tanstack.com/start/latest/docs/framework/react/guide/environment-functions)
- [Import protection](https://tanstack.com/start/latest/docs/framework/react/guide/import-protection)
