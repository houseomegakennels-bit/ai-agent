import { describe, expect, it } from 'vitest';
import { canQueueOfflineAction, defaultMobileShellState, summarizeNeedsAttention } from './mobileState';

describe('Release -2 mobile shell state', () => {
  it('defaults to basic mode for phone-first daily use', () => {
    expect(defaultMobileShellState.mode).toBe('basic');
  });

  it('summarizes the human action queue without raw logs', () => {
    expect(summarizeNeedsAttention(defaultMobileShellState)).toBe('1 action pending');
  });

  it('does not queue destructive actions offline', () => {
    expect(canQueueOfflineAction('draft_task')).toBe(true);
    expect(canQueueOfflineAction('approve_deploy')).toBe(false);
    expect(canQueueOfflineAction('emergency_stop')).toBe(false);
  });
});
