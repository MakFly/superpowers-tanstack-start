---
paths:
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.mts"
  - "**/*.cts"
---

# TanStack Start runtime boundaries

- Treat route modules and shared imports as isomorphic unless a Start API or file marker makes the environment explicit.
- Keep secrets, database clients, filesystem access, and privileged SDKs in server-only modules.
- Use server functions for application RPC and server routes for external HTTP contracts.
- Validate all values that cross a network or serialization boundary.
- Read cookies, headers, request context, and runtime configuration per request when their values may vary.
- Never disable import protection to hide an invalid dependency graph.
