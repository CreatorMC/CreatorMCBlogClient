/// <reference types="vite/client" />
// 环境变量补全提示
interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
