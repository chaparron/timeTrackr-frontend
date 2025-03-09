import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@stores': path.resolve(__dirname, 'src/stores'),
      '@router': path.resolve(__dirname, 'src/router'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@api': path.resolve(__dirname, 'src/api'),
    },
  },
});
