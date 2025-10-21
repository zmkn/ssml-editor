import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import { type UserConfig, defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

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

export default defineConfig((): UserConfig => {
  return {
    root: rootPath,
    resolve: {
      alias,
    },
    plugins: [
      tailwindcss(),
      dts({
        include: ['src/**/*', 'types/**/*'],
        outDir: 'dist/types',
        tsconfigPath: './tsconfig.json',
        insertTypesEntry: true,
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
      cssCodeSplit: false,
      lib: {
        cssFileName: 'style',
        entry: 'src/index.ts',
        name: 'SSMLEditorCore',
        formats: ['es', 'cjs', 'umd'],
        fileName: (format) => {
          return `index.${format}.js`;
        },
      },
      rollupOptions: {
        input: {
          main: pathResolve('src/index.ts'),
        },
        external: [
          '@ssml-editor/base',
          '@ssml-editor/modules',
          '@ssml-editor/utils',
        ],
        output: {
          exports: 'named',
          globals: {
            '@ssml-editor/base': 'SSMLEditorBase',
            '@ssml-editor/modules': 'SSMLEditorModules',
            '@ssml-editor/utils': 'SSMLEditorUtils',
          },
          assetFileNames: (chunkInfo) => {
            for (const name of chunkInfo.names) {
              if (name.endsWith('.css')) {
                return 'styles/[name].[ext]';
              }
            }
            return '[name].[ext]';
          },
        },
      },
    },
  };
});
