/* eslint-disable import/no-extraneous-dependencies */

import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  resolve: {
    publicDir: 'public',
    alias: {
      '@': './src',
      '@components': './src/components'
    }
  },
  plugins: [
    reactRefresh(), viteSingleFile()
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  build: {
    target: 'esnext',
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    cssCodeSplit: false,
    brotliSize: false,
    rollupOptions: {
      inlineDynamicImports: true,
      output: {
        manualChunks: () => 'everything.js',
      },
    },
  },
})
