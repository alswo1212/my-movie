import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@component": path.resolve(__dirname, "src/component"),
      "@page": path.resolve(__dirname, "src/page"),
    },
  },
})
