---
name: tanstack-start-server-functions
description: Implement, secure, review, or debug TanStack Start server functions. Use for createServerFn handlers, input validation, request context, redirects, not-found results, raw responses, progressive enhancement, streaming, static functions, cancellation, serialization, or server-only data access.
---

# TanStack Start Server Functions

## Confirm the boundary

Read `../../docs/server-functions.md` and `../../docs/execution-boundaries.md`. Use a server function for application RPC. Use a server route when an external caller needs an ordinary HTTP contract.

## Build the request pipeline

1. Define one explicit serializable input object.
2. Validate it before domain work.
3. Resolve request context and session per request.
4. Authenticate and authorize access to the concrete resource or tenant.
5. Call server-only domain or data modules.
6. Return an explicit serializable result, framework redirect/not-found value, or intentional raw `Response`.

Preserve Start's same-origin protection. Never move secrets or trusted authorization decisions into client-callable code.

## Keep code focused

Keep handlers thin and put reusable domain logic in server-only modules. Use middleware only for repeated cross-cutting context. Do not add generic error swallowing, hidden defaults, or a fallback value that masks a failed dependency.

## Verify

Test malformed input, anonymous access, unauthorized resource access, success, domain failure, redirect, and not-found behavior. Inspect client output when a server-only import or secret could leak. Run a production build to exercise function ID generation and import protection.

Report the endpoint contract, security checks, serialization choices, and tests run.
