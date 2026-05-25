import TaskItem from './TaskItem'
import EmptyState from './EmptyState'

// 🔑 BEGINNER NOTE: Composition — Components Inside Components
// TaskList is a "container" component. Its job is to:
//   1. Decide whether to show EmptyState or the actual list
//   2. Map over the tasks array and render a TaskItem for each one
//   3. Pass the right props down to each TaskItem
//
// TaskList doesn't know HOW tasks are toggled or deleted — it just
// passes the callback functions it received from Home down to TaskItem.
// This is called "prop drilling" — passing props through layers.
// (In large apps you'd use Context or a state manager to avoid deep drilling)

function TaskList({ tasks, filter, onToggle, onDelete }) {
  // 🔑 Early return pattern: exit early with the empty state UI
  // This avoids deeply nested if/else inside the JSX
  if (tasks.length === 0) {
    return <EmptyState filter={filter} />
  }

  return (
    // Semantic HTML: <ul> for a list of items
    <ul className="task-list" aria-label="Task list">
      {/*
        🔑 The .map() Pattern — CORE React skill:
        tasks.map(task => <TaskItem ... />) transforms every task object
        into a TaskItem component. React renders all of them.

        KEY RULE: Each element in a mapped list needs a unique `key` prop.
        React uses keys to identify which items changed/added/removed,
        so it can update the DOM efficiently (without re-rendering everything).
        Always use a stable unique ID — NOT the array index (index shifts on delete).
      */}
      {tasks.map(task => (
        <TaskItem
          key={task.id}       // ← unique, stable identifier
          task={task}         // ← the full task data object
          onToggle={onToggle} // ← callback: passed straight through from Home
          onDelete={onDelete} // ← callback: passed straight through from Home
        />
      ))}
    </ul>
  )
}

export default TaskList
