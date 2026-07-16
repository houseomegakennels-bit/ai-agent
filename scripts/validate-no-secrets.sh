#!/usr/bin/env bash
set -euo pipefail

patterns=(
  '-----BEGIN (RSA |EC |OPENSSH |)PRIVATE KEY-----'
  'TELEGRAM_BOT_TOKEN=[^[:space:]]+'
  'TELEGRAM_WEBHOOK_SECRET=[^[:space:]]+'
  'GITHUB_APP_PRIVATE_KEY=[^[:space:]]+'
  'FREE_MODEL_API_KEY=[^[:space:]]+'
  'BACKUP_STORAGE_SECRET_KEY=[^[:space:]]+'
  'SECRET_ENCRYPTION_KEY=[^[:space:]]+'
  'ALLOW_PAID_API_FALLBACK=true'
)

for pattern in "${patterns[@]}"; do
  if rg --pcre2 -n --glob "!scripts/validate-no-secrets.sh" -- "$pattern" . >/tmp/helix-secret-scan.txt; then
    cat /tmp/helix-secret-scan.txt >&2
    echo "Potential secret or unsafe paid fallback setting detected for pattern: $pattern" >&2
    exit 1
  fi
done

echo "No configured secret patterns found."
