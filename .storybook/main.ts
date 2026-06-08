import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';

const storybookDir = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  // Introduction первым — landing по умолчанию в sidebar/docs
  stories: [
    '../stories/Introduction.mdx',
    '../stories/Foundations/**/*.stories.@(ts|tsx)',
    '../stories/Components/**/*.stories.@(ts|tsx)',
    '../stories/Guides/**/*.mdx',
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
    viteConfig.base = process.env.STORYBOOK_BASE_PATH ?? '/';
    return viteConfig;
  },
};

export default config;
