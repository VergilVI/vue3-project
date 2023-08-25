import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import ElementPlus from 'unplugin-element-plus/vite'
import { resolve } from 'node:path'
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-auto-import/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    ElementPlus({}) // 按需导入相关elementUI组件样式
    // AutoImport({
    //   resolvers: [ElementPlusResolver()]// elementUI自动导入插件
    // }),
    // Components({
    //   resolvers: [ElementPlusResolver()]// elementUI按需导入插件
    // })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'components': resolve(__dirname, 'src/components')
    },
    extensions: ['.mjs', '.js', '.ts', 'jsx', 'tsx', '.json', '.vue']
  },
  css: {
    preprocessorOptions: {
      // 导入scss全局样式
      scss: {
        additionalData: `@use "./src/assets/style/main.scss" as *;`
      },
    },
  },
  server: {
    open: false,
    host: '0.0.0.0',
    // port: 8080,
    fs: {
      strict: false, // 支持引用除入口目录的文件
    },
    proxy: {
      '/taes': {
        target: 'https://www.szsgby.com', // 代理域名
        changeOrigin: true,
        rewrite: (path) => path.replace('^/taes', '')
      }
    }
  }
})
