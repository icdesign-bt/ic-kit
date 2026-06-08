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
        component: `KURS v2 Chip. Figma: [6143:10328](${FIGMA_COMPONENT}?node-id=6143-10328), docs: [126:165172](${FIGMA_DOCS}?node-id=126-165172).`,
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
  },
} as Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  render: () => (
    <Chip
      size="md"
      variant="tonal"
      color="primary"
      shape="rounded"
      label="Label"
      startIcon={CaretDownMd}
      onClose={() => undefined}
    />
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <Chip size="md" variant="tonal" color="primary" label="Label" startIcon={CaretDownMd} onClose={() => undefined} />
      <Chip size="sm" variant="tonal" color="primary" label="Label" startIcon={CaretDownSm} onClose={() => undefined} />
      <Chip size="xsm" variant="tonal" color="primary" label="Label" startIcon={CaretDownXsm} onClose={() => undefined} />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      {VARIANTS.map((variant) => (
        <Chip
          key={variant}
          size="md"
          variant={variant}
          color="primary"
          label="Label"
          startIcon={CaretDownMd}
          onClose={() => undefined}
        />
      ))}
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      {COLORS.map((color) => (
        <Chip
          key={color}
          size="md"
          variant="tonal"
          color={color}
          label="Label"
          startIcon={CaretDownMd}
          onClose={() => undefined}
        />
      ))}
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Chip size="md" variant="tonal" color="primary" shape="rounded" label="Rounded" startIcon={false} />
      <Chip size="md" variant="tonal" color="primary" shape="square" label="Square" startIcon={false} />
    </div>
  ),
};

export const WithoutIcons: Story = {
  name: 'Without Icons',
  render: () => (
    <Chip size="md" variant="tonal" color="primary" label="Label" startIcon={false} />
  ),
};

export const Dismissible: Story = {
  render: () => (
    <Chip
      size="md"
      variant="tonal"
      color="primary"
      label="Label"
      startIcon={CaretDownMd}
      onClose={() => undefined}
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <Chip
        size="md"
        variant="tonal"
        color="primary"
        label="Label"
        startIcon={CaretDownMd}
        onClose={() => undefined}
        disabled
      />
      <Chip size="md" variant="tonal" color="primary" label="Label" startIcon={false} disabled />
    </div>
  ),
};
