import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
/*export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
  }
})*/

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    // Ensure all assets get copied into the dist directory
    rollupOptions: {
      input: {
        main: './index.html'
      },
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  },
  // Ensure correct base path for assets
  base: './'
})
