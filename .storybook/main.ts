import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';

const storybookDir = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  // Introduction первым — landing по умолчанию в sidebar
  stories: [
    '../stories/Introduction.stories.@(ts|tsx)',
    '../stories/Foundations/**/*.stories.@(ts|tsx)',
    '../stories/Components/**/*.stories.@(ts|tsx)',
    '../stories/Guides/**/*.stories.@(ts|tsx)',
  ],
  addons: ['@storybook/addon-toolbars', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {
      viteConfigPath: join(storybookDir, 'vite.config.ts'),
    },
  },
  docs: {},
  async viteFinal(viteConfig) {
    // Relative base is more reliable on GitHub Pages + Safari than absolute `/ic-kit/`.
    viteConfig.base = process.env.STORYBOOK_BASE_PATH ?? './';

    viteConfig.build ??= {};
    // Avoid shared preload helper living only on the iframe entry (circular import → Safari fail).
    viteConfig.build.modulePreload = false;
    viteConfig.build.rollupOptions ??= {};
    const prev = viteConfig.build.rollupOptions.output;
    const prevObj = Array.isArray(prev) ? prev[0] : prev;
    viteConfig.build.rollupOptions.output = {
      ...prevObj,
      manualChunks(id) {
        if (id.includes('vite/preload-helper')) return 'vite-preload-helper';
        const inherited = prevObj?.manualChunks;
        if (typeof inherited === 'function') return inherited(id);
        return undefined;
      },
    };

    return viteConfig;
  },
};

export default config;
