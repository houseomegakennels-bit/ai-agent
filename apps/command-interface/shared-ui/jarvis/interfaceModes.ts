export type LaunchEnvironment = 'telegram-mini-app' | 'pwa-standalone' | 'mobile-safari';
export type CommandInterfaceMode = 'basic' | 'advanced' | 'command' | 'operations' | 'trade' | 'system';

export interface InterfaceModeDefinition {
  mode: CommandInterfaceMode;
  purpose: string;
  alwaysShowEmergencyStop: true;
  phoneFirst: true;
}

export const releaseOneAInterfaceModes: InterfaceModeDefinition[] = [
  { mode: 'basic', purpose: 'Daily status, tasks, projects, upload, talk, Run Codex, trading, attention queue, and settings.', alwaysShowEmergencyStop: true, phoneFirst: true },
  { mode: 'advanced', purpose: 'Models, containers, Codespaces, workers, browser sessions, costs, backups, skills, knowledge, logs, flags, inventory, and build manifest.', alwaysShowEmergencyStop: true, phoneFirst: true },
  { mode: 'command', purpose: 'Text/voice/file task input, project selection, structured preview, cost estimate, risk classification, and confirmation controls.', alwaysShowEmergencyStop: true, phoneFirst: true },
  { mode: 'operations', purpose: 'Active tasks, timelines, Codex jobs, Codespace controls, pull requests, deployments, approvals, rollbacks, and release gates.', alwaysShowEmergencyStop: true, phoneFirst: true },
  { mode: 'trade', purpose: 'Pine upload, strategy review, backtest manifest, assisted browser checklist, exports, evidence, metrics, reports, and comparisons.', alwaysShowEmergencyStop: true, phoneFirst: true },
  { mode: 'system', purpose: 'Costs, budgets, backups, recovery, secret status, provider status, uptime, feature flags, skills, manifest, inventory, and emergency controls.', alwaysShowEmergencyStop: true, phoneFirst: true },
];

export function supportedLaunchEnvironments(): LaunchEnvironment[] {
  return ['telegram-mini-app', 'pwa-standalone', 'mobile-safari'];
}

export function allModesKeepEmergencyStopVisible(modes: InterfaceModeDefinition[]): boolean {
  return modes.every((mode) => mode.alwaysShowEmergencyStop === true && mode.phoneFirst === true);
}
