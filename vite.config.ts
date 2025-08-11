import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  // base: './', // 打包为相对路径
  clearScreen: false, // vite打印执行结果时，是否清屏控制台
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    vueSetupExtend(),
    AutoImport({
      resolvers: [ElementPlusResolver()], // elementUI自动导入插件
    }),
    Components({
      resolvers: [ElementPlusResolver()], // elementUI按需导入插件
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    open: false, // 自动打开浏览器
    host: '0.0.0.0', // ip地址
    // port: 8080, // 端口
    fs: {
      strict: false, // 支持引用除入口目录的文件
    },
    proxy: {
      '/taes': {
        target: 'https://www.szsgby.com', // 代理域名
        changeOrigin: true,
        rewrite: (path) => path.replace('^/taes', ''),
      },
      '/localApi': {
        target: 'http://10.1.161.238:8490', // 赵理 无线
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/localApi/, ''),
      },
      '/httpsApi': {
        target: 'https://10.1.164.16:8088', // 徐国超 无线
        changeOrigin: true,
        secure: false, // https代理
        rewrite: (path) => path.replace(/^\/httpsApi/, ''),
      },
    }, // 代理接口
  },
})
