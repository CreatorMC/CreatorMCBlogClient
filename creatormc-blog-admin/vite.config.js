import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
//配置 vite-plugin-svg-spritemap 为了方便的生成 sprite
import { svgSpritemap } from 'vite-plugin-svg-spritemap'

// https://vitejs.dev/config/
// 在配置中使用环境变量
// https://cn.vitejs.dev/config/#using-environment-variables-in-config
export default defineConfig(({ command, mode }) => {
  //根据当前工作目录中的 `mode` 加载 .env 文件
  const baseURL = loadEnv(mode, process.cwd()).VITE_APP_BASE_URL
  return {
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
    },
    server: {
      proxy: {
        [baseURL]: {
          target: command == 'serve' ? 'http://127.0.0.1:8989' : 'http://39.98.73.138:8989',
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${baseURL}`), '')
        }
      }
    }
  }
})
