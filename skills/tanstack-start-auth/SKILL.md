---
name: tanstack-start-auth
description: Design, implement, audit, or debug authentication and authorization in TanStack Start. Use for sessions, cookies, login, logout, OAuth state and PKCE, password reset, CSRF, rate limiting, protected routes, RBAC, tenant isolation, secret handling, or auth tests.
---

# TanStack Start Authentication

## Define the trust boundary

Read `../../docs/authentication-and-security.md`. Identify the principal, credential, session store, protected resource, tenant boundary, and every callable endpoint.

## Protect the data endpoint

Authenticate and authorize inside every server function or server route that accesses protected data. Use `beforeLoad` only for navigation behavior and early UX.

## Implement secure primitives

- Resolve sessions per request.
- Use secure, HTTP-only, appropriately scoped cookies.
- Rotate sessions after authentication or privilege changes.
- Invalidate sessions on logout.
- Use generic credential and reset responses that resist account enumeration.
- Use OAuth `state` and PKCE and bind callbacks to the initiating session.
- Protect cookie-authenticated mutations from CSRF.
- Rate-limit sensitive endpoints.
- Validate secrets and configuration without exposing values.

Do not invent custom cryptography or password hashing.

## Verify adversarial cases

Test anonymous access, invalid credentials, expired and revoked sessions, CSRF failure, replayed OAuth state, password-reset reuse, horizontal access between users or tenants, insufficient roles, and rate-limit behavior.

Return findings by severity with exact endpoint and file references. Distinguish confirmed vulnerabilities from hardening suggestions.
