import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  // , VitePWA({registerType: 'autoUpdate'})
  plugins: [react()],
  base: '/puzzle-assistant/',
  server: {
    watch: {
      usePolling: true
    }
  }
})
