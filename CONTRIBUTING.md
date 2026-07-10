# Contributing

## Principles

- Prefer official TanStack or Claude Code sources.
- Keep skills concise and move task-specific detail into `docs/`.
- Add a source entry whenever a framework claim or workflow changes.
- Keep hooks deterministic and free of network, install, delete, deploy, or Git write operations.
- Preserve compatibility with both Vite and Rsbuild unless a contribution explicitly targets one tool.

## Validation

Run:

```bash
bun run test
claude plugin validate .
```

## Pull requests

Explain the user-visible behavior, sources consulted, tests run, and any unverified runtime path. Do not mix unrelated refactors with documentation or skill changes.
