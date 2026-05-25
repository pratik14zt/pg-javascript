import { useState, useEffect } from 'react'

// 🔑 BEGINNER NOTE: Custom Hook
// A custom hook is just a regular function whose name starts with "use".
// It can call other hooks (like useState, useEffect) inside it.
// The goal: extract reusable stateful logic so you don't repeat it everywhere.
//
// This hook works EXACTLY like useState, but also reads/writes to localStorage.
// Usage:  const [tasks, setTasks] = useLocalStorage('tasks', [])
//         ↑ same API as useState — just swaps in persistence automatically.

function useLocalStorage(key, initialValue) {
  // 🔑 Lazy initializer: the function inside useState(() => ...) runs ONCE on mount.
  // We use it to read from localStorage before the first render.
  // If nothing is saved yet, we fall back to initialValue.
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      // JSON.parse converts the stored string back into a JS object/array
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // If localStorage is blocked (private mode, etc.) just use the default
      console.warn(`useLocalStorage: could not read key "${key}"`, error)
      return initialValue
    }
  })

  // 🔑 useEffect: runs AFTER every render where `storedValue` or `key` changed.
  // It keeps localStorage in sync whenever state updates.
  useEffect(() => {
    try {
      // JSON.stringify converts the JS value into a string for storage
      localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.warn(`useLocalStorage: could not write key "${key}"`, error)
    }
  }, [key, storedValue])

  // Return same shape as useState so callers can use it identically
  return [storedValue, setStoredValue]
}

export default useLocalStorage
