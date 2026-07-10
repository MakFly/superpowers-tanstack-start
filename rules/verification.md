---
paths:
  - "**/*.test.ts"
  - "**/*.test.tsx"
  - "**/*.spec.ts"
  - "**/*.spec.tsx"
  - "**/vite.config.*"
  - "**/rsbuild.config.*"
---

# TanStack Start verification

- Test the public boundary instead of only implementation helpers.
- Cover malformed input, authentication, authorization, and dependency failures for protected endpoints.
- Test direct route loads and client navigation.
- Run a production build for client/server import, SSR, chunking, and adapter changes.
- Reproduce browser-visible changes and inspect console and network output.
- Use the repository's existing runner and configuration; ask before installing or reconfiguring tools.
- Report checks not run and runtime paths not verified.
