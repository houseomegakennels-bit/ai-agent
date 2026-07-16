# I’m Stuck Workflow

When the operator taps **I’m Stuck**, the system must capture the current wizard step, component state, relevant non-secret logs, redacted screenshots where useful, and release/build identifiers.

The support bundle must redact tokens, passwords, webhook secrets, private keys, recovery codes, raw uploaded private file contents, and model or backup provider keys.

The support bundle must never include secret vault values, Telegram bot tokens, GitHub private key material, model provider API keys, or backup storage secret keys.

After creating the bundle, the interface must preserve setup state, offer guided repair, and resume after repair.
