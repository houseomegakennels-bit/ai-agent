import { Activity, AlertTriangle, CheckCircle2, FolderGit2, RadioTower, ShieldAlert, WifiOff } from 'lucide-react';
import { buildMockControllerStatus } from './localControllerApi';
import { buildErrorTaskBulkSelectionView, buildLoadingTaskBulkSelectionView, buildTaskBulkSelectionView } from './localTaskBulkSelectionAdapter';
import { buildTaskCreationResultView, buildIdleTaskCreationView } from './localTaskCreationAdapter';
import { buildMockTaskListView } from './localTaskList';
import { buildTaskDetailView, buildErrorTaskDetailView, buildLoadingTaskDetailView } from './localTaskDetailAdapter';
import { buildTaskGroupingView } from './localTaskGroupingAdapter';
import { buildErrorTaskSearchSortView, buildLoadingTaskSearchSortView, buildTaskSearchSortView } from './localTaskSearchSortAdapter';
import { buildErrorTaskTimelineView, buildLoadingTaskTimelineView, buildTaskTimelineView } from './localTaskTimelineAdapter';
import { buildErrorTaskNotesView, buildLoadingTaskNotesView, buildTaskNotesListView, buildTaskNotesPreviewView } from './localTaskNotesAdapter';
import { buildErrorTaskActivityView, buildLoadingTaskActivityView, buildTaskActivityView } from './localTaskActivityAdapter';
import { buildErrorTaskExportShareView, buildLoadingTaskExportShareView, buildTaskExportShareView } from './localTaskExportShareAdapter';
import { buildIdleTaskUpdateView, buildTaskUpdateResultView } from './localTaskUpdateAdapter';
import { defaultMobileShellState, summarizeNeedsAttention } from './mobileState';

const quickActions = [
  'Talk to Helix',
  'Upload File',
  'New Task',
  'Select Project',
  'Run Codex',
  'Needs My Attention',
];

