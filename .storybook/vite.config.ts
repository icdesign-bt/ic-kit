import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/** Storybook-only Vite config — без vite-plugin-dts из корневого vite.config.ts */
export default defineConfig({
  plugins: [react()],
});
