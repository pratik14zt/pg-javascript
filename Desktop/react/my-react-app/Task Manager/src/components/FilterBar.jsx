// 🔑 BEGINNER NOTE: Props — Read-Only Data from Parent
// FilterBar doesn't own any state. It receives everything it needs via props:
//   - filter: the currently active filter string ('all' | 'pending' | 'completed')
//   - counts: object with task counts for each tab badge
//   - onFilterChange: function to call when user clicks a tab
//
// This is the "dumb component" pattern — it only renders based on props.
// All logic lives in the parent. FilterBar just displays and fires callbacks.

// The tabs config: defined outside the component so it's not recreated on every render
const TABS = [
  { key: 'all',       label: 'All',       icon: '◉' },
  { key: 'pending',   label: 'Pending',   icon: '○' },
  { key: 'completed', label: 'Completed', icon: '✓' },
]

function FilterBar({ filter, counts, onFilterChange }) {
  return (
    <div className="filter-bar" role="tablist" aria-label="Filter tasks">
      {/* 🔑 Array.map() — render one button per tab definition */}
      {TABS.map(tab => (
        <button
          key={tab.key}                      // required unique key for list items
          role="tab"
          aria-selected={filter === tab.key} // accessibility: tells screen readers which is active
          className={`filter-bar__btn ${filter === tab.key ? 'filter-bar__btn--active' : ''}`}
          onClick={() => onFilterChange(tab.key)} // fire callback with the new filter value
        >
          <span className="filter-bar__icon" aria-hidden="true">{tab.icon}</span>
          {tab.label}
          {/* 🔑 Short-circuit rendering: only show badge if count > 0 */}
          {counts[tab.key] > 0 && (
            <span className="filter-bar__badge">{counts[tab.key]}</span>
          )}
        </button>
      ))}
    </div>
  )
}

export default FilterBar
