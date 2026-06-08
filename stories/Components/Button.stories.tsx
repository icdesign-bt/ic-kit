import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../../src/components/Icon';
import {
  Button,
  ButtonGroup,
  IconButton,
  SplitButton,
  ToggleButton,
  type ButtonColor,
  type ButtonSize,
  type ButtonVariant,
  type LoadingPosition,
} from '../../src/components/Button';

const FIGMA_COMPONENT =
  'https://www.figma.com/design/XFvebxoecl7DX4Oxm9GVJO/KURS-v2.-Components';
const FIGMA_DOCS =
  'https://www.figma.com/design/wy9jtzeCE5LWQp3KIueIMM/KURS.Storybook';
const FIGMA_GROUP_STATES = `${FIGMA_DOCS}?node-id=172-18708`;

const PlusIcon = <Icon path="Math & Finances/Plus" size={20} />;
const CaretDownIcon = <Icon path="Arrows & Directions/CaretDown" size={20} />;
const AnchorIcon = <Icon path="Maps & Travel/Anchor" size={20} />;

const GROUP_OPTIONS = [
  { value: 'left', label: 'Left' },
  { value: 'middle', label: 'Middle' },
  { value: 'right', label: 'Right' },
];

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: `KURS v2 Button family. Figma: [Button](${FIGMA_COMPONENT}?node-id=158-3227), docs: [Storybook](${FIGMA_DOCS}?node-id=123-103169).`,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'tonal', 'outlined', 'text'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'neutral', 'success', 'warning', 'error'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xlg'],
    },
    loadingPosition: {
      control: 'select',
      options: ['left', 'right', 'center'],
    },
  },
} as Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'contained',
    color: 'primary',
    size: 'md',
  },
};

export const WithStartIcon: Story = {
  name: 'With Start Icon',
  render: () => (
    <Button startIcon={PlusIcon} variant="contained" color="primary" size="md">
      Button
    </Button>
  ),
};

export const WithEndIcon: Story = {
  name: 'With End Icon',
  render: () => (
    <Button endIcon={PlusIcon} variant="contained" color="primary" size="md">
      Button
    </Button>
  ),
};

export const Loading: Story = {
  args: {
    children: 'Button',
    loading: true,
    loadingPosition: 'center',
    variant: 'contained',
    color: 'primary',
    size: 'md',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      {(['contained', 'tonal', 'outlined', 'text'] as const).map((variant) => (
        <Button key={variant} variant={variant} color="primary">
          {variant}
        </Button>
      ))}
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(['contained', 'tonal', 'outlined', 'text'] as const).map((variant) => (
        <div key={variant} style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {(['primary', 'secondary', 'neutral', 'success', 'warning', 'error'] as const).map((color) => (
            <Button key={`${variant}-${color}`} variant={variant} color={color} size="sm">
              {color}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      {(['sm', 'md', 'lg', 'xlg'] as const).map((size) => (
        <Button key={size} size={size}>
          {size}
        </Button>
      ))}
    </div>
  ),
};

export const IconButtonStory: StoryObj<typeof IconButton> = {
  name: 'Icon Button',
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {(['contained', 'tonal', 'outlined', 'text'] as const).map((variant) => (
        <IconButton
          key={variant}
          variant={variant}
          icon={PlusIcon}
          aria-label="Add"
        />
      ))}
    </div>
  ),
};

export const ToggleButtonStory: StoryObj<typeof ToggleButton> = {
  name: 'Toggle Button',
  render: function ToggleDemo() {
    const [selected, setSelected] = useState(false);
    return (
      <ToggleButton
        icon={AnchorIcon}
        selected={selected}
        aria-label="Toggle anchor"
        onClick={() => setSelected((v) => !v)}
      />
    );
  },
};

export const ButtonGroupStory: StoryObj<typeof ButtonGroup> = {
  name: 'Button Group',
  render: function GroupDemo() {
    const [value, setValue] = useState('middle');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {(['contained', 'tonal', 'outlined'] as const).map((variant) => (
          <div key={variant} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 12, color: 'var(--text-secondary-on-surface)' }}>{variant}</span>
            <ButtonGroup
              value={value}
              onChange={setValue}
              variant={variant}
              size="xlg"
              aria-label={`${variant} button group`}
              options={GROUP_OPTIONS}
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `Состояния hover/selected — [Figma States](${FIGMA_GROUP_STATES}). Все сегменты одного варианта; selected использует \`--btn-selected-*\` токены.`,
      },
    },
  },
};

export const ButtonGroupSizes: StoryObj<typeof ButtonGroup> = {
  name: 'Button Group / Sizes',
  render: function GroupSizes() {
    const [value, setValue] = useState('middle');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
        {(['sm', 'md', 'lg', 'xlg'] as const).map((size) => (
          <ButtonGroup
            key={size}
            value={value}
            onChange={setValue}
            size={size}
            variant="contained"
            aria-label={`Size ${size}`}
            options={GROUP_OPTIONS}
          />
        ))}
      </div>
    );
  },
};

export const SplitButtonStory: StoryObj<typeof SplitButton> = {
  name: 'Split Button',
  render: () => (
    <SplitButton
      label="Action"
      startIcon={PlusIcon}
      menuIcon={CaretDownIcon}
      onActionClick={() => undefined}
      onMenuClick={() => undefined}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: `Figma: [Split button](${FIGMA_COMPONENT}?node-id=6166-11676).`,
      },
    },
  },
};
