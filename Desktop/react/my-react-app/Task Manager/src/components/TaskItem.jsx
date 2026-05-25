import { formatDate } from '../utils/taskHelpers'

// 🔑 BEGINNER NOTE: Leaf Components & Callback Props
// TaskItem is a "leaf" component — it sits at the bottom of the tree and
// renders a single task. It receives everything via props:
//
//   task     → the data object: { id, text, completed, createdAt }
//   onToggle → function(id): call this to flip completed status
//   onDelete → function(id): call this to remove the task
//
// Notice TaskItem never calls setTasks directly. It can't — it doesn't have
// access to state. Instead it calls the callbacks the parent gave it.
// Parent reacts, updates state, React re-renders. Clean separation.

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li
      className={`task-item ${task.completed ? 'task-item--completed' : ''}`}
      // 🔑 Dynamic className: base class always present, modifier added conditionally
    >
      {/* ── Checkbox ────────────────────────────────────── */}
      {/*
        🔑 The label wraps the checkbox so clicking the visual box also triggers
        the hidden input. This is a CSS-driven custom checkbox pattern.
        The real <input> is visually hidden; the styled .task-item__check-visual
        is what the user sees, driven by the :checked CSS pseudo-class.
      */}
      <label className="task-item__check-wrap" title={task.completed ? 'Mark as pending' : 'Mark as complete'}>
        <input
          type="checkbox"
          className="task-item__check-input"
          checked={task.completed}
          // 🔑 onChange is required on controlled checkboxes — React needs it
          onChange={() => onToggle(task.id)}
        />
        <span className="task-item__check-visual" aria-hidden="true">
          {/* Checkmark SVG — visible when :checked via CSS */}
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      </label>

      {/* ── Task text + meta ─────────────────────────────── */}
      <div className="task-item__body">
        <p className={`task-item__text ${task.completed ? 'task-item__text--done' : ''}`}>
          {task.text}
        </p>
        <span className="task-item__meta">{formatDate(task.createdAt)}</span>
      </div>

      {/* ── Status badge ─────────────────────────────────── */}
      {/* 🔑 Ternary rendering: one of two badges shown based on state */}
      <span className={`task-item__badge ${task.completed ? 'task-item__badge--done' : 'task-item__badge--pending'}`}>
        {task.completed ? 'Done' : 'Pending'}
      </span>

      {/* ── Delete button ────────────────────────────────── */}
      <button
        className="task-item__delete"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete task: ${task.text}`}
        title="Delete task"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14H6L5 6" />
          <path d="M10 11v6M14 11v6" />
        </svg>
      </button>
    </li>
  )
}

export default TaskItem
