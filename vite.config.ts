import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'JSON Web Token (JWT) Debugger',
        short_name: 'JWTDebugger',
        description: 'This JWT debugging tool is made to help developers quickly understand the header, claims, and signature of any JWT.',
        theme_color: '#262626',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  build: {
    sourcemap: true,
  },
  server: {
    port: 5173,
    hmr: {
      clientPort: 5173
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5175',
        changeOrigin: true,
      }
    }
  }
});
