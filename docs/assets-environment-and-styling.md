# Assets, environment, and styling

## Environment variables

Server code may read private variables. Client bundles may only contain values intentionally exposed with the build tool's public prefix. Vite and Rsbuild use different defaults, so inspect the active configuration before recommending a name.

Validate required variables with an explicit schema or startup check. Type declarations improve developer experience but do not prove runtime presence. Remember that client variables are build-time public data, not secrets.

## Request-time configuration

Read request-scoped values, cookies, and runtime bindings inside request handling. Avoid module-scope reads when the deployment runtime can vary configuration per request or isolate.

## CSS patterns

- Use explicit stylesheet URL imports when the document head should own the link.
- Use side-effect imports for route-global CSS.
- Use CSS Modules for component or route scoping.
- Understand when the route graph discovers CSS.
- Treat production inlining as a tradeoff between requests, cacheability, and HTML size.
- Verify URL rebasing and code-split CSS in the production build.

## CDN asset URLs

Asset transforms can add a static prefix or choose a URL per request. Account for scripts, styles, module preloads, fonts, images, inlined CSS URLs, client navigation chunks, and cross-origin attributes. The transform does not rewrite every arbitrary URL in application content.

## Early hints

Send only high-value preload or preconnect hints. Filter dynamic route links and ensure CDN rewrites produce the same final URLs as the response document. Treat `Link` response headers as a runtime-dependent fallback.

## Aliases and build tools

Keep TypeScript and build-tool aliases aligned. Follow the Vite or Rsbuild version-specific configuration already used by the application. A TypeScript alias alone does not configure runtime module resolution.

## Markdown and Tailwind

For Markdown, choose between build-time content collections and validated remote content. Sanitize untrusted HTML and bound remote fetching and caching. For Tailwind, match the documented integration to the installed major version and build tool; do not transplant a legacy v3 configuration into a v4 project.

## Official sources

- [Environment variables](https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables)
- [CSS styling](https://tanstack.com/start/latest/docs/framework/react/guide/css-styling)
- [CDN asset URLs](https://tanstack.com/start/latest/docs/framework/react/guide/cdn-asset-urls)
- [Early hints](https://tanstack.com/start/latest/docs/framework/react/guide/early-hints)
- [Path aliases](https://tanstack.com/start/latest/docs/framework/react/guide/path-aliases)
- [Rendering Markdown](https://tanstack.com/start/latest/docs/framework/react/guide/rendering-markdown)
- [Tailwind integration](https://tanstack.com/start/latest/docs/framework/react/guide/tailwind-integration)
