export type LiveUpdateTransport = 'server-sent-events' | 'websocket-interactive-browser-only' | 'short-polling-fallback';

export interface LiveUpdateContract {
  transport: LiveUpdateTransport;
  reconnectsAutomatically: true;
  resumesFromLastEventId: boolean;
  preventsDuplicateEvents: true;
  keepsWebhookOpen: false;
  implementedRuntime: false;
}

export const releaseOneALiveUpdateContracts: LiveUpdateContract[] = [
  {
    transport: 'server-sent-events',
    reconnectsAutomatically: true,
    resumesFromLastEventId: true,
    preventsDuplicateEvents: true,
    keepsWebhookOpen: false,
    implementedRuntime: false,
  },
  {
    transport: 'websocket-interactive-browser-only',
    reconnectsAutomatically: true,
    resumesFromLastEventId: false,
    preventsDuplicateEvents: true,
    keepsWebhookOpen: false,
    implementedRuntime: false,
  },
  {
    transport: 'short-polling-fallback',
    reconnectsAutomatically: true,
    resumesFromLastEventId: true,
    preventsDuplicateEvents: true,
    keepsWebhookOpen: false,
    implementedRuntime: false,
  },
];
