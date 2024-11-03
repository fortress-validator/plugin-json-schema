import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    copyPublicDir: false,
    lib: {
      entry: path.resolve(__dirname, 'lib/index.ts'),
      name: 'FortressPluginJSONSchema',
      fileName: format => format === 'es' ? 'index.js' : `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        'ajv',
      ],
      output: {
        globals: {
          ajv: 'ajv',
        },
      },
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'lib'),
    },
  },
  plugins: [
    dts({
      tsconfigPath: './tsconfig.build.json',
      copyDtsFiles: true,
    }),
  ],
});
