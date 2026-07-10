---
name: tanstack-start-middleware
description: Design, implement, review, or debug TanStack Start middleware and server routes. Use for request middleware, server-function middleware, typed context, global middleware, CSRF, request or response transforms, API endpoints, webhooks, health routes, HTTP methods, headers, status codes, or route conflicts.
---

# TanStack Start Middleware

## Select the correct pipeline

Read `../../docs/middleware-and-server-routes.md`.

- Use request middleware around incoming HTTP requests and server routes.
- Use server-function middleware around application RPC.
- Use a server route for public APIs, webhooks, health checks, feeds, or custom response formats.

## Compose explicitly

Document middleware order and the context each layer adds. Pass typed context through `next`. Treat any context sent from a client as untrusted and verify it on the server. Keep authorization decisions close to the protected resource.

Register global middleware only for behavior that applies globally. Avoid mutable module state and hidden dependencies between layers.

## Implement HTTP contracts

Validate method, params, query, headers, body, and content type as required. Return explicit status, headers, and response bodies. Check file-route uniqueness for dynamic, splat, escaped, pathless-layout, and nested server routes.

## Verify

Test execution order, context propagation, short-circuit behavior, each supported HTTP method, invalid bodies, status codes, headers, authentication, authorization, and global-middleware exclusions. Verify external callers against the real HTTP path.

Report the middleware chain, route contract, error behavior, and checks run.
