export type OperationsCapability =
  | 'secret-vault-contract'
  | 'offline-recovery-key-contract'
  | 'diagnostics-contract'
  | 'backup-contract'
  | 'restore-contract'
  | 'safe-update-contract'
  | 'rollback-contract'
  | 'emergency-stop-contract'
  | 'external-uptime-monitor-contract';

export interface OperationsFoundationItem {
  capability: OperationsCapability;
  release: '0';
  purpose: string;
  verifies: string[];
  forbidden: string[];
  implementedRuntime: false;
}

export const releaseZeroOperationsFoundation: OperationsFoundationItem[] = [
  {
    capability: 'secret-vault-contract',
    release: '0',
    purpose: 'Define how secrets will be stored and rotated without exposing values to Codex, Telegram, logs, Markdown, or support bundles.',
    verifies: ['secret inventory exists', 'entry flow redacts values', 'rotation and revocation instructions exist'],
    forbidden: ['real secret values', 'raw vault exports', 'tokens in logs'],
    implementedRuntime: false,
  },
  {
    capability: 'offline-recovery-key-contract',
    release: '0',
    purpose: 'Define the one-time offline recovery-key flow and verification requirement.',
    verifies: ['key shown once', 'operator verifies storage', 'raw key excluded from backups'],
    forbidden: ['raw recovery key in Git', 'raw recovery key in support bundle'],
    implementedRuntime: false,
  },
  {
    capability: 'diagnostics-contract',
    release: '0',
    purpose: 'Define health checks, readiness checks, and guided repair summaries for phone-first operation.',
    verifies: ['health endpoint contract', 'ready endpoint contract', 'redacted diagnostic package'],
    forbidden: ['raw secrets', 'unexplained error dumps'],
    implementedRuntime: false,
  },
  {
    capability: 'backup-contract',
    release: '0',
    purpose: 'Define backup cadence, retention, off-server storage expectations, and restore-test requirement.',
    verifies: ['RPO stated', 'retention stated', 'off-server storage stated'],
    forbidden: ['unencrypted backup', 'raw recovery key in backup'],
    implementedRuntime: false,
  },
  {
    capability: 'restore-contract',
    release: '0',
    purpose: 'Define iPhone-guided restore flow and temporary-environment restore test.',
    verifies: ['restore target under two hours', 'operator confirmation before destructive restore'],
    forbidden: ['silent overwrite', 'restore without backup validation'],
    implementedRuntime: false,
  },
  {
    capability: 'safe-update-contract',
    release: '0',
    purpose: 'Define branch, tests, preview, approval, production switch, health check, and rollback sequence.',
    verifies: ['tests pass before switch', 'rollback procedure exists'],
    forbidden: ['direct production mutation', 'unreviewed update'],
    implementedRuntime: false,
  },
  {
    capability: 'rollback-contract',
    release: '0',
    purpose: 'Define rollback classification for code, config, data, and deployment changes.',
    verifies: ['rollback instructions present', 'irreversible migration warning'],
    forbidden: ['unbounded rollback attempt', 'data loss without approval'],
    implementedRuntime: false,
  },
  {
    capability: 'emergency-stop-contract',
    release: '0',
    purpose: 'Define stop-active-work behavior for tasks, browser workers, Codespaces, and paid model calls.',
    verifies: ['state preserved', 'new work blocked', 'operator notified'],
    forbidden: ['delete evidence', 'resume without approval'],
    implementedRuntime: false,
  },
  {
    capability: 'external-uptime-monitor-contract',
    release: '0',
    purpose: 'Define external monitoring expectations for dashboard health and Telegram/controller heartbeat.',
    verifies: ['public health monitor contract', 'secondary alert channel contract'],
    forbidden: ['single-system self-report only'],
    implementedRuntime: false,
  },
];

export function allOperationsItemsAreContractsOnly(items: OperationsFoundationItem[]): boolean {
  return items.every((item) => item.implementedRuntime === false);
}

export function operationsCapabilities(items: OperationsFoundationItem[]): OperationsCapability[] {
  return items.map((item) => item.capability);
}
