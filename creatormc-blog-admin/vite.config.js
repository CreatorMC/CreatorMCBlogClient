import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
//配置 vite-plugin-svg-spritemap 为了方便的生成 sprite
import { svgSpritemap } from 'vite-plugin-svg-spritemap'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // svgSpritemap({
    //   pattern: 'src/assets/svg/*/*.svg',
    // })
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/index.scss";`
      }
    }
  }
})
