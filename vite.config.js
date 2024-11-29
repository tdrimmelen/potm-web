import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://fa-potm-67df3.azurewebsites.net',
        changeOrigin: true,
        rewrite: function(path) {
          return path.replace('/^\/api/', '');
        }
      }
    }
  }
})
