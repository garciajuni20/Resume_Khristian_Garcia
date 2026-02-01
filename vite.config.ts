import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Resume_Khristian_Garcia/',
  plugins: [react(), tailwindcss()],
})
