# Task Lifecycle Contract

Release 1 uses the task states defined in `core/tasks/taskLifecycle.ts`.

Every future task must include task identity, project, repository, branch, files, instruction, model route, environment/codespace reference, approvals, runtime, cost estimate, outputs, errors, retry count, audit trail, and idempotency key.

Secrets are not allowed in durable task records.
