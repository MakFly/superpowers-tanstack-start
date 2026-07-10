# Server functions

## Purpose

`createServerFn` defines typed application RPC that can be called from components, hooks, loaders, or other server functions. Start transports the call to the server and serializes the result. Use a server route instead when an external client needs a stable HTTP endpoint.

## Secure request pipeline

```text
caller -> serialized input -> validator -> middleware -> handler -> serialized result
                                      |          |
                                      |          +-> authz + domain work
                                      +-> authn/request context
```

Every function that reads or writes protected data must enforce authentication and authorization in middleware or the handler. A route `beforeLoad` guard only controls navigation UX; the server function remains independently reachable.

## Implementation rules

- Accept one explicit, serializable input object.
- Validate untrusted input before domain work.
- Keep handler return types explicit and serializable.
- Read cookies, headers, request context, and environment values per request.
- Return or throw framework redirects and not-found results intentionally.
- Use raw `Response` objects only when status, headers, binary data, or content type require them.
- Support progressive enhancement with HTML forms when the flow benefits from working without client JavaScript.
- Use middleware for repeated authentication, tracing, and context concerns.
- Use request cancellation or streaming only when the caller can consume it correctly.

## Same-origin and CSRF

Start validates the origin of server-function requests. Preserve this default. If infrastructure removes relevant headers, fix the infrastructure or provide an equivalent, verified same-origin layer before considering an opt-out. Non-GET state-changing operations still need an explicit CSRF strategy appropriate to the authentication mechanism.

## Organization

Keep public server-function exports small. Put domain logic in server-only modules and call it from handlers. Static imports are supported by the build pipeline, but the import graph must remain valid for the environment.

## Verification

- Validator rejects malformed and missing fields.
- Anonymous, unauthorized, and cross-tenant requests fail at the endpoint.
- Success, redirect, not-found, and domain-error paths are tested.
- Sensitive values do not appear in client output or serialized responses.
- Production build succeeds with function IDs and import protection enabled.

## Official sources

- [Server functions](https://tanstack.com/start/latest/docs/framework/react/guide/server-functions)
- [Streaming data from server functions](https://tanstack.com/start/latest/docs/framework/react/guide/streaming-data-from-server-functions)
- [Static server functions](https://tanstack.com/start/latest/docs/framework/react/guide/static-server-functions)
- [Authentication server primitives](https://tanstack.com/start/latest/docs/framework/react/guide/authentication-server-primitives)
