import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  return {
    plugins: [react()],
    build: {
      target: 'esnext',
      minify: 'esbuild', 
      rollupOptions: {
        output: {
          manualChunks: {
            'three': ['three'],
            'vendor': ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
            'three-fiber': ['@react-three/fiber', '@react-three/drei'],
            'icons': ['react-icons'],
          },
        },
      },
      sourcemap: false,
      chunkSizeWarningLimit: 1000,
    },
    esbuild: isProd ? {
      drop: ['console', 'debugger'],
    } : {},
    server: {
      port: 3000,
      open: true,
      cors: true,
      proxy: {
        '/api': {
          target: 'http://localhost:4002',
          changeOrigin: true,
        },
        '/uploads': {
          target: 'http://localhost:4002',
          changeOrigin: true,
        }
      }
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    },
  };
})