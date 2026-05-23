import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (/\.(woff|woff2|ttf|eot)$/.test(assetInfo.name)) {
            return 'assets/fonts/inter/[name][extname]'
          }
          if (/\.(png|jpe?g|svg|gif|webp|ico)$/.test(assetInfo.name)) {
            return 'assets/images/[name][extname]'
          }
          if (/\.css$/.test(assetInfo.name)) {
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
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
