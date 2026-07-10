---
name: tanstack-start-deployment
description: Prepare, review, or debug TanStack Start production builds and deployments. Use for Vite or Rsbuild output, Cloudflare Workers, Netlify, Railway, Nitro, Node, Docker, Bun, Vercel, Appwrite, environment wiring, assets, CDN caching, early hints, observability, health checks, or production-only failures.
---

# TanStack Start Deployment

## Identify the runtime

Read `../../docs/deployment-and-observability.md` and inspect the installed adapter, build tool, package scripts, runtime configuration, and hosting files. Follow current provider documentation for that exact combination.

## Prepare safely

1. Validate required environment-variable names and non-empty presence without printing secrets.
2. Build production output.
3. Run the produced server artifact locally when supported.
4. Verify assets, direct routes, server functions, server routes, redirects, streaming, and cache headers.
5. Confirm health and observability behavior.

Do not deploy, create remote resources, modify secrets, or install an adapter without explicit approval.

## Review cache and logs

Prevent public caching of personalized responses. Set `Vary` and validation headers intentionally. Ensure logs contain request outcomes and trace IDs without credentials, tokens, cookies, secrets, or sensitive bodies.

## Report readiness

Separate local build success from deployment readiness. List the runtime path verified, required external configuration, exact commands run, and any provider behavior that remains untested.
