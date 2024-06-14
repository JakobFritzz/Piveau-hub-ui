import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { lstatSync } from 'node:fs';
import path from 'path';
import config from './config';

const isSymlink = (pkg: string) => {
  const packagePath = path.resolve('..', '..', 'node_modules', pkg);
  try {
    return lstatSync(packagePath).isSymbolicLink();
  } catch {
    return false;
  }
}

let buildMode;
if (process.env.NODE_ENV === 'production') {
  buildMode = process.env.BUILD_MODE === 'test' ? 'test' : 'build';
} else {
  buildMode = 'dev';
}

const buildConfig = {
  BASE_PATH: config[buildMode].assetsPublicPath,
  SERVICE_URL: config[buildMode].serviceUrl,
};

export default defineConfig({
  base: buildConfig.BASE_PATH,
  define: {},
  plugins: [
    vue({ 
      template: { 
        compilerOptions: { 
          whitespace: 'preserve' ,
          compatConfig: {
            MODE: 3,
          },
        },
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
      {
        find: '@modules-scss',
        replacement: isSymlink('@piveau/piveau-hub-ui-modules') ?
          path.resolve(__dirname, '..', '..', 'node_modules', '@piveau/piveau-hub-ui-modules', 'dist', 'scss')
          : path.resolve(__dirname, 'node_modules', '@piveau/piveau-hub-ui-modules', 'dist', 'scss'),
      },
      {
        find: /^~(.*)$/,
        replacement: '$1',
      },
      {
        find: 'lodash',
        replacement: 'lodash-es',
      },
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
      },
    ],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    preserveSymlinks: false,
  },
  server: {
    port: 8080
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'app.[hash].js',
      }
    }
  },
  optimizeDeps: {
    exclude: ['js-big-decimal'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
      },
    },
  },
});
