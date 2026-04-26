import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/specialty-finder/',
  build: {
    rollupOptions: {
      output: {
        dir: 'dist',
        entryFileNames: 'specialty-finder.js'
      }
    }
  },
  plugins: [react()],
})
