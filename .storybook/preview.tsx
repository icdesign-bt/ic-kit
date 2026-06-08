import type { Preview } from '@storybook/react';
import React, { useEffect } from 'react';
import '../src/styles/global.css';

const BRANDS = ['ic', 'codd'] as const;
const THEMES = ['light', 'dark'] as const;

function ThemeBridge({
  brand,
  theme,
  children,
}: {
  brand: (typeof BRANDS)[number];
  theme: (typeof THEMES)[number];
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.documentElement.dataset.brand = brand;
    document.documentElement.dataset.theme = theme;
  }, [brand, theme]);

  return <>{children}</>;
}

const preview: Preview = {
  options: {
    storySort: {
      order: ['Introduction', 'Foundations', 'Components', 'Guides'],
      method: 'alphabetical',
    },
  },
  parameters: {
    layout: 'padded',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  initialGlobals: {
    brand: 'ic',
    theme: 'light',
  },
  globalTypes: {
    brand: {
      description: 'KURS brand palette',
      toolbar: {
        title: 'Brand',
        icon: 'category',
        dynamicTitle: true,
        items: [
          { value: 'ic', title: 'ИЦ' },
          { value: 'codd', title: 'ЦОДД' },
        ],
      },
    },
    theme: {
      description: 'Light / dark mode',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        dynamicTitle: true,
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => (
      <ThemeBridge brand={context.globals.brand} theme={context.globals.theme}>
        <Story />
      </ThemeBridge>
    ),
  ],
};

export default preview;
