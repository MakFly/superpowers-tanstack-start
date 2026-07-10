# Superpowers TanStack Start — Claude Code Plugin & Agent Skills

**Superpowers TanStack Start** is an open-source Claude Code plugin and Agent Skills toolkit for building production-ready [TanStack Start](https://tanstack.com/start/latest) applications. It gives AI coding agents source-linked guidance for type-safe TanStack Router routes, server functions, SSR, streaming, middleware, authentication, testing, and deployment.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TanStack Start](https://img.shields.io/badge/TanStack_Start-React-FF4154)](https://tanstack.com/start/latest/docs/framework/react/overview)
[![Claude Code Plugin](https://img.shields.io/badge/Claude_Code-Plugin-D97757)](https://code.claude.com/docs/en/plugins)
[![Validation](https://github.com/MakFly/superpowers-tanstack-start/actions/workflows/validate.yml/badge.svg)](https://github.com/MakFly/superpowers-tanstack-start/actions/workflows/validate.yml)

## Why use Superpowers TanStack Start?

TanStack Start combines TanStack Router with full-document server-side rendering, streaming, server functions, server routes, middleware, and portable full-stack builds. Those capabilities also create boundaries that AI coding agents must handle correctly: loaders can be isomorphic, route guards do not secure data endpoints, server values must never leak into client bundles, and deployment behavior varies by runtime.

This plugin turns the official documentation into focused, reusable workflows that help Claude Code and compatible agents:

- design type-safe file-based routes, loaders, search parameters, and route context;
- implement secure `createServerFn` handlers with validation and authorization;
- compose request middleware, server-function middleware, and API routes;
- choose between SSR, selective SSR, SPA mode, prerendering, ISR, streaming, and deferred hydration;
- audit sessions, cookies, OAuth PKCE, CSRF, rate limiting, and tenant isolation;
- protect client/server import boundaries and environment variables;
- test direct navigation, client navigation, hydration, production builds, and deployment adapters;
- deploy to Cloudflare Workers, Netlify, Railway, Nitro, Node.js, Docker, Bun, Vercel, or Appwrite with explicit runtime verification.

## What is included?

```text
superpowers-tanstack-start/
├── skills/                 8 focused TanStack Start Agent Skills
├── agents/                 4 read-only specialist agents
├── commands/               3 Claude Code command aliases
├── rules/                  Optional path-scoped project rules
├── hooks/                  Safe, read-only SessionStart detection
├── docs/                   Source-linked TanStack Start knowledge base
├── tests/                  Hook and structural validation
└── .claude-plugin/         Plugin and marketplace manifests
```

The plugin contains no runtime dependencies. Its session hook never installs packages, executes project scripts, accesses the network, or writes to the target project.

## Quick start

### Install from the Claude Code marketplace

```text
/plugin marketplace add MakFly/superpowers-tanstack-start
/plugin install superpowers-tanstack-start@superpowers-tanstack-start
```

Restart Claude Code or run `/reload-plugins` after installation. Confirm the plugin with `/plugin`, inspect available skills with `/skills`, and inspect agents with `/agents`.

### Test the plugin locally

```bash
git clone https://github.com/MakFly/superpowers-tanstack-start.git
cd superpowers-tanstack-start
bun run test
claude plugin validate .claude-plugin/plugin.json
claude --plugin-dir .
```

No package installation is required for validation.

## TanStack Start skills

Claude can select a skill automatically from its description, or you can invoke it explicitly:

| Skill | Best for |
| --- | --- |
| `/superpowers-tanstack-start:tanstack-start-workflow` | Planning cross-cutting features, refactors, upgrades, and migrations |
| `/superpowers-tanstack-start:tanstack-start-routing` | File routes, loaders, params, search validation, navigation, and route trees |
| `/superpowers-tanstack-start:tanstack-start-server-functions` | Secure server functions, validators, serialization, redirects, and streaming |
| `/superpowers-tanstack-start:tanstack-start-middleware` | Request middleware, server-function middleware, server routes, and APIs |
| `/superpowers-tanstack-start:tanstack-start-rendering` | SSR, SPA mode, prerendering, ISR, hydration, streaming, and RSC |
| `/superpowers-tanstack-start:tanstack-start-auth` | Sessions, authorization, OAuth, CSRF, rate limiting, and tenant isolation |
| `/superpowers-tanstack-start:tanstack-start-deployment` | Production builds, hosting adapters, caching, health checks, and observability |
| `/superpowers-tanstack-start:tanstack-start-testing` | Integration tests, browser verification, build failures, and debugging |

Example:

```text
/superpowers-tanstack-start:tanstack-start-server-functions

Implement a type-safe updateProfile server function with input validation,
session-based authorization, explicit errors, and integration tests.
```

## Specialized Claude Code agents

| Agent | Purpose | Access |
| --- | --- | --- |
| `tanstack-start-architect` | Architecture, request-flow, rendering, and migration planning | Read-only |
| `tanstack-start-reviewer` | Correctness, type safety, performance, and regression review | Read-only |
| `tanstack-start-security-auditor` | Authentication, authorization, CSRF, sessions, and secret-boundary audit | Read-only |
| `tanstack-start-debugger` | Evidence-first routing, SSR, hydration, build, and runtime diagnosis | Diagnostic commands |

Invoke a plugin agent explicitly:

```text
@agent-superpowers-tanstack-start:tanstack-start-security-auditor audit the current authentication flow
```

## Optional TanStack Start rules

Claude Code does not automatically load a plugin's root `rules/` directory. The included rules are reviewable templates for consumer projects:

- `runtime-boundaries.md`
- `routes.md`
- `server-security.md`
- `verification.md`

Copy only the rules your project needs:

```bash
mkdir -p .claude/rules/tanstack-start
cp /path/to/superpowers-tanstack-start/rules/*.md .claude/rules/tanstack-start/
```

The plugin never copies or overwrites project files automatically.

## Safe TanStack Start project detection

The `SessionStart` hook searches nearby `package.json` files without following symbolic links. When it finds `@tanstack/react-start`, it reports:

- the package location and declared TanStack Start version;
- Vite or Rsbuild detection;
- the declared package manager;
- a reminder to inspect installed APIs before changing runtime boundaries.

The hook is bounded, deterministic, local, read-only, and covered by fixtures for valid, unrelated, and malformed projects.

## Source-linked TanStack Start documentation

The [`docs/`](docs/README.md) directory condenses the complete official React Start guide set into an original, agent-oriented knowledge base:

- [Architecture and setup](docs/architecture.md)
- [Routing and data loading](docs/routing-and-data.md)
- [Client and server execution boundaries](docs/execution-boundaries.md)
- [Server functions](docs/server-functions.md)
- [Middleware and server routes](docs/middleware-and-server-routes.md)
- [SSR, streaming, SPA, ISR, hydration, and RSC](docs/rendering.md)
- [Authentication and security](docs/authentication-and-security.md)
- [Assets, environment variables, CSS, and CDN behavior](docs/assets-environment-and-styling.md)
- [Deployment and observability](docs/deployment-and-observability.md)
- [Testing and debugging](docs/testing-and-debugging.md)
- [Migration and architecture decisions](docs/migration-and-decisions.md)

The initial audit covered all 43 official TanStack Start React Markdown pages, the Start ESLint documentation, relevant TanStack Router guides, and current Claude Code extension documentation. Exact upstream commits and URLs are recorded in [`docs/sources.md`](docs/sources.md).

## Design principles

- **Official sources first:** framework guidance links back to TanStack or Claude Code documentation.
- **Progressive disclosure:** concise skills route agents to focused references only when needed.
- **Secure data boundaries:** endpoint authorization is mandatory; route guards are navigation controls.
- **Version awareness:** inspect installed packages before applying an API signature.
- **Surgical changes:** preserve existing build tools, deployment adapters, and repository conventions.
- **Verification over confidence:** test the real route, server, build, browser, and hosting path.
- **No silent recovery:** errors stay explicit and actionable.

## Validation

Run the dependency-free test suite:

```bash
bun run test
```

It validates plugin manifests, skill metadata, agents, commands, hook safety, local Markdown links, documentation coverage, and hook behavior.

Validate against the installed Claude Code schema:

```bash
claude plugin validate .claude-plugin/plugin.json
```

## Compatibility

- Claude Code plugin layout and marketplace distribution
- Agent Skills-compatible `SKILL.md` files
- Codex UI metadata under each skill's `agents/openai.yaml`
- TanStack Start for React with Vite or Rsbuild
- Bun 1.3.14 and Node.js 20 or newer for repository validation

TanStack Start currently labels React Server Components as experimental. The plugin treats experimental APIs as version-sensitive and requires verification against the installed framework version.

## Contributing

Contributions are welcome. Read [`CONTRIBUTING.md`](CONTRIBUTING.md) before changing skills, hooks, agents, or source-linked framework guidance. Security issues should follow [`SECURITY.md`](SECURITY.md).

## Attribution

The repository structure was informed by [MakFly/superpowers-symfony](https://github.com/MakFly/superpowers-symfony), then redesigned around current Claude Code plugin conventions and the TanStack Start execution model. Documentation and implementation in this repository are original.

TanStack, TanStack Start, TanStack Router, Claude, and Claude Code are trademarks or projects of their respective owners. This project is not affiliated with or endorsed by TanStack or Anthropic.

## License

Released under the [MIT License](LICENSE).
