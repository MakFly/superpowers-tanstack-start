---
name: tanstack-start-rendering
description: Choose, implement, review, or debug TanStack Start rendering behavior. Use for SSR, selective SSR, SPA mode, static prerendering, ISR, streaming, deferred hydration, hydration mismatches, React Server Components, SEO output, or caching interactions.
---

# TanStack Start Rendering

## Choose from requirements

Read `../../docs/rendering.md`. Record SEO, first-render, personalization, interactivity, cache, runtime, and deployment requirements before selecting a mode.

- Use SSR for request-time HTML.
- Use static prerendering for bounded public routes known at build time.
- Use ISR only with explicit safe cache semantics.
- Use SPA mode when a client-rendered shell is acceptable.
- Use selective SSR when route branches need different behavior.
- Use deferred hydration when HTML should render now but interaction can activate later.
- Use RSC only with the project's supported build integration and explicit serialization constraints.

## Preserve correctness

Keep the first client render consistent with server HTML. Do not suppress hydration warnings until the mismatch is understood. Never publicly cache user-specific output. Ensure SPA rewrites preserve server-function and server-route paths.

## Verify both paths

Test direct requests and client navigation. Inspect server HTML, hydration console output, streamed responses, cache headers, CDN behavior, JavaScript-disabled flows, deferred interactions, and production chunks as applicable.

Report the selected mode, rejected alternatives, cache boundary, and runtime evidence.
