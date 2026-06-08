import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons.svg', 'app-icon.png'],
      manifest: {
        name: 'Calm Quest',
        short_name: 'CalmQuest',
        description: 'An all-in-one app for daily calm and anxiety relief',
        theme_color: '#2d8a4e',
        background_color: '#f7f5f1',
        display: 'standalone',
        icons: [
          {
            src: 'app-icon.png',
            sizes: '1024x1024',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
  }
})
