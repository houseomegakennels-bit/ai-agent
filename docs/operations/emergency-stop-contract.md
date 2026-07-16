# Emergency Stop Contract

Emergency Stop must eventually stop active tasks, stop Codespaces, stop browser workers, stop paid model calls, block new work, preserve state, and notify the operator.

Release 0 defines this behavior as a contract only. It does not implement runtime stop actions.

Emergency Stop must never delete evidence, erase audit trails, or automatically resume work without approval.
