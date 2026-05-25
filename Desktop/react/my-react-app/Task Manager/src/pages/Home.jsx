import { useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { createTask, filterTasks, countStats } from '../utils/taskHelpers'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import FilterBar from '../components/FilterBar'

// 🔑 BEGINNER NOTE: This is the most important file to understand.
//
// Home.jsx is the "brain" — the Single Source of Truth.
// ALL state lives here. Child components only get what they need via props.
//
// Data flow (unidirectional — always one direction):
//
//   Home (state lives here)
//     │
//     ├─ props down ──► TaskForm   (gets: onAdd)
//     ├─ props down ──► FilterBar  (gets: filter, counts, onFilterChange)
//     └─ props down ──► TaskList
//                          └─ props down ──► TaskItem  (gets: task, onToggle, onDelete)
//
//   Events bubble up via callbacks:
//   TaskItem clicks "Delete" → calls onDelete(id) → Home updates state → re-render

function Home() {
  // ─── State ───────────────────────────────────────────────────────────────
  //
  // 🔑 useLocalStorage works like useState but also persists to localStorage.
  //    Swap it for useState([]) if you don't want persistence.
  const [tasks, setTasks] = useLocalStorage('taskboard_v1', [])

  // 🔑 filter is simple local state — no need to persist this across sessions
  const [filter, setFilter] = useState('all')

  // ─── Derived data (computed from state, not stored separately) ────────────
  //
  // 🔑 KEY INSIGHT: Don't store derived values in state. Instead, compute them
  //    fresh on every render from the source of truth (tasks).
  //    If you stored `completedCount` in state, you'd have to remember to update
  //    it every time tasks changes — a recipe for bugs.
  const stats    = countStats(tasks)                  // { total, completed, pending }
  const filtered = filterTasks(tasks, filter)         // subset to display

  // Counts object shaped to match what FilterBar expects for its badges
  const counts = {
    all:       stats.total,
    pending:   stats.pending,
    completed: stats.completed,
  }

  // ─── Event Handlers ──────────────────────────────────────────────────────
  //
  // These functions are passed DOWN to children as props.
  // When a child calls them, they run here in Home and update state.

  // ADD: prepend the new task so it appears at the top of the list
  function handleAdd(text) {
    // 🔑 Spread operator: [...existing, newItem] creates a NEW array.
    //    Never mutate state directly (tasks.push() won't trigger a re-render).
    setTasks([createTask(text), ...tasks])
  }

  // DELETE: keep every task whose id is NOT the one being deleted
  function handleDelete(id) {
    // 🔑 Array.filter() returns a new array — original is untouched
    setTasks(tasks.filter(task => task.id !== id))
  }

  // TOGGLE: flip the completed boolean of one task, leave all others unchanged
  function handleToggle(id) {
    // 🔑 Array.map() returns a new array.
    //    For the matching task, spread its properties and override `completed`.
    //    { ...task } copies all fields; completed: !task.completed overrides one.
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task   // all other tasks returned unchanged
    ))
  }

  // CLEAR ALL COMPLETED: keep only the incomplete tasks
  function handleClearCompleted() {
    setTasks(tasks.filter(task => !task.completed))
  }

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="home">

      {/* ── Header ─────────────────────────────────────────── */}
      <header className="home__header">
        <div className="home__header-left">
          <h1 className="home__title">
            Task<span className="home__title-accent">Board</span>
          </h1>
          <p className="home__subtitle">Stay organized, one task at a time</p>
        </div>

        {/* 🔑 Conditional rendering with && — only show badge when there are tasks */}
        {stats.total > 0 && (
          <div className="home__counter">
            <span className="home__counter-num">{stats.pending}</span>
            <span className="home__counter-label">pending</span>
          </div>
        )}
      </header>

      {/* ── Stats Row ──────────────────────────────────────── */}
      {/* 🔑 Show stats only when at least one task exists */}
      {stats.total > 0 && (
        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-card__label">Total</span>
            <strong className="stat-card__value stat-card__value--all">{stats.total}</strong>
          </div>
          <div className="stat-card">
            <span className="stat-card__label">Completed</span>
            <strong className="stat-card__value stat-card__value--done">{stats.completed}</strong>
          </div>
          <div className="stat-card">
            <span className="stat-card__label">Pending</span>
            <strong className="stat-card__value stat-card__value--pending">{stats.pending}</strong>
          </div>
        </div>
      )}

      {/* ── Task Form ──────────────────────────────────────── */}
      {/*
        🔑 TaskForm receives onAdd as a prop.
        When the user submits, TaskForm calls onAdd(text),
        which runs handleAdd(text) here in Home.
      */}
      <TaskForm onAdd={handleAdd} />

      {/* ── Filter Bar ─────────────────────────────────────── */}
      {stats.total > 0 && (
        <FilterBar
          filter={filter}
          counts={counts}
          onFilterChange={setFilter}   // setFilter passed directly — no wrapper needed
        />
      )}

      {/* ── Section header ─────────────────────────────────── */}
      {stats.total > 0 && (
        <div className="home__section-header">
          <span className="home__section-label">
            {filter === 'all' ? 'All tasks' : filter === 'pending' ? 'Pending tasks' : 'Completed tasks'}
          </span>
          {/* 🔑 Only render the Clear button when there's something to clear */}
          {stats.completed > 0 && (
            <button className="home__clear-btn" onClick={handleClearCompleted}>
              Clear completed ({stats.completed})
            </button>
          )}
        </div>
      )}

      {/* ── Task List ──────────────────────────────────────── */}
      {/*
        🔑 TaskList receives the already-filtered array.
        Home does the filtering; TaskList just renders what it gets.
        Separation of concerns.
      */}
      <TaskList
        tasks={filtered}
        filter={filter}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />

    </div>
  )
}

export default Home
