import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

/**
 * Builds the editor UI into one self-contained bundle (its own Vue, Reka
 * and styles), so it runs inside any repo, whatever framework the repo
 * uses: dist/editor/index.js + dist/editor/editor.css.
 */
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    __VUE_OPTIONS_API__: 'false',
    __VUE_PROD_DEVTOOLS__: 'false',
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
  },
  build: {
    outDir: 'dist/editor',
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, 'src/editor/index.ts'),
      formats: ['es'],
      fileName: () => 'index.js',
      cssFileName: 'editor'
    },
    rollupOptions: { output: { inlineDynamicImports: true } },
    minify: true,
    sourcemap: true
  }
})
