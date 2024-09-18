/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  /** 环境类型 */
  readonly VITE_NODE_ENV: string
  /** 请求API地址 */
  readonly VITE_API_URL: string
  /** 代理地址 */
  readonly VITE_TAES: string
  /** 打包目录 */
  readonly VITE_UTLPATH: string
  /** 网页标题 */
  readonly VITE_TITLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
