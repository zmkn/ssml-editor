import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import ElementPlus from 'unplugin-element-plus/vite';
import { type ConfigEnv, type UserConfig, defineConfig, loadEnv } from 'vite';
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
  const { VITE_PUBLIC_PATH, VITE_WEB_TITLE } = loadEnv(mode, rootPath);
  return {
    base: VITE_PUBLIC_PATH,
    root: rootPath,
    resolve: {
      alias,
    },
    plugins: [
      vue(),
      tailwindcss(),
      ElementPlus({}),
      createHtmlPlugin({
        inject: {
          data: {
            // 定义 index.html 中 title 内容
            title: VITE_WEB_TITLE,
          },
        },
      }),
    ],
    optimizeDeps: {
      esbuildOptions: {
        target: 'esnext',
      },
    },
    build: {
      target: 'esnext',
      sourcemap: true,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4000,
      rollupOptions: {
        input: {
          index: pathResolve('index.html'),
        },
        // 静态资源分类打包
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },
  };
});
