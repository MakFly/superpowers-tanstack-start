# Authentication and security

## Protect data first

Authentication identifies a principal; authorization decides whether that principal may perform an action. Enforce both at every server function, server route, or endpoint that accesses private user, tenant, or account data.

`beforeLoad` can redirect users and improve route UX, but it is not the data-security boundary.

## Session model

- Prefer opaque session identifiers stored in `HttpOnly`, `Secure`, appropriately scoped `SameSite` cookies.
- Use a `__Host-` cookie where deployment constraints allow its required secure, path, and domain semantics.
- Store only the minimum client-visible state.
- Resolve sessions per request in middleware.
- Rotate session identifiers after login and privilege changes.
- Invalidate the server-side session on logout before clearing the cookie.
- Do not read cookies or secrets once at module initialization.

## Login and password flows

- Validate normalized credentials.
- Use a password hashing algorithm and parameters maintained by a reputable authentication library.
- Return generic failure messages that do not reveal whether an account exists.
- Rate-limit login, reset, and verification endpoints by multiple signals appropriate to the threat model.
- Make password-reset tokens random, single-use, short-lived, and stored in a form that limits damage if the database leaks.

## OAuth

Generate and verify `state` and use PKCE. Bind the callback to the initiating browser session, validate redirect targets, exchange codes only on the server, and rotate the local session after successful authentication.

## CSRF and same-origin

Cookie-authenticated state changes need CSRF protection. Preserve Start's server-function same-origin checks, use appropriate cookie attributes, and apply an explicit token or equivalent defense where the flow requires it. Do not treat CORS as CSRF protection.

## Authorization

Centralize reusable role or policy decisions, but pass the current resource and tenant explicitly. Test horizontal access between two users or tenants, not only anonymous access.

## Production checklist

- TLS is enforced and secure cookies are configured.
- Session rotation, expiration, revocation, and logout are tested.
- Every protected endpoint checks both identity and resource access.
- Error messages do not leak account existence or secrets.
- Auth endpoints are rate-limited and observable without logging credentials or tokens.
- Required secrets are validated server-side at startup or request entry.
- Security headers and cache rules match the deployment.

## Official sources

- [Authentication overview](https://tanstack.com/start/latest/docs/framework/react/guide/authentication-overview)
- [Authentication server primitives](https://tanstack.com/start/latest/docs/framework/react/guide/authentication-server-primitives)
- [Authentication guide](https://tanstack.com/start/latest/docs/framework/react/guide/authentication)
- [Server functions](https://tanstack.com/start/latest/docs/framework/react/guide/server-functions)
