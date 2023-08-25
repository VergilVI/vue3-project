# Vue3-Project

该项目需要nodejs@16.x版本

This template should help get you started developing with Vue 3 in Vite.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### 文件说明
```sh
@assets/style/base.css      为全局css基础样式
@assets/style/main.css      为导入base.css的全局app样式
@api/api.js                 管理全局接口文件
@api/http.js                对axios进行二次封装

.env.development            本地开发环境配置
.env.production             为正式环境配置
```

### .evn文件配置说明
```
NODE_ENV                    环境类型
VUE_APP_API_URL             请求API地址
VUE_APP_TAES                代理地址
VUE_APP_UTLPATH             打包目录
VUE_APP_TITLE               页面标题
```

### 插件说明
```
postcss-px2rem
默认为 37.5px = 1rem （设计图为375）
直接写px，调试和打包时会转为rem
```

### 组件库
```
element-plus@2.x
```