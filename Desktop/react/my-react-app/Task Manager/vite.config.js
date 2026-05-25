import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 🔑 BEGINNER NOTE:
// Vite is the build tool that:
//   - Runs a fast dev server with hot module replacement (HMR)
//   - Bundles your code for production
//   - Transforms JSX into regular JavaScript the browser understands
// @vitejs/plugin-react adds JSX support.

export default defineConfig({
  plugins: [react()],
})
