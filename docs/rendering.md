# Rendering strategies

## Choose per product requirement

TanStack Start supports full SSR, selective SSR, SPA mode, static prerendering, incremental revalidation through cache headers, deferred hydration, streaming, and React Server Components. Select the smallest strategy that satisfies SEO, first-render, personalization, interactivity, and hosting constraints.

## Decision guide

```text
Need indexable/request-time HTML?
  |-- no --> SPA shell, optionally prerender known pages
  |
  +-- yes --> Need private or request-specific data in HTML?
               |-- yes --> SSR, with explicit cache boundaries
               +-- no  --> static prerendering or ISR

Expensive interactive island?
  +--> keep SSR HTML, defer hydration by visibility/idle/interaction
```

## Selective SSR

Route-level SSR can be enabled, disabled, or limited to data. Child routes inherit constraints from parents. Use a functional choice only when the decision is deterministic from route context. Test direct requests and client navigation because they exercise different paths.

## SPA mode

SPA mode emits a static shell while preserving optional server functions and server routes. Configure hosting rewrites so application paths fall back to the shell while server-function and API paths continue to reach the server runtime. SPA mode removes SSR output; it does not automatically remove server capabilities.

## Static prerendering and ISR

Prerender known routes at build time and use link crawling only when the generated route set is bounded and safe. ISR is primarily a caching strategy: emit appropriate cache-control and validation headers, understand the target CDN, and never publicly cache user-specific output.

## Streaming and deferred hydration

Stream typed values or async-generator results when progressive delivery improves the experience. Deferred hydration keeps server-rendered HTML but delays JavaScript activation. Choose hydration timing, code splitting, and prefetching independently; verify accessibility and interaction before hydration.

## React Server Components

RSC support is explicit and build-tool dependent. Keep props and render-prop arguments serializable, treat slots as opaque on the server, and verify caching and invalidation. Do not assume Next.js RSC conventions map directly to Start.

## Hydration correctness

Server and client output must initially match. Move environment-dependent values behind stable initial data, client-only boundaries, or an intentional SSR decision. Suppressing hydration warnings is a last resort because it hides evidence rather than fixing the mismatch.

## Official sources

- [Selective SSR](https://tanstack.com/start/latest/docs/framework/react/guide/selective-ssr)
- [SPA mode](https://tanstack.com/start/latest/docs/framework/react/guide/spa-mode)
- [Static prerendering](https://tanstack.com/start/latest/docs/framework/react/guide/static-prerendering)
- [ISR](https://tanstack.com/start/latest/docs/framework/react/guide/isr)
- [Deferred hydration](https://tanstack.com/start/latest/docs/framework/react/guide/deferred-hydration)
- [Hydration errors](https://tanstack.com/start/latest/docs/framework/react/guide/hydration-errors)
- [Server Components](https://tanstack.com/start/latest/docs/framework/react/guide/server-components)
