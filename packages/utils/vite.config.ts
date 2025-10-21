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
      dts({
        include: ['src/**/*'],
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
        entry: 'src/index.ts',
        name: 'SSMLEditorUtils',
        formats: ['es', 'cjs', 'umd'],
        fileName: (format) => {
          return `index.${format}.js`;
        },
      },
      rollupOptions: {
        input: {
          main: pathResolve('src/index.ts'),
        },
        output: {
          exports: 'named',
          assetFileNames: () => {
            return '[name].[ext]';
          },
        },
      },
    },
  };
});
