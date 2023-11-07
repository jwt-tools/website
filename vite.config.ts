import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
