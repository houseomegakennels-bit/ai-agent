#!/usr/bin/env bash
set -euo pipefail

echo "# Blackspire Helix Command Core scaffold evidence"
date -u +"timestamp_utc=%Y-%m-%dT%H:%M:%SZ"
echo

echo "## Git status"
git status --short

echo
echo "## Tracked files"
git ls-files | sort

echo
echo "## Environment validation"
./scripts/validate-environment.sh

echo
echo "## Secret-pattern validation"
./scripts/validate-no-secrets.sh
