import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon-16x16.png', 'apple-touch-icon.png', 'pwa-192x192.png', 'pwa-512x512.png', 'pwa-1024-1024.png'],
      manifest: {
        name: 'QuoteFlow Cascos C2026 – 2 e 4 Colonne',
        short_name: 'QuoteFlow C2026',
        description: 'Configuratore e preventivi sollevatori Cascos (2 e 4 colonne)',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        start_url: './',
        scope: './',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
          { src: 'pwa-1024-1024.png', sizes: '1024x1024', type: 'image/png', purpose: 'any' }
        ]
      },
      workbox: {
        // Il nuovo service worker prende il controllo subito e ripulisce
        // le cache delle versioni precedenti: aggiornamento senza reinstallare.
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        // PDF esclusi dal precache: troppo grandi (44MB totale), verranno scaricati on-demand
        globIgnores: ['**/*.pdf'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'google-fonts-cache' }
          },
          {
            urlPattern: /\.pdf$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cascos-pdf-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 30 }
            }
          }
        ]
      }
    })
  ]
});
