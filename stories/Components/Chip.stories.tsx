import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../../src/components/Icon';
import { Chip } from '../../src/components/Chip';

const FIGMA_COMPONENT =
  'https://www.figma.com/design/XFvebxoecl7DX4Oxm9GVJO/KURS-v2.-Components';
const FIGMA_DOCS =
  'https://www.figma.com/design/wy9jtzeCE5LWQp3KIueIMM/KURS.Storybook';

const COLORS = ['primary', 'neutral', 'success', 'error'];
const VARIANTS = ['contained', 'tonal', 'outlined', 'text'];

const CaretDownMd = <Icon path="Arrows & Directions/CaretDown" size={20} weight="fill" />;
const CaretDownSm = <Icon path="Arrows & Directions/CaretDown" size={16} weight="fill" />;
const CaretDownXsm = <Icon path="Arrows & Directions/CaretDown" size={12} weight="fill" />;

const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    docs: {
      description: {
        component: `KURS v2 Chip. By default — label only (no caret). Pass \`startIcon\` explicitly for filter/select chips. Hover/focus styles apply only when interactive (\`onClick\` or \`href\`), like Material chips. Figma: [6143:10328](${FIGMA_COMPONENT}?node-id=6143-10328), docs: [126:165172](${FIGMA_DOCS}?node-id=126-165172).`,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xsm', 'sm', 'md'],
    },
    variant: {
      control: 'select',
      options: VARIANTS,
    },
    color: {
      control: 'select',
      options: COLORS,
    },
    shape: {
      control: 'select',
      options: ['rounded', 'square'],
    },
    href: { control: 'text' },
    onClick: { action: 'click' },
  },
} as Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  render: () => (
    <Chip size="md" variant="tonal" color="primary" shape="rounded" label="active" />
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <Chip size="md" variant="tonal" color="primary" label="Label" />
      <Chip size="sm" variant="tonal" color="primary" label="Label" />
      <Chip size="xsm" variant="tonal" color="primary" label="Label" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      {VARIANTS.map((variant) => (
        <Chip key={variant} size="md" variant={variant} color="primary" label="Label" />
      ))}
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      {COLORS.map((color) => (
        <Chip key={color} size="md" variant="tonal" color={color} label="Label" />
      ))}
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Chip size="md" variant="tonal" color="primary" shape="rounded" label="Rounded" />
      <Chip size="md" variant="tonal" color="primary" shape="square" label="Square" />
    </div>
  ),
};

export const Status: Story = {
  name: 'Status (no hover)',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Chip size="sm" variant="tonal" color="success" label="active" />
      <Chip size="sm" variant="tonal" color="neutral" label="12 sessions" />
      <Chip size="sm" variant="tonal" color="error" label="error" />
    </div>
  ),
};

export const Interactive: Story = {
  name: 'Interactive (hover)',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <Chip size="md" variant="contained" color="primary" label="Contained" onClick={() => undefined} />
      <Chip size="md" variant="tonal" color="primary" label="Action" onClick={() => undefined} />
      <Chip size="md" variant="outlined" color="primary" label="Link" href="#" />
      <Chip
        size="md"
        variant="tonal"
        color="primary"
        label="Filter"
        startIcon={CaretDownMd}
        onClick={() => undefined}
      />
    </div>
  ),
};

export const Filter: Story = {
  name: 'Filter (caret opt-in)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <Chip
        size="md"
        variant="tonal"
        color="primary"
        label="Filter"
        startIcon={CaretDownMd}
        onClick={() => undefined}
      />
      <Chip size="sm" variant="tonal" color="primary" label="Filter" startIcon={CaretDownSm} onClick={() => undefined} />
      <Chip
        size="xsm"
        variant="tonal"
        color="primary"
        label="Filter"
        startIcon={CaretDownXsm}
        onClick={() => undefined}
      />
    </div>
  ),
};

export const Dismissible: Story = {
  name: 'Dismissible (close only)',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <Chip size="md" variant="tonal" color="primary" label="Tag" onClose={() => undefined} />
      <Chip
        size="md"
        variant="tonal"
        color="primary"
        label="Clickable + close"
        onClick={() => undefined}
        onClose={() => undefined}
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <Chip size="md" variant="tonal" color="primary" label="Label" onClose={() => undefined} disabled />
      <Chip size="md" variant="tonal" color="primary" label="Label" disabled />
      <Chip
        size="md"
        variant="tonal"
        color="primary"
        label="Filter"
        startIcon={CaretDownMd}
        disabled
      />
    </div>
  ),
};
