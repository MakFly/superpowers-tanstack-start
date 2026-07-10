# Migration and architecture decisions

## Decide before migrating

Start is Router-first and explicit about client/server boundaries. A migration should preserve behavior while replacing framework contracts incrementally. Do not rewrite product logic and framework infrastructure in the same step.

## From Next.js

Map concepts deliberately:

| Next.js concept | TanStack Start direction |
| --- | --- |
| App or Pages Router | TanStack Router route tree |
| Layout | Root or pathless layout route |
| Server Action | Server function |
| Route Handler | Server route |
| `next/link` | Typed Router `Link` |
| Framework image/font helpers | Explicit asset or provider integration |
| Implicit server/client component boundary | Explicit Start execution boundary |

Migrate configuration and the root document first, then one route slice. Verify direct loads, navigation, forms, metadata, assets, and deployment after each slice.

## Framework selection

Choose Start when typed URL state, Router loaders and caching, explicit server functions, and portable deployment are primary constraints. Compare current ecosystem maturity, provider support, and team familiarity rather than relying on generic benchmark claims.

## Database access

Start does not require a specific database. Access the chosen client from server-only modules called by server functions or server routes. Define connection lifecycle, transaction boundaries, pooling, migrations, and deployment-runtime compatibility explicitly.

## Architecture decision record

For a non-trivial choice, record:

- installed Start, Router, React, and build-tool versions;
- existing and proposed request/data flow;
- rendering and cache requirements;
- security boundary;
- runtime and adapter constraints;
- verification commands and browser scenario;
- rollback path.

## Official sources

- [Framework comparison](https://tanstack.com/start/latest/docs/framework/react/comparison)
- [Start vs Next.js](https://tanstack.com/start/latest/docs/framework/react/start-vs-nextjs)
- [Migrate from Next.js](https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js)
- [Databases](https://tanstack.com/start/latest/docs/framework/react/guide/databases)
