import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import ElementPlus from 'unplugin-element-plus/vite';
import {
  type ConfigEnv,
  type LogLevel,
  type UserConfig,
  defineConfig,
  loadEnv,
} from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

/** 当前执行node命令时文件夹的地址（工作目录） */
const rootPath: string = process.cwd();

/** 路径查找 */
const pathResolve = (dir: string): string => {
  return resolve(__dirname, '.', dir);
};

/** 设置别名 */
const alias: Record<string, string> = {
  '@': pathResolve('src'),
};

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const { VITE_PORT, VITE_WEB_TITLE, VITE_PUBLIC_PATH, VITE_LOG_LEVEL } =
    loadEnv(mode, rootPath);
  return {
    base: VITE_PUBLIC_PATH,
    root: rootPath,
    logLevel: VITE_LOG_LEVEL as LogLevel,
    resolve: {
      alias,
    },
    server: {
      // 端口号
      port: parseFloat(VITE_PORT),
      host: '0.0.0.0',
      // 本地跨域代理 https://cn.vitejs.dev/config/server-options.html#server-proxy
      proxy: {},
    },
    plugins: [
      vue(),
      tailwindcss(),
      createHtmlPlugin({
        inject: {
          data: {
            // 定义 index.html 中 title 内容
            title: VITE_WEB_TITLE,
          },
        },
      }),
      ElementPlus({}),
    ],
  };
});
