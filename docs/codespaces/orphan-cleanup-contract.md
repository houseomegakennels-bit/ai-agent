# Codespaces Orphan Cleanup Contract

Future cleanup must detect Codespaces without active task leases, stop them safely, record the action in audit history, and notify the operator when cleanup affects cost or task state.

Release 4 defines the cleanup contract only and does not call GitHub APIs.
