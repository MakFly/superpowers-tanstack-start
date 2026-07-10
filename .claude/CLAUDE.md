@../AGENTS.md

## Claude Code repository notes

- Use the skills under `skills/` for domain workflows instead of expanding this file.
- Treat `rules/` as templates for consumer projects; plugin installation does not auto-load them.
- Keep hooks deterministic, local, read-only, and free of network or package-install side effects.
