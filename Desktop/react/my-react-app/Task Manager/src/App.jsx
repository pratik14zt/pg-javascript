import Home from './pages/Home'

// 🔑 BEGINNER NOTE:
// App.jsx is the "root" component — the outermost wrapper of your entire UI.
// In small projects it might just render one page. In larger apps, this is
// where you'd set up routing (React Router) to switch between pages.

function App() {
  return (
    <div className="app-root">
      <Home />
    </div>
  )
}

export default App
