import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  base:'./',
  server: {
    open:'./',
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
})
