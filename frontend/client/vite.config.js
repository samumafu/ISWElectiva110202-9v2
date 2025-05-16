import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // ✅ No se elimina, como pediste
import path from 'path'

// Detectamos entorno
const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: isProd ? '/' : '/', // Asegura rutas relativas válidas para producción
  server: {
    proxy: {
      '/api/v1': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    // Output de build para Azure Static Web Apps (ajustado si lo dejas en dist)
    outDir: isProd
      ? path.resolve(__dirname, 'dist') // <-- Azure usará esta carpeta
      : path.resolve(__dirname, '../../backend/frontend_build'), // dev local

    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
