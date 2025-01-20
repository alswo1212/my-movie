import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/my-movie/',
  resolve: {
    alias: {
      "@component": path.resolve(__dirname, "src/component"),
      "@page": path.resolve(__dirname, "src/page"),
      "@util": path.resolve(__dirname, "src/util"),
      "@const": path.resolve(__dirname, "src/const"),
      "@apis": path.resolve(__dirname, "src/apis"),
    },
  },
})
