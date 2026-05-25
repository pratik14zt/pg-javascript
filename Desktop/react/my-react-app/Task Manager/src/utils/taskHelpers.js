// 🔑 BEGINNER NOTE: Utility / Helper Functions
// These are plain JavaScript functions — no React, no hooks, no JSX.
// Keeping logic here (instead of inside components) makes your code:
//   1. Easier to test — just call the function and check the output
//   2. Easier to reuse — import wherever needed
//   3. Easier to read — components stay focused on rendering

// ─── Create ────────────────────────────────────────────────────────────────

/**
 * Creates a new task object with a unique ID and timestamp.
 * @param {string} text - The task description entered by the user
 * @returns {object} A task object ready to be added to state
 */
export function createTask(text) {
  return {
    // Date.now() gives milliseconds since 1970; toString(36) converts to base-36 (shorter string)
    // Math.random().toString(36).slice(2,8) adds randomness to avoid collisions
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    text: text.trim(),       // .trim() removes accidental leading/trailing spaces
    completed: false,
    createdAt: Date.now(),   // Unix timestamp — used for displaying the date
  }
}

// ─── Filter ────────────────────────────────────────────────────────────────

/**
 * Returns a filtered subset of tasks based on the active filter tab.
 * @param {Array} tasks - Full task list from state
 * @param {'all'|'completed'|'pending'} filter - Active filter
 * @returns {Array} Filtered array of tasks
 */
export function filterTasks(tasks, filter) {
  // Array.filter() creates a NEW array with only items where the callback returns true
  if (filter === 'completed') return tasks.filter(task => task.completed)
  if (filter === 'pending')   return tasks.filter(task => !task.completed)
  return tasks // 'all' — return everything unchanged
}

// ─── Stats ─────────────────────────────────────────────────────────────────

/**
 * Computes summary statistics from the full task list.
 * @param {Array} tasks - Full task list from state
 * @returns {{ total, completed, pending }} Stats object
 */
export function countStats(tasks) {
  const total     = tasks.length
  const completed = tasks.filter(task => task.completed).length
  const pending   = total - completed
  return { total, completed, pending }
}

// ─── Format ────────────────────────────────────────────────────────────────

/**
 * Formats a Unix timestamp into a human-readable string.
 * @param {number} timestamp - Unix timestamp (ms)
 * @returns {string} e.g. "May 20 · 02:45 PM"
 */
export function formatDate(timestamp) {
  const date = new Date(timestamp)
  const day  = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  return `${day} · ${time}`
}