const controllerStatus = buildMockControllerStatus();
const taskCreationIdleView = buildIdleTaskCreationView();
const taskCreationPreview = buildTaskCreationResultView({ title: 'Draft Release 13 follow-up task', state: 'queued' });
const taskCreationValidation = buildTaskCreationResultView({ title: 'No' });
const taskUpdateIdleView = buildIdleTaskUpdateView();
const taskUpdatePreview = buildTaskUpdateResultView(
  { taskId: 'local-task-created-3', action: 'mark_completed' },
  taskCreationPreview.result?.tasks,
);
const taskUpdateValidation = buildTaskUpdateResultView({ taskId: 'missing-task', action: 'mark_completed' }, taskCreationPreview.result?.tasks);
const taskListView = buildMockTaskListView(taskUpdatePreview.result?.tasks ?? taskCreationPreview.result?.tasks);
const taskDetailView = buildTaskDetailView('local-task-release-12-review', taskListView.tasks);
const taskDetailValidationView = buildTaskDetailView('', taskListView.tasks);
const taskDetailLoadingView = buildLoadingTaskDetailView();
const taskDetailErrorView = buildErrorTaskDetailView();
const taskGroupingView = buildTaskGroupingView({ filter: 'all' }, taskListView.tasks);
const attentionGroupingView = buildTaskGroupingView({ filter: 'needs_attention' }, taskListView.tasks);
const emptyGroupingView = buildTaskGroupingView({ filter: 'failed' }, taskListView.tasks);
const taskSearchSortView = buildTaskSearchSortView({ query: 'release', sort: 'attention_first' }, taskListView.tasks);
const emptySearchSortView = buildTaskSearchSortView({ query: 'no-match', sort: 'title_asc' }, taskListView.tasks);
const validationSearchSortView = buildTaskSearchSortView({ query: 'https://example.invalid/task', sort: 'title_asc' }, taskListView.tasks);
const loadingSearchSortView = buildLoadingTaskSearchSortView();
const errorSearchSortView = buildErrorTaskSearchSortView();
const taskBulkSelectionView = buildTaskBulkSelectionView(
  { selectedTaskIds: ['local-task-release-12-review', 'local-task-created-3'], action: 'review_selected' },
  taskListView.tasks,
);
const emptyBulkSelectionView = buildTaskBulkSelectionView({ selectedTaskIds: [], action: 'review_selected' }, taskListView.tasks);
const validationBulkSelectionView = buildTaskBulkSelectionView(
  { selectedTaskIds: ['https://example.invalid/task'], action: 'review_selected' },
  taskListView.tasks,
);
const loadingBulkSelectionView = buildLoadingTaskBulkSelectionView();
const errorBulkSelectionView = buildErrorTaskBulkSelectionView();
const taskTimelineView = buildTaskTimelineView({ focusDateLabel: 'Today', includeCompleted: true }, taskListView.tasks);
const emptyTaskTimelineView = buildTaskTimelineView({ focusDateLabel: 'Tomorrow', includeCompleted: false }, []);
const validationTaskTimelineView = buildTaskTimelineView(
  { focusDateLabel: 'https://example.invalid/day', includeCompleted: true },
  taskListView.tasks,
);
const loadingTaskTimelineView = buildLoadingTaskTimelineView();
const errorTaskTimelineView = buildErrorTaskTimelineView();
const taskNotesPreviewView = buildTaskNotesPreviewView(
  {
    taskId: 'local-task-release-12-review',
    body: 'Confirm Release 19 approval before task note work continues.',
    kind: 'operator_note',
  },
  taskListView.tasks,
);
const emptyTaskNotesView = buildTaskNotesListView('local-task-created-3', taskListView.tasks);
const validationTaskNotesView = buildTaskNotesPreviewView(
  { taskId: 'https://example.invalid/task', body: 'No', kind: 'operator_note' },
  taskListView.tasks,
);
const errorTaskNotesView = buildErrorTaskNotesView();
const loadingTaskNotesView = buildLoadingTaskNotesView();
const taskActivityView = buildTaskActivityView({ filter: 'recent_changes', limit: 3 }, taskListView.tasks);
const emptyTaskActivityView = buildTaskActivityView({ filter: 'needs_attention', limit: 3 }, []);
const validationTaskActivityView = buildTaskActivityView({ filter: 'recent_changes', limit: 0 }, taskListView.tasks);
const loadingTaskActivityView = buildLoadingTaskActivityView();
const errorTaskActivityView = buildErrorTaskActivityView();
const taskExportShareView = buildTaskExportShareView(
  {
    taskIds: ['local-task-release-12-review', 'local-task-created-3'],
    format: 'summary_markdown',
    includeNotes: true,
    includeActivity: true,
  },
  taskListView.tasks,
);
const emptyTaskExportShareView = buildTaskExportShareView(
  { taskIds: [], format: 'iphone_text', includeNotes: false, includeActivity: false },
  taskListView.tasks,
);
const validationTaskExportShareView = buildTaskExportShareView(
  { taskIds: ['https://example.invalid/task'], format: 'iphone_text', includeNotes: true, includeActivity: false },
  taskListView.tasks,
);
const errorTaskExportShareView = buildErrorTaskExportShareView();
const loadingTaskExportShareView = buildLoadingTaskExportShareView();

const systemCards = [
  { label: 'System status', value: `Controller ${controllerStatus.health.status}`, icon: CheckCircle2 },
  { label: 'Readiness', value: `Ready ${controllerStatus.ready.status}`, icon: Activity },
  { label: 'Current project', value: defaultMobileShellState.currentProject, icon: FolderGit2 },
  { label: 'Connection mode', value: controllerStatus.connectionLabel, icon: RadioTower },
];

