# Deployment and observability

## Deployment workflow

Start is intended to produce portable server output, but each runtime has different request, asset, environment, cache, and streaming behavior. Preserve the application's selected adapter and verify its official deployment path.

Before deployment:

1. Identify Vite or Rsbuild and the runtime adapter.
2. Build with production environment validation enabled.
3. Run the produced server artifact locally when the adapter permits it.
4. Verify static assets, server-function paths, server routes, redirects, and direct route requests.
5. Verify streaming and early hints only on the real proxy/CDN path.
6. Confirm secrets exist in the runtime without printing their values.

## Hosting options

Official documentation covers Cloudflare Workers, Netlify, Railway, Nitro-based runtimes, Vercel, Node/Docker, Bun, and Appwrite Sites. Provider examples evolve; follow the current page and installed adapter rather than hard-coding an output directory from an older guide.

## Cache safety

- Publicly cache only responses independent of user identity and private request state.
- Set `Vary` for every request property that changes a cacheable representation.
- Use ETags or equivalent validation where beneficial.
- Test CDN behavior, not just application headers.
- Keep authenticated pages private unless the architecture provides a proven partitioned cache.

## Observability

Instrument server functions, middleware, routes, and route loaders with stable request or trace IDs. Record duration, outcome, and safe identifiers. Never log passwords, session cookies, authorization headers, reset tokens, raw secrets, or sensitive request bodies.

Provide health endpoints that check only the dependencies required by the platform's readiness contract. Separate liveness from deep dependency checks when the runtime supports it.

Use route error boundaries for user experience and server-side reporting for diagnosis. Development debug headers must not expose internals in production.

## SEO and GEO

SSR alone does not guarantee discoverability. Provide correct titles, canonical URLs, structured data, sitemaps, robots policy, stable factual content, and accessible semantic markup. Keep generated metadata consistent with the rendered content.

## Official sources

- [Hosting](https://tanstack.com/start/latest/docs/framework/react/guide/hosting)
- [Observability](https://tanstack.com/start/latest/docs/framework/react/guide/observability)
- [ISR](https://tanstack.com/start/latest/docs/framework/react/guide/isr)
- [SEO](https://tanstack.com/start/latest/docs/framework/react/guide/seo)
- [GEO](https://tanstack.com/start/latest/docs/framework/react/guide/geo)
