import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://192.168.233.40/todo/api/Todo/',
        changeOrigin: true,
        secure: false, // 如果你的API使用的是自簽名證書，需要將此設置為false
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
