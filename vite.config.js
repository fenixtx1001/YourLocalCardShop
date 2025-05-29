import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.', // optional if it's already at root
  build: {
    rollupOptions: {
      input: 'index.html'
    }
  }
})
