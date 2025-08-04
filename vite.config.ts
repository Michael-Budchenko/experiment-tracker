import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react(), svgr()],
  envDir: './src/config/environments',
  server: {
    port: 2222,
    open: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
