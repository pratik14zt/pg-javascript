import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// 🔑 BEGINNER NOTE:
// This is the entry point of your React app.
// It finds the <div id="root"> in index.html and mounts the entire React app inside it.
// StrictMode helps catch bugs by running certain checks in development only.

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
