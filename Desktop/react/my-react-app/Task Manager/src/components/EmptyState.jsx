// 🔑 BEGINNER NOTE: Presentational / Display Components
// EmptyState is a purely presentational component — it receives data and
// renders it, nothing more. No state, no side effects, just props → JSX.
//
// Having this as its own component means:
//   - TaskList stays clean (no big blobs of empty-state HTML in it)
//   - EmptyState can be reused anywhere in the app
//   - Easy to restyle or animate without touching TaskList

// Each filter context gets a tailored message — feels more intentional than generic text
const EMPTY_MESSAGES = {
  all: {
    emoji: '📋',
    title: 'No tasks yet',
    description: 'Add your first task above and start getting things done!',
  },
  pending: {
    emoji: '🎉',
    title: "You're all caught up!",
    description: 'No pending tasks. Time to add something new — or take a break.',
  },
  completed: {
    emoji: '🎯',
    title: 'Nothing completed yet',
    description: 'Finish a task and it will show up here.',
  },
}

// 🔑 Destructuring props: { filter } pulls filter out of the props object
function EmptyState({ filter }) {
  const msg = EMPTY_MESSAGES[filter] ?? EMPTY_MESSAGES.all

  return (
    <div className="empty-state" role="status" aria-live="polite">
      <div className="empty-state__icon" aria-hidden="true">{msg.emoji}</div>
      <h3 className="empty-state__title">{msg.title}</h3>
      <p className="empty-state__desc">{msg.description}</p>
    </div>
  )
}

export default EmptyState
