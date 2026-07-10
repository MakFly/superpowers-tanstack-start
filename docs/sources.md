# Sources and coverage

## Audit snapshot

- Audit date: 2026-07-10
- TanStack source repository: [`TanStack/router`](https://github.com/TanStack/router)
- Audited commit: `a3e24c35a58d9ac149a05d6321f68aa5d541b6b4`
- React Start Markdown pages audited: 43
- React Start documentation lines audited: 15,362
- Reference plugin: [`MakFly/superpowers-symfony`](https://github.com/MakFly/superpowers-symfony), commit `fecf68d1e23e1c13914a6240d18c598949cca185`
- Claude Code documentation index: [`llms.txt`](https://code.claude.com/docs/llms.txt)

The repository does not redistribute the upstream documentation. It records coverage and links to the canonical pages while maintaining an original operational synthesis.

## TanStack Start coverage

| Official page | Covered in |
| --- | --- |
| Overview | `architecture.md` |
| Getting Started | `architecture.md` |
| Build from Scratch | `architecture.md` |
| Comparison | `migration-and-decisions.md` |
| Start vs Next.js | `migration-and-decisions.md` |
| Migrate from Next.js | `migration-and-decisions.md` |
| Routing | `routing-and-data.md` |
| Client Entry Point | `architecture.md` |
| Server Entry Point | `architecture.md`, `middleware-and-server-routes.md` |
| Execution Model | `execution-boundaries.md` |
| Code Execution Patterns | `execution-boundaries.md` |
| Environment Functions | `execution-boundaries.md` |
| Import Protection | `execution-boundaries.md`, `testing-and-debugging.md` |
| Server Functions | `server-functions.md` |
| Static Server Functions | `server-functions.md`, `rendering.md` |
| Streaming Data from Server Functions | `server-functions.md`, `rendering.md` |
| Middleware | `middleware-and-server-routes.md` |
| Server Routes | `middleware-and-server-routes.md` |
| Authentication Overview | `authentication-and-security.md` |
| Authentication Server Primitives | `authentication-and-security.md` |
| Authentication | `authentication-and-security.md` |
| Selective SSR | `rendering.md` |
| SPA Mode | `rendering.md` |
| Static Prerendering | `rendering.md` |
| ISR | `rendering.md`, `deployment-and-observability.md` |
| Deferred Hydration | `rendering.md` |
| Hydration Errors | `rendering.md`, `testing-and-debugging.md` |
| Server Components | `rendering.md` |
| Environment Variables | `assets-environment-and-styling.md` |
| CSS Styling | `assets-environment-and-styling.md` |
| CDN Asset URLs | `assets-environment-and-styling.md` |
| Early Hints | `assets-environment-and-styling.md` |
| Path Aliases | `assets-environment-and-styling.md` |
| Rendering Markdown | `assets-environment-and-styling.md` |
| Tailwind Integration | `assets-environment-and-styling.md` |
| Hosting | `deployment-and-observability.md` |
| Observability | `deployment-and-observability.md` |
| SEO | `deployment-and-observability.md` |
| GEO | `deployment-and-observability.md` |
| Databases | `migration-and-decisions.md` |
| Error Boundaries | `testing-and-debugging.md` |
| Fetching External API tutorial | `testing-and-debugging.md` |
| Reading/Writing File tutorial | `testing-and-debugging.md` |

The Start ESLint overview and its `no-async-client-component` and `no-client-code-in-server-component` rules were also audited and are summarized in `testing-and-debugging.md`.

## Canonical TanStack URLs

- [React Start documentation](https://tanstack.com/start/latest/docs/framework/react/overview)
- [React Start source directory](https://github.com/TanStack/router/tree/main/docs/start/framework/react)
- [TanStack Router documentation](https://tanstack.com/router/latest/docs/framework/react/overview)
- [Start ESLint plugin](https://tanstack.com/start/latest/docs/eslint/eslint-plugin-start)

## Claude Code sources

- [Best practices](https://code.claude.com/docs/en/best-practices)
- [Extension selection](https://code.claude.com/docs/en/features-overview)
- [Skills](https://code.claude.com/docs/en/slash-commands)
- [Subagents](https://code.claude.com/docs/en/sub-agents)
- [Hooks guide](https://code.claude.com/docs/en/hooks-guide)
- [Hooks reference](https://code.claude.com/docs/en/hooks)
- [Plugin authoring](https://code.claude.com/docs/en/plugins)
- [Plugin reference](https://code.claude.com/docs/en/plugins-reference)
- [Plugin marketplaces](https://code.claude.com/docs/en/plugin-marketplaces)
- [Project memory and rules](https://code.claude.com/docs/en/memory)
- [Configuration debugging](https://code.claude.com/docs/en/debug-your-config)

## Maintenance

The `latest` documentation can change without a major repository release. Re-audit changed pages before updating a skill, and record the new source commit and audit date in this file.
