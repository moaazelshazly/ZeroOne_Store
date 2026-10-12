import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    proxy: {
      '/api/freetogame': {
        target: 'https://www.freetogame.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/freetogame/, '/api'),
      },
      '/api/rawg': {
        target: 'https://api.rawg.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/rawg/, '/api'),
      },
    },
  },
})
