# Repository instructions

## Scope

This repository distributes source-linked TanStack Start guidance for coding agents. Keep all framework claims traceable to an official source in `docs/sources.md`.

## Working rules

- Inspect the target application's package manifest, lockfile, route tree, and build configuration before recommending changes.
- Match the installed TanStack Start and Router APIs. Do not silently migrate versions.
- Treat route guards as navigation controls, not authorization boundaries.
- Authenticate and authorize every server function or server route that accesses protected data.
- Keep secrets in server-only modules and validate required environment variables explicitly.
- Prefer the smallest change that preserves the application's existing Vite or Rsbuild setup and deployment adapter.
- Never install packages, rewrite lockfiles, create migrations, deploy, commit, or push without explicit approval.
- Run the narrowest relevant test first, then the repository's existing typecheck, lint, build, and browser checks.
- Report commands that were not available or could not be verified.

## Repository verification

```bash
bun run test
claude plugin validate .
```

The Node-based test suite has no third-party runtime dependencies. Do not add dependencies only to validate Markdown or JSON.
