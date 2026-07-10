---
paths:
  - "**/*.server.ts"
  - "**/*.server.tsx"
  - "**/server/**/*.ts"
  - "**/api/**/*.ts"
---

# TanStack Start server security

- Authenticate and authorize every endpoint that accesses protected data.
- Authorize against the concrete resource and tenant, not only a role name.
- Preserve server-function same-origin protection and apply CSRF defenses to cookie-authenticated mutations.
- Keep session identifiers secure, HTTP-only, scoped, rotated after login, and revocable.
- Validate inputs before domain or data access.
- Return explicit errors without leaking account existence, tokens, secrets, or infrastructure details.
- Never publicly cache personalized responses.
