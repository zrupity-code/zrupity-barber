import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  // en production, le site est servi sur GitHub Pages : https://zrupity-code.github.io/zrupity-barber/
  base: command === 'build' ? '/zrupity-barber/' : '/',
}))
