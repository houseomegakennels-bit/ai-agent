export type TelegramBridgeDryRunStatus = 'placeholder_only' | 'local_fixture_passed' | 'blocked_until_operator_runtime';

export interface TelegramBridgeDryRunFixture {
  fixtureId: string;
  operatorAlias: 'local_operator_fixture';
  messageText: string;
  expectedAction: 'acknowledge_only' | 'create_local_task_preview' | 'request_project_selection';
  containsSecret: false;
  usesProductionBot: false;
}

export interface TelegramBridgeDryRunResult {
  status: TelegramBridgeDryRunStatus;
  acknowledgementText: string;
  taskPreviewTitle?: string;
  tokenReadAttempted: false;
  chatIdReadAttempted: false;
  liveEndpointContacted: false;
  deploymentChanged: false;
  secretsIncluded: false;
  productionBotEnabled: false;
}

export const telegramBridgeDryRunFixtures: TelegramBridgeDryRunFixture[] = [
  {
    fixtureId: 'telegram-dry-run-acknowledge',
    operatorAlias: 'local_operator_fixture',
    messageText: 'status please',
    expectedAction: 'acknowledge_only',
    containsSecret: false,
    usesProductionBot: false,
  },
  {
    fixtureId: 'telegram-dry-run-task-preview',
    operatorAlias: 'local_operator_fixture',
    messageText: 'create task review release handoff',
    expectedAction: 'create_local_task_preview',
    containsSecret: false,
    usesProductionBot: false,
  },
  {
    fixtureId: 'telegram-dry-run-project-select',
    operatorAlias: 'local_operator_fixture',
    messageText: 'switch project',
    expectedAction: 'request_project_selection',
    containsSecret: false,
    usesProductionBot: false,
  },
];

export function runTelegramBridgeDryRunFixture(fixture: TelegramBridgeDryRunFixture): TelegramBridgeDryRunResult {
  const base = {
    tokenReadAttempted: false as const,
    chatIdReadAttempted: false as const,
    liveEndpointContacted: false as const,
    deploymentChanged: false as const,
    secretsIncluded: false as const,
    productionBotEnabled: false as const,
  };

  if (fixture.expectedAction === 'create_local_task_preview') {
    return {
      status: 'local_fixture_passed',
      acknowledgementText: 'Local dry-run acknowledged. Task preview prepared for operator review only.',
      taskPreviewTitle: 'Review release handoff',
      ...base,
    };
  }

  if (fixture.expectedAction === 'request_project_selection') {
    return {
      status: 'local_fixture_passed',
      acknowledgementText: 'Local dry-run acknowledged. Project selection would be requested in a future approved runtime.',
      ...base,
    };
  }

  return {
    status: 'local_fixture_passed',
    acknowledgementText: 'Local dry-run acknowledged. No runtime bridge is enabled.',
    ...base,
  };
}

export function summarizeTelegramBridgeDryRun(fixtures: TelegramBridgeDryRunFixture[] = telegramBridgeDryRunFixtures): string {
  return `${fixtures.length} Telegram bridge fixtures are placeholder-only and local; production runtime remains blocked.`;
}
