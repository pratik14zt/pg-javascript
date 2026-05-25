import { useState } from 'react'

// 🔑 BEGINNER NOTE: Controlled Components
// In React, form inputs are "controlled" when their value is driven by state.
// The input doesn't hold its own value — React does, via useState.
// Every keystroke → updates state → React re-renders the input with the new value.
// This gives you full control: validation, character counts, disable buttons, etc.

// Props this component receives from its parent (Home.jsx):
//   onAdd(text) — callback to call when the user submits a new task

function TaskForm({ onAdd }) {
  // Local state: only this component needs to know what's typed in the input
  const [value, setValue] = useState('')

  const MAX = 100
  const trimmed = value.trim()
  const remaining = MAX - value.length

  // Called when the form is submitted (Enter key or button click)
  function handleSubmit(e) {
    // Prevent the default browser behavior of refreshing the page on form submit
    e.preventDefault()
    if (!trimmed) return  // Guard: do nothing if input is empty/whitespace

    onAdd(trimmed)        // Tell the parent to add this task
    setValue('')          // Reset the input field back to empty
  }

  return (
    // 🔑 Using <form> with onSubmit lets the Enter key work automatically
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <div className="task-form__row">
        <input
          type="text"
          className="task-form__input"
          placeholder="What needs to be done?"
          value={value}                          // controlled: driven by state
          onChange={e => setValue(e.target.value)} // update state on every keystroke
          maxLength={MAX}
          autoFocus                              // focus on page load
          aria-label="New task"
        />
        {/* 🔑 Button is disabled when input is empty — prevents adding blank tasks */}
        <button
          type="submit"
          className="btn btn--primary"
          disabled={!trimmed}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Task
        </button>
      </div>

      {/* 🔑 Conditional rendering: only show the counter when typing */}
      <p className="task-form__hint">
        {trimmed
          ? `${remaining} characters remaining — press Enter to add`
          : 'Type a task and press Enter or click Add Task'}
      </p>
    </form>
  )
}

export default TaskForm
