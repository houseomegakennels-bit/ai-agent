# Backup and Restore Contract

Backup targets:

- Task database RPO: 6 hours.
- Configuration RPO: one change.
- Recovery target: under 2 hours.
- Backups encrypted before leaving the server.
- Raw offline recovery key excluded from backups.

Restore must be guided from iPhone, verify backup integrity, warn before destructive actions, and support restore testing in a temporary environment.
