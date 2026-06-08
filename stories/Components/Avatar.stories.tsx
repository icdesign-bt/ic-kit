import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, type AvatarColor, type AvatarSize, type AvatarVariant } from '../../src/components/Avatar';
import mockAvatar from '../assets/ava-18.jpg';

const FIGMA_COMPONENT =
  'https://www.figma.com/design/XFvebxoecl7DX4Oxm9GVJO/KURS-v2.-Components';
const FIGMA_DOCS =
  'https://www.figma.com/design/wy9jtzeCE5LWQp3KIueIMM/KURS.Storybook';

const COLORS = ['primary', 'secondary', 'success', 'error', 'warning'];

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component: `KURS v2 Avatar. Figma: [6169:5244](${FIGMA_COMPONENT}?node-id=6169-5244), docs: [126:175308](${FIGMA_DOCS}?node-id=126-175308).`,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    variant: {
      control: 'select',
      options: ['contained', 'tonal'],
    },
    color: {
      control: 'select',
      options: COLORS,
    },
  },
} as Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    size: 'md',
    variant: 'contained',
    color: 'primary',
  },
};

export const Photo: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar size="md" src={mockAvatar} alt="Константин" />
      <Avatar size="sm" src={mockAvatar} alt="Константин" />
    </div>
  ),
};

export const Initials: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar size="md" variant="contained" color="primary" initials="Анна" />
      <Avatar size="sm" variant="tonal" color="secondary" initials="КК" />
    </div>
  ),
};

export const Icon: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      {(['md', 'sm'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {COLORS.map((color) => (
            <Avatar key={`${size}-${color}`} size={size} variant="contained" color={color} />
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Tonal: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      {(['md', 'sm'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {COLORS.map((color) => (
            <Avatar key={`${size}-${color}`} size={size} variant="tonal" color={color} initials="A" />
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar size="md" variant="contained" color="primary" />
      <Avatar size="md" variant="contained" color="primary" initials="А" />
      <Avatar size="md" src={mockAvatar} alt="Фото пользователя" />
    </div>
  ),
};
