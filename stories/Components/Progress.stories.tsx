import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Progress, Spinner } from '../../src/components/Progress';

const FIGMA_COMPONENT =
  'https://www.figma.com/design/XFvebxoecl7DX4Oxm9GVJO/KURS-v2.-Components';

const meta = {
  title: 'Components/Progress',
  parameters: {
    docs: {
      description: {
        component: `KURS v2 Progress — линейный индикатор (\`<progress>\`) и круговой Spinner (SVG). Component set: [Progress](${FIGMA_COMPONENT}).`,
      },
    },
  },
} as Meta;

export default meta;

type Story = StoryObj;

export const SpinnerSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <Spinner size="xsm" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const SpinnerColors: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <Spinner color="primary" />
      <Spinner color="secondary" />
      <Spinner color="neutral" />
      <span style={{ color: 'var(--error-main)' }}>
        <Spinner color="inherit" />
      </span>
    </div>
  ),
};

export const LinearDeterminate: Story = {
  render: () => {
    const [value, setValue] = useState(35);

    useEffect(() => {
      const id = setInterval(() => {
        setValue((prev) => (prev >= 100 ? 0 : prev + 5));
      }, 400);
      return () => clearInterval(id);
    }, []);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
        <Progress value={value} size="sm" aria-label={`Загрузка ${value}%`} />
        <Progress value={value} size="md" color="secondary" />
        <Progress value={value} size="lg" />
      </div>
    );
  },
};

export const LinearIndeterminate: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
      <Progress size="xsm" />
      <Progress size="sm" />
      <Progress size="md" />
      <Progress size="lg" color="secondary" />
    </div>
  ),
};

export const InlineWithText: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
      <Spinner size="sm" />
      <span>Загрузка данных…</span>
    </div>
  ),
};
