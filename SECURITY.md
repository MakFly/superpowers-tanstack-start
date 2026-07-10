# Security policy

## Report a vulnerability

Do not open a public issue for a vulnerability that could enable command execution, secret disclosure, unsafe file access, or supply-chain compromise. Contact the maintainer privately through the security reporting feature of the GitHub repository.

## Plugin security model

- The shipped hook is local and read-only.
- No hook invokes a shell, package manager, project script, or network client.
- Hook input and paths are treated as untrusted data.
- Skills are guidance, not enforcement. Use Claude Code permissions or project-owned `PreToolUse` hooks for hard security boundaries.
- Consumers must review optional rule templates before copying them into a project.
