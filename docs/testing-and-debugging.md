# Testing and debugging

## Verification pyramid

Use the narrowest test that can fail for the behavior being changed, then expand:

```text
pure domain and validators
        |
server function / middleware / route integration
        |
router loader and component integration
        |
production build and adapter smoke test
        |
browser-visible workflow and console/network inspection
```

## Server boundaries

Test valid and invalid serialized inputs, authentication, resource authorization, redirects, not-found results, status codes, headers, and error mapping. For tenant-aware data, include a cross-tenant denial case.

## Routing

Test direct URL loads and client navigation. Cover params, search validation, loader dependencies, pending states, errors, not-found behavior, and route-tree generation. A component-only test does not prove routing behavior.

## Rendering

Compare server HTML with the first client render for hydration-sensitive changes. Exercise JavaScript-disabled behavior when using progressive enhancement. For selective SSR or SPA mode, test both direct requests and navigation.

## Production build

Build failures can expose import-boundary mistakes that development mode tolerates. Inspect the client output when secrets, server-only modules, or unexpected chunks are a concern. Run the actual produced server entry when practical.

## Browser verification

After UI changes, open the relevant page and reproduce the scenario. Record:

- visible outcome and responsive state;
- console errors and hydration warnings;
- failed or duplicated network requests;
- status, redirect, and cache behavior;
- keyboard and no-JavaScript behavior when applicable.

## Diagnosis order

1. Reproduce the exact runtime path.
2. Read the first actionable server, browser, or build error.
3. Trace route -> loader -> server function/route -> middleware -> dependency.
4. Compare development and production builds.
5. Confirm installed versions and official signatures.
6. Change one boundary at a time and rerun the smallest failing check.

Do not mask hydration, import-protection, validation, or authorization errors with catch-all fallbacks.

## Quality checks

Use the repository's configured test runner and the official Start ESLint plugin where already present. The Start ESLint rules include checks for async client components and client code in server components. Do not install or reconfigure lint tooling without approval.

## Official sources

- [Error boundaries](https://tanstack.com/start/latest/docs/framework/react/guide/error-boundaries)
- [Hydration errors](https://tanstack.com/start/latest/docs/framework/react/guide/hydration-errors)
- [Import protection](https://tanstack.com/start/latest/docs/framework/react/guide/import-protection)
- [Start ESLint plugin](https://tanstack.com/start/latest/docs/eslint/eslint-plugin-start)
- [External API tutorial](https://tanstack.com/start/latest/docs/framework/react/tutorial/fetching-external-api)
- [Reading and writing files tutorial](https://tanstack.com/start/latest/docs/framework/react/tutorial/reading-writing-file)
