import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: 'src',
  publicDir: resolve(__dirname, 'public'),

  build: {
    outDir: '../dist',
    emptyOutDir: true,
    assetsInlineLimit: 0,
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
      },
      output: {
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name ?? ''
          if (/\.(woff|woff2|ttf)$/.test(name)) {
            return 'assets/fonts/inter/[name][extname]'
          }
          if (/\.(png|jpe?g|svg|gif|webp|ico|webmanifest)$/.test(name)) {
            return 'assets/images/[name][extname]'
          }
          if (/\.css$/.test(name)) {
            return 'assets/css/[name][extname]'
          }
          return 'assets/[name][extname]'
        },
        chunkFileNames: 'assets/js/[name].js',
        entryFileNames: 'assets/js/[name].js',
      },
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['import', 'legacy-js-api', 'global-builtin'],
      },
    },
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  server: {
    port: 5173,
    open: false,
  },
})