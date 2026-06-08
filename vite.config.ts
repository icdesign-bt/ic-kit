import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

const isStorybook = Boolean(process.env.STORYBOOK);

export default defineConfig({
  plugins: [
    react(),
    ...(isStorybook
      ? []
      : [
          dts({
            include: ['src'],
            exclude: ['**/*.stories.tsx'],
            rollupTypes: true,
            tsconfigPath: './tsconfig.build.json',
          }),
        ]),
  ],
  build: isStorybook
    ? undefined
    : {
        copyPublicDir: false,
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'IcKit',
          formats: ['es'],
          fileName: 'ic-kit',
        },
        rollupOptions: {
          external: ['react', 'react-dom', 'react/jsx-runtime'],
          output: {
            assetFileNames: 'ic-kit[extname]',
          },
        },
      },
});
