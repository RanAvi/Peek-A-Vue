import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base:'/dist/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: "dist/",
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
        output: {
            entryFileNames: "[name].js",
            chunkFileNames: "[name].js",
            assetFileNames: "assets/[name].[ext]"
        }
    }

}
})