export function HelixCommandShell() {
  const state = defaultMobileShellState;
  const needsAttention = summarizeNeedsAttention(state);

  return (
    <main className="shell" aria-labelledby="app-title">
      <section className="hero-card">
        <div className="hero-copy">
          <p className="eyebrow">Blackspire Helix</p>
          <h1 id="app-title">HELIX COMMAND</h1>
          <p className="hero-text">
            Phone-first command center scaffold for Telegram, mobile PWA, Codex, Codespaces, and assisted browser workflows.
          </p>
        </div>
        <div className="command-orb" aria-label={`System state: ${state.systemState}`}>
          <span className="orb-core" />
          <span className="orb-ring" />
        </div>
      </section>

      <section className="status-grid" aria-label="Mission control status">
        {systemCards.map((card) => {
          const Icon = card.icon;
          return (
            <article className="system-card" key={card.label}>
              <Icon aria-hidden="true" />
              <span>{card.label}</span>
              <strong>{card.value}</strong>
            </article>
          );
        })}
      </section>

      <section className="attention-card" aria-labelledby="attention-title">
        <div>
          <p className="eyebrow">Needs Your Attention</p>
          <h2 id="attention-title">{needsAttention}</h2>
          <p>Human approvals stay in one queue and are handled one at a time.</p>
          <p className="status-note">{controllerStatus.operatorMessage}</p>
        </div>
        <button type="button" className="primary-action">Start Guided Review</button>
      </section>



      <section className="task-create-card" aria-labelledby="task-create-title">
        <div>
          <p className="eyebrow">Create Task</p>
          <h2 id="task-create-title">{taskCreationIdleView.titleLabel}</h2>
          <p>{taskCreationIdleView.helperText}</p>
          <p className="status-note">{taskCreationIdleView.operatorMessage}</p>
        </div>
        <form className="task-create-form" aria-label="Local task creation preview">
          <label htmlFor="task-title-input">Task title</label>
          <input id="task-title-input" name="task-title" type="text" value="Draft Release 13 follow-up task" readOnly />
          <button type="button" className="primary-action">Preview Local Task</button>
        </form>
        <div className="task-create-result" data-state={taskCreationPreview.state}>
          <strong>{taskCreationPreview.titleLabel}</strong>
          <p>{taskCreationPreview.helperText}</p>
          <p className="status-note">{taskCreationPreview.operatorMessage}</p>
        </div>
        <div className="task-create-result" data-state={taskCreationValidation.state}>
          <strong>{taskCreationValidation.titleLabel}</strong>
          <p>{taskCreationValidation.helperText}</p>
          <p className="status-note">{taskCreationValidation.operatorMessage}</p>
        </div>
      </section>

      <section className="task-list-card" aria-labelledby="task-list-title">
        <div>
          <p className="eyebrow">Local Tasks</p>
          <h2 id="task-list-title">{taskListView.summary}</h2>
          <p className="status-note">{taskListView.operatorMessage}</p>
        </div>
        <div className="task-list" data-state={taskListView.state}>
          {taskListView.tasks.map((task) => (
            <article className="task-card" key={task.taskId}>
              <span>{task.state}</span>
              <strong>{task.title}</strong>
              <p>{task.updatedAtLabel}</p>
              <div className="task-actions" aria-label={`Local update actions for ${task.title}`}>
                <button type="button">Mark Complete</button>
                <button type="button">Needs Review</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="task-detail-card" aria-labelledby="task-detail-title">
        <div>
          <p className="eyebrow">Task Detail</p>
          <h2 id="task-detail-title">{taskDetailView.titleLabel}</h2>
          <p>{taskDetailView.helperText}</p>
          <p className="status-note">{taskDetailView.operatorMessage}</p>
        </div>
        <div className="task-detail-state-row" aria-label="Task detail state examples">
          <span data-state={taskDetailLoadingView.state}>{taskDetailLoadingView.titleLabel}</span>
          <span data-state={taskDetailValidationView.state}>{taskDetailValidationView.titleLabel}</span>
          <span data-state={taskDetailErrorView.state}>{taskDetailErrorView.titleLabel}</span>
        </div>
        <div className="task-detail-panel" data-state={taskDetailView.state}>
          <strong>{taskDetailView.result?.detail?.safeActionSummary}</strong>
          <p>{taskDetailView.result?.detail?.task.state} · {taskDetailView.result?.detail?.task.updatedAtLabel}</p>
        </div>
        <div className="task-audit-list" aria-label="Local mock audit trail">
          {taskDetailView.result?.detail?.auditTrail.map((event) => (
            <article className="task-audit-event" key={event.eventId}>
              <span>{event.eventType.replace('_', ' ')}</span>
              <strong>{event.label}</strong>
              <p>{event.occurredAtLabel} · {event.actor.replace('_', ' ')}</p>
            </article>
          ))}
        </div>
      </section>


      <section className="task-search-card" aria-labelledby="task-search-title">
        <div>
          <p className="eyebrow">Search & Sort</p>
          <h2 id="task-search-title">{taskSearchSortView.titleLabel}</h2>
          <p>{taskSearchSortView.helperText}</p>
          <p className="status-note">{taskSearchSortView.operatorMessage}</p>
        </div>
        <form className="task-search-form" aria-label="Local task search and sort preview">
          <label htmlFor="task-search-input">Search local tasks</label>
          <input id="task-search-input" name="task-search" type="search" value="release" readOnly />
          <label htmlFor="task-sort-select">Sort</label>
          <select id="task-sort-select" name="task-sort" value={taskSearchSortView.result?.sort} disabled>
            {taskSearchSortView.availableSorts.map((sort) => (
              <option key={sort} value={sort}>{sort.replace('_', ' ')}</option>
            ))}
          </select>
        </form>
        <div className="task-search-state-row" aria-label="Task search state examples">
          <span data-state={loadingSearchSortView.state}>{loadingSearchSortView.titleLabel}</span>
          <span data-state={emptySearchSortView.state}>{emptySearchSortView.titleLabel}</span>
          <span data-state={validationSearchSortView.state}>{validationSearchSortView.titleLabel}</span>
          <span data-state={errorSearchSortView.state}>{errorSearchSortView.titleLabel}</span>
        </div>
        <div className="task-search-results" data-state={taskSearchSortView.state}>
          {taskSearchSortView.result?.tasks.map((task) => (
            <article className="task-search-result" key={task.taskId}>
              <span>{task.state}</span>
              <strong>{task.title}</strong>
              <p>{task.requiresOperatorAction ? 'Needs operator attention' : 'No operator action required'}</p>
            </article>
          ))}
        </div>
      </section>



      <section className="task-timeline-card" aria-labelledby="task-timeline-title">
        <div>
          <p className="eyebrow">Daily Focus</p>
          <h2 id="task-timeline-title">{taskTimelineView.titleLabel}</h2>
          <p>{taskTimelineView.helperText}</p>
          <p className="status-note">{taskTimelineView.operatorMessage}</p>
        </div>
        <div className="task-timeline-state-row" aria-label="Task timeline state examples">
          <span data-state={loadingTaskTimelineView.state}>{loadingTaskTimelineView.titleLabel}</span>
          <span data-state={emptyTaskTimelineView.state}>{emptyTaskTimelineView.titleLabel}</span>
          <span data-state={validationTaskTimelineView.state}>{validationTaskTimelineView.titleLabel}</span>
          <span data-state={errorTaskTimelineView.state}>{errorTaskTimelineView.titleLabel}</span>
        </div>
        <div className="task-timeline-recommendations" data-state={taskTimelineView.state}>
          <strong>Recommended next: {taskTimelineView.result?.recommendedTaskIds.join(', ') || 'None'}</strong>
          <p>{taskTimelineView.result?.focusDateLabel} · Completed included: {taskTimelineView.result?.includeCompleted ? 'yes' : 'no'}</p>
        </div>
        <div className="task-timeline-buckets">
          {taskTimelineView.result?.buckets.map((bucket) => (
            <article className="task-timeline-bucket" key={bucket.key}>
              <span>{bucket.tasks.length}</span>
              <strong>{bucket.label}</strong>
              <p>{bucket.tasks.length === 0 ? bucket.emptyMessage : bucket.tasks.map((task) => task.title).join(', ')}</p>
            </article>
          ))}
        </div>
      </section>



      <section className="task-activity-card" aria-labelledby="task-activity-title">
        <div>
          <p className="eyebrow">Activity Feed</p>
          <h2 id="task-activity-title">{taskActivityView.titleLabel}</h2>
          <p>{taskActivityView.helperText}</p>
          <p className="status-note">{taskActivityView.operatorMessage}</p>
        </div>
        <div className="task-activity-filters" aria-label="Local activity filters">
          {taskActivityView.availableFilters.map((filter) => (
            <button type="button" key={filter}>{filter.replace('_', ' ')}</button>
          ))}
        </div>
        <div className="task-activity-state-row" aria-label="Task activity state examples">
          <span data-state={loadingTaskActivityView.state}>{loadingTaskActivityView.titleLabel}</span>
          <span data-state={emptyTaskActivityView.state}>{emptyTaskActivityView.titleLabel}</span>
          <span data-state={validationTaskActivityView.state}>{validationTaskActivityView.titleLabel}</span>
          <span data-state={errorTaskActivityView.state}>{errorTaskActivityView.titleLabel}</span>
        </div>
        <div className="task-activity-list" data-state={taskActivityView.state}>
          {taskActivityView.result?.events.map((event) => (
            <article className="task-activity-event" key={event.eventId}>
              <span>{event.kind.replace(/_/g, ' ')}</span>
              <strong>{event.label}</strong>
              <p>{event.occurredAtLabel} · {event.actorLabel.replace(/_/g, ' ')}</p>
            </article>
          ))}
        </div>
      </section>


      <section className="task-export-card" aria-labelledby="task-export-title">
        <div>
          <p className="eyebrow">Export / Share</p>
          <h2 id="task-export-title">{taskExportShareView.titleLabel}</h2>
          <p>{taskExportShareView.helperText}</p>
          <p className="status-note">{taskExportShareView.operatorMessage}</p>
        </div>
        <div className="task-export-formats" aria-label="Local export formats">
          {taskExportShareView.availableFormats.map((format) => (
            <button type="button" key={format}>{format.replace(/_/g, ' ')}</button>
          ))}
        </div>
        <div className="task-export-state-row" aria-label="Task export state examples">
          <span data-state={loadingTaskExportShareView.state}>{loadingTaskExportShareView.titleLabel}</span>
          <span data-state={emptyTaskExportShareView.state}>{emptyTaskExportShareView.titleLabel}</span>
          <span data-state={validationTaskExportShareView.state}>{validationTaskExportShareView.titleLabel}</span>
          <span data-state={errorTaskExportShareView.state}>{errorTaskExportShareView.titleLabel}</span>
        </div>
        <div className="task-export-package" data-state={taskExportShareView.state}>
          <strong>{taskExportShareView.result?.package?.title}</strong>
          <p>{taskExportShareView.result?.package?.bodyPreview}</p>
          <p className="status-note">Telegram bridge used: {taskExportShareView.result?.telegramBridgeUsed ? 'yes' : 'no'} · Live endpoint used: {taskExportShareView.result?.liveEndpointUsed ? 'yes' : 'no'}</p>
        </div>
      </section>

      <section className="task-notes-card" aria-labelledby="task-notes-title">
        <div>
          <p className="eyebrow">Task Notes</p>
          <h2 id="task-notes-title">{taskNotesPreviewView.titleLabel}</h2>
          <p>{taskNotesPreviewView.helperText}</p>
          <p className="status-note">{taskNotesPreviewView.operatorMessage}</p>
        </div>
        <form className="task-notes-form" aria-label="Local task note preview">
          <label htmlFor="task-note-kind">Note kind</label>
          <select id="task-note-kind" name="task-note-kind" value="operator_note" disabled>
            {taskNotesPreviewView.availableKinds.map((kind) => (
              <option key={kind} value={kind}>{kind.replace('_', ' ')}</option>
            ))}
          </select>
          <label htmlFor="task-note-body">Note preview</label>
          <textarea
            id="task-note-body"
            name="task-note-body"
            value="Confirm Release 19 approval before task note work continues."
            readOnly
          />
        </form>
        <div className="task-notes-state-row" aria-label="Task note state examples">
          <span data-state={loadingTaskNotesView.state}>{loadingTaskNotesView.titleLabel}</span>
          <span data-state={emptyTaskNotesView.state}>{emptyTaskNotesView.titleLabel}</span>
          <span data-state={validationTaskNotesView.state}>{validationTaskNotesView.titleLabel}</span>
          <span data-state={errorTaskNotesView.state}>{errorTaskNotesView.titleLabel}</span>
        </div>
        <div className="task-notes-list" data-state={taskNotesPreviewView.state}>
          {taskNotesPreviewView.result?.notes.map((note) => (
            <article className="task-note" key={note.noteId}>
              <span>{note.kind.replace('_', ' ')}</span>
              <strong>{note.body}</strong>
              <p>{note.createdAtLabel} · {note.authorLabel.replace(/_/g, ' ')}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="task-bulk-card" aria-labelledby="task-bulk-title">
        <div>
          <p className="eyebrow">Bulk Selection</p>
          <h2 id="task-bulk-title">{taskBulkSelectionView.titleLabel}</h2>
          <p>{taskBulkSelectionView.helperText}</p>
          <p className="status-note">{taskBulkSelectionView.operatorMessage}</p>
        </div>
        <div className="task-bulk-actions" aria-label="Local bulk selection preview actions">
          {taskBulkSelectionView.allowedActions.map((action) => (
            <button type="button" key={action}>{action.replace(/_/g, ' ')}</button>
          ))}
        </div>
        <div className="task-bulk-state-row" aria-label="Task bulk selection state examples">
          <span data-state={loadingBulkSelectionView.state}>{loadingBulkSelectionView.titleLabel}</span>
          <span data-state={emptyBulkSelectionView.state}>{emptyBulkSelectionView.titleLabel}</span>
          <span data-state={validationBulkSelectionView.state}>{validationBulkSelectionView.titleLabel}</span>
          <span data-state={errorBulkSelectionView.state}>{errorBulkSelectionView.titleLabel}</span>
        </div>
        <div className="task-bulk-selection-list" data-state={taskBulkSelectionView.state}>
          {taskBulkSelectionView.result?.selectedTasks.map((task) => (
            <article className="task-bulk-selection" key={task.taskId}>
              <input type="checkbox" checked readOnly aria-label={`Selected ${task.title}`} />
              <div>
                <strong>{task.title}</strong>
                <p>{task.state} · {task.requiresOperatorAction ? 'Needs attention' : 'No action needed'}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="task-group-card" aria-labelledby="task-group-title">
        <div>
          <p className="eyebrow">Task Filters</p>
          <h2 id="task-group-title">{taskGroupingView.titleLabel}</h2>
          <p>{taskGroupingView.helperText}</p>
          <p className="status-note">{taskGroupingView.operatorMessage}</p>
        </div>
        <div className="task-filter-tabs" aria-label="Local task filters">
          {taskGroupingView.availableFilters.map((filter) => (
            <button type="button" key={filter}>{filter.replace('_', ' ')}</button>
          ))}
        </div>
        <div className="task-group-summary" data-state={attentionGroupingView.state}>
          <strong>{attentionGroupingView.titleLabel}</strong>
          <p>{attentionGroupingView.helperText}</p>
        </div>
        <div className="task-group-summary" data-state={emptyGroupingView.state}>
          <strong>{emptyGroupingView.titleLabel}</strong>
          <p>{emptyGroupingView.helperText}</p>
        </div>
        <div className="task-groups">
          {taskGroupingView.result?.groups.map((group) => (
            <article className="task-group" key={group.key}>
              <span>{group.tasks.length}</span>
              <strong>{group.label}</strong>
              <p>{group.tasks.length === 0 ? group.emptyMessage : group.tasks.map((task) => task.title).join(', ')}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="task-update-card" aria-labelledby="task-update-title">
        <div>
          <p className="eyebrow">Update Task</p>
          <h2 id="task-update-title">{taskUpdateIdleView.titleLabel}</h2>
          <p>{taskUpdateIdleView.helperText}</p>
          <p className="status-note">{taskUpdateIdleView.operatorMessage}</p>
        </div>
        <div className="task-update-actions" aria-label="Local task update action preview">
          {taskUpdateIdleView.allowedActions.map((action) => (
            <button type="button" key={action}>{action.replace('mark_', 'Mark ')}</button>
          ))}
        </div>
        <div className="task-update-result" data-state={taskUpdatePreview.state}>
          <strong>{taskUpdatePreview.titleLabel}</strong>
          <p>{taskUpdatePreview.helperText}</p>
          <p className="status-note">{taskUpdatePreview.operatorMessage}</p>
        </div>
        <div className="task-update-result" data-state={taskUpdateValidation.state}>
          <strong>{taskUpdateValidation.titleLabel}</strong>
          <p>{taskUpdateValidation.helperText}</p>
          <p className="status-note">{taskUpdateValidation.operatorMessage}</p>
        </div>
      </section>

      <section className="quick-actions" aria-label="Quick actions">
        {quickActions.map((action) => (
          <button type="button" key={action}>{action}</button>
        ))}
      </section>

      <section className="safety-row" aria-label="Safety controls">
        <button type="button" className="emergency-action"><ShieldAlert aria-hidden="true" /> Emergency Stop</button>
        <button type="button"><WifiOff aria-hidden="true" /> Low-bandwidth mode</button>
        <button type="button"><AlertTriangle aria-hidden="true" /> Explain this screen</button>
      </section>
    </main>
  );
}
