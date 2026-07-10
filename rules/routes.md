---
paths:
  - "**/routes/**/*.ts"
  - "**/routes/**/*.tsx"
  - "**/router.ts"
  - "**/router.tsx"
---

# TanStack Start route rules

- Validate params and search state at the route boundary.
- Declare every loader input in loader dependencies.
- Use typed links, navigation, redirects, and route APIs.
- Keep direct database or secret access out of isomorphic loaders.
- Provide intentional pending, error, and not-found behavior.
- Treat `beforeLoad` as navigation control; protect data again inside each server endpoint.
- Do not edit generated route-tree files.
