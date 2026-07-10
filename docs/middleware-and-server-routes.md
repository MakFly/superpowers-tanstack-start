# Middleware and server routes

## Two middleware pipelines

Request middleware surrounds incoming HTTP requests and server routes. Server-function middleware surrounds RPC calls and can contribute validated input or typed context. They solve related but distinct problems; select the pipeline that owns the boundary.

## Composition

Middleware runs in declared order before the handler and unwinds in reverse order after `next`. Make context additions explicit and narrowly typed. Avoid hidden mutable global state.

```text
request -> global middleware -> route middleware -> handler middleware -> handler
              |                       |                  |
response <----+-----------------------+------------------+
```

Use middleware for cross-cutting behavior such as authentication, authorization prerequisites, request IDs, logging, response headers, and rate-limit context. Keep domain decisions in the handler or domain service.

## Client and server portions

Server-function middleware may have client-side and server-side phases. Never place secrets or trusted authorization decisions in the client phase. Treat client context as untrusted input and verify it again on the server.

## Server routes

Server routes expose ordinary HTTP methods and `Request`/`Response` contracts. Use them for webhooks, public APIs, health endpoints, feeds, file responses, or integrations that do not call through Start's server-function transport.

Check route uniqueness after adding dynamic, splat, pathless-layout, or escaped route filenames. Parse request bodies according to content type, validate inputs, and set status and headers explicitly.

## Global middleware

Register global middleware only for behavior that truly applies to every matching request. Ordering is observable, so document dependencies between authentication, tracing, cache headers, and response transforms.

## Verification

- Test middleware order and context propagation.
- Verify client-provided context is not trusted directly.
- Exercise each supported HTTP method and content type.
- Test status codes, headers, and error responses.
- Confirm global middleware does not affect assets or health checks unintentionally.
- Confirm protected routes authenticate and authorize independently.

## Official sources

- [Middleware](https://tanstack.com/start/latest/docs/framework/react/guide/middleware)
- [Server routes](https://tanstack.com/start/latest/docs/framework/react/guide/server-routes)
- [Server entry point](https://tanstack.com/start/latest/docs/framework/react/guide/server-entry-point)
